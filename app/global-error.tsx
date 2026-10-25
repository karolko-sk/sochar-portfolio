'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="cs">
      <body>
        <div style={{ padding: '3rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h2>Došlo k neočekávané chybě</h2>
          <p>Omlouváme se za nepříjemnosti.</p>
          <button
            onClick={() => reset()}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#121214',
              color: '#FAF9F6',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Zkusit znovu
          </button>
        </div>
      </body>
    </html>
  );
}
