import React from 'react';
import { MenuItem } from '../types/cafe';
import { MENU_ITEMS, ASSET_IMAGES } from '../data/menuData';
import { Clock, Utensils, Sparkles, Plus } from 'lucide-react';

interface BakerySectionProps {
  onSelectItem: (item: MenuItem) => void;
}

export const BakerySection: React.FC<BakerySectionProps> = ({ onSelectItem }) => {
  const bakeryItems = MENU_ITEMS.filter((item) => item.category === 'bakery');

  return (
    <section id="bakery" className="py-16 md:py-24 bg-[#FAF7F0] border-t border-[#E8DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column: Image Feature from Image 4 */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E6DAC7] shadow-md group">
              <img
                src={ASSET_IMAGES.pastrySpread}
                alt="Almond croissant, Italian tiramisu, and iced coffee on linen tablecloth"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#F0DFCE]">
                  Artisanal Viennoiserie
                </span>
                <p className="font-serif-display text-xl font-medium">
                  Rolled with fermented Normandy butter & 72% dark cocoa
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Oven Schedule */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8D5338] mb-2">
                <span>The Bakehouse</span>
                <span aria-hidden="true">·</span>
                <span>Slow Fermentation</span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-medium text-[#221710] tracking-tight [text-wrap:balance]">
                Pastries that honor the morning.
              </h2>
            </div>

            <p className="text-sm text-[#625042] leading-relaxed">
              Our bakehouse team begins laminating croissant dough at 3:30 AM each morning. Every pastry undergoes a 48-hour cold fermentation to build delicate, flaky honeycombed crumb and caramelized crusts.
            </p>

            {/* Daily Oven Schedule Strip */}
            <div className="p-5 bg-white rounded-xl border border-[#E8DFC9] space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#221710]">
                <Clock className="w-4 h-4 text-[#8D5338]" />
                <span>Daily Bake Schedule</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between pb-1.5 border-b border-[#F4EFE6]">
                  <span className="font-medium text-[#261C14]">07:30 AM · First Morning Pull</span>
                  <span className="text-[#8D5338] font-mono">Almond Croissants & Cardamom Knots</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-[#F4EFE6]">
                  <span className="font-medium text-[#261C14]">11:30 AM · Midday Warm Batch</span>
                  <span className="text-[#8D5338] font-mono">Pain au Chocolat & Sourdough Tartines</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#261C14]">01:00 PM · Afternoon Dolce</span>
                  <span className="text-[#8D5338] font-mono">Tiramisu Coppa al Caffè</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bakery Items Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bakeryItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-white border border-[#E6DAC7] overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#F2EDE3]">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8D5338] mb-1">
                    {item.bakeSchedule || 'Baked Fresh Daily'}
                  </div>
                  <h3 className="font-serif-display text-lg font-semibold text-[#221710] mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#635143] leading-relaxed mb-4">
                    {item.description}
                  </p>
                  {item.allergens && (
                    <div className="text-[11px] text-[#8C7A6D] mb-4">
                      <span>Contains: {item.allergens.join(', ')}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#F2ECE0] flex items-center justify-between">
                  <span className="font-mono text-base font-bold text-[#221710] tabular-nums">
                    ${item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onSelectItem(item)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#221710] bg-[#F4EFE6] hover:bg-[#261C14] hover:text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Order Warm</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
