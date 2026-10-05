import React, { useState } from 'react';
import { 
  Share2, 
  Globe, 
  Cpu, 
  Camera, 
  Video, 
  FileText, 
  ShieldCheck, 
  ArrowDown, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Activity,
  ArrowRight
} from 'lucide-react';
import { WeatherEvent } from '../types/weather';

interface EventFusionExplainerProps {
  onInspectEvent?: (event: WeatherEvent) => void;
  sampleEvent: WeatherEvent;
}

export const EventFusionExplainer: React.FC<EventFusionExplainerProps> = ({
  onInspectEvent,
  sampleEvent,
}) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'comparison'>('flow');

  const rawInputStreams = [
    { label: 'Social Report', count: '68 tweets', icon: Share2, color: '#2563EB' },
    { label: 'News Website', count: '8 articles', icon: Globe, color: '#8B5CF6' },
    { label: 'Doppler / AWS API', count: '14 sensor pings', icon: Cpu, color: '#06B6D4' },
    { label: 'Citizen Report', count: '32 dispatches', icon: Camera, color: '#10B981' },
    { label: 'Ground Photos', count: '6 verified', icon: Camera, color: '#F59E0B' },
    { label: 'Ground Video', count: '3 clips', icon: Video, color: '#EC4899' },
    { label: 'Official IMD Data', count: '1 alert', icon: FileText, color: '#2563EB' },
  ];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs mb-8 transition-all">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]/70 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB]">
              Core Architectural Innovation · SIH 26069
            </span>
          </div>
          <h2 className="text-lg font-bold text-[#0B285A] tracking-tight mt-0.5">
            Trusted Weather Event Fusion
          </h2>
          <p className="text-xs text-[#64748B]">
            “MANY NOISY REPORTS → ONE TRUSTED, EVOLVING WEATHER INCIDENT”
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-[#F1F6FD] p-1 rounded-xl text-xs font-medium">
          <button
            onClick={() => setActiveTab('flow')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'flow'
                ? 'bg-white text-[#2563EB] shadow-xs font-semibold'
                : 'text-[#64748B] hover:text-[#12336B]'
            }`}
          >
            Fusion Architecture
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'comparison'
                ? 'bg-white text-[#2563EB] shadow-xs font-semibold'
                : 'text-[#64748B] hover:text-[#12336B]'
            }`}
          >
            Raw Chaos vs Synthesized Truth
          </button>
        </div>
      </div>

      {activeTab === 'flow' ? (
        /* Visual Vertical / Multi-Step Fusion Stream */
        <div className="space-y-6">
          {/* Step 1: Fragmented Multi-Source Stream */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-3 text-center sm:text-left">
              Step 1: Heterogeneous Raw Inputs Ingested (7 Disparate Sources)
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {rawInputStreams.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col items-center text-center shadow-xs hover:border-[#2563EB]/40 transition-colors"
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center mb-1.5"
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-bold text-[#12336B] leading-tight">
                      {item.label}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748B] mt-0.5">
                      {item.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Central Downward Connector & Engine Node */}
          <div className="flex flex-col items-center justify-center py-1">
            <ArrowDown className="w-5 h-5 text-[#2563EB] animate-bounce" />

            {/* AI FUSION ENGINE CARD */}
            <div className="my-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#EEF6FF] via-[#F1F6FD] to-[#EEF6FF] border-2 border-[#2563EB]/40 shadow-sm text-center max-w-md w-full relative">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
                <span className="text-xs font-bold text-[#0B285A] tracking-wider uppercase">
                  AI FUSION ENGINE
                </span>
                <span className="text-[10px] bg-blue-100 text-[#2563EB] px-2 py-0.2 rounded-full font-mono">
                  v2.6
                </span>
              </div>
              <p className="text-[11px] text-[#64748B]">
                Spatio-temporal clustering (DBSCAN) + Multimodal image pHash deduplication + Bayes belief network corroboration
              </p>
            </div>

            <ArrowDown className="w-5 h-5 text-[#10B981]" />
          </div>

          {/* Step 3: Consolidated ONE Weather Incident */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-2 text-center sm:text-left">
              Step 2: Unified Output → ONE Actionable Weather Incident
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-white to-[#F7FAFF] border-2 border-emerald-500/50 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      ✓ Fused Intelligence
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                      ACTIVE
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0B285A]">
                    {sampleEvent.title} · {sampleEvent.location}
                  </h3>

                  <p className="text-xs text-[#64748B] mt-1">
                    {sampleEvent.groundEvidence.summary}
                  </p>
                </div>

                {/* Right Metrics on Card */}
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <div className="text-right">
                    <div className="text-lg font-bold font-mono text-[#0B285A] tabular-nums">
                      126
                    </div>
                    <div className="text-[10px] text-[#64748B]">Total Reports</div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold font-mono text-[#0B285A] tabular-nums">
                      8
                    </div>
                    <div className="text-[10px] text-[#64748B]">Indep. Sources</div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold font-mono text-[#0B285A] tabular-nums">
                      41
                    </div>
                    <div className="text-[10px] text-[#64748B]">Confirmations</div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold font-mono text-emerald-600 tabular-nums">
                      92%
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold">Confidence</div>
                  </div>

                  {onInspectEvent && (
                    <button
                      onClick={() => onInspectEvent(sampleEvent)}
                      className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Inspect Event</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Side by Side Comparison */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-3">
            <div className="flex items-center justify-between text-rose-800">
              <span className="text-xs font-bold uppercase">Without Fusion (Fragmented Chaos)</span>
              <span className="text-[10px] font-mono bg-rose-100 px-2 py-0.5 rounded">Legacy Approach</span>
            </div>
            <ul className="space-y-2 text-xs text-[#64748B]">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Hundreds of scattered social posts and fake rumors overwhelm operators</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Duplicate forwarded photos from previous years shared as breaking news</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">✕</span>
                <span>Disaster commanders struggle to discern true local water depths</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-3">
            <div className="flex items-center justify-between text-emerald-800">
              <span className="text-xs font-bold uppercase">With feather. AI Fusion (Operational Truth)</span>
              <span className="text-[10px] font-mono bg-emerald-100 px-2 py-0.5 rounded">SIH 26069 Solution</span>
            </div>
            <ul className="space-y-2 text-xs text-[#12336B]">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Deduplicates 126 chaotic reports into a single consolidated active incident</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Cross-triangulates citizen camera angles with automated rain gauge telemetry</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Provides continuous 24/7 evolution lifecycle with ground truth verification</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
