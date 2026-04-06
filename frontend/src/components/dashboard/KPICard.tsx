'use client';
import { motion } from 'framer-motion';

export interface KPICardProps {
  label: string;
  value: string;
  change?: number;
  changeLabel?: string;
  variant: 'income' | 'expense' | 'neutral';
  isLoading?: boolean;
  delay?: number;
}

export function KPICard({ label, value, change, changeLabel, variant, isLoading, delay = 0 }: KPICardProps) {
  if (isLoading) {
    return (
      <div className="bg-surface border border-border rounded-xl p-6 flex flex-col gap-4 animate-pulse shadow-sm">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  const isPositive = change !== undefined && change >= 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay, 
        type: "spring", 
        stiffness: 70, 
        damping: 15 
      }}
      whileHover={{ 
        y: -4, 
        scale: 1.01,
        transition: { duration: 0.2, ease: "easeOut" } 
      }}
      className="relative bg-surface border border-border/80 rounded-2xl p-7 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <p className="text-sm font-medium text-text-subtle mb-4 uppercase tracking-wider">{label}</p>
      <h3 className="font-display text-4xl lg:text-5xl text-gray-900 mb-5 tracking-tight truncate drop-shadow-sm">{value}</h3>
      {change !== undefined && (
        <p className="text-xs flex items-center gap-2 font-medium text-text-subtle">
          <span className={`px-2 py-1 rounded-md text-xs font-semibold tracking-wide ${isPositive ? (variant === 'expense' ? 'bg-expense-bg text-expense' : 'bg-income-bg text-income') : (variant === 'expense' ? 'bg-income-bg text-income' : 'bg-expense-bg text-expense')}`}>
            {isPositive ? '↗' : '↘'} {Math.abs(change)}%
          </span>
          <span className="font-normal text-gray-500">{changeLabel || 'vs last month'}</span>
        </p>
      )}
    </motion.div>
  );
}
