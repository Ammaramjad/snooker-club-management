export enum TableStatus {
  AVAILABLE = 'AVAILABLE',
  IN_USE = 'IN_USE',
  RESERVED = 'RESERVED',
  MAINTENANCE = 'MAINTENANCE',
  CLEANING = 'CLEANING',
}

export enum TableType {
  SNOOKER = 'SNOOKER',
  POOL = 'POOL',
  BILLIARDS = 'BILLIARDS',
}

export enum UserRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  RECEPTIONIST = 'RECEPTIONIST',
  STAFF = 'STAFF',
  CASHIER = 'CASHIER',
  CUSTOMER = 'CUSTOMER',
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CHECKED_IN = 'CHECKED_IN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export enum BookingMethod {
  ONLINE = 'ONLINE',
  AT_CLUB = 'AT_CLUB',
  PHONE = 'PHONE',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PARTIAL = 'PARTIAL',
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  ONLINE = 'ONLINE',
  UPI = 'UPI',
  SPLIT = 'SPLIT',
}

export enum MembershipTier {
  NONE = 'NONE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  VIP = 'VIP',
}

export interface Table {
  id: string;
  tableNumber: string;
  status: TableStatus;
  type: TableType;
  branchId: string;
  hourlyRate: number;
  peakHourRate: number;
  maintenanceNotes?: string;
  isActive: boolean;
  currentSessionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  bookingId?: string;
  tableId: string;
  customerName: string;
  customerPhone: string;
  startTime: string;
  endTime?: string;
  pausedAt?: string;
  resumedAt?: string;
  totalPauseDuration: number;
  actualDuration: number;
  hourlyRate: number;
  totalAmount: number;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
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
  customerEmail?: string;
  actualStartTime?: string;
  actualEndTime?: string;
  sessionId?: string;
  overtimeMinutes: number;
  overtimeCharges: number;
  totalAmount: number;
  depositAmount: number;
  notes?: string;
  cancellationReason?: string;
  cancelledBy?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface Payment {
  id: string;
  bookingId?: string;
  sessionId?: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  refundAmount?: number;
  refundReason?: string;
  splitPayments?: Array<{
    method: PaymentMethod;
    amount: number;
  }>;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  phone: string;
  name: string;
  email?: string;
  membershipTier: MembershipTier;
  membershipExpiry?: string;
  loyaltyPoints: number;
  totalBookings: number;
  totalSpent: number;
  createdAt: string;
  updatedAt: string;
}

export interface POSItem {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stockQuantity: number;
  lowStockAlert: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface POSOrder {
  id: string;
  sessionId?: string;
  bookingId?: string;
  items: Array<{
    itemId: string;
    itemName: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  paymentId?: string;
  createdBy: string;
  createdAt: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  branchId?: string;
  isActive: boolean;
  salary?: number;
  commission?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Shift {
  id: string;
  staffId: string;
  date: string;
  startTime: string;
  endTime: string;
  clockIn?: string;
  clockOut?: string;
  status: 'SCHEDULED' | 'PRESENT' | 'ABSENT' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId: string;
  changes: any;
  ipAddress?: string;
  timestamp: string;
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
