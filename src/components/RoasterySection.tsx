import React from 'react';
import { MenuItem } from '../types/cafe';
import { MENU_ITEMS, ASSET_IMAGES } from '../data/menuData';
import { Flame, Package, Plus, ShieldCheck } from 'lucide-react';

interface RoasterySectionProps {
  onSelectItem: (item: MenuItem) => void;
}

export const RoasterySection: React.FC<RoasterySectionProps> = ({ onSelectItem }) => {
  const beanItems = MENU_ITEMS.filter((item) => item.category === 'beans');

  return (
    <section id="roastery" className="py-16 md:py-24 bg-[#FDFBF7] border-t border-[#E8DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8D5338] mb-2">
              <span>Small-Batch Roastery</span>
              <span aria-hidden="true">·</span>
              <span>Direct Farm Relationships</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-medium text-[#221710] tracking-tight [text-wrap:balance]">
              Take The Common Room Home
            </h2>
          </div>
          <p className="text-sm text-[#6C594C] max-w-md leading-relaxed">
            Whole beans roasted weekly on our 12kg Diedrich roaster. Shipped within 48 hours of degassing or ground fresh at our counter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {beanItems.map((bean) => (
            <div
              key={bean.id}
              className="rounded-2xl border border-[#E6DAC7] bg-white p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#8D5338] block mb-1">
                      {bean.origin}
                    </span>
                    <h3 className="font-serif-display text-2xl font-semibold text-[#221710] group-hover:text-[#8D5338] transition-colors">
                      {bean.name}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-mono font-semibold bg-[#F5EFE4] text-[#635041] rounded-md border border-[#E2D5C3]">
                    {bean.roastLevel} Roast
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#635143] leading-relaxed mb-6">
                  {bean.description}
                </p>

                {/* Tasting profile pill-free list */}
                <div className="p-4 bg-[#FAF8F3] rounded-xl border border-[#EDE2D1] mb-6 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-[#8C7A6D] tracking-wider block">
                    Cup Profile & Nuances
                  </span>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#261C14] font-medium">
                    {bean.tastingNotes.map((note, idx) => (
                      <React.Fragment key={note}>
                        <span>{note}</span>
                        {idx < bean.tastingNotes.length - 1 && <span className="text-[#C4B7AA]">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F2ECE0] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C7A6D] block">250g Valve Bag</span>
                  <span className="font-mono text-lg font-bold text-[#221710] tabular-nums">
                    ${bean.price.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => onSelectItem(bean)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#261C14] hover:bg-[#3D2C20] rounded-lg transition-colors shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Select Grind & Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
