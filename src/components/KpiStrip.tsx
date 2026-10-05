import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  AlertOctagon, 
  TrendingUp, 
  TrendingDown 
} from 'lucide-react';
import { KPI_METRICS } from '../data/mockWeatherData';

interface KpiStripProps {
  onFilterChange?: (filterType: string) => void;
}

export const KpiStrip: React.FC<KpiStripProps> = ({ onFilterChange }) => {
  const [counts, setCounts] = useState({
    totalReports: 0,
    processed: 0,
    verified: 0,
    pending: 0,
    suspicious: 0,
  });

  useEffect(() => {
    const duration = 1200; // 1.2s per prompt
    const frameRate = 30;
    const totalFrames = Math.round((duration / 1000) * frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCounts({
        totalReports: Math.round(KPI_METRICS.totalReports * ease),
        processed: Math.round(KPI_METRICS.processed * ease),
        verified: Math.round(KPI_METRICS.verified * ease),
        pending: Math.round(KPI_METRICS.pending * ease),
        suspicious: Math.round(KPI_METRICS.suspicious * ease),
      });

      if (frame >= totalFrames) {
        clearInterval(timer);
      }
    }, 1000 / frameRate);

    return () => clearInterval(timer);
  }, []);

  const items = [
    {
      id: 'total',
      label: 'Total Reports',
      value: counts.totalReports,
      trend: '↑ 18% vs. yesterday',
      trendUp: true,
      color: '#2563EB',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'hover:border-blue-300',
      icon: FileText,
    },
    {
      id: 'processed',
      label: 'Processed',
      value: counts.processed,
      trend: '↑ 12% throughput',
      trendUp: true,
      color: '#06B6D4',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-600',
      borderColor: 'hover:border-cyan-300',
      icon: Cpu,
    },
    {
      id: 'verified',
      label: 'Verified',
      value: counts.verified,
      trend: '↑ 24% ground verified',
      trendUp: true,
      color: '#10B981',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      borderColor: 'hover:border-emerald-300',
      icon: CheckCircle2,
    },
    {
      id: 'pending',
      label: 'Pending',
      value: counts.pending,
      trend: '↓ 8% queue lag',
      trendUp: false,
      color: '#F59E0B',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      borderColor: 'hover:border-amber-300',
      icon: Clock,
    },
    {
      id: 'suspicious',
      label: 'Suspicious',
      value: counts.suspicious,
      trend: 'Isolated & rejected',
      trendNeutral: true,
      color: '#EF4444',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-600',
      borderColor: 'hover:border-rose-300',
      icon: AlertOctagon,
    },
  ];

  return (
    <section className="mb-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              onClick={() => onFilterChange && onFilterChange(item.id)}
              className={`bg-white border border-[#E2E8F0] ${item.borderColor} rounded-2xl p-4 shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer group flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[12px] font-medium text-[#64748B]">
                  {item.label}
                </span>
                <div
                  className={`w-7 h-7 rounded-full ${item.bgColor} ${item.textColor} flex items-center justify-center transition-transform group-hover:scale-110`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <div className="text-2xl font-bold font-mono tracking-tight text-[#0B285A] tabular-nums leading-none">
                  {item.value.toLocaleString()}
                </div>

                <div className="mt-2.5 flex items-center gap-1 text-[11px] text-[#64748B] font-medium">
                  {item.trendNeutral ? (
                    <span className="text-rose-500 font-semibold">{item.trend}</span>
                  ) : item.trendUp ? (
                    <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" />
                      {item.trend}
                    </span>
                  ) : (
                    <span className="text-blue-600 font-semibold flex items-center gap-0.5">
                      <TrendingDown className="w-3 h-3" />
                      {item.trend}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
