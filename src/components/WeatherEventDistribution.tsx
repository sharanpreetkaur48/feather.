import React from 'react';
import { 
  CloudRain, 
  Zap, 
  Waves, 
  Sun, 
  Wind,
  ArrowUpRight
} from 'lucide-react';
import { EVENT_DISTRIBUTION } from '../data/mockWeatherData';

interface WeatherEventDistributionProps {
  onSelectCategory?: (category: string) => void;
}

export const WeatherEventDistribution: React.FC<WeatherEventDistributionProps> = ({
  onSelectCategory,
}) => {
  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Heavy Rain':
        return <CloudRain className="w-4 h-4 text-[#2563EB]" />;
      case 'Thunderstorm':
        return <Zap className="w-4 h-4 text-[#8B5CF6]" />;
      case 'Flooding':
        return <Waves className="w-4 h-4 text-[#06B6D4]" />;
      case 'Heatwave':
        return <Sun className="w-4 h-4 text-[#F59E0B]" />;
      default:
        return <Wind className="w-4 h-4 text-[#94A3B8]" />;
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs transition-all flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-[#0B285A] tracking-tight">
              Weather Event Distribution
            </h3>
            <span className="text-[11px] text-[#64748B]">
              National Incident Taxonomy (24h)
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#94A3B8] tabular-nums">
            Total 12,482
          </span>
        </div>

        {/* Stacked Progress Bar */}
        <div className="h-3 w-full bg-[#F1F6FD] rounded-full overflow-hidden flex mb-5 p-0.5 gap-0.5">
          {EVENT_DISTRIBUTION.map((item, idx) => (
            <div
              key={idx}
              className={`h-full rounded-sm transition-all hover:opacity-80`}
              style={{
                width: `${item.percentage}%`,
                backgroundColor: item.color,
              }}
              title={`${item.name}: ${item.percentage}% (${item.count.toLocaleString()})`}
            />
          ))}
        </div>

        {/* Category List */}
        <div className="space-y-3">
          {EVENT_DISTRIBUTION.map((item) => (
            <div
              key={item.name}
              onClick={() => onSelectCategory && onSelectCategory(item.name)}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${item.color}12` }}
                >
                  {getCategoryIcon(item.name)}
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#12336B] group-hover:text-[#2563EB] transition-colors">
                    {item.name}
                  </div>
                  <div className="text-[10px] text-[#94A3B8] font-mono tabular-nums">
                    {item.count.toLocaleString()} reports
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-right">
                <span className="text-xs font-bold font-mono text-[#12336B] tabular-nums">
                  {item.percentage}%
                </span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 mt-2 border-t border-[#F1F6FD] flex items-center justify-between text-[11px] text-[#64748B]">
        <span>Auto-synced with IMD Taxonomy</span>
        <span className="text-[#2563EB] font-medium flex items-center gap-0.5">
          <span>View Matrix</span>
          <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
