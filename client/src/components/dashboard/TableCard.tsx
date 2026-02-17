import React from 'react';
import { Table, TableStatus } from '../../types';

interface TableCardProps {
  table: Table;
  onStatusChange?: (tableId: string, newStatus: TableStatus) => void;
  isAdmin?: boolean;
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
};

const statusIcons: Record<TableStatus, string> = {
  [TableStatus.AVAILABLE]: '🟢',
  [TableStatus.IN_USE]: '🔴',
  [TableStatus.RESERVED]: '🟡',
  [TableStatus.MAINTENANCE]: '⚫',
};

const TableCard: React.FC<TableCardProps> = ({ table, onStatusChange, isAdmin = false }) => {
  const colors = statusColors[table.status];

  const handleStatusChange = (newStatus: TableStatus) => {
    if (onStatusChange) {
      onStatusChange(table.id, newStatus);
    }
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
      </div>

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
