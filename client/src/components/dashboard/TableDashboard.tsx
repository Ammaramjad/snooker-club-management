import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Table, TableStatus, Booking } from '../../types';
import TableCard from './TableCard';
import BookingModal from '../booking/BookingModal';

const SOCKET_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

interface TableDashboardProps {
  onBookingCreated?: (booking: Booking) => void;
  existingBookings?: Booking[];
}

const TableDashboard: React.FC<TableDashboardProps> = ({ onBookingCreated, existingBookings = [] }) => {
  const [tables, setTables] = useState<Table[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isAdmin] = useState(false); // Changed to false to show customer view
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookings, setBookings] = useState<Record<string, Booking>>({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Connect to Socket.io
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    // Listen for table status updates
    newSocket.on('table:statusUpdated', (data: { tableId: string; status: TableStatus }) => {
      setTables((prevTables) =>
        prevTables.map((table) =>
          table.id === data.tableId ? { ...table, status: data.status } : table
        )
      );
    });

    // Listen for booking updates
    newSocket.on('booking:created', (data: { tableId: string; booking: Partial<Booking> }) => {
      setBookings((prev) => ({
        ...prev,
        [data.tableId]: data.booking,
      }));
      
      // Update table status to RESERVED
      setTables((prevTables) =>
        prevTables.map((table) =>
          table.id === data.tableId ? { ...table, status: TableStatus.RESERVED } : table
        )
      );
    });

    // Fetch initial table data
    fetchTables();

    return () => {
      newSocket.close();
    };
  }, []);

  const fetchTables = async () => {
    try {
      // TODO: Replace with actual API call
      // Temporary mock data
      const mockTables: Table[] = [
        {
          id: '1',
          tableNumber: '1',
          status: TableStatus.AVAILABLE,
          branchId: 'branch-1',
          hourlyRate: 15,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          tableNumber: '2',
          status: TableStatus.IN_USE,
          branchId: 'branch-1',
          hourlyRate: 15,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          tableNumber: '3',
          status: TableStatus.RESERVED,
          branchId: 'branch-1',
          hourlyRate: 15,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '4',
          tableNumber: '4',
          status: TableStatus.MAINTENANCE,
          branchId: 'branch-1',
          hourlyRate: 15,
          maintenanceNotes: 'Replacing felt',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '5',
          tableNumber: '5',
          status: TableStatus.AVAILABLE,
          branchId: 'branch-1',
          hourlyRate: 20,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '6',
          tableNumber: '6',
          status: TableStatus.IN_USE,
          branchId: 'branch-1',
          hourlyRate: 20,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      setTables(mockTables);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  const handleStatusChange = (tableId: string, newStatus: TableStatus) => {
    // TODO: Call API to update status
    // For now, emit socket event
    if (socket) {
      socket.emit('table:statusChange', { tableId, status: newStatus });
    }

    // Optimistic update
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId ? { ...table, status: newStatus } : table
      )
    );
  };

  const handleBookNow = (table: Table) => {
    setSelectedTable(table);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = async (booking: Partial<Booking>) => {
    if (!selectedTable) return;

    try {
      const fullBooking = booking as Booking;

      // Check availability first
      const isAvailable = await checkAvailability(
        selectedTable.id,
        booking.startTime!,
        booking.endTime!
      );

      if (!isAvailable) {
        alert('Sorry, this table is not available for the selected time slot. Please choose a different time.');
        return;
      }

      // Create booking via socket (in real app, would call API)
      if (socket) {
        socket.emit('booking:create', {
          tableId: selectedTable.id,
          booking: fullBooking,
        });
      }

      // Update local state
      setBookings((prev) => ({
        ...prev,
        [selectedTable.id]: fullBooking,
      }));

      // Notify parent component
      if (onBookingCreated) {
        onBookingCreated(fullBooking);
      }

      // Update table status to RESERVED
      setTables((prevTables) =>
        prevTables.map((table) =>
          table.id === selectedTable.id ? { ...table, status: TableStatus.RESERVED } : table
        )
      );

      // Show success message
      setSuccessMessage(`✅ Table ${selectedTable.tableNumber} successfully booked!`);
      setTimeout(() => setSuccessMessage(''), 5000);

      // Close modal
      setIsBookingModalOpen(false);
      setSelectedTable(null);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  const checkAvailability = async (
    tableId: string,
    startTime: string,
    endTime: string
  ): Promise<boolean> => {
    // In a real application, this would call the backend API
    // For now, we'll check locally against existing bookings
    const existingBooking = bookings[tableId];
    
    if (!existingBooking) return true;

    const newStart = new Date(startTime);
    const newEnd = new Date(endTime);
    const existingStart = new Date(existingBooking.startTime!);
    const existingEnd = new Date(existingBooking.endTime!);

    // Check for overlap
    const hasOverlap = newStart < existingEnd && newEnd > existingStart;
    
    return !hasOverlap;
  };

  const getStatusCount = (status: TableStatus) => {
    return tables.filter((table) => table.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎱 Snooker Club Dashboard
          </h1>
          <p className="text-gray-600">
            {isAdmin ? 'Real-time table status monitoring' : 'Book your table now!'}
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-lg p-4 animate-pulse">
            <p className="text-green-800 font-semibold text-center">{successMessage}</p>
          </div>
        )}

        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🟢</span>
              <div>
                <p className="text-sm text-green-700 font-medium">Available</p>
                <p className="text-2xl font-bold text-green-900">
                  {getStatusCount(TableStatus.AVAILABLE)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔴</span>
              <div>
                <p className="text-sm text-red-700 font-medium">In Use</p>
                <p className="text-2xl font-bold text-red-900">
                  {getStatusCount(TableStatus.IN_USE)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-100 border-2 border-yellow-500 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🟡</span>
              <div>
                <p className="text-sm text-yellow-700 font-medium">Reserved</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {getStatusCount(TableStatus.RESERVED)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 border-2 border-gray-500 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚫</span>
              <div>
                <p className="text-sm text-gray-700 font-medium">Maintenance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {getStatusCount(TableStatus.MAINTENANCE)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tables.map((table) => (
            <TableCard
              key={table.id}
              table={table}
              onStatusChange={handleStatusChange}
              onBookNow={handleBookNow}
              isAdmin={isAdmin}
              currentBooking={bookings[table.id]}
            />
          ))}
        </div>

        {/* Booking Modal */}
        {selectedTable && (
          <BookingModal
            table={selectedTable}
            isOpen={isBookingModalOpen}
            onClose={() => {
              setIsBookingModalOpen(false);
              setSelectedTable(null);
            }}
            onBook={handleBookingSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default TableDashboard;
