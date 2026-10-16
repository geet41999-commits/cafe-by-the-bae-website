import React, { useState } from 'react';
import { Mail, MapPin, Clock, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1F1711] text-[#D8CEBF] pt-16 pb-12 border-t border-[#33251B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#35271C]">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-serif-display text-2xl font-bold tracking-tight text-white block">
              The Common Room
            </span>
            <p className="text-xs text-[#A99889] leading-relaxed max-w-sm">
              An architectural coffee roastery and bakehouse dedicated to deliberate mornings, tactile design, and terroir-driven coffee lots.
            </p>
            <div className="text-xs text-[#8F7D6F] pt-2">
              <span>Licensed Organic Small-Batch Roasters</span>
            </div>
          </div>

          {/* Location & Hours */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#CDB9A6] block">
              The Cafe & Roastery
            </span>
            <div className="flex items-start gap-2.5 text-[#BBAA9C]">
              <MapPin className="w-4 h-4 text-[#C48C6A] shrink-0 mt-0.5" />
              <span>42 St. Jude Archway, Mill District, NY 10013</span>
            </div>
            <div className="flex items-start gap-2.5 text-[#BBAA9C]">
              <Clock className="w-4 h-4 text-[#C48C6A] shrink-0 mt-0.5" />
              <div>
                <p>Monday – Friday: 07:00 – 18:00</p>
                <p>Saturday – Sunday: 08:00 – 17:00</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-[#BBAA9C]">
              <Phone className="w-4 h-4 text-[#C48C6A] shrink-0" />
              <span>(212) 555-0149</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#CDB9A6] block">
              Explore
            </span>
            <ul className="space-y-2 text-[#AFA093]">
              <li>
                <a href="#atmosphere" className="hover:text-white transition-colors">The Space & Vibe</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Daily Coffee Menu</a>
              </li>
              <li>
                <a href="#bakery" className="hover:text-white transition-colors">Artisanal Bakery</a>
              </li>
              <li>
                <a href="#roastery" className="hover:text-white transition-colors">Whole Bean Bags</a>
              </li>
              <li>
                <a href="#brew-lab" className="hover:text-white transition-colors">Brew Guide Lab</a>
              </li>
            </ul>
          </div>

          {/* Dispatch Journal & Newsletter */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#CDB9A6] block">
              The Roaster's Dispatch
            </span>
            <p className="text-[#A99889]">
              Receive notes on incoming micro-lots, fermentation profiles, and morning bakehouse drops.
            </p>
            {subscribed ? (
              <p className="text-[#64B579] font-medium pt-1">
                Thank you for subscribing to The Common Room dispatch.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#2E2219] border border-[#443325] text-white placeholder-[#7C6C5E] focus:outline-none focus:border-[#C48C6A]"
                />
                <button
                  type="submit"
                  className="w-full py-2 text-xs font-semibold rounded-lg bg-[#C48C6A] hover:bg-[#B37957] text-[#1F1711] transition-colors"
                >
                  Join Dispatch
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quiet Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#877668]">
          <p>© {new Date().getFullYear()} The Common Room Coffee Roasters. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Specialty Coffee Association Certified</span>
            <span>Zero Synthetic Additives</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
