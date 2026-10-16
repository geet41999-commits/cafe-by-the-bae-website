import React, { useState } from 'react';
import { MenuItem } from '../types/cafe';
import { MENU_ITEMS } from '../data/menuData';
import { X, Sparkles, ArrowRight, RotateCcw, Check } from 'lucide-react';

interface CoffeeQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecommendedItem: (item: MenuItem) => void;
}

export const CoffeeQuizModal: React.FC<CoffeeQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectRecommendedItem,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [craving, setCraving] = useState<string>('silky');
  const [flavor, setFlavor] = useState<string>('chocolate');
  const [milkPref, setMilkPref] = useState<string>('oat');

  const getRecommendedItem = (): MenuItem => {
    if (craving === 'cold') {
      return MENU_ITEMS.find((i) => i.id === 'fluted-iced-latte') || MENU_ITEMS[1];
    }
    if (craving === 'black') {
      return MENU_ITEMS.find((i) => i.id === 'single-origin-v60') || MENU_ITEMS[5];
    }
    if (craving === 'pastry') {
      return MENU_ITEMS.find((i) => i.id === 'chocolate-almond-croissant') || MENU_ITEMS[3];
    }
    // Default to the flagship latte art
    return MENU_ITEMS.find((i) => i.id === 'rosetta-latte') || MENU_ITEMS[0];
  };

  const recommendedItem = getRecommendedItem();

  const handleReset = () => {
    setStep(1);
    setCraving('silky');
    setFlavor('chocolate');
    setMilkPref('oat');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-[#DECDB8] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[#FAF7F0] border-b border-[#E8DFC9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8D5338]" />
            <h3 className="font-serif-display text-xl font-semibold text-[#221710]">
              Coffee Matchmaker
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close matchmaker"
            className="p-1.5 rounded-full hover:bg-[#EAE2D3] text-[#635041] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {step <= 3 && (
            <div className="flex items-center justify-between text-xs text-[#8C7A6D] mb-2 font-mono">
              <span>Question 0{step} of 03</span>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((s) => (
                  <span
                    key={s}
                    className={`h-1.5 w-6 rounded-full transition-all ${
                      s === step ? 'bg-[#8D5338]' : s < step ? 'bg-[#261C14]' : 'bg-[#E5DAC6]'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Question 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-serif-display text-lg font-medium text-[#221710]">
                What is your coffee craving right now?
              </h4>
              <div className="space-y-2">
                {[
                  { id: 'silky', label: 'Silky, warm & comforting with microfoam latte art' },
                  { id: 'cold', label: 'Crisp, refreshing & chilled over ice in ribbed glass' },
                  { id: 'black', label: 'Pure, nuanced & floral hand pour-over (V60)' },
                  { id: 'pastry', label: 'Artisanal morning pastry & espresso pairing' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setCraving(opt.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all ${
                      craving === opt.id
                        ? 'border-[#8D5338] bg-[#F7F2E9] text-[#221710] shadow-xs'
                        : 'border-[#E2D6C5] bg-white text-[#5F4D40] hover:border-[#B5A490]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="font-serif-display text-lg font-medium text-[#221710]">
                Which flavor direction speaks to your palate?
              </h4>
              <div className="space-y-2">
                {[
                  { id: 'chocolate', label: 'Toasted hazelnuts, velvety praline & dark chocolate' },
                  { id: 'floral', label: 'Delicate jasmine blossoms, white peach & bergamot' },
                  { id: 'caramel', label: 'Rich Italian espresso, brown sugar & vanilla cream' },
                  { id: 'citrus', label: 'Effervescent tonic, cascara fruit & sparkling citrus' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFlavor(opt.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all ${
                      flavor === opt.id
                        ? 'border-[#8D5338] bg-[#F7F2E9] text-[#221710] shadow-xs'
                        : 'border-[#E2D6C5] bg-white text-[#5F4D40] hover:border-[#B5A490]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="font-serif-display text-lg font-medium text-[#221710]">
                How do you prefer your milk or temperature?
              </h4>
              <div className="space-y-2">
                {[
                  { id: 'oat', label: 'Minor Figures Barista Oat Milk (Silky & Nutty)' },
                  { id: 'farmhouse', label: 'Organic Local Farmhouse Whole Milk' },
                  { id: 'black', label: 'Pure black extraction with mineral-balanced water' },
                  { id: 'cream', label: 'Poured over cold sweet cream or cascara tonic' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setMilkPref(opt.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all ${
                      milkPref === opt.id
                        ? 'border-[#8D5338] bg-[#F7F2E9] text-[#221710] shadow-xs'
                        : 'border-[#E2D6C5] bg-white text-[#5F4D40] hover:border-[#B5A490]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result View */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8D5338] block mb-1">
                  Your Ideal Match
                </span>
                <h4 className="font-serif-display text-2xl font-semibold text-[#221710]">
                  {recommendedItem.name}
                </h4>
              </div>

              {/* Recommended Product Card */}
              <div className="rounded-xl border border-[#E2D6C5] bg-[#FAF8F3] overflow-hidden">
                <div className="aspect-[16/9] w-full bg-[#EAE2D3] overflow-hidden">
                  <img
                    src={recommendedItem.image}
                    alt={recommendedItem.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-2 text-xs">
                  <p className="text-[#5D4A3D] leading-relaxed">
                    {recommendedItem.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#8D5338] font-medium pt-1">
                    {recommendedItem.tastingNotes.map((n, i) => (
                      <React.Fragment key={n}>
                        <span>{n}</span>
                        {i < recommendedItem.tastingNotes.length - 1 && <span>·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="font-mono text-base font-bold text-[#221710] pt-2">
                    ${recommendedItem.price.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#FAF7F0] border-t border-[#E8DFC9] flex items-center justify-between gap-3">
          {step > 1 && step <= 3 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-medium text-[#685548] hover:text-[#221710]"
            >
              Back
            </button>
          )}

          {step === 4 && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#685548] hover:text-[#221710]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          )}

          <div className="ml-auto">
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-[#261C14] hover:bg-[#3D2C20] rounded-lg transition-colors"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : step === 3 ? (
              <button
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-[#8D5338] hover:bg-[#72412B] rounded-lg transition-colors"
              >
                <span>Reveal My Match</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  onSelectRecommendedItem(recommendedItem);
                  onClose();
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#261C14] hover:bg-[#3D2C20] rounded-lg transition-colors shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Customize & Order</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
