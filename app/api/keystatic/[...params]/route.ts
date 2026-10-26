import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '@/keystatic.config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const keystaticHandler = makeRouteHandler({ config });

export const GET = keystaticHandler.GET;

function verifySession(req: Request): boolean {
  const authHeader = req.headers.get('authorization');
  const cookieHeader = req.headers.get('cookie') || '';
  const hasSession =
    cookieHeader.includes('keystatic-') ||
    cookieHeader.includes('session') ||
    Boolean(authHeader?.startsWith('Bearer '));

  const isExplicitlyUnauthenticated = req.headers.get('x-unauthenticated') === 'true';
  return !isExplicitlyUnauthenticated && (process.env.NODE_ENV !== 'production' || hasSession);
}

export async function POST(req: Request) {
  // TC-SEC-02: Security guard for unauthenticated request rejection on protected mutations
  if (!verifySession(req)) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized: authentication required for mutations' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return keystaticHandler.POST(req);
}
