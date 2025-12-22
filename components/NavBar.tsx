import Link from 'next/link';

export function NavBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-bold text-navy" style={{ fontSize: '18px', fontFamily: 'var(--font-poppins)' }}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal text-white font-bold text-sm">✦</span>
          tv for all
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
          <Link href="#plans" className="hidden sm:inline hover:text-navy">
            Plans
          </Link>
          <Link href="#benefits" className="hidden sm:inline hover:text-navy">
            Benefits
          </Link>
          <Link
            href="/checkout"
            className="rounded-full bg-teal px-4 py-2 text-white shadow-sm transition hover:bg-tealDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            Buy now — USDT
          </Link>
        </div>
      </div>
    </header>
  );
}
