import React from 'react';
import { ArrowRight, Clock, MapPin, Coffee, UtensilsCrossed } from 'lucide-react';
import { ASSET_IMAGES } from '../data/menuData';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onReserveTable: () => void;
  onOpenQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onReserveTable,
  onOpenQuiz,
}) => {
  return (
    <section id="hero" className="relative pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Hero: Typography & Story Left, Architectural Visual Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Editorial & Intent */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              {/* Unboxed kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8D5338] mb-4">
                <span>The Common Room</span>
                <span aria-hidden="true">·</span>
                <span>Specialty Roastery & Bakehouse</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#3A754E]">Open Today</span>
              </div>

              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#221710] leading-[1.12] mb-6 [text-wrap:balance]">
                A sunlit haven for coffee purists and deliberate mornings.
              </h1>

              <p className="text-base sm:text-lg text-[#5D4A3D] leading-relaxed mb-8 max-w-xl">
                Nestled beneath historic brick arches, we curate micro-lot single origins, pour silky latte art with dialed-in espresso, and pull warm twice-baked pastries fresh from the morning oven.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mb-10">
                <button
                  onClick={onExploreMenu}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#261C14] hover:bg-[#3D2C20] rounded-lg transition-all shadow-sm hover:translate-y-[-1px]"
                >
                  <span>Order Table or Pickup</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onReserveTable}
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#261C14] bg-[#F1ECE1] hover:bg-[#E6DEC9] rounded-lg transition-all"
                >
                  <span>Reserve a Table</span>
                </button>
                <button
                  onClick={onOpenQuiz}
                  className="inline-flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium text-[#7A4B31] hover:text-[#261C14] hover:underline underline-offset-4 transition-colors"
                >
                  <span>Find Your Daily Cup</span>
                </button>
              </div>
            </div>

            {/* Quick Informational Strip */}
            <div className="pt-6 border-t border-[#E8DFC9] flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-[#6F5B4E]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#8D5338] shrink-0" />
                <span>Mon–Fri: 07:00 – 18:00 · Weekends: 08:00 – 17:00</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8D5338] shrink-0" />
                <span>42 St. Jude Archway · Mill District</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual from Image 2 ("The Common Room" interior) */}
          <div className="lg:col-span-6 relative flex flex-col">
            <div className="relative w-full h-[380px] sm:h-[480px] lg:h-full rounded-2xl overflow-hidden border border-[#E5DAC6] shadow-md group">
              <img
                src={ASSET_IMAGES.interior}
                alt="Sunlit Scandinavian artisanal cafe interior of The Common Room with exposed brick arches and wooden tables"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />
              {/* Subtle scrim for bottom badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-[#F1DFCE]">
                    Architectural Interior
                  </p>
                  <p className="font-serif-display text-xl font-medium">
                    The Archway Hall & Communal Oak Bar
                  </p>
                </div>
                <div className="hidden sm:block text-right text-xs text-[#E9DACB]">
                  <span>14 Tables · High-speed Wi-Fi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Adjacency Row */}
        <div className="mt-12 pt-8 border-t border-[#E8DFC9] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#8D5338]">
              <Coffee className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#8C7662]">Direct Trade</span>
            </div>
            <p className="font-serif-display text-lg font-semibold text-[#221710]">Single Origin Lots</p>
            <p className="text-xs text-[#705F52]">Sourced directly from micro-farmers in Ethiopia, Colombia & Guatemala.</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#8D5338]">
              <UtensilsCrossed className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#8C7662]">Slow Bakehouse</span>
            </div>
            <p className="font-serif-display text-lg font-semibold text-[#221710]">Twice-Baked Pastries</p>
            <p className="text-xs text-[#705F52]">Laminated French butter croissants & layered Italian mascarpone cups.</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#8D5338]">
              <span className="font-mono text-sm font-bold text-[#8D5338]">92°C</span>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#8C7662]">Precision</span>
            </div>
            <p className="font-serif-display text-lg font-semibold text-[#221710]">Barista Lab</p>
            <p className="text-xs text-[#705F52]">Dialed-in extraction profiles with balanced mineral water chemistry.</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#8D5338]">
              <span className="font-mono text-sm font-bold text-[#8D5338]">100%</span>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#8C7662]">Plant & Dairy</span>
            </div>
            <p className="font-serif-display text-lg font-semibold text-[#221710]">Minor Figures & Silk</p>
            <p className="text-xs text-[#705F52]">Steamed oat, sprouted almond, and whole local organic farmhouse milk.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
