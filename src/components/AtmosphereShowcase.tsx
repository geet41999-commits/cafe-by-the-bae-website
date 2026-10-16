import React, { useState } from 'react';
import { ASSET_IMAGES, SEATING_ZONES } from '../data/menuData';
import { Sparkles, Zap, Volume2, Users, Calendar, ArrowUpRight } from 'lucide-react';

interface AtmosphereShowcaseProps {
  onReserveTable: (zoneName?: string) => void;
  onSelectCategory: (categoryId: string) => void;
}

export const AtmosphereShowcase: React.FC<AtmosphereShowcaseProps> = ({
  onReserveTable,
  onSelectCategory,
}) => {
  const [selectedZone, setSelectedZone] = useState(SEATING_ZONES[0]);

  const showcaseScenes = [
    {
      title: 'The Archway Room',
      kicker: 'Ambiance & Space',
      subtitle: 'Sun-drenched Scandinavian oak tables beneath historic brick vaults.',
      image: ASSET_IMAGES.interior,
      alt: 'The Common Room cafe interior with brick arches and wooden tables',
      actionText: 'Explore Seating & Tables',
      onClick: () => {
        const el = document.getElementById('seating-selector');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      title: 'The Barista Pour',
      kicker: 'Precision Craft',
      subtitle: 'Dialed-in espresso, microfoam silky texture, and delicate tulip latte art.',
      image: ASSET_IMAGES.latteArt,
      alt: 'Barista pouring velvety tulip latte art into ceramic cup',
      actionText: 'Browse Espresso & Pour-Overs',
      onClick: () => onSelectCategory('espresso'),
    },
    {
      title: 'The Ribbed Glass Ritual',
      kicker: 'Iced Specialties',
      subtitle: 'Slow cold-dripped brews and marbled dirty oat lattes in fluted glassware.',
      image: ASSET_IMAGES.icedDrinks,
      alt: 'Two iced coffee drinks in ribbed glassware with glass straws',
      actionText: 'Explore Cold & Iced Drinks',
      onClick: () => onSelectCategory('iced'),
    },
    {
      title: 'The Slow Bakehouse',
      kicker: 'Morning Patisserie',
      subtitle: 'Twice-baked almond chocolate croissants and Venetian tiramisu cups.',
      image: ASSET_IMAGES.pastrySpread,
      alt: 'Almond croissant, tiramisu cup, and iced coffee on linen runner',
      actionText: 'View Fresh Bakes & Pastries',
      onClick: () => onSelectCategory('bakery'),
    },
  ];

  return (
    <section id="atmosphere" className="py-16 md:py-24 bg-[#FAF7F0] border-t border-[#E8DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8D5338] mb-2">
              <span>Sensory & Space</span>
              <span aria-hidden="true">·</span>
              <span>Visual Journey</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-medium text-[#221710] tracking-tight [text-wrap:balance]">
              Designed for sensory slowness.
            </h2>
          </div>
          <p className="text-sm text-[#6C594C] max-w-md leading-relaxed">
            Every element—from the warmth of natural terracotta and fluted glassware to the tactile linen tables—is crafted to honor the morning ritual.
          </p>
        </div>

        {/* 4-Card Visual Grid mirroring user photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {showcaseScenes.map((scene, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden border border-[#E4D8C4] bg-white shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F0EBE1]">
                <img
                  src={scene.image}
                  alt={scene.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-xs text-[11px] font-semibold uppercase tracking-wider text-[#35251B] rounded-md shadow-xs">
                  {scene.kicker}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-semibold text-[#221710] mb-2 group-hover:text-[#8D5338] transition-colors">
                    {scene.title}
                  </h3>
                  <p className="text-sm text-[#614E42] leading-relaxed mb-4">
                    {scene.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0E8D9] flex items-center justify-between">
                  <button
                    onClick={scene.onClick}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8D5338] hover:text-[#221710] transition-colors group/btn"
                  >
                    <span>{scene.actionText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                  <span className="text-[11px] text-[#9A8778] font-mono tabular-nums">0{idx + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Seating & Ambiance Guide */}
        <div id="seating-selector" className="rounded-2xl border border-[#E5DAC6] bg-white p-6 sm:p-8 lg:p-10 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8D5338] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cafe Floorplan & Seating Guide</span>
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#221710]">
                Choose your space before you arrive.
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#736052] max-w-sm">
              Whether you need focused quiet with power outlets or sunlit cobblestone views, we have a curated corner waiting for you.
            </p>
          </div>

          {/* Interactive Zone Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 p-1.5 bg-[#F6F2E9] rounded-xl">
            {SEATING_ZONES.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                className={`px-4 py-3 text-xs font-semibold rounded-lg text-left transition-all whitespace-nowrap truncate ${
                  selectedZone.id === zone.id
                    ? 'bg-white text-[#221710] shadow-sm'
                    : 'text-[#6C594C] hover:text-[#221710] hover:bg-white/50'
                }`}
              >
                {zone.name}
              </button>
            ))}
          </div>

          {/* Zone Detail Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F3] rounded-xl p-6 sm:p-8 border border-[#EFE8DA]">
            <div className="lg:col-span-5 h-64 sm:h-72 rounded-lg overflow-hidden border border-[#E2D6C3]">
              <img
                src={selectedZone.image}
                alt={selectedZone.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8D5338] block mb-1">
                  Selected Zone
                </span>
                <h4 className="font-serif-display text-2xl font-semibold text-[#221710] mb-3">
                  {selectedZone.name}
                </h4>
                <p className="text-sm text-[#5D4A3D] leading-relaxed mb-6">
                  {selectedZone.vibe}
                </p>

                {/* Specifics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-[#E8DFC9] text-xs">
                  <div>
                    <div className="flex items-center gap-1.5 text-[#8D5338] font-medium mb-1">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Power & Sockets</span>
                    </div>
                    <span className="text-[#302219] font-medium">{selectedZone.outlets}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-[#8D5338] font-medium mb-1">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Sound Level</span>
                    </div>
                    <span className="text-[#302219] font-medium">{selectedZone.noise}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-[#8D5338] font-medium mb-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>Table Capacity</span>
                    </div>
                    <span className="text-[#302219] font-medium">{selectedZone.capacity}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[#7A6759]">
                  No reservation fee required · Walk-ins also welcome
                </span>
                <button
                  onClick={() => onReserveTable(selectedZone.name)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#261C14] hover:bg-[#3D2C20] rounded-lg transition-colors whitespace-nowrap shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve In This Zone</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
