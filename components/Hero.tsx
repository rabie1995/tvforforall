import Link from 'next/link';
import { SparklesIcon, PlayIcon } from '@heroicons/react/24/solid';

export function Hero() {
  return (
    <section className="container-hero isolate overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:py-20 lg:px-8">
        <div className="flex-1 space-y-6 text-white">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-teal shadow-sm" style={{ fontFamily: 'var(--font-poppins)' }}>
            <SparklesIcon className="h-4 w-4" />
            Premium IPTV — Pay with USDT
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl" style={{ fontFamily: 'var(--font-poppins)' }}>
            Streaming for everyone
          </h1>
          <p className="max-w-2xl text-lg text-slate-100">
            Stable, fast IPTV with legal licensed content. Instant activation, 24/7 support, and secure USDT payments. Watch anywhere, anytime.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-tealDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              <PlayIcon className="h-5 w-5" />
              Start watching
            </Link>
            <span className="text-sm text-slate-100">Activation under 5 minutes • Refund-friendly</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
            <div className="rounded-full bg-white/10 px-3 py-1">ERC20 / TRC20 / BEP20</div>
            <div className="rounded-full bg-white/10 px-3 py-1">Web & mobile ready</div>
            <div className="rounded-full bg-white/10 px-3 py-1">Legal streams</div>
          </div>
        </div>
        <div className="flex-1">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between text-sm text-slate-200">
              <span>Featured</span>
              <span className="rounded-full bg-teal/20 px-3 py-1 text-teal">Anti-freeze</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white">
              {['Sports & PPV', 'Movies & Series', 'Kids & Family', 'News & Docs', 'International', '4K Ready'].map((item) => (
                <div key={item} className="rounded-xl bg-white/10 px-4 py-3 shadow-inner">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-white/10 p-4 text-slate-100">
              <p className="text-sm font-semibold text-white">Pay with USDT</p>
              <p className="text-xs text-slate-200">On-chain verification. No private keys stored.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
