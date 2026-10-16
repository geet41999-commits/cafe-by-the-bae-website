import React, { useState } from 'react';
import { CartItem, OrderType, OrderDetails } from '../types/cafe';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, Utensils, ShoppingBag, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  onCheckoutSuccess: (order: OrderDetails) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckoutSuccess,
}) => {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<OrderType>('dine_in');
  const [tableNumber, setTableNumber] = useState('Table 04 (Arch Window)');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [tipRate, setTipRate] = useState<number>(0.18); // 18% default

  const subtotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
  const discount = (subtotal * discountPercent) / 100;
  const taxableSubtotal = subtotal - discount;
  const tip = taxableSubtotal * tipRate;
  const grandTotal = Math.max(0, taxableSubtotal + tip);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'COMMON10' || code === 'WELCOME') {
      setDiscountPercent(10);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid voucher code. Try "COMMON10" for 10% off.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const order: OrderDetails = {
      orderId: `CR-${Math.floor(1000 + Math.random() * 9000)}`,
      orderType,
      tableNumber: orderType === 'dine_in' ? tableNumber : undefined,
      customerName: customerName || 'Cafe Guest',
      customerPhone: customerPhone || '(555) 019-2834',
      customerEmail: 'guest@commonroom.cafe',
      items,
      subtotal,
      discount,
      tip,
      total: grandTotal,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes: orderType === 'shipping' ? 48 : 8,
    };

    onCheckoutSuccess(order);
    onClearCart();
    onClose();
  };

  const tables = [
    'Table 01 (Arch Window Stalls)',
    'Table 02 (Arch Window Stalls)',
    'Table 04 (Arch Window Stalls)',
    'Table 07 (Communal Oak Bar)',
    'Table 08 (Communal Oak Bar)',
    'Table 11 (Barista Counter)',
    'Table 14 (Terracotta Terrace)',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-2xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl border-l border-[#E5DAC6] flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 bg-white border-b border-[#E8DFC9] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#8D5338]" />
              <h3 className="font-serif-display text-xl font-semibold text-[#221710]">
                Your Order Bag
              </h3>
              <span className="font-mono text-xs text-[#8C7A6D] tabular-nums">
                ({items.length} {items.length === 1 ? 'item' : 'items'})
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close bag"
              className="p-1.5 rounded-full hover:bg-[#F2ECE0] text-[#635041] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Fulfillment Toggle */}
          <div className="p-4 bg-[#F7F2E8] border-b border-[#E8DFC9] shrink-0">
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-white rounded-xl border border-[#E0D4C2]">
              <button
                type="button"
                onClick={() => setOrderType('dine_in')}
                className={`py-2 text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  orderType === 'dine_in'
                    ? 'bg-[#261C14] text-white shadow-2xs'
                    : 'text-[#645244] hover:text-[#261C14]'
                }`}
              >
                <Utensils className="w-3 h-3" />
                <span>Dine-In Table</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`py-2 text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  orderType === 'pickup'
                    ? 'bg-[#261C14] text-white shadow-2xs'
                    : 'text-[#645244] hover:text-[#261C14]'
                }`}
              >
                <ShoppingBag className="w-3 h-3" />
                <span>Quick Pickup</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('shipping')}
                className={`py-2 text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  orderType === 'shipping'
                    ? 'bg-[#261C14] text-white shadow-2xs'
                    : 'text-[#645244] hover:text-[#261C14]'
                }`}
              >
                <Truck className="w-3 h-3" />
                <span>Bean Post</span>
              </button>
            </div>

            {/* Contextual input for order type */}
            {orderType === 'dine_in' && (
              <div className="mt-3">
                <label className="block text-[10px] uppercase font-semibold text-[#7D6B5D] mb-1">
                  Select Your Table in the Cafe
                </label>
                <select
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DAC9B3] bg-white text-[#261C14] focus:outline-none focus:border-[#8D5338]"
                >
                  {tables.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="p-4 overflow-y-auto flex-1 space-y-3">
            {items.length === 0 ? (
              <div className="py-16 text-center text-xs text-[#806D5E]">
                <p className="font-serif-display text-lg text-[#261C14] mb-1">Your bag is empty</p>
                <p>Add a handcrafted espresso, cold brew, or fresh warm croissant from our menu.</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartId}
                  className="p-3 bg-white rounded-xl border border-[#E8DFC9] flex gap-3 shadow-2xs"
                >
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#EAE1D1]"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif-display text-sm font-semibold text-[#221710] truncate">
                          {item.menuItem.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.cartId)}
                          className="text-[#968474] hover:text-[#B2382D] transition-colors p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization Details */}
                      <div className="text-[11px] text-[#7A6759] space-y-0.5 mt-0.5">
                        {!item.menuItem.isBean && !item.menuItem.isBakery && (
                          <p className="truncate">
                            {item.customization.size} · {item.customization.milk}
                          </p>
                        )}
                        {item.customization.syrup !== 'None' && (
                          <p className="truncate">+ {item.customization.syrup}</p>
                        )}
                        {item.customization.extraShot && (
                          <p className="text-[#8D5338]">+ Extra Espresso Shot</p>
                        )}
                        {item.customization.grind && (
                          <p className="text-[#8D5338]">Grind: {item.customization.grind}</p>
                        )}
                        {item.customization.specialInstructions && (
                          <p className="italic text-[#928174]">"{item.customization.specialInstructions}"</p>
                        )}
                      </div>
                    </div>

                    {/* Quantity & Total */}
                    <div className="flex items-center justify-between pt-2 mt-1 border-t border-[#F2ECE0]">
                      <div className="flex items-center gap-2 bg-[#F6F2E9] rounded-md px-1.5 py-0.5 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, -1)}
                          className="text-[#685548] hover:text-[#261C14]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono font-bold text-xs tabular-nums text-[#221710] min-w-3 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, 1)}
                          className="text-[#685548] hover:text-[#261C14]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-xs font-bold text-[#221710] tabular-nums">
                        ${item.itemTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 bg-white border-t border-[#E8DFC9] space-y-3 shrink-0">
              {/* Promo Code Box */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A6D]" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (e.g. COMMON10)"
                    disabled={promoApplied}
                    className="w-full pl-9 pr-2 py-1.5 text-xs rounded-lg border border-[#DECDB8] bg-[#FAF8F3] uppercase focus:outline-none focus:border-[#8D5338]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={promoApplied || !promoCode}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#EAE2D3] hover:bg-[#DDD3C0] text-[#261C14] disabled:opacity-40"
                >
                  {promoApplied ? 'Applied' : 'Apply'}
                </button>
              </form>
              {promoError && <p className="text-[10px] text-[#B2382D]">{promoError}</p>}
              {promoApplied && <p className="text-[10px] text-[#2F7343] font-medium">10% discount applied!</p>}

              {/* Tip Selection */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[#7A6759]">Barista Tip</span>
                <div className="flex gap-1.5">
                  {[0, 0.15, 0.18, 0.20].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setTipRate(rate)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium ${
                        tipRate === rate
                          ? 'bg-[#8D5338] text-white'
                          : 'bg-[#F4EFE6] text-[#635041] hover:bg-[#EAE2D3]'
                      }`}
                    >
                      {rate === 0 ? 'None' : `${Math.round(rate * 100)}%`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subtotal Breakdown */}
              <div className="space-y-1 text-xs text-[#685548] pt-2 border-t border-[#F2ECE0]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#2F7343]">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-mono tabular-nums">-${discount.toFixed(2)}</span>
                  </div>
                )}
                {tip > 0 && (
                  <div className="flex justify-between">
                    <span>Tip</span>
                    <span className="font-mono tabular-nums">${tip.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-serif-display text-base font-semibold text-[#221710] pt-1 border-t border-[#F0E6D5]">
                  <span>Total</span>
                  <span className="font-mono text-lg font-bold text-[#8D5338] tabular-nums">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Customer Contact */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Your Name (e.g. Liam)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded-lg border border-[#DECDB8] bg-[#FAF8F3] focus:outline-none focus:border-[#8D5338]"
                />
                <input
                  type="tel"
                  placeholder="Phone for SMS receipt"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded-lg border border-[#DECDB8] bg-[#FAF8F3] focus:outline-none focus:border-[#8D5338]"
                />
              </div>

              {/* Place Order Button */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full py-3 text-xs font-semibold text-white bg-[#261C14] hover:bg-[#3D2C20] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>
                  {orderType === 'dine_in'
                    ? `Send to ${tableNumber.split(' ')[0]} ${tableNumber.split(' ')[1]}`
                    : orderType === 'pickup'
                    ? 'Place Counter Pickup Order'
                    : 'Place Bean Roastery Order'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
