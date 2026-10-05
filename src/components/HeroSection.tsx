import React, { useState } from 'react';
import { 
  ArrowRight, 
  Play, 
  Share2, 
  Globe, 
  Cpu, 
  Database, 
  Camera, 
  CheckCircle2, 
  Layers, 
  CopyCheck, 
  ShieldAlert, 
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface HeroSectionProps {
  onExploreData: () => void;
  onWatchDemo: () => void;
  onSelectPipelineStage?: (stageKey: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreData,
  onWatchDemo,
  onSelectPipelineStage,
}) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const incomingSources = [
    {
      id: 'src-social',
      title: 'Social Media',
      subtitle: '#IMD #Rainfall #Flood',
      icon: Share2,
      color: '#2563EB',
      dotY: 18,
    },
    {
      id: 'src-web',
      title: 'Websites',
      subtitle: 'News • Weather Sites',
      icon: Globe,
      color: '#8B5CF6',
      dotY: 34,
    },
    {
      id: 'src-api',
      title: 'APIs',
      subtitle: 'IMD • Open Data',
      icon: Cpu,
      color: '#06B6D4',
      dotY: 50,
    },
    {
      id: 'src-dataset',
      title: 'Public Datasets',
      subtitle: 'Historical • Forecasts',
      icon: Database,
      color: '#F59E0B',
      dotY: 66,
    },
    {
      id: 'src-citizen',
      title: 'Citizen Reports',
      subtitle: 'Photos • Videos • Text',
      icon: Camera,
      color: '#10B981',
      dotY: 82,
    },
  ];

  const outgoingInsights = [
    {
      id: 'out-verified',
      title: 'Verified Reports',
      icon: CheckCircle2,
      color: '#10B981',
      dotY: 18,
    },
    {
      id: 'out-categorized',
      title: 'Categorized Events',
      icon: Layers,
      color: '#2563EB',
      dotY: 34,
    },
    {
      id: 'out-duplicate',
      title: 'Duplicate Removal',
      icon: CopyCheck,
      color: '#06B6D4',
      dotY: 50,
    },
    {
      id: 'out-fraud',
      title: 'Fraud Detection',
      icon: ShieldAlert,
      color: '#EC4899',
      dotY: 66,
    },
    {
      id: 'out-analytics',
      title: 'Insights & Analytics',
      icon: TrendingUp,
      color: '#8B5CF6',
      dotY: 82,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white border border-[#E2E8F0] rounded-3xl p-8 lg:p-10 shadow-xs mb-8 transition-all">
      {/* Subtle atmospheric background gradient */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-[#EEF6FF] via-[#F1F6FD]/60 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-8 items-center">
        {/* Left Column: Solution Brief */}
        <div className="xl:col-span-5 space-y-6">
          {/* Small Outlined Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2563EB]/30 bg-[#EEF6FF]/70 text-[#2563EB] text-[11px] font-semibold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"></span>
            <span>FEATHER. NATIONAL WEATHER DATA INTELLIGENCE PLATFORM</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#0B285A] leading-[1.08] tracking-[-0.025em]">
            Real-time Weather Information{' '}
            <span className="text-[#2563EB]">from Multiple Sources</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-[15px] sm:text-[16px] text-[#64748B] leading-relaxed max-w-xl">
            We collect, process and analyse weather-related information from social media, 
            websites, APIs, public datasets and citizen reports using advanced AI and 
            big data technologies.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={onExploreData}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Explore Data</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onWatchDemo}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F1F6FD] hover:bg-[#EEF6FF] border border-[#E2E8F0] text-[#12336B] text-sm font-medium transition-all active:scale-[0.98] cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-[#2563EB] fill-[#2563EB]" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Mini Footnote */}
          <div className="pt-2 flex items-center gap-2 text-xs text-[#94A3B8]">
            <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>SIH 2026 Problem Statement 26069 Prototype</span>
          </div>
        </div>

        {/* Right Column: Hero Data-Flow Visual */}
        <div className="xl:col-span-7 bg-[#F7FAFF]/80 border border-[#E2E8F0] rounded-2xl p-4 lg:p-6 relative">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]/60 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#12336B]">
                Ingestion-to-Intelligence Architecture
              </span>
              <span className="text-[10px] bg-blue-100 text-[#2563EB] px-2 py-0.5 rounded-full font-mono">
                12,482 events/hr
              </span>
            </div>
            <span className="text-[11px] text-[#64748B]">Continuous Multi-Stream Fusion</span>
          </div>

          {/* Visual Container */}
          <div className="relative h-[340px] w-full flex items-center justify-between">
            {/* SVG Connecting Flow Lines & Animated Particles */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 700 340"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Soft glow for lines */}
                <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="flowGradIn" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.45" />
                </linearGradient>
                <linearGradient id="flowGradOut" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* 5 Inward Curves (Left to Center) */}
              {[
                { y: 35, path: 'M 190 35 C 270 35, 280 170, 350 170' },
                { y: 100, path: 'M 190 100 C 260 100, 290 170, 350 170' },
                { y: 170, path: 'M 190 170 C 260 170, 300 170, 350 170' },
                { y: 240, path: 'M 190 240 C 260 240, 290 170, 350 170' },
                { y: 305, path: 'M 190 305 C 270 305, 280 170, 350 170' },
              ].map((item, idx) => (
                <g key={`in-${idx}`}>
                  <path
                    d={item.path}
                    fill="none"
                    stroke="url(#flowGradIn)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  {/* Subtle animated moving particle */}
                  <circle r="3" fill="#2563EB" opacity="0.85">
                    <animateMotion
                      path={item.path}
                      dur={`${2.2 + idx * 0.4}s`}
                      repeatCount="indefinite"
                      rotate="auto"
                    />
                  </circle>
                </g>
              ))}

              {/* 5 Outward Curves (Center to Right) */}
              {[
                { y: 35, path: 'M 350 170 C 420 170, 440 35, 510 35' },
                { y: 100, path: 'M 350 170 C 410 170, 440 100, 510 100' },
                { y: 170, path: 'M 350 170 C 410 170, 450 170, 510 170' },
                { y: 240, path: 'M 350 170 C 410 170, 440 240, 510 240' },
                { y: 305, path: 'M 350 170 C 420 170, 440 305, 510 305' },
              ].map((item, idx) => (
                <g key={`out-${idx}`}>
                  <path
                    d={item.path}
                    fill="none"
                    stroke="url(#flowGradOut)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  {/* Subtle animated moving particle */}
                  <circle r="3" fill="#10B981" opacity="0.85">
                    <animateMotion
                      path={item.path}
                      dur={`${2.4 + idx * 0.3}s`}
                      repeatCount="indefinite"
                      rotate="auto"
                    />
                  </circle>
                </g>
              ))}
            </svg>

            {/* Left Column: 5 Incoming Sources */}
            <div className="w-[180px] flex flex-col justify-between h-full z-10 py-1">
              {incomingSources.map((src) => {
                const Icon = src.icon;
                const isHovered = activeNode === src.id;

                return (
                  <div
                    key={src.id}
                    onMouseEnter={() => setActiveNode(src.id)}
                    onMouseLeave={() => setActiveNode(null)}
                    className={`flex items-center gap-2 p-1.5 px-2.5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#2563EB]/40 hover:shadow-sm transition-all cursor-pointer group ${
                      isHovered ? 'scale-[1.02] bg-[#EEF6FF]' : ''
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${src.color}15`, color: src.color }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-[#12336B] truncate group-hover:text-[#2563EB]">
                        {src.title}
                      </div>
                      <div className="text-[9px] text-[#64748B] truncate">
                        {src.subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center: Circular AI Processing Node */}
            <div className="z-20 relative flex flex-col items-center justify-center">
              {/* Soft atmospheric glow (no harsh cyberpunk) */}
              <div className="absolute w-36 h-36 rounded-full bg-[#2563EB]/10 blur-xl animate-pulse-subtle pointer-events-none"></div>

              <div
                onClick={() => onSelectPipelineStage && onSelectPipelineStage('CLASSIFY')}
                className="relative w-28 h-28 rounded-full bg-white border-2 border-[#2563EB] shadow-md flex flex-col items-center justify-center text-center p-2 cursor-pointer hover:scale-105 transition-all group"
              >
                {/* Thin outer orbital ring */}
                <div className="absolute inset-[-6px] rounded-full border border-[#22D3EE]/30 animate-spin" style={{ animationDuration: '24s' }}></div>

                <div className="w-7 h-7 rounded-full bg-[#EEF6FF] text-[#2563EB] flex items-center justify-center mb-1 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-[#0B285A] leading-tight">
                  AI + Big Data
                </div>
                <div className="text-[9px] font-medium text-[#2563EB] leading-tight mt-0.5">
                  Processing
                </div>
              </div>
            </div>

            {/* Right Column: 5 Outgoing Intelligence Insights */}
            <div className="w-[180px] flex flex-col justify-between h-full z-10 py-1">
              {outgoingInsights.map((out) => {
                const Icon = out.icon;
                const isHovered = activeNode === out.id;

                return (
                  <div
                    key={out.id}
                    onMouseEnter={() => setActiveNode(out.id)}
                    onMouseLeave={() => setActiveNode(null)}
                    className={`flex items-center gap-2 p-1.5 px-2.5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs hover:border-[#10B981]/50 hover:shadow-sm transition-all cursor-pointer group ${
                      isHovered ? 'scale-[1.02] bg-[#F1F6FD]' : ''
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${out.color}15`, color: out.color }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-[#12336B] truncate group-hover:text-[#10B981]">
                        {out.title}
                      </div>
                      <div className="text-[9px] text-[#64748B] truncate">
                        Synthesized & Ready
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
