import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Table, TableStatus } from '../../types';
import TableCard from './TableCard';

const SOCKET_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const TableDashboard: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isAdmin] = useState(true); // TODO: Get from auth context

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
          <p className="text-gray-600">Real-time table status monitoring</p>
        </div>

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
              isAdmin={isAdmin}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableDashboard;
