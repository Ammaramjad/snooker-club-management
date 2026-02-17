import React from 'react';
import { Table, TableStatus, Booking } from '../../types';

interface TableCardProps {
  table: Table;
  onStatusChange?: (tableId: string, newStatus: TableStatus) => void;
  onBookNow?: (table: Table) => void;
  isAdmin?: boolean;
  currentBooking?: Partial<Booking>;
}

const statusColors: Record<TableStatus, { bg: string; text: string; border: string }> = {
  [TableStatus.AVAILABLE]: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-500',
  },
  [TableStatus.IN_USE]: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-500',
  },
  [TableStatus.RESERVED]: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-500',
  },
  [TableStatus.MAINTENANCE]: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-500',
  },
  [TableStatus.CLEANING]: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-500',
  },
};

const statusIcons: Record<TableStatus, string> = {
  [TableStatus.AVAILABLE]: '🟢',
  [TableStatus.IN_USE]: '🔴',
  [TableStatus.RESERVED]: '🟡',
  [TableStatus.MAINTENANCE]: '⚫',
  [TableStatus.CLEANING]: '🔵',
};

const TableCard: React.FC<TableCardProps> = ({ 
  table, 
  onStatusChange, 
  onBookNow,
  isAdmin = false,
  currentBooking 
}) => {
  const colors = statusColors[table.status];

  const handleStatusChange = (newStatus: TableStatus) => {
    if (onStatusChange) {
      onStatusChange(table.id, newStatus);
    }
  };

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow(table);
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

  return (
    <div
      className={`${colors.bg} ${colors.border} border-4 rounded-lg p-6 shadow-lg transition-all hover:shadow-xl`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-3xl">{statusIcons[table.status]}</span>
          <h3 className="text-2xl font-bold">Table {table.tableNumber}</h3>
        </div>
        <span
          className={`${colors.text} ${colors.bg} px-3 py-1 rounded-full text-sm font-semibold`}
        >
          {table.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-gray-700">
          <span className="font-semibold">Rate:</span> ${table.hourlyRate}/hour
        </p>
        {table.maintenanceNotes && (
          <p className="text-gray-600 text-sm">
            <span className="font-semibold">Notes:</span> {table.maintenanceNotes}
          </p>
        )}
        {currentBooking && table.status === TableStatus.RESERVED && (
          <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
            <p className="text-xs text-yellow-800 font-semibold">Reserved:</p>
            <p className="text-xs text-yellow-700">
              {formatDateTime(currentBooking.startTime!)} - {formatDateTime(currentBooking.endTime!)}
            </p>
          </div>
        )}
      </div>

      {/* Book Now Button for Customers */}
      {!isAdmin && table.status === TableStatus.AVAILABLE && (
        <button
          onClick={handleBookNow}
          className="w-full bg-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <span>📅</span>
          <span>Book Now</span>
        </button>
      )}

      {/* Not Available Message */}
      {!isAdmin && table.status !== TableStatus.AVAILABLE && (
        <div className="w-full bg-gray-200 text-gray-600 px-4 py-3 rounded-lg font-semibold text-center">
          {table.status === TableStatus.IN_USE && '⏰ Currently In Use'}
          {table.status === TableStatus.RESERVED && '🔒 Already Reserved'}
          {table.status === TableStatus.MAINTENANCE && '🔧 Under Maintenance'}
        </div>
      )}

      {isAdmin && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-semibold text-gray-700 mb-2">Change Status:</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(TableStatus).map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                disabled={table.status === status}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  table.status === status
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                }`}
              >
                {statusIcons[status]} {status}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableCard;
