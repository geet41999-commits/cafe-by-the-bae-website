import React from 'react';
import { ShoppingBag, Calendar, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenQuiz: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenQuiz,
  activeSection,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E8DEC8]/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('hero')}
            className="text-left group focus:outline-none"
          >
            <span className="font-serif-display text-2xl font-bold tracking-tight text-[#221710] group-hover:text-[#8D5338] transition-colors">
              The Common Room
            </span>
            <span className="block text-[11px] uppercase tracking-[0.2em] text-[#8C7662] -mt-1 font-medium">
              Coffee Roasters & Bakehouse
            </span>
          </button>
        </div>

        {/* Zone 2: Single-line clean text navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#5E4D40]">
          <button
            onClick={() => onNavigate('atmosphere')}
            className={`whitespace-nowrap transition-colors hover:text-[#221710] ${
              activeSection === 'atmosphere' ? 'text-[#221710] font-semibold underline underline-offset-8 decoration-[#8D5338]' : ''
            }`}
          >
            The Space
          </button>
          <button
            onClick={() => onNavigate('menu')}
            className={`whitespace-nowrap transition-colors hover:text-[#221710] ${
              activeSection === 'menu' ? 'text-[#221710] font-semibold underline underline-offset-8 decoration-[#8D5338]' : ''
            }`}
          >
            Menu & Drinks
          </button>
          <button
            onClick={() => onNavigate('bakery')}
            className={`whitespace-nowrap transition-colors hover:text-[#221710] ${
              activeSection === 'bakery' ? 'text-[#221710] font-semibold underline underline-offset-8 decoration-[#8D5338]' : ''
            }`}
          >
            Bakehouse
          </button>
          <button
            onClick={() => onNavigate('roastery')}
            className={`whitespace-nowrap transition-colors hover:text-[#221710] ${
              activeSection === 'roastery' ? 'text-[#221710] font-semibold underline underline-offset-8 decoration-[#8D5338]' : ''
            }`}
          >
            Beans & Shop
          </button>
          <button
            onClick={() => onNavigate('brew-lab')}
            className={`whitespace-nowrap transition-colors hover:text-[#221710] ${
              activeSection === 'brew-lab' ? 'text-[#221710] font-semibold underline underline-offset-8 decoration-[#8D5338]' : ''
            }`}
          >
            Brew Lab
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenQuiz}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#6B5038] hover:text-[#221710] bg-[#F1ECE1] hover:bg-[#E8DFC9] rounded-lg transition-colors whitespace-nowrap"
            title="Take the Coffee Matchmaker quiz"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8D5338]" />
            <span>Coffee Finder</span>
          </button>

          <button
            onClick={onOpenReservation}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#221710] border border-[#DDD2BE] hover:border-[#8D5338] bg-white rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5 text-[#8D5338]" />
            <span>Reserve Table</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="relative inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#261C14] hover:bg-[#3D2C20] rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden md:inline">Order Bag</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-bold text-[#261C14] bg-[#E5BA82] rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
