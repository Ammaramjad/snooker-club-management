import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import TableDashboard from './components/dashboard/TableDashboard';
import AnalyticsDashboard from './components/dashboard/AnalyticsDashboard';
import BookingList from './components/booking/BookingList';
import { Booking } from './types';

function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '🎱 Tables', icon: '🎱' },
    { path: '/analytics', label: '📊 Analytics', icon: '📊' },
    { path: '/bookings', label: '📋 Bookings', icon: '📋' },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🎱</span>
            <h1 className="text-xl font-bold">Snooker Club Management</h1>
          </div>
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg transition-all ${
                  location.pathname === item.path
                    ? 'bg-white text-gray-900 font-semibold'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label.split(' ')[1]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const [allBookings, setAllBookings] = useState<Booking[]>([]);

  const handleNewBooking = (booking: Booking) => {
    setAllBookings((prev) => [...prev, booking]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setAllBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: 'CANCELLED' as any } : b
      )
    );
  };

  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route
              path="/"
              element={
                <TableDashboard
                  onBookingCreated={handleNewBooking}
                  existingBookings={allBookings}
                />
              }
            />
            <Route
              path="/analytics"
              element={<AnalyticsDashboard bookings={allBookings} />}
            />
            <Route
              path="/bookings"
              element={
                <BookingList bookings={allBookings} onCancelBooking={handleCancelBooking} />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
