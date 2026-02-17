import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Booking, BookingStatus, BookingMethod } from '../../types';

interface AnalyticsDashboardProps {
  bookings: Booking[];
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ bookings }) => {
  // Calculate statistics
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayBookings = bookings.filter(
    (b) => new Date(b.createdAt) >= today
  ).length;

  const thisWeekStart = new Date(today);
  thisWeekStart.setDate(today.getDate() - today.getDay());
  const thisWeekBookings = bookings.filter(
    (b) => new Date(b.createdAt) >= thisWeekStart
  ).length;

  const totalRevenue = bookings
    .filter((b) => b.status !== BookingStatus.CANCELLED)
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const todayRevenue = bookings
    .filter(
      (b) =>
        new Date(b.createdAt) >= today && b.status !== BookingStatus.CANCELLED
    )
    .reduce((sum, b) => sum + b.totalAmount, 0);

  // Booking trends data (last 7 days)
  const bookingTrends = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - i));
    const dayBookings = bookings.filter((b) => {
      const bookingDate = new Date(b.createdAt);
      return bookingDate.toDateString() === date.toDateString();
    });

    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      bookings: dayBookings.length,
      revenue: dayBookings.reduce((sum, b) => sum + b.totalAmount, 0),
    };
  });

  // Booking status distribution
  const statusData = Object.values(BookingStatus).map((status) => ({
    name: status,
    value: bookings.filter((b) => b.status === status).length,
  }));

  // Booking method distribution
  const methodData = Object.values(BookingMethod).map((method) => ({
    name: method,
    value: bookings.filter((b) => b.bookingMethod === method).length,
  }));

  // Revenue by method
  const revenueByMethod = Object.values(BookingMethod).map((method) => {
    const methodBookings = bookings.filter(
      (b) => b.bookingMethod === method && b.status !== BookingStatus.CANCELLED
    );
    return {
      method,
      revenue: methodBookings.reduce((sum, b) => sum + b.totalAmount, 0),
      count: methodBookings.length,
    };
  });

  const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#f59e0b'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">📊 Analytics Dashboard</h1>
        <p className="text-gray-600 mt-1">Booking and revenue insights</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Bookings</p>
              <p className="text-3xl font-bold mt-1">{bookings.length}</p>
            </div>
            <div className="text-4xl">📅</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold mt-1">${totalRevenue.toFixed(0)}</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Today's Bookings</p>
              <p className="text-3xl font-bold mt-1">{todayBookings}</p>
            </div>
            <div className="text-4xl">🎯</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Today's Revenue</p>
              <p className="text-3xl font-bold mt-1">${todayRevenue.toFixed(0)}</p>
            </div>
            <div className="text-4xl">💵</div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Trends */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            📈 Booking Trends (Last 7 Days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bookingTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Bookings"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trends */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            💰 Revenue Trends (Last 7 Days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Status Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            📊 Booking Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${((percent || 0) * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Booking Method Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            🌐 Booking Method
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={methodData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${((percent || 0) * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {methodData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? '#3b82f6' : '#6b7280'}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Method */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            💵 Revenue by Method
          </h3>
          <div className="space-y-4 mt-8">
            {revenueByMethod.map((item, index) => (
              <div key={item.method}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{item.method}</span>
                  <span className="font-bold">${item.revenue.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      index === 0 ? 'bg-blue-600' : 'bg-gray-600'
                    }`}
                    style={{
                      width: `${
                        (item.revenue / Math.max(...revenueByMethod.map((r) => r.revenue))) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{item.count} bookings</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">📌 Quick Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{thisWeekBookings}</p>
            <p className="text-sm text-gray-600">This Week</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">
              {bookings.filter((b) => b.status === BookingStatus.CONFIRMED).length}
            </p>
            <p className="text-sm text-gray-600">Confirmed</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">
              {bookings.filter((b) => b.status === BookingStatus.COMPLETED).length}
            </p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">
              $
              {(
                totalRevenue /
                (bookings.filter((b) => b.status !== BookingStatus.CANCELLED).length ||
                  1)
              ).toFixed(0)}
            </p>
            <p className="text-sm text-gray-600">Avg Booking Value</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
