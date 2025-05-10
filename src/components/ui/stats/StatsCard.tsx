import { ReactNode, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatsCardProps = {
  title: string;
  value: number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  isCurrency?: boolean;
  description?: string;
  useShortFormat?: boolean;
  className?: string;
};

const StatsCard = ({
  title,
  value,
  icon,
  trend,
  variant = 'primary',
  isCurrency = false,
  description,
  useShortFormat = false,
  className,
}: StatsCardProps) => {
  // Fungsi untuk memformat nilai sesuai standar Indonesia
  const formatIndonesianValue = (num: number, isCurrency: boolean, useShort: boolean): string => {
    // Format mata uang Indonesia dengan satuan lokal (ribu, juta, miliar, triliun)
    if (isCurrency) {
      if (useShort) {
        if (num >= 1000000000000) {
          return `Rp ${(num / 1000000000000).toFixed(1).replace(/\.0$/, '')} triliun`;
        } else if (num >= 1000000000) {
          return `Rp ${(num / 1000000000).toFixed(1).replace(/\.0$/, '')} miliar`;
        } else if (num >= 1000000) {
          return `Rp ${(num / 1000000).toFixed(1).replace(/\.0$/, '')} juta`;
        } else if (num >= 1000) {
          return `Rp ${(num / 1000).toFixed(1).replace(/\.0$/, '')} ribu`;
        } else {
          return `Rp ${num}`;
        }
      }
      return `Rp ${new Intl.NumberFormat('id-ID').format(num)}`;
    }
    
    // Format angka biasa dengan standar Indonesia
    if (useShort) {
      if (num >= 1000000000) {
        return `${(num / 1000000000).toFixed(1).replace(/\.0$/, '')} miliar`;
      } else if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1).replace(/\.0$/, '')} juta`;
      } else if (num >= 1000) {
        return `${(num / 1000).toFixed(1).replace(/\.0$/, '')} ribu`;
      }
    }
    return new Intl.NumberFormat('id-ID').format(num);
  };
  
  // Format nilai menggunakan helper function
  const formattedValue = useMemo(() => {
    return formatIndonesianValue(value, isCurrency, useShortFormat);
  }, [value, isCurrency, useShortFormat]);

  return (
    <Card className={cn("shadow-sm hover:shadow-md transition-all duration-300 p-4", className)}>
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        <div className="p-2 rounded-full bg-gray-100">
          {icon}
        </div>
      </div>
      
      <div className="flex items-baseline mt-2">
        <div className="text-2xl font-semibold text-gray-800 currency-display">{formattedValue}</div>
        {trend && (
          <div className={cn(
            'ml-2 text-xs font-medium px-2 py-0.5 rounded-full',
            trend.isPositive ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'
          )}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span className="ml-1">{trend.value}%</span>
          </div>
        )}
      </div>
      
      {description && <p className="text-xs text-gray-600 mt-1">{description}</p>}
      
      <div className="stats-card-progress mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all duration-500", 
            trend?.isPositive ? "bg-green-500" : "bg-blue-500",
            !trend && `bg-${variant === 'primary' ? 'blue-500' : (variant === 'secondary' ? 'purple-500' : (variant === 'success' ? 'green-500' : (variant === 'warning' ? 'yellow-500' : 'gray-500')))}`
          )}
          style={{ width: `${Math.min(trend?.value ? trend.value * 5 : 50, 100)}%` }}
        />
      </div>
    </Card>
  );
};

export default StatsCard;
