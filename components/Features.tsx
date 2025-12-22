import { SparklesIcon, PlayCircleIcon, CheckCircleIcon, StarIcon } from '@heroicons/react/24/solid';

const features = [
  {
    id: 1,
    title: 'Crystal Clear Streaming',
    description: 'Watch in up to 4K Ultra HD with adaptive bitrate streaming for smooth playback.',
    icon: PlayCircleIcon,
  },
  {
    id: 2,
    title: 'Worldwide Content',
    description: 'Access premium channels from 50+ countries in Arabic, English, French & more.',
    icon: SparklesIcon,
  },
  {
    id: 3,
    title: 'Multi-Device Support',
    description: 'Stream on your TV, phone, tablet, or computer. Pause on one device, resume on another.',
    icon: CheckCircleIcon,
  },
  {
    id: 4,
    title: 'Premium Reliability',
    description: 'Enjoy 99.95% uptime with redundant servers and zero buffering guaranteed.',
    icon: StarIcon,
  },
];

export function Features() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-navy sm:text-4xl" style={{ fontFamily: 'var(--font-poppins)' }}>
            Premium features at every tier
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Everything you need for the ultimate streaming experience
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-teal/50"
              >
                <div className="mb-4 inline-flex rounded-lg bg-teal p-3 text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-navy" style={{ fontFamily: 'var(--font-poppins)' }}>
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
