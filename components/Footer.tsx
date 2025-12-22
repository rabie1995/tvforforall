import Link from 'next/link';
import { EnvelopeIcon, GlobeAltIcon } from '@heroicons/react/24/solid';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-xl font-bold" style={{ fontFamily: 'var(--font-poppins)' }}>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal font-bold text-sm">✦</span>
              tv for all
            </div>
            <p className="mt-3 text-sm text-slate-300">
              Premium IPTV streaming legally licensed and worldwide.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold" style={{ fontFamily: 'var(--font-poppins)' }}>Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/about" className="text-slate-300 hover:text-white transition">About</Link></li>
              <li><Link href="/blog" className="text-slate-300 hover:text-white transition">Blog</Link></li>
              <li><Link href="/careers" className="text-slate-300 hover:text-white transition">Careers</Link></li>
              <li><Link href="/press" className="text-slate-300 hover:text-white transition">Press</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold" style={{ fontFamily: 'var(--font-poppins)' }}>Legal</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/terms" className="text-slate-300 hover:text-white transition">Terms</Link></li>
              <li><Link href="/privacy" className="text-slate-300 hover:text-white transition">Privacy</Link></li>
              <li><Link href="/refund-policy" className="text-slate-300 hover:text-white transition">Refund policy</Link></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="font-semibold" style={{ fontFamily: 'var(--font-poppins)' }}>Get in touch</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <EnvelopeIcon className="h-4 w-4 text-teal" />
                <a href="mailto:support@forall.store" className="text-slate-300 hover:text-white transition">support@forall.store</a>
              </li>
              <li className="flex items-center gap-2">
                <GlobeAltIcon className="h-4 w-4 text-teal" />
                <span className="text-slate-300">English / Français / العربية</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-slate-700" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-400">
            © {currentYear} tv for all. All rights reserved. Legal & licensed IPTV content.
          </p>
          <div className="flex gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
