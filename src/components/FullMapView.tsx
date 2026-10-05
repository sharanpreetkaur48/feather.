import React, { useState } from 'react';
import { 
  Layers, 
  MapPin, 
  Search, 
  Filter, 
  Maximize2, 
  CloudRain, 
  Zap, 
  Waves, 
  Sun, 
  Wind, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Eye,
  Sliders,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { WeatherEvent, EventCategory } from '../types/weather';

interface FullMapViewProps {
  events: WeatherEvent[];
  onSelectEvent: (event: WeatherEvent) => void;
  onBackToDashboard: () => void;
}

export const FullMapView: React.FC<FullMapViewProps> = ({
  events,
  onSelectEvent,
  onBackToDashboard,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLayers, setActiveLayers] = useState({
    radar: true,
    satellite: true,
    citizenPins: true,
    imdAlerts: true,
  });
  const [activeMarker, setActiveMarker] = useState<WeatherEvent | null>(events[0]);
  const [mapSearch, setMapSearch] = useState<string>('');

  const toggleLayer = (layerKey: keyof typeof activeLayers) => {
    setActiveLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const filteredEvents = events.filter((ev) => {
    const matchesCat = selectedCategory === 'All' || ev.category === selectedCategory;
    const matchesQuery = !mapSearch || ev.location.toLowerCase().includes(mapSearch.toLowerCase()) || ev.title.toLowerCase().includes(mapSearch.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const getMarkerIcon = (cat: EventCategory) => {
    switch (cat) {
      case 'Heavy Rain':
        return <CloudRain className="w-3.5 h-3.5 text-white" />;
      case 'Thunderstorm':
        return <Zap className="w-3.5 h-3.5 text-white" />;
      case 'Flooding':
        return <Waves className="w-3.5 h-3.5 text-white" />;
      case 'Heatwave':
        return <Sun className="w-3.5 h-3.5 text-white" />;
      case 'Fog':
        return <Wind className="w-3.5 h-3.5 text-white" />;
      default:
        return <MapPin className="w-3.5 h-3.5 text-white" />;
    }
  };

  const getMarkerColor = (cat: EventCategory) => {
    switch (cat) {
      case 'Heavy Rain':
        return '#2563EB';
      case 'Thunderstorm':
        return '#8B5CF6';
      case 'Flooding':
        return '#06B6D4';
      case 'Heatwave':
        return '#F59E0B';
      default:
        return '#10B981';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#0B285A]">
              National Weather Geospatial Intelligence
            </h1>
            <span className="text-[11px] font-semibold text-[#2563EB] bg-[#EEF6FF] px-2.5 py-0.5 rounded-full">
              Live Map · v2.6
            </span>
          </div>
          <p className="text-xs text-[#64748B]">
            Interactive geospatial triangulation of ground evidence, AWS telemetry, and Doppler radar
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={mapSearch}
              onChange={(e) => setMapSearch(e.target.value)}
              placeholder="Filter by city or state..."
              className="pl-8 pr-3 py-1.5 text-xs bg-[#F1F6FD] rounded-xl border-transparent focus:bg-white focus:border-[#2563EB]/40 outline-none text-[#12336B]"
            />
          </div>

          <button
            onClick={onBackToDashboard}
            className="px-4 py-2 rounded-xl bg-[#F1F6FD] hover:bg-[#EEF6FF] text-[#12336B] text-xs font-semibold transition-colors cursor-pointer"
          >
            ← Return to Dashboard
          </button>
        </div>
      </div>

      {/* Main Map Viewport & Details Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Map Canvas */}
        <div className="lg:col-span-8 bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-xs relative overflow-hidden min-h-[580px] flex flex-col justify-between">
          {/* Floating Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 z-20 mb-4 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-[#E2E8F0] w-fit shadow-xs">
            {['All', 'Heavy Rain', 'Thunderstorm', 'Flooding', 'Heatwave', 'Fog'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#2563EB] text-white font-semibold shadow-xs'
                    : 'text-[#64748B] hover:text-[#12336B] hover:bg-[#F1F6FD]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Map Layer Toggles */}
          <div className="absolute top-6 right-6 z-20 bg-white/95 backdrop-blur-md border border-[#E2E8F0] rounded-2xl p-3 shadow-md text-xs space-y-2">
            <div className="font-bold text-[#12336B] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Map Layers</span>
            </div>
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 cursor-pointer text-[#64748B] hover:text-[#12336B]">
                <input
                  type="checkbox"
                  checked={activeLayers.radar}
                  onChange={() => toggleLayer('radar')}
                  className="rounded text-[#2563EB] focus:ring-0"
                />
                <span>Doppler Radar Overlay</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[#64748B] hover:text-[#12336B]">
                <input
                  type="checkbox"
                  checked={activeLayers.citizenPins}
                  onChange={() => toggleLayer('citizenPins')}
                  className="rounded text-[#2563EB] focus:ring-0"
                />
                <span>Citizen Ground Evidence</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[#64748B] hover:text-[#12336B]">
                <input
                  type="checkbox"
                  checked={activeLayers.imdAlerts}
                  onChange={() => toggleLayer('imdAlerts')}
                  className="rounded text-[#2563EB] focus:ring-0"
                />
                <span>IMD Warning Zones</span>
              </label>
            </div>
          </div>

          {/* India Subcontinent Vector Map Graphic */}
          <div className="relative w-full h-[460px] flex items-center justify-center my-auto">
            {/* Base SVG Map of Indian Subcontinent outline */}
            <svg
              className="w-full h-full max-h-[460px]"
              viewBox="0 0 600 680"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="mapLandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F1F6FD" />
                  <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.8" />
                </linearGradient>

                <radialGradient id="radarReflectivity" cx="34%" cy="24%" r="18%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
                </radialGradient>

                <radialGradient id="stormReflectivity" cx="36%" cy="37%" r="14%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.35" />
                  <stop offset="80%" stopColor="#8B5CF6" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Simplified high-precision geographical silhouette of India */}
              <path
                d="M 230 40 
                   C 260 30, 290 50, 310 70 
                   C 330 90, 350 110, 330 140 
                   C 310 160, 360 170, 410 180 
                   C 460 180, 520 170, 540 210 
                   C 560 240, 520 270, 480 270 
                   C 440 270, 420 250, 390 260 
                   C 370 290, 400 340, 390 400 
                   C 380 440, 350 510, 310 580 
                   C 300 600, 290 620, 280 640 
                   C 260 600, 240 540, 230 490 
                   C 210 420, 200 370, 180 340 
                   C 160 320, 150 280, 140 250 
                   C 130 220, 160 190, 190 170 
                   C 210 140, 200 80, 230 40 Z"
                fill="url(#mapLandGrad)"
                stroke="#CBD5E1"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              {/* State boundary decorative soft outlines */}
              <path
                d="M 230 140 Q 280 160 330 170 M 180 230 Q 260 250 360 260 M 180 340 Q 280 360 380 360 M 230 460 Q 290 480 340 480"
                fill="none"
                stroke="#CBD5E1"
                strokeWidth="0.8"
                strokeDasharray="3 3"
              />

              {/* Active Radar Overlays if enabled */}
              {activeLayers.radar && (
                <>
                  <circle cx="210" cy="160" r="75" fill="url(#radarReflectivity)" />
                  <circle cx="220" cy="240" r="60" fill="url(#stormReflectivity)" />
                </>
              )}

              {/* IMD Warning Zones if enabled */}
              {activeLayers.imdAlerts && (
                <path
                  d="M 180 130 L 250 120 L 260 180 L 190 190 Z"
                  fill="#F59E0B"
                  fillOpacity="0.12"
                  stroke="#F59E0B"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
              )}
            </svg>

            {/* Interactive Weather Event Marker Pins positioned on map */}
            {filteredEvents.map((ev) => {
              const isSelected = activeMarker?.id === ev.id;
              const color = getMarkerColor(ev.category);

              return (
                <div
                  key={ev.id}
                  onClick={() => setActiveMarker(ev)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group"
                  style={{
                    left: `${ev.coords.xPercent}%`,
                    top: `${ev.coords.yPercent}%`,
                  }}
                >
                  {/* Outer pulse wave */}
                  <div
                    className="absolute -inset-2 rounded-full animate-ping opacity-75"
                    style={{ backgroundColor: color }}
                  />

                  {/* Marker Pin */}
                  <div
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 ${
                      isSelected
                        ? 'scale-125 ring-4 ring-white shadow-xl'
                        : 'group-hover:scale-110 ring-2 ring-white'
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {getMarkerIcon(ev.category)}
                  </div>

                  {/* Tooltip Label */}
                  <div className="absolute top-9 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-lg border border-[#E2E8F0] shadow-md whitespace-nowrap text-[10px] font-bold text-[#12336B] pointer-events-none">
                    {ev.location.split(',')[0]}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Map Legend */}
          <div className="z-20 pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between text-[11px] text-[#64748B]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
                <span>Heavy Rain</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span>
                <span>Thunderstorm</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]"></span>
                <span>Flooding</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
                <span>Heatwave</span>
              </span>
            </div>

            <div className="text-[10px] font-mono text-[#94A3B8]">
              Geodetic Datum: WGS 84 · Updated 40s ago
            </div>
          </div>
        </div>

        {/* Right Details Inspector Panel */}
        <div className="lg:col-span-4 bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          {activeMarker ? (
            <div className="space-y-5">
              <div className="pb-3 border-b border-[#E2E8F0]">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-[#2563EB] bg-[#EEF6FF] px-2 py-0.5 rounded-full">
                    {activeMarker.category}
                  </span>
                  <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                    {activeMarker.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0B285A]">
                  {activeMarker.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-[#64748B] mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>{activeMarker.location}</span>
                </div>
              </div>

              {/* Key Indicators */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                  <span className="text-[#64748B]">Reports Clustered</span>
                  <div className="text-lg font-bold font-mono text-[#12336B]">
                    {activeMarker.reportCount}
                  </div>
                </div>

                <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                  <span className="text-[#64748B]">Independent Sources</span>
                  <div className="text-lg font-bold font-mono text-[#12336B]">
                    {activeMarker.independentSources}
                  </div>
                </div>

                <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                  <span className="text-[#64748B]">Confirmations</span>
                  <div className="text-lg font-bold font-mono text-[#12336B]">
                    {activeMarker.communityConfirmations}
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <span className="text-emerald-700">AI Confidence</span>
                  <div className="text-lg font-bold font-mono text-emerald-800">
                    {activeMarker.confidence}%
                  </div>
                </div>
              </div>

              {/* Official Forecast vs Ground Evidence Summary */}
              <div className="space-y-3">
                <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-100 text-xs space-y-1">
                  <div className="font-bold text-blue-900 text-[10px] uppercase">
                    Official IMD Forecast
                  </div>
                  <p className="text-xs font-semibold text-[#0B285A]">
                    “{activeMarker.officialForecast.statement}”
                  </p>
                </div>

                <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-100 text-xs space-y-1">
                  <div className="font-bold text-emerald-900 text-[10px] uppercase">
                    Recent Ground Evidence
                  </div>
                  <p className="text-xs text-[#334155]">
                    {activeMarker.groundEvidence.summary}
                  </p>
                  <div className="text-[10px] text-emerald-700 font-semibold pt-1">
                    {activeMarker.groundEvidence.citizenReportsCount} reports · {activeMarker.groundEvidence.imagesCount} photos · {activeMarker.groundEvidence.videosCount} videos
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectEvent(activeMarker)}
                  className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Open Full Event Intelligence Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center p-6 text-xs text-[#94A3B8]">
              Select any event pin on the map to inspect live ground truth.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
