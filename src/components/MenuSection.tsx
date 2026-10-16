import React, { useState } from 'react';
import { MenuItem, CategoryId } from '../types/cafe';
import { MENU_ITEMS } from '../data/menuData';
import { Search, Sparkles, SlidersHorizontal, Plus } from 'lucide-react';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  activeFilter?: string;
  onFilterChange?: (cat: CategoryId) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItem,
  activeFilter = 'all',
  onFilterChange,
}) => {
  const [currentCategory, setCurrentCategory] = useState<CategoryId>(activeFilter as CategoryId);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'popular' | 'dairy-friendly'>('all');

  const handleCategorySelect = (cat: CategoryId) => {
    setCurrentCategory(cat);
    if (onFilterChange) onFilterChange(cat);
  };

  const categories: { id: CategoryId; label: string }[] = [
    { id: 'all', label: 'All Offerings' },
    { id: 'espresso', label: 'Espresso & Milk' },
    { id: 'iced', label: 'Iced & Cold Brew' },
    { id: 'filter', label: 'Filter & Pour-Over' },
    { id: 'bakery', label: 'Bakehouse & Sweets' },
    { id: 'beans', label: 'Whole Bean Bags' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCat = currentCategory === 'all' || item.category === currentCategory;
    const matchesQuery =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tastingNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDietary =
      dietaryFilter === 'all' ||
      (dietaryFilter === 'popular' && item.isPopular) ||
      (dietaryFilter === 'dairy-friendly' && !item.isBakery);

    return matchesCat && matchesQuery && matchesDietary;
  });

  return (
    <section id="menu" className="py-16 md:py-24 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8D5338] mb-2">
              <span>Artisan Catalog</span>
              <span aria-hidden="true">·</span>
              <span>Roasted & Baked In-House</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-medium text-[#221710] tracking-tight [text-wrap:balance]">
              The Daily Menu & Seasonal Roasts
            </h2>
          </div>
          <p className="text-sm text-[#6C594C] max-w-md leading-relaxed">
            Every shot pulled on our custom copper machine; every batch of viennoiserie rolled with churned French butter.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E8DFC9]">
          {/* Functional Category Segmented Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F4EFE6] rounded-xl overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  currentCategory === cat.id
                    ? 'bg-[#261C14] text-white shadow-xs'
                    : 'text-[#655345] hover:text-[#261C14] hover:bg-white/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Dietary Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A6D]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roasts, notes, bakes..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#DECDB8] bg-white focus:outline-none focus:border-[#8D5338] text-[#261C14]"
              />
            </div>

            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-2.5 py-1.5 rounded-md border text-xs font-medium transition-colors ${
                  dietaryFilter === 'all'
                    ? 'bg-[#EAE2D3] border-[#8D5338] text-[#261C14]'
                    : 'bg-white border-[#E2D6C5] text-[#6E5C4E] hover:border-[#8D5338]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietaryFilter('popular')}
                className={`px-2.5 py-1.5 rounded-md border text-xs font-medium transition-colors ${
                  dietaryFilter === 'popular'
                    ? 'bg-[#EAE2D3] border-[#8D5338] text-[#261C14]'
                    : 'bg-white border-[#E2D6C5] text-[#6E5C4E] hover:border-[#8D5338]'
                }`}
              >
                House Signatures
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards Grid: 3-column desktop */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-sm text-[#7F6B5C]">
            <p className="font-serif-display text-xl text-[#261C14] mb-2">No coffee or pastry match found</p>
            <p>Try searching for a different roast note or switch to "All Offerings".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setCurrentCategory('all');
                setDietaryFilter('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#261C14] rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl bg-white border border-[#E6DAC7] overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F2EDE3]">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  {/* Quiet Editorial Ribbon */}
                  {item.isPopular && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#261C14]/90 text-[10px] font-semibold uppercase tracking-wider text-[#F7F2E9] rounded-md backdrop-blur-xs">
                      Signature Pick
                    </span>
                  )}
                  {item.isSeasonal && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#8D5338]/90 text-[10px] font-semibold uppercase tracking-wider text-white rounded-md backdrop-blur-xs">
                      Seasonal Reserve
                    </span>
                  )}
                  {item.bakeSchedule && (
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-white/90 text-[10px] font-medium text-[#4B392E] rounded-md backdrop-blur-xs">
                      {item.bakeSchedule}
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Origin or Category */}
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8D5338] mb-1">
                      {item.origin || (item.isBakery ? 'Bakehouse Patisserie' : 'Specialty Beverage')}
                    </div>

                    <h3 className="font-serif-display text-lg font-semibold text-[#221710] mb-2 leading-snug group-hover:text-[#8D5338] transition-colors">
                      {item.name}
                    </h3>

                    <p className="text-xs text-[#635143] leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Clean unboxed tasting notes with typographic separators */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#7A6759] mb-4">
                      {item.tastingNotes.map((note, index) => (
                        <React.Fragment key={note}>
                          <span>{note}</span>
                          {index < item.tastingNotes.length - 1 && (
                            <span className="text-[#C4B7AA]" aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Card Purchase Footer */}
                  <div className="pt-3 border-t border-[#F1E8DC] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8A786B] block">Price</span>
                      <span className="font-mono tabular-nums text-base font-bold text-[#221710]">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectItem(item)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#221710] bg-[#F4EFE6] hover:bg-[#261C14] hover:text-white rounded-lg transition-colors shadow-2xs whitespace-nowrap"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Customize & Order</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
