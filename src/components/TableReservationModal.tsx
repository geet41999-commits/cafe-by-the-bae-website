import React, { useState } from 'react';
import { ReservationData } from '../types/cafe';
import { X, Calendar, Clock, Users, MapPin, CheckCircle } from 'lucide-react';
import { SEATING_ZONES } from '../data/menuData';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultZoneName?: string;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  isOpen,
  onClose,
  defaultZoneName,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('09:30 AM');
  const [guests, setGuests] = useState(2);
  const [seatingZone, setSeatingZone] = useState(defaultZoneName || SEATING_ZONES[0].name);
  const [notes, setNotes] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);

  const timeSlots = [
    '08:00 AM',
    '09:00 AM',
    '09:30 AM',
    '10:30 AM',
    '11:30 AM',
    '01:00 PM',
    '02:30 PM',
    '04:00 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const res: ReservationData = {
      reservationId: `CR-RES-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email,
      phone: phone || '(555) 234-5678',
      date,
      time,
      guests,
      seatingZone,
      specialNotes: notes,
    };
    setConfirmedReservation(res);
  };

  const handleClose = () => {
    setConfirmedReservation(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-[#DECDB8] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-[#FAF7F0] border-b border-[#E8DFC9] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8D5338] mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Table Hospitality</span>
            </div>
            <h3 className="font-serif-display text-2xl font-semibold text-[#221710]">
              {confirmedReservation ? 'Table Reserved' : 'Reserve at The Common Room'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-full hover:bg-[#EAE2D3] text-[#635041] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {confirmedReservation ? (
          /* Confirmation Success State */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-14 h-14 bg-[#EAF5ED] text-[#2F7343] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#8D5338] font-bold">
                {confirmedReservation.reservationId}
              </span>
              <h4 className="font-serif-display text-2xl font-semibold text-[#221710] mt-1 mb-2">
                We have your table ready, {confirmedReservation.name}!
              </h4>
              <p className="text-xs text-[#685548] leading-relaxed max-w-sm mx-auto">
                A confirmation summary has been logged for your arrival at The Common Room. No booking fee or deposit required.
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F3] rounded-xl border border-[#EDE2D1] text-xs text-left space-y-2">
              <div className="flex justify-between pb-1 border-b border-[#F0E6D5]">
                <span className="text-[#7A6759]">Date & Time</span>
                <span className="font-semibold text-[#221710]">
                  {confirmedReservation.date} at {confirmedReservation.time}
                </span>
              </div>
              <div className="flex justify-between pb-1 border-b border-[#F0E6D5]">
                <span className="text-[#7A6759]">Party Size</span>
                <span className="font-semibold text-[#221710]">{confirmedReservation.guests} Guests</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-[#F0E6D5]">
                <span className="text-[#7A6759]">Seating Area</span>
                <span className="font-semibold text-[#8D5338]">{confirmedReservation.seatingZone}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#7A6759]">Location</span>
                <span className="text-[#221710]">42 St. Jude Archway</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 text-xs font-semibold text-white bg-[#261C14] hover:bg-[#3D2C20] rounded-lg transition-colors"
            >
              Done & Return to Cafe
            </button>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[75vh]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#735F50] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Vance"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#DECDB8] bg-white focus:outline-none focus:border-[#8D5338] text-[#261C14]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#735F50] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@example.com"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#DECDB8] bg-white focus:outline-none focus:border-[#8D5338] text-[#261C14]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#735F50] mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#DECDB8] bg-white focus:outline-none focus:border-[#8D5338] text-[#261C14]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#735F50] mb-1">
                  Time Slot
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#DECDB8] bg-white focus:outline-none focus:border-[#8D5338] text-[#261C14]"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#735F50] mb-1">
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#DECDB8] bg-white focus:outline-none focus:border-[#8D5338] text-[#261C14]"
                >
                  {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Seating Zone */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#735F50] mb-1.5">
                Preferred Seating Area
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SEATING_ZONES.map((zone) => (
                  <button
                    type="button"
                    key={zone.id}
                    onClick={() => setSeatingZone(zone.name)}
                    className={`p-2.5 text-xs text-left font-medium rounded-lg border transition-all ${
                      seatingZone === zone.name
                        ? 'border-[#8D5338] bg-[#F7F2E9] text-[#261C14] font-semibold'
                        : 'border-[#E2D6C5] bg-white text-[#635043] hover:border-[#B5A490]'
                    }`}
                  >
                    <div className="truncate">{zone.name}</div>
                    <div className="text-[10px] text-[#8C7A6D] truncate">{zone.capacity}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Special Notes */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#735F50] mb-1">
                Special Requests or Dietary Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Prefer corner window table with natural light, high chair needed"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#DECDB8] bg-white focus:outline-none focus:border-[#8D5338] text-[#261C14]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 text-xs font-semibold text-white bg-[#261C14] hover:bg-[#3D2C20] rounded-lg transition-colors shadow-xs"
              >
                Confirm Table Reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
