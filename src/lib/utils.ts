import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format angka ke dalam bentuk mata uang Rupiah sesuai standar Indonesia
 * @param value - Nilai angka yang akan diformat
 * @param withSymbol - Menampilkan simbol Rp jika true
 * @param withUnit - Menampilkan satuan (ribu, juta, dst) jika true
 * @returns String mata uang yang telah diformat
 */
export function formatRupiah(value: number, withSymbol: boolean = true, withUnit: boolean = false): string {
  // Satuan dalam Bahasa Indonesia
  const units = [
    { value: 1, name: '' },
    { value: 1000, name: 'ribu' },
    { value: 1000000, name: 'juta' },
    { value: 1000000000, name: 'miliar' },
    { value: 1000000000000, name: 'triliun' }
  ];
  
  // Jika menggunakan unit, gunakan pendekatan satuan
  if (withUnit) {
    let unitIndex = 0;
    for (let i = units.length - 1; i >= 0; i--) {
      if (value >= units[i].value) {
        unitIndex = i;
        break;
      }
    }
    
    const formattedValue = (value / units[unitIndex].value).toLocaleString('id-ID', { 
      maximumFractionDigits: unitIndex > 0 ? 2 : 0,
      minimumFractionDigits: 0
    });
    
    const symbol = withSymbol ? 'Rp ' : '';
    return `${symbol}${formattedValue} ${units[unitIndex].name}`.trim();
  }
  
  // Format standar tanpa unit
  const formattedValue = value.toLocaleString('id-ID', {
    style: withSymbol ? 'currency' : 'decimal',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  // Hapus spasi setelah simbol Rp jika tidak sesuai standar Indonesia
  return withSymbol ? formattedValue.replace('IDR', 'Rp') : formattedValue;
}
