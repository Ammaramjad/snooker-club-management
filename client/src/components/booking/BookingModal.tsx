import React, { useState } from 'react';
import { Table, Booking, BookingMethod, BookingStatus } from '../../types';

interface BookingModalProps {
  table: Table;
  isOpen: boolean;
  onClose: () => void;
  onBook: (booking: Partial<Booking>) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ table, isOpen, onClose, onBook }) => {
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('1');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [bookingMethod, setBookingMethod] = useState<BookingMethod>(BookingMethod.ONLINE);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!startTime) {
      setError('Please select a start time');
      return;
    }

    if (!customerName || !customerPhone) {
      setError('Please provide customer details');
      return;
    }

    // Calculate end time
    const start = new Date(startTime);
    const end = new Date(start.getTime() + parseFloat(duration) * 60 * 60 * 1000);

    // Check if start time is in the past
    if (start < new Date()) {
      setError('Start time cannot be in the past');
      return;
    }

    const totalAmount = table.hourlyRate * parseFloat(duration);

    const booking: Partial<Booking> = {
      id: `BK${Date.now()}`,
      tableId: table.id,
      branchId: table.branchId,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      customerName,
      customerPhone,
      bookingMethod,
      totalAmount,
      status: BookingStatus.CONFIRMED,
      notes,
      overtimeMinutes: 0,
      overtimeCharges: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 'guest',
    };

    onBook(booking);
    
    // Reset form
    setStartTime('');
    setDuration('1');
    setCustomerName('');
    setCustomerPhone('');
    setBookingMethod(BookingMethod.ONLINE);
    setNotes('');
  };

  const calculateCost = () => {
    return (table.hourlyRate * parseFloat(duration)).toFixed(2);
  };

  // Get minimum date/time (current time)
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30); // At least 30 minutes from now
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Book Table {table.tableNumber}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Table Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Hourly Rate</p>
            <p className="text-2xl font-bold text-green-700">${table.hourlyRate}/hour</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Customer Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Customer Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="+1234567890"
                required
              />
            </div>

            {/* Start Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time *
              </label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                min={getMinDateTime()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (hours) *
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="0.5">30 minutes</option>
                <option value="1">1 hour</option>
                <option value="1.5">1.5 hours</option>
                <option value="2">2 hours</option>
                <option value="2.5">2.5 hours</option>
                <option value="3">3 hours</option>
                <option value="4">4 hours</option>
                <option value="5">5 hours</option>
                <option value="6">6 hours</option>
              </select>
            </div>

            {/* Booking Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Booking Method *
              </label>
              <select
                value={bookingMethod}
                onChange={(e) => setBookingMethod(e.target.value as BookingMethod)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value={BookingMethod.ONLINE}>🌐 Online Booking</option>
                <option value={BookingMethod.AT_CLUB}>🏢 At Club</option>
              </select>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Any special requests..."
                rows={3}
              />
            </div>

            {/* Cost Summary */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Estimated Cost:</span>
                <span className="text-xl font-bold text-gray-900">
                  ${calculateCost()}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {duration} hour(s) × ${table.hourlyRate}/hour
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
