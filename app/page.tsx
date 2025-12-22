import { Hero } from '@/components/Hero';
import { NavBar } from '@/components/NavBar';
import { PricingGrid } from '@/components/PricingCard';
import { Benefits } from '@/components/Benefits';
import { TrustBadges } from '@/components/TrustBadges';
import { Features } from '@/components/Features';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <NavBar />
      <Hero />
      <section className="bg-white pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <TrustBadges />
        </div>
      </section>
      <Features />
      <section id="plans" className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-teal">Subscriptions</p>
              <h2 className="text-3xl font-bold text-navy" style={{ fontFamily: 'var(--font-poppins)' }}>Straightforward IPTV plans</h2>
              <p className="text-slate-600">Choose a duration that fits you. All plans include live TV, VOD, and sports.</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <div className="rounded-full bg-teal/10 px-3 py-1 text-teal">USDT payments</div>
              <div className="rounded-full bg-orange/10 px-3 py-1 text-orange">Setup in minutes</div>
            </div>
          </div>
          <PricingGrid />
        </div>
      </section>
      <Benefits />
      <Footer />
    </main>
  );
}
