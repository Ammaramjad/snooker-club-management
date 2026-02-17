import React, { useState } from 'react';
import { Booking, BookingStatus, BookingMethod } from '../../types';

interface BookingListProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
}

const BookingList: React.FC<BookingListProps> = ({ bookings, onCancelBooking }) => {
  const [filter, setFilter] = useState<BookingStatus | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  const statusColors: Record<BookingStatus, string> = {
    [BookingStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
    [BookingStatus.CONFIRMED]: 'bg-blue-100 text-blue-800',
    [BookingStatus.IN_PROGRESS]: 'bg-purple-100 text-purple-800',
    [BookingStatus.COMPLETED]: 'bg-green-100 text-green-800',
    [BookingStatus.CANCELLED]: 'bg-red-100 text-red-800',
  };

  const methodBadges: Record<BookingMethod, string> = {
    [BookingMethod.ONLINE]: 'bg-indigo-100 text-indigo-800',
    [BookingMethod.AT_CLUB]: 'bg-gray-100 text-gray-800',
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesFilter = filter === 'ALL' || booking.status === filter;
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerPhone.includes(searchTerm) ||
      booking.id.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const handleCancelClick = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    if (selectedBookingId) {
      onCancelBooking(selectedBookingId);
      setShowCancelModal(false);
      setSelectedBookingId(null);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    return hours.toFixed(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 Booking List</h2>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Status Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as BookingStatus | 'ALL')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Bookings</option>
              <option value={BookingStatus.PENDING}>Pending</option>
              <option value={BookingStatus.CONFIRMED}>Confirmed</option>
              <option value={BookingStatus.IN_PROGRESS}>In Progress</option>
              <option value={BookingStatus.COMPLETED}>Completed</option>
              <option value={BookingStatus.CANCELLED}>Cancelled</option>
            </select>
          </div>

          {/* Search */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, phone, or booking ID..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
          <div className="text-center p-2 bg-gray-50 rounded">
            <div className="text-2xl font-bold">{bookings.length}</div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
          {Object.values(BookingStatus).map((status) => (
            <div key={status} className="text-center p-2 bg-gray-50 rounded">
              <div className="text-2xl font-bold">
                {bookings.filter((b) => b.status === status).length}
              </div>
              <div className="text-xs text-gray-600">{status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Booking ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Table
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date & Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Duration
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Method
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                  No bookings found
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {booking.id.substring(0, 8)}...
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">
                      {booking.customerName}
                    </div>
                    <div className="text-sm text-gray-500">{booking.customerPhone}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    Table {booking.tableId}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">
                      {formatDateTime(booking.startTime)}
                    </div>
                    <div className="text-xs text-gray-500">
                      to {formatDateTime(booking.endTime)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {calculateDuration(booking.startTime, booking.endTime)} hrs
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                    ${booking.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        methodBadges[booking.bookingMethod]
                      }`}
                    >
                      {booking.bookingMethod}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        statusColors[booking.status]
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {booking.status !== BookingStatus.CANCELLED &&
                      booking.status !== BookingStatus.COMPLETED && (
                        <button
                          onClick={() => handleCancelClick(booking.id)}
                          className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Cancel Booking?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                No, Keep It
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingList;
