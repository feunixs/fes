import { formatRupiah } from "@/lib/utils";

type CurrencyDisplayProps = {
  value: number;
  useShortFormat?: boolean;
  className?: string;
  animate?: boolean;
};

/**
 * Komponen untuk menampilkan nilai mata uang dalam format Rupiah Indonesia
 * Menggunakan format standar Indonesia dengan satuan ribu, juta, miliar, atau triliun
 */
const CurrencyDisplay = ({
  value,
  useShortFormat = true,
  className = "",
  animate = false
}: CurrencyDisplayProps) => {
  // Format nilai menggunakan utility function formatRupiah
  const formattedValue = formatRupiah(value, true, useShortFormat);
  
  // Jika menggunakan format pendek (dengan satuan), pisahkan nilai dan satuannya
  let displayValue = formattedValue;
  let unit = "";
  
  if (useShortFormat) {
    // Misahkan nilai dan satuan (ribu/juta/miliar/triliun)
    const parts = formattedValue.split(" ");
    if (parts.length > 1) {
      displayValue = parts[0]; // "Rp 15"
      unit = parts[1];         // "juta"
    }
  }
  
  return (
    <span className={`currency-display ${animate ? 'rupiah-animate-in' : ''} ${className}`}>
      {useShortFormat ? (
        <>
          <span className={`rupiah-value ${animate ? 'rupiah-value-animate' : ''}`}>
            {displayValue}
          </span>
          {unit && <span className="rupiah-unit">{unit}</span>}
        </>
      ) : (
        <span className={`${animate ? 'rupiah-value-animate' : ''}`}>
          {formattedValue}
        </span>
      )}
    </span>
  );
};

export default CurrencyDisplay;
