/**
 * Utility functions for formatting data
 */

import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

/**
 * Format currency value to Indonesian Rupiah format
 * @param value - The number to format
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number): string => {
  if (value >= 1000000000) {
    return `Rp ${(value / 1000000000).toFixed(1).replace(".", ",")} M`;
  } else if (value >= 1000000) {
    return `Rp ${(value / 1000000).toFixed(1).replace(".", ",")} jt`;
  } else if (value >= 1000) {
    return `Rp ${(value / 1000).toFixed(1).replace(".", ",")} rb`;
  } else {
    return `Rp ${value.toLocaleString().replace(".", ",")}`;
  }
};

/**
 * Format date using date-fns with Indonesian locale
 * @param dateString - ISO date string
 * @param formatString - Format template string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string, formatString: string = "dd/MM/yyyy"): string => {
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString);
    return format(date, formatString, { locale: id });
  } catch (error) {
    console.error('Date formatting error:', error);
    return dateString;
  }
};

/**
 * Get current date formatted as YYYY-MM-DD
 * @returns Current date string
 */
export const getCurrentDate = (): string => {
  return format(new Date(), "yyyy-MM-dd");
};

/**
 * Generate a status display element with appropriate color
 * @param status - Status text
 * @param statusColors - Map of status to color classes
 * @returns Status color class
 */
export const getStatusColorClass = (status: string, statusColors: Record<string, string>): string => {
  return statusColors[status] || "bg-gray-100 text-gray-800";
};

/**
 * Format phone number with proper spacing
 * @param phone - Raw phone number
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Format based on length and prefix
  if (digits.startsWith('0') && digits.length > 9) {
    return digits.replace(/^(\d{2,4})(\d{3,4})(\d{3,4})$/, '$1-$2-$3');
  } else if (digits.startsWith('62')) {
    return digits.replace(/^(62)(\d{2,4})(\d{3,4})(\d{3,4})$/, '+$1 $2-$3-$4');
  }
  
  return phone;
};
