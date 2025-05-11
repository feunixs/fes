/**
 * Data models for the application
 * Defines all entity interfaces used throughout the application
 * Following the TypeScript style guide with immutable properties
 */

// Use opaque type for UI elements rather than direct React dependency
// This follows the separation of concerns principle
export type IconElement = unknown;

/**
 * Status values used across multiple entities
 */
export type EntityStatus = 'Active' | 'Inactive';

/**
 * Customer entity representing a client of the business
 */
export interface Customer {
  readonly id: number;
  readonly name: string;
  readonly address: string;
  readonly phoneNumber: string;
  readonly email: string;
  readonly contactPerson: string;
  readonly status: EntityStatus;
}

/**
 * Customer form data interface for data entry and editing
 * Allows for partial fields during form entry while maintaining type safety
 */
export interface CustomerFormData {
  readonly id?: number;
  readonly name: string;
  readonly address: string;
  readonly phoneNumber: string;
  readonly email: string;
  readonly contactPerson: string;
  readonly status: EntityStatus;
}

/**
 * Supplier entity representing a vendor that provides products to the business
 */
export interface Supplier {
  readonly id: number;
  readonly name: string;
  readonly address: string;
  readonly phoneNumber: string;
  readonly email: string;
  readonly contactPerson: string;
  readonly status: EntityStatus;
}

/**
 * Item/Product entity representing purchasable goods
 */
export interface Item {
  readonly id: number;
  readonly name: string;
  readonly unit: string;
  readonly price: number;
}

/**
 * Purchase order status values
 */
export type OrderStatus = 'Pending' | 'Approved' | 'Delivered' | 'Completed' | 'Cancelled';

/**
 * Purchase Order Item representing a line item in a purchase order
 */
export interface PurchaseOrderItem {
  readonly itemId: string;
  readonly name: string;
  readonly quantity: number;
  readonly price: number;
  readonly subtotal?: number; // Calculated field: quantity * price
}

/**
 * Purchase Order representing a transaction with a supplier
 */
export interface PurchaseOrder {
  readonly id: string;
  readonly date: string;
  readonly supplier: string;
  readonly totalItems: number;
  readonly totalAmount: number;
  readonly status: OrderStatus;
  readonly notes?: string;
  readonly items: readonly PurchaseOrderItem[];
}

/**
 * Purchase Order Form Data for creating/editing purchase orders
 */
export interface PurchaseOrderFormData {
  readonly id?: string;
  readonly date: string;
  readonly supplier: string;
  readonly notes?: string;
  readonly items: readonly PurchaseOrderItem[];
  readonly status: OrderStatus;
}

/**
 * Sales Order representing a transaction with a customer
 */
export interface SalesOrder {
  readonly id: string;
  readonly date: string;
  readonly customer: string;
  readonly totalItems: number;
  readonly totalAmount: number;
  readonly status: OrderStatus;
  readonly notes?: string;
  readonly items?: readonly PurchaseOrderItem[]; // Reuse PurchaseOrderItem for simplicity
}

/**
 * Field type options for form fields
 */
export type FieldType = 'text' | 'email' | 'password' | 'textarea' | 'select' | 'number' | 'date';

/**
 * Select option for dropdown fields
 */
export interface SelectOption {
  readonly value: string;
  readonly label: string;
}

/**
 * Form Field configuration for dynamic form rendering
 */
export interface FormField {
  readonly name: string;
  readonly label: string;
  readonly type: FieldType;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly options?: readonly SelectOption[];
}

/**
 * Status colors for UI elements
 */
export type StatusColor = 'success' | 'warning' | 'danger' | 'info' | 'default' | string;

/**
 * Activity representing a recent user action shown on the dashboard
 */
export interface Activity {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly time: string;
  readonly statusColor: StatusColor;
  readonly userId?: number;
  readonly entityId?: number;
  readonly entityType?: string;
}

/**
 * Quick link item for dashboard shortcuts
 */
export interface QuickLink {
  readonly title: string;
  readonly icon: IconElement;
  readonly path: string;
  readonly description?: string;
  readonly disabled?: boolean;
}

/**
 * Dashboard statistics card data
 */
export interface DashboardStat {
  readonly title: string;
  readonly value: number | string;
  readonly icon?: IconElement;
  readonly change?: number;
  readonly changeDirection?: 'up' | 'down' | 'neutral';
  readonly color?: StatusColor;
}

/**
 * User profile information
 */
export interface UserProfile {
  readonly id: number;
  readonly username: string;
  readonly fullName: string;
  readonly email: string;
  readonly role: string;
  readonly permissions: readonly string[];
  readonly lastLogin?: string;
  readonly avatarUrl?: string;
  readonly status: EntityStatus;
}
