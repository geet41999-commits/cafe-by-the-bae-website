import React, { useState } from 'react';
import { MenuItem, CustomizationState, SizeOption, MilkOption, SyrupOption, GrindOption } from '../types/cafe';
import { X, Plus, Minus, Check, Coffee } from 'lucide-react';

interface DrinkConfigModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, customization: CustomizationState, quantity: number) => void;
}

export const DrinkConfigModal: React.FC<DrinkConfigModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const isBean = item.isBean;
  const isBakery = item.isBakery;

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<SizeOption>('Regular (12oz)');
  const [milk, setMilk] = useState<MilkOption>('Oat Milk (Minor Figures)');
  const [syrup, setSyrup] = useState<SyrupOption>('None');
  const [extraShot, setExtraShot] = useState(false);
  const [iceLevel, setIceLevel] = useState<'Regular Ice' | 'Light Ice' | 'Extra Ice' | 'Hot'>(
    item.category === 'iced' ? 'Regular Ice' : 'Hot'
  );
  const [grind, setGrind] = useState<GrindOption>('Whole Bean');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Calculate price adjustments
  let unitPrice = item.price;
  if (size === 'Large (16oz)') unitPrice += 0.75;
  if (size === 'Small (8oz)') unitPrice -= 0.50;
  if (milk === 'Oat Milk (Minor Figures)' || milk === 'Sprouted Almond Milk' || milk === 'Pistachio Silk') {
    if (!isBakery && !isBean) unitPrice += 0.60;
  }
  if (syrup !== 'None') unitPrice += 0.75;
  if (extraShot) unitPrice += 1.00;

  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    onAddToCart(
      item,
      {
        size,
        milk,
        syrup,
        extraShot,
        iceLevel,
        grind: isBean ? grind : undefined,
        specialInstructions,
      },
      quantity
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col border border-[#DECDB8]">
        {/* Modal Header */}
        <div className="relative h-48 sm:h-56 bg-[#F4EFE6] overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#261C14] transition-colors shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#F0DFCE]">
              {item.origin || (isBakery ? 'Fresh Daily Bake' : 'Artisanal Roastery')}
            </span>
            <h3 className="font-serif-display text-2xl font-semibold leading-tight">
              {item.name}
            </h3>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#38281D]">
          <p className="text-[#645041] leading-relaxed">
            {item.description}
          </p>

          {/* Tasting notes */}
          {item.tastingNotes && item.tastingNotes.length > 0 && (
            <div className="p-3 bg-[#FAF8F3] rounded-lg border border-[#EDE4D5]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8D5338] block mb-1">
                Tasting Notes
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#4F3C30]">
                {item.tastingNotes.map((note, i) => (
                  <React.Fragment key={note}>
                    <span>{note}</span>
                    {i < item.tastingNotes.length - 1 && <span className="text-[#BCAEA0]">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Configuration if Coffee / Beverage */}
          {!isBean && !isBakery && (
            <>
              {/* Size Option */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#735F50] mb-2">
                  Cup Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Small (8oz)', 'Regular (12oz)', 'Large (16oz)'] as SizeOption[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center ${
                        size === s
                          ? 'border-[#8D5338] bg-[#F7F2E9] text-[#261C14] font-semibold'
                          : 'border-[#E2D6C5] bg-white text-[#635043] hover:border-[#B5A490]'
                      }`}
                    >
                      <div>{s}</div>
                      <div className="text-[10px] text-[#8C7A6D]">
                        {s.includes('Large') ? '+$0.75' : s.includes('Small') ? '-$0.50' : 'Standard'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk Option */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#735F50] mb-2">
                  Choice of Milk
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(
                    [
                      'Whole Farmhouse',
                      'Oat Milk (Minor Figures)',
                      'Sprouted Almond Milk',
                      'Pistachio Silk',
                      'None (Black)',
                    ] as MilkOption[]
                  ).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMilk(m)}
                      className={`flex items-center justify-between p-2.5 text-xs font-medium rounded-lg border transition-all ${
                        milk === m
                          ? 'border-[#8D5338] bg-[#F7F2E9] text-[#261C14]'
                          : 'border-[#E2D6C5] bg-white text-[#635043] hover:border-[#B5A490]'
                      }`}
                    >
                      <span>{m}</span>
                      <span className="text-[10px] text-[#8C7A6D]">
                        {m.includes('Oat') || m.includes('Almond') || m.includes('Pistachio') ? '+$0.60' : 'Included'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Temperature / Ice */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#735F50] mb-2">
                  Temperature & Ice
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Regular Ice', 'Light Ice', 'Extra Ice', 'Hot'] as const).map((temp) => (
                    <button
                      key={temp}
                      onClick={() => setIceLevel(temp)}
                      className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all ${
                        iceLevel === temp
                          ? 'border-[#8D5338] bg-[#F7F2E9] text-[#261C14] font-semibold'
                          : 'border-[#E2D6C5] bg-white text-[#635043] hover:border-[#B5A490]'
                      }`}
                    >
                      {temp}
                    </button>
                  ))}
                </div>
              </div>

              {/* House Craft Syrup */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#735F50] mb-2">
                  House-Made Craft Syrup
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(
                    [
                      'None',
                      'Madagascar Bourbon Vanilla',
                      'Spiced Cardamom Sugar',
                      'Salted Caramel',
                      'Cascara Reduction',
                    ] as SyrupOption[]
                  ).map((syr) => (
                    <button
                      key={syr}
                      onClick={() => setSyrup(syr)}
                      className={`flex items-center justify-between p-2.5 text-xs font-medium rounded-lg border transition-all ${
                        syrup === syr
                          ? 'border-[#8D5338] bg-[#F7F2E9] text-[#261C14]'
                          : 'border-[#E2D6C5] bg-white text-[#635043] hover:border-[#B5A490]'
                      }`}
                    >
                      <span>{syr}</span>
                      <span className="text-[10px] text-[#8C7A6D]">
                        {syr === 'None' ? 'None' : '+$0.75'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Double Espresso Shot */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-[#E2D6C5] bg-[#FAF8F3]">
                <div>
                  <div className="text-xs font-semibold text-[#261C14]">Extra Single-Origin Espresso Shot</div>
                  <div className="text-[11px] text-[#786658]">Intensify coffee depth and body (+$1.00)</div>
                </div>
                <button
                  onClick={() => setExtraShot(!extraShot)}
                  className={`w-6 h-6 rounded flex items-center justify-center border transition-all ${
                    extraShot
                      ? 'bg-[#8D5338] border-[#8D5338] text-white'
                      : 'border-[#C8B8A6] bg-white text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}

          {/* Configuration if Whole Bean */}
          {isBean && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#735F50] mb-2">
                Grind Preference
              </label>
              <div className="space-y-2">
                {(
                  [
                    'Whole Bean',
                    'Espresso (Fine)',
                    'Pour Over / V60 (Medium)',
                    'French Press / Cold Brew (Coarse)',
                  ] as GrindOption[]
                ).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrind(g)}
                    className={`w-full flex items-center justify-between p-3 text-xs font-medium rounded-lg border transition-all ${
                      grind === g
                        ? 'border-[#8D5338] bg-[#F7F2E9] text-[#261C14]'
                        : 'border-[#E2D6C5] bg-white text-[#635043] hover:border-[#B5A490]'
                    }`}
                  >
                    <span>{g}</span>
                    <span className="text-[11px] text-[#8C7A6D]">
                      {g === 'Whole Bean' ? 'Maximum Freshness' : 'Precision Ground'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#735F50] mb-1">
              Barista or Kitchen Notes
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder={isBakery ? 'e.g. Please warm up the croissant' : 'e.g. Extra hot milk, served in ceramic'}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#DECDB8] bg-[#FDFBF7] focus:outline-none focus:border-[#8D5338] text-[#261C14]"
            />
          </div>
        </div>

        {/* Modal Contiguous Footer */}
        <div className="p-4 sm:p-5 border-t border-[#E8DFC9] bg-[#FAF8F3] flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-3 bg-white border border-[#E0D3C1] rounded-lg px-2.5 py-1.5 shadow-2xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="text-[#645041] hover:text-[#261C14] disabled:opacity-30"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-xs font-bold text-[#261C14] min-w-4 text-center tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-[#645041] hover:text-[#261C14]"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleConfirm}
            className="flex-1 flex items-center justify-between px-5 py-3 text-xs font-semibold text-white bg-[#261C14] hover:bg-[#3D2C20] rounded-lg transition-colors shadow-sm"
          >
            <span>Add to Order Bag</span>
            <span className="font-mono tabular-nums text-sm font-bold text-[#E5BA82]">
              ${totalPrice.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
