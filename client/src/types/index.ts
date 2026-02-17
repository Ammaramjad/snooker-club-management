export enum TableStatus {
  AVAILABLE = 'AVAILABLE',
  IN_USE = 'IN_USE',
  RESERVED = 'RESERVED',
  MAINTENANCE = 'MAINTENANCE',
}

export interface Table {
  id: string;
  tableNumber: string;
  status: TableStatus;
  branchId: string;
  hourlyRate: number;
  maintenanceNotes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email?: string;
  managerName?: string;
  isActive: boolean;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface Booking {
  id: string;
  userId: string;
  branchId: string;
  tableId: string;
  startTime: string;
  endTime: string;
  status: string;
  actualStartTime?: string;
  actualEndTime?: string;
  overtimeMinutes: number;
  overtimeCharges: number;
  notes?: string;
}
