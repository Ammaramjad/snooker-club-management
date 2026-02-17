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

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum BookingMethod {
  ONLINE = 'ONLINE',
  AT_CLUB = 'AT_CLUB',
}

export interface Booking {
  id: string;
  userId: string;
  branchId: string;
  tableId: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  bookingMethod: BookingMethod;
  customerName: string;
  customerPhone: string;
  actualStartTime?: string;
  actualEndTime?: string;
  overtimeMinutes: number;
  overtimeCharges: number;
  totalAmount: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
