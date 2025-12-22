import { ShieldCheckIcon, SparklesIcon, ChatBubbleLeftIcon, CheckCircleIcon, GlobeAltIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

const badges = [
  { text: 'Secure USDT payments', icon: ShieldCheckIcon },
  { text: 'No hidden fees', icon: SparklesIcon },
  { text: '24/7 live support', icon: ChatBubbleLeftIcon },
  { text: 'Instant activation', icon: CheckCircleIcon },
  { text: 'Worldwide channels', icon: GlobeAltIcon },
  { text: 'Money-back friendly', icon: ArrowPathIcon }
];

export function TrustBadges() {
  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-card sm:grid-cols-3">
      {badges.map((badge) => {
        const Icon = badge.icon;
        return (
          <div
            key={badge.text}
            className="flex items-center gap-2 rounded-lg bg-surface px-3 py-2 text-xs font-semibold uppercase tracking-wide text-navy hover:bg-teal/5 transition"
          >
            <Icon className="h-4 w-4 flex-shrink-0 text-teal" />
            <span>{badge.text}</span>
          </div>
        );
      })}
    </div>
  );
}
