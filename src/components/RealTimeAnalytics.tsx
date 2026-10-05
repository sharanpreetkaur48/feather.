import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Layers, 
  Share2, 
  CheckCircle2, 
  Clock,
  ArrowUpRight 
} from 'lucide-react';
import { HOURLY_REPORTS_CHART_DATA, SOURCE_DISTRIBUTION_DATA } from '../data/mockWeatherData';

export const RealTimeAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Reports Over Time' | 'Verification Status' | 'Source Distribution'>('Reports Over Time');
  const [hoveredPoint, setHoveredPoint] = useState<{
    time: string;
    reports: number;
    verified: number;
    x: number;
    y: number;
  } | null>({
    time: '10:42 AM',
    reports: 3762,
    verified: 2341,
    x: 560,
    y: 45,
  });

  const [timeRange, setTimeRange] = useState<'1H' | '6H' | '24H' | '7D'>('24H');

  // Chart coordinate mapping
  const width = 640;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const maxVal = 4200;
  const points = HOURLY_REPORTS_CHART_DATA.map((d, index) => {
    const x = paddingX + (index / (HOURLY_REPORTS_CHART_DATA.length - 1)) * (width - 2 * paddingX);
    const y = height - paddingY - (d.reports / maxVal) * (height - 2 * paddingY);
    return { ...d, x, y };
  });

  // Generate smooth SVG curve
  const pathD = points.reduce((acc, curr, idx, arr) => {
    if (idx === 0) return `M ${curr.x} ${curr.y}`;
    const prev = arr[idx - 1];
    const cp1x = prev.x + (curr.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (curr.x - prev.x) / 2;
    const cp2y = curr.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs transition-all">
      {/* Header and Tab Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]/70 mb-5">
        <div>
          <h2 className="text-base font-bold text-[#0B285A] tracking-tight">
            Real-time Analytics
          </h2>
          <p className="text-xs text-[#64748B]">
            Temporal volume and multi-source corroboration patterns
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 bg-[#F1F6FD] p-1 rounded-xl">
          {(['Reports Over Time', 'Verification Status', 'Source Distribution'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-white text-[#2563EB] shadow-xs font-semibold'
                  : 'text-[#64748B] hover:text-[#12336B]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Reports Over Time (Line Chart) */}
      {activeTab === 'Reports Over Time' && (
        <div>
          {/* Controls sub-bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold font-mono text-[#0B285A] tabular-nums">
                12,482
              </span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>+18.4% influx</span>
              </span>
            </div>

            {/* Time range pills */}
            <div className="flex items-center gap-1 text-[11px] font-mono">
              {(['1H', '6H', '24H', '7D'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                    timeRange === range
                      ? 'bg-[#EEF6FF] text-[#2563EB] font-bold'
                      : 'text-[#94A3B8] hover:text-[#12336B]'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Chart Container */}
          <div className="relative w-full h-[230px] select-none">
            <svg
              className="w-full h-full overflow-visible"
              viewBox={`0 0 ${width} ${height}`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.18" />
                  <stop offset="90%" stopColor="#2563EB" stopOpacity="0.0" />
                </linearGradient>

                <linearGradient id="lineStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid Lines */}
              {[0.25, 0.5, 0.75, 1].map((ratio) => {
                const y = height - paddingY - ratio * (height - 2 * paddingY);
                return (
                  <g key={ratio}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={width - paddingX}
                      y2={y}
                      stroke="#E2E8F0"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={paddingX - 8}
                      y={y + 3}
                      fill="#94A3B8"
                      fontSize="9"
                      fontFamily="JetBrains Mono"
                      textAnchor="end"
                    >
                      {Math.round(ratio * maxVal).toLocaleString()}
                    </text>
                  </g>
                );
              })}

              {/* Area fill */}
              <path d={areaD} fill="url(#areaGradient)" />

              {/* Line path */}
              <path
                d={pathD}
                fill="none"
                stroke="url(#lineStroke)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points & Interactive Hover Hotspots */}
              {points.map((pt, idx) => {
                const isSelected = hoveredPoint?.time === pt.time;

                return (
                  <g key={idx}>
                    {/* Visual dot */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? 5 : 3.5}
                      fill={isSelected ? '#2563EB' : '#FFFFFF'}
                      stroke="#2563EB"
                      strokeWidth={isSelected ? 2.5 : 2}
                      className="transition-all duration-150"
                    />

                    {/* Invisible larger hover target */}
                    <rect
                      x={pt.x - 20}
                      y={0}
                      width={40}
                      height={height}
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() =>
                        setHoveredPoint({
                          time: pt.time,
                          reports: pt.reports,
                          verified: pt.verified,
                          x: pt.x,
                          y: pt.y,
                        })
                      }
                    />

                    {/* Time labels along X-axis */}
                    <text
                      x={pt.x}
                      y={height - 8}
                      fill="#94A3B8"
                      fontSize="9"
                      fontFamily="Inter"
                      textAnchor="middle"
                    >
                      {pt.time}
                    </text>
                  </g>
                );
              })}

              {/* Vertical Guide Line on Hover */}
              {hoveredPoint && (
                <line
                  x1={hoveredPoint.x}
                  y1={paddingY}
                  x2={hoveredPoint.x}
                  y2={height - paddingY}
                  stroke="#2563EB"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  opacity="0.6"
                />
              )}
            </svg>

            {/* Hover Tooltip Card */}
            {hoveredPoint && (
              <div
                className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3"
                style={{
                  left: `${(hoveredPoint.x / width) * 100}%`,
                  top: `${(hoveredPoint.y / height) * 100}%`,
                }}
              >
                <div className="bg-white border border-[#2563EB]/30 rounded-xl px-3 py-2 shadow-lg text-xs space-y-0.5">
                  <div className="text-[10px] font-mono text-[#64748B]">
                    {hoveredPoint.time}
                  </div>
                  <div className="text-xs font-bold text-[#0B285A] font-mono tabular-nums">
                    {hoveredPoint.reports.toLocaleString()} reports
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">
                    {hoveredPoint.verified.toLocaleString()} ground-verified
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Verification Status */}
      {activeTab === 'Verification Status' && (
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
              <span className="text-[11px] font-bold uppercase text-emerald-700">
                Ground Verified
              </span>
              <div className="text-2xl font-bold font-mono text-emerald-800 mt-1 tabular-nums">
                2,341
              </div>
              <p className="text-[11px] text-[#64748B] mt-1">
                Cross-corroborated by ≥3 independent sources
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-100">
              <span className="text-[11px] font-bold uppercase text-amber-700">
                Pending Triangulation
              </span>
              <div className="text-2xl font-bold font-mono text-amber-800 mt-1 tabular-nums">
                856
              </div>
              <p className="text-[11px] text-[#64748B] mt-1">
                Awaiting secondary sensor or radar validation
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-100">
              <span className="text-[11px] font-bold uppercase text-rose-700">
                Flagged / Isolated
              </span>
              <div className="text-2xl font-bold font-mono text-rose-800 mt-1 tabular-nums">
                342
              </div>
              <p className="text-[11px] text-[#64748B] mt-1">
                Quarantined spam, rumors or old repurposed media
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-xs text-[#64748B] flex items-center justify-between">
            <span>Overall National Verification Efficiency: <strong className="text-[#12336B]">92.8% Precision</strong></span>
            <span className="text-[#2563EB] font-medium cursor-pointer">View Verification Audit Log →</span>
          </div>
        </div>
      )}

      {/* Tab 3: Source Distribution */}
      {activeTab === 'Source Distribution' && (
        <div className="space-y-4 py-2">
          <div className="space-y-2.5">
            {SOURCE_DISTRIBUTION_DATA.map((item) => (
              <div key={item.source} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#12336B]">{item.source}</span>
                  <span className="font-mono text-[#64748B] tabular-nums">
                    {item.reports.toLocaleString()} ({item.share}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-[#F1F6FD] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.share}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#EEF6FF] rounded-xl text-xs text-[#2563EB] font-medium flex items-center justify-between">
            <span>Dynamic Multi-Source Balancing Active</span>
            <span>Latency &lt; 250ms</span>
          </div>
        </div>
      )}
    </div>
  );
};
