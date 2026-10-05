import React, { useState } from 'react';
import { 
  Database, 
  CheckCircle2, 
  RefreshCw, 
  Cpu, 
  Share2, 
  Radio, 
  Globe, 
  Layers, 
  SlidersHorizontal,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { DATA_SOURCES_STATUS } from '../data/mockWeatherData';

export const DataSourcesView: React.FC = () => {
  const [sources, setSources] = useState(DATA_SOURCES_STATUS);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#0B285A]">
              Connected Ingestion Pipelines & Data Feeds
            </h1>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              6 / 6 Feeds Healthy
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Real-time multi-source connectors for social media, government APIs, radar telemetry, and crowdsourced citizen reports
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#EEF6FF] hover:bg-[#2563EB] text-[#2563EB] hover:text-white text-xs font-semibold transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Sync Pipeline Telemetry</span>
        </button>
      </div>

      {/* Grid of Data Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((src, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs hover:border-[#2563EB]/40 hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB] bg-[#EEF6FF] px-2 py-0.5 rounded-md">
                  {src.category}
                </span>

                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{src.status}</span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-[#0B285A] leading-snug">
                {src.name}
              </h3>

              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                {src.description}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-[#F1F6FD] space-y-2">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-[#F8FAFC]">
                  <span className="text-[10px] text-[#94A3B8] block">Latency</span>
                  <span className="font-mono font-bold text-[#12336B] tabular-nums">
                    {src.latency}
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-[#F8FAFC]">
                  <span className="text-[10px] text-[#94A3B8] block">Throughput</span>
                  <span className="font-mono font-bold text-[#12336B] tabular-nums text-[11px]">
                    {src.throughput}
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-[#F8FAFC]">
                  <span className="text-[10px] text-[#94A3B8] block">Uptime</span>
                  <span className="font-mono font-bold text-emerald-600 tabular-nums">
                    {src.uptime}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#94A3B8] pt-1">
                <span>Last heartbeat: {src.lastSync}</span>
                <span className="text-[#2563EB] font-medium flex items-center gap-0.5 cursor-pointer hover:underline">
                  <span>Stream Details</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
