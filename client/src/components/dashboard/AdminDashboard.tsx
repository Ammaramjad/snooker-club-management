import React, { useState } from 'react';
import { UserRole, Session, Booking, Payment, Staff } from '../../types';

interface AdminDashboardProps {
  currentUser: {
    id: string;
    name: string;
    role: UserRole;
  };
  sessions: Session[];
  bookings: Booking[];
  payments: Payment[];
  staff: Staff[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  sessions,
  bookings,
  payments,
  staff,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Permission checks
  const canViewReports = [UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER].includes(
    currentUser.role
  );
  const canManageStaff = [UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER].includes(
    currentUser.role
  );
  const canViewFinancials = [UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER, UserRole.CASHIER].includes(
    currentUser.role
  );

  // Today's stats
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaySessions = sessions.filter(
    (s) => new Date(s.startTime) >= today
  );
  const activeSessions = sessions.filter((s) => s.status === 'ACTIVE').length;
  const todayBookings = bookings.filter(
    (b) => new Date(b.createdAt) >= today
  ).length;
  const todayRevenue = payments
    .filter((p) => new Date(p.createdAt) >= today && p.status === 'PAID')
    .reduce((sum, p) => sum + p.amount, 0);
  const todayCancellations = bookings.filter(
    (b) => new Date(b.updatedAt) >= today && b.status === 'CANCELLED'
  ).length;
  const noShowCount = bookings.filter((b) => b.status === 'NO_SHOW').length;

  // Peak hours analysis
  const hourlyBookings = Array(24).fill(0);
  bookings.forEach((booking) => {
    const hour = new Date(booking.startTime).getHours();
    hourlyBookings[hour]++;
  });
  const peakHour = hourlyBookings.indexOf(Math.max(...hourlyBookings));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            🏢 Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome, {currentUser.name} ({currentUser.role})
          </p>
        </div>
        <div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Active Sessions</p>
              <p className="text-3xl font-bold mt-1">{activeSessions}</p>
              <p className="text-xs text-blue-100 mt-1">Currently Playing</p>
            </div>
            <div className="text-4xl">🎮</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Today's Revenue</p>
              <p className="text-3xl font-bold mt-1">${todayRevenue.toFixed(0)}</p>
              <p className="text-xs text-green-100 mt-1">
                {payments.filter((p) => new Date(p.createdAt) >= today).length} transactions
              </p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Today's Bookings</p>
              <p className="text-3xl font-bold mt-1">{todayBookings}</p>
              <p className="text-xs text-purple-100 mt-1">{todaySessions.length} sessions started</p>
            </div>
            <div className="text-4xl">📅</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Peak Hour</p>
              <p className="text-3xl font-bold mt-1">
                {peakHour}:00
              </p>
              <p className="text-xs text-orange-100 mt-1">
                {hourlyBookings[peakHour]} bookings
              </p>
            </div>
            <div className="text-4xl">⏰</div>
          </div>
        </div>
      </div>

      {/* Issues & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cancellations Today</p>
              <p className="text-2xl font-bold text-red-600">{todayCancellations}</p>
            </div>
            <span className="text-2xl">❌</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">No-Shows</p>
              <p className="text-2xl font-bold text-yellow-600">{noShowCount}</p>
            </div>
            <span className="text-2xl">⚠️</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Staff On Duty</p>
              <p className="text-2xl font-bold text-blue-600">
                {staff.filter((s) => s.isActive).length}
              </p>
            </div>
            <span className="text-2xl">👥</span>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          🎮 Active Sessions
        </h3>
        {activeSessions === 0 ? (
          <p className="text-center text-gray-500 py-4">No active sessions</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sessions
              .filter((s) => s.status === 'ACTIVE')
              .map((session) => (
                <div
                  key={session.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-gray-900">Table {session.tableId}</p>
                      <p className="text-sm text-gray-600">{session.customerName}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                      ACTIVE
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-600">
                      Started: {new Date(session.startTime).toLocaleTimeString()}
                    </p>
                    <p className="text-gray-600">
                      Duration: {Math.floor(session.actualDuration / 60)} min
                    </p>
                    <p className="font-semibold text-gray-900">
                      ${session.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Recent Bookings */}
      {canViewReports && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            📋 Recent Bookings
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Table
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Time
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.slice(0, 5).map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {booking.id.substring(0, 8)}
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
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {new Date(booking.startTime).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          booking.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'CANCELLED'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                      ${booking.totalAmount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">⚡ Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            📅 New Booking
          </button>
          <button className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
            ▶️ Start Session
          </button>
          {canViewFinancials && (
            <button className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
              💳 Process Payment
            </button>
          )}
          {canManageStaff && (
            <button className="px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium">
              👥 Manage Staff
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
