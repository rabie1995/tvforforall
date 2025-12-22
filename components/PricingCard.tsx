'use client';

import Link from 'next/link';
import { CheckCircleIcon, StarIcon, CalendarIcon, SparklesIcon, FireIcon } from '@heroicons/react/24/solid';
import { plans, type Plan } from '@/lib/plans';
import { CURRENT_PROMO, hasActivePromo } from '@/lib/promo';
import { useState, useEffect } from 'react';

const planIcons: Record<string, React.ReactNode> = {
  'plan_3m': <CalendarIcon className="h-6 w-6" />,
  'plan_6m': <SparklesIcon className="h-6 w-6" />,
  'plan_12m': <StarIcon className="h-6 w-6" />
};

// Simple reusable pricing card component for subscription plans
export function PricingCard({ plan }: { plan: Plan }) {
  const icon = planIcons[plan.id] || <SparklesIcon className="h-6 w-6" />;
  const [isPromoActive, setIsPromoActive] = useState(false);

  useEffect(() => {
    // Check if this plan has active promo
    setIsPromoActive(hasActivePromo(plan.id));
    
    // Update every second to handle promo expiration
    const interval = setInterval(() => {
      setIsPromoActive(hasActivePromo(plan.id));
    }, 1000);

    return () => clearInterval(interval);
  }, [plan.id]);

  const displayPrice = isPromoActive ? CURRENT_PROMO.promoPrice : plan.priceUsd;
  const hasDiscount = isPromoActive && CURRENT_PROMO.originalPrice > CURRENT_PROMO.promoPrice;

  return (
    <div className={`relative rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-xl ${plan.popular ? 'ring-2 ring-teal' : ''} ${isPromoActive ? 'ring-2 ring-orange' : ''}`}>
      {isPromoActive ? (
        <span className="absolute -top-3 left-4 inline-flex items-center gap-1 rounded-full bg-orange px-3 py-1 text-xs font-semibold text-white shadow-sm animate-pulse" style={{ fontFamily: 'var(--font-poppins)' }}>
          <FireIcon className="h-4 w-4" /> {CURRENT_PROMO.label}
        </span>
      ) : plan.popular ? (
        <span className="absolute -top-3 right-4 inline-flex items-center gap-1 rounded-full bg-orange px-3 py-1 text-xs font-semibold text-white shadow-sm" style={{ fontFamily: 'var(--font-poppins)' }}>
          <StarIcon className="h-4 w-4" /> Best value
        </span>
      ) : null}
      <div className="flex items-start justify-between">
        <div>
          <div className="mb-2 inline-flex rounded-lg bg-teal/10 p-3 text-teal">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-navy" style={{ fontFamily: 'var(--font-poppins)' }}>{plan.name}</h3>
          <p className="text-sm text-slate-500">No hidden fees. Instant activation.</p>
        </div>
        <div className="text-right">
          {hasDiscount && (
            <p className="text-sm text-slate-400 line-through">${CURRENT_PROMO.originalPrice}</p>
          )}
          <p className={`text-3xl font-bold ${isPromoActive ? 'text-orange' : 'text-navy'}`} style={{ fontFamily: 'var(--font-poppins)' }}>
            ${displayPrice}
          </p>
          {isPromoActive && (
            <p className="text-xs font-semibold text-orange">Save ${CURRENT_PROMO.originalPrice - CURRENT_PROMO.promoPrice}!</p>
          )}
        </div>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {plan.perks.map((perk) => (
          <li key={perk} className="flex items-center gap-2">
            <CheckCircleIcon className="h-4 w-4 flex-shrink-0 text-teal" />
            <span>{perk}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`/checkout?plan=${plan.id}`}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-tealDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        <SparklesIcon className="h-4 w-4" />
        Start streaming
      </Link>
      <p className="mt-2 text-center text-xs text-slate-500">Secure crypto payment. 24/7 support.</p>
    </div>
  );
}

export function PricingGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <PricingCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
