import React from 'react';
import { 
  CloudRain, 
  Zap, 
  Waves, 
  Sun, 
  Wind, 
  Clock, 
  MapPin, 
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { WeatherEvent, EventStatus } from '../types/weather';

interface LatestWeatherEventsProps {
  events: WeatherEvent[];
  selectedEventId: string | null;
  onSelectEvent: (event: WeatherEvent) => void;
}

export const LatestWeatherEvents: React.FC<LatestWeatherEventsProps> = ({
  events,
  selectedEventId,
  onSelectEvent,
}) => {
  const getStatusPill = (status: EventStatus) => {
    switch (status) {
      case 'Active':
        return 'bg-rose-50 text-rose-700 border-rose-200/80';
      case 'Developing':
        return 'bg-amber-50 text-amber-700 border-amber-200/80';
      case 'Pending':
        return 'bg-blue-50 text-blue-700 border-blue-200/80';
      case 'Verified':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'Resolved':
        return 'bg-slate-50 text-slate-600 border-slate-200/80';
      case 'Improving':
        return 'bg-teal-50 text-teal-700 border-teal-200/80';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200/80';
    }
  };

  const getEventIcon = (category: string) => {
    switch (category) {
      case 'Heavy Rain':
        return <CloudRain className="w-4 h-4 text-[#2563EB]" />;
      case 'Thunderstorm':
        return <Zap className="w-4 h-4 text-[#8B5CF6]" />;
      case 'Flooding':
        return <Waves className="w-4 h-4 text-[#06B6D4]" />;
      case 'Heatwave':
        return <Sun className="w-4 h-4 text-[#F59E0B]" />;
      case 'Fog':
        return <Wind className="w-4 h-4 text-[#94A3B8]" />;
      default:
        return <AlertCircle className="w-4 h-4 text-[#2563EB]" />;
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs transition-all">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]/70 mb-3">
        <div>
          <h3 className="text-sm font-bold text-[#0B285A] tracking-tight">
            Latest Weather Events
          </h3>
          <p className="text-[11px] text-[#64748B]">
            Synthesized multi-source incidents
          </p>
        </div>
        <span className="text-[11px] font-mono text-[#2563EB] bg-[#EEF6FF] px-2 py-0.5 rounded-full font-semibold">
          Live Synced
        </span>
      </div>

      {/* Events List */}
      <div className="divide-y divide-[#F1F6FD]">
        {events.map((ev) => {
          const isSelected = selectedEventId === ev.id;
          const isFresh = ev.lastConfirmedMinutesAgo <= 5;

          return (
            <div
              key={ev.id}
              onClick={() => onSelectEvent(ev)}
              className={`p-3 rounded-xl transition-all cursor-pointer group flex items-center justify-between gap-3 ${
                isSelected
                  ? 'bg-[#EEF6FF] border border-[#2563EB]/30'
                  : 'hover:bg-[#F8FAFC]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-[#E2E8F0] bg-white group-hover:scale-105 transition-transform ${
                    isFresh ? 'ring-2 ring-blue-400/20' : ''
                  }`}
                >
                  {getEventIcon(ev.category)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#12336B] truncate group-hover:text-[#2563EB]">
                      {ev.title}
                    </span>
                    {isFresh && (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-[#64748B] mt-0.5 truncate">
                    <span className="font-medium text-[#0B285A]">{ev.location}</span>
                    <span className="text-[#CBD5E1]">·</span>
                    <span className="font-mono text-[#94A3B8]">{ev.lastConfirmedMinutesAgo} min ago</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getStatusPill(
                    ev.status
                  )}`}
                >
                  {ev.status}
                </span>

                <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
