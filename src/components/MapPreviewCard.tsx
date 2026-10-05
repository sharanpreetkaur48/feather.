import React from 'react';
import { Map, ArrowRight, Layers, Compass, Radio } from 'lucide-react';

interface MapPreviewCardProps {
  onOpenMap: () => void;
  activeEventsCount?: number;
}

export const MapPreviewCard: React.FC<MapPreviewCardProps> = ({
  onOpenMap,
  activeEventsCount = 6,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0B285A] via-[#12336B] to-[#1E3A8A] rounded-3xl p-8 text-white shadow-lg mb-8 transition-all group">
      {/* Meteorological atmospheric radar background overlay with clean styling */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        {/* Concentric radar rings */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-cyan-400/30"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-cyan-400/40"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[160px] h-[160px] rounded-full border border-cyan-400/50"></div>
        {/* Radar beam sweep line */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[480px] h-[480px] animate-radar">
          <div className="w-1/2 h-1/2 bg-gradient-to-tr from-cyan-400/20 to-transparent origin-bottom-right"></div>
        </div>
      </div>

      {/* Floating subtle weather event markers over preview */}
      <div className="absolute right-12 top-10 hidden md:block z-0 pointer-events-none">
        <div className="relative w-64 h-48">
          <div className="absolute top-6 left-10 p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs shadow-md">
            <span className="text-cyan-300 font-bold">● Ludhiana</span>
            <span className="block text-[10px] text-slate-300">Heavy Rain · 82mm</span>
          </div>

          <div className="absolute top-20 right-6 p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs shadow-md">
            <span className="text-purple-300 font-bold">● Jaipur</span>
            <span className="block text-[10px] text-slate-300">Squall · 48km/h</span>
          </div>

          <div className="absolute bottom-4 left-24 p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs shadow-md">
            <span className="text-emerald-300 font-bold">● Chennai</span>
            <span className="block text-[10px] text-slate-300">Subway Inundation</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-cyan-300 text-[11px] font-semibold tracking-wider uppercase">
          <Compass className="w-3.5 h-3.5" />
          <span>GEOSPATIAL INTELLIGENCE LAYER</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
          Explore Weather Events<br />
          on Interactive Map
        </h2>

        <p className="text-sm text-slate-200 leading-relaxed max-w-md">
          Visualize real-time weather events across India with our interactive map.
          Triangulate citizen dispatches, radar reflectivity, and official IMD warning polygons.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <button
            onClick={onOpenMap}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-[#0B285A] hover:bg-slate-100 font-bold text-xs shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Open Map →</span>
            <ArrowRight className="w-4 h-4 text-[#2563EB]" />
          </button>

          <span className="text-xs text-cyan-200 flex items-center gap-1.5 font-medium">
            <Radio className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
            <span>{activeEventsCount} active regional clusters tracked</span>
          </span>
        </div>
      </div>
    </div>
  );
};
