import React, { useState, useEffect } from 'react';
import { OrderDetails } from '../types/cafe';
import { X, CheckCircle, Coffee, Clock, Sparkles } from 'lucide-react';

interface CheckoutSuccessModalProps {
  order: OrderDetails | null;
  onClose: () => void;
}

export const CheckoutSuccessModal: React.FC<CheckoutSuccessModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  const [prepProgress, setPrepProgress] = useState(35); // Initial progress

  useEffect(() => {
    const timer = setInterval(() => {
      setPrepProgress((prev) => {
        if (prev < 90) return prev + 10;
        return prev;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const stages = [
    { label: 'Received', done: prepProgress >= 20 },
    { label: 'Grinding & Steaming', done: prepProgress >= 50 },
    { label: 'Pouring & Plating', done: prepProgress >= 75 },
    { label: 'Ready at Table / Counter', done: prepProgress >= 100 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-[#DECDB8] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[#FAF7F0] border-b border-[#E8DFC9] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#3A754E] mb-1">
              <CheckCircle className="w-4 h-4" />
              <span>Order Received · Kitchen Notified</span>
            </div>
            <h3 className="font-serif-display text-2xl font-semibold text-[#221710]">
              Baristas are on it!
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-full hover:bg-[#EAE2D3] text-[#635041] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Order Tag & Meta */}
          <div className="flex items-center justify-between pb-4 border-b border-[#EDE2D1]">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#8C7A6D] tracking-wider block">
                Order Reference
              </span>
              <span className="font-mono text-xl font-bold text-[#8D5338] tracking-tight">
                #{order.orderId}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-[#8C7A6D] tracking-wider block">
                Fulfillment
              </span>
              <span className="text-xs font-semibold text-[#221710]">
                {order.orderType === 'dine_in'
                  ? order.tableNumber
                  : order.orderType === 'pickup'
                  ? 'Counter Pickup (8 min)'
                  : 'Roastery Postal Dispatch'}
              </span>
            </div>
          </div>

          {/* Prep Progress Tracker */}
          <div className="p-4 bg-[#FAF7F0] rounded-xl border border-[#EDE2D1] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-[#221710]">
                <Coffee className="w-4 h-4 text-[#8D5338] animate-bounce" />
                <span>Brewing in Progress</span>
              </div>
              <div className="flex items-center gap-1 text-[#645244] font-mono">
                <Clock className="w-3.5 h-3.5 text-[#8D5338]" />
                <span>~{order.estimatedMinutes} mins est.</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#E8DFC9] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#8D5338] h-full transition-all duration-700 rounded-full"
                style={{ width: `${prepProgress}%` }}
              />
            </div>

            {/* Stages Row */}
            <div className="grid grid-cols-4 gap-1 text-[10px] text-center pt-1 font-medium">
              {stages.map((stg) => (
                <div
                  key={stg.label}
                  className={`${stg.done ? 'text-[#8D5338] font-bold' : 'text-[#A08E80]'}`}
                >
                  {stg.label}
                </div>
              ))}
            </div>
          </div>

          {/* Itemized Receipt */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#735F50] block">
              Ordered Items
            </span>
            <div className="space-y-2 text-xs">
              {order.items.map((item) => (
                <div
                  key={item.cartId}
                  className="flex items-start justify-between py-2 border-b border-[#F4EFE6]"
                >
                  <div>
                    <span className="font-semibold text-[#221710]">
                      {item.quantity}x {item.menuItem.name}
                    </span>
                    <p className="text-[11px] text-[#786658]">
                      {item.customization.size} · {item.customization.milk}
                      {item.customization.syrup !== 'None' ? ` · ${item.customization.syrup}` : ''}
                      {item.customization.grind ? ` · ${item.customization.grind}` : ''}
                    </p>
                  </div>
                  <span className="font-mono tabular-nums font-bold text-[#221710]">
                    ${item.itemTotal.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="p-3 bg-[#FAF8F3] rounded-lg border border-[#EDE2D1] text-xs space-y-1">
            <div className="flex justify-between text-[#6D5A4D]">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums">${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#2F7343]">
                <span>Voucher Discount</span>
                <span className="font-mono tabular-nums">-${order.discount.toFixed(2)}</span>
              </div>
            )}
            {order.tip > 0 && (
              <div className="flex justify-between text-[#6D5A4D]">
                <span>Barista Tip</span>
                <span className="font-mono tabular-nums">${order.tip.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-serif-display font-bold text-sm text-[#221710] pt-1 border-t border-[#EAE0D1]">
              <span>Paid Total</span>
              <span className="font-mono font-bold text-[#8D5338] tabular-nums">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF7F0] border-t border-[#E8DFC9] flex items-center justify-between">
          <span className="text-xs text-[#7A6759]">
            Receipt sent to {order.customerEmail}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#261C14] hover:bg-[#3D2C20] rounded-lg transition-colors"
          >
            Back to Cafe
          </button>
        </div>
      </div>
    </div>
  );
};
