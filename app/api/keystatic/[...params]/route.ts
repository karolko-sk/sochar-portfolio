import { timingSafeEqual } from 'node:crypto';
import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '@/keystatic.config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const keystaticHandler = makeRouteHandler({ config });

function isProductionRuntime(): boolean {
  return process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) {
    return false;
  }
  return timingSafeEqual(left, right);
}

function readCookie(cookieHeader: string, name: string): string | null {
  for (const part of cookieHeader.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    if (part.slice(0, idx).trim() === name) {
      return part.slice(idx + 1).trim();
    }
  }
  return null;
}

// Fail-closed: in production a request is authorized only when it carries the
// exact admin secret (Bearer header or admin cookie). Missing secret => deny.
function isAuthorized(req: Request): boolean {
  if (!isProductionRuntime()) {
    return true;
  }

  const secret = process.env.KEYSTATIC_ADMIN_SECRET;
  if (!secret) {
    return false;
  }

  const authHeader = req.headers.get('authorization') || '';
  const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  const cookieToken = readCookie(req.headers.get('cookie') || '', 'keystatic-admin');

  const candidate = bearer || cookieToken || '';
  if (!candidate) {
    return false;
  }
  return safeEqual(candidate, secret);
}

function unauthorized(): Response {
  return new Response(JSON.stringify({ error: 'Unauthorized: authentication required' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return unauthorized();
  }
  return keystaticHandler.GET(req);
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return unauthorized();
  }
  return keystaticHandler.POST(req);
}
