import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Sparkles, 
  Layers, 
  CopyCheck, 
  CheckCircle2, 
  LineChart, 
  ArrowRight, 
  ChevronRight,
  Info,
  Clock,
  MapPin,
  FileCheck,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { PipelineStage, StageDetailData } from '../types/weather';
import { PIPELINE_STAGES } from '../data/mockWeatherData';

interface DataProcessingPipelineProps {
  onOpenStageModal: (stage: PipelineStage) => void;
  selectedStage?: PipelineStage | null;
}

export const DataProcessingPipeline: React.FC<DataProcessingPipelineProps> = ({
  onOpenStageModal,
  selectedStage
}) => {
  const [activePulseIndex, setActivePulseIndex] = useState<number>(0);

  const stages: Array<{
    key: PipelineStage;
    label: string;
    sublabel: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
  }> = [
    {
      key: 'COLLECT',
      label: 'Collect',
      sublabel: 'Multi-source ingestion',
      icon: Inbox,
      accentColor: '#2563EB',
    },
    {
      key: 'CLEAN',
      label: 'Clean',
      sublabel: 'Remove noise & duplicates',
      icon: Sparkles,
      accentColor: '#06B6D4',
    },
    {
      key: 'CLASSIFY',
      label: 'Classify',
      sublabel: 'AI event categorization',
      icon: Layers,
      accentColor: '#8B5CF6',
    },
    {
      key: 'DEDUPLICATE',
      label: 'Deduplicate',
      sublabel: 'Merge similar reports',
      icon: CopyCheck,
      accentColor: '#EC4899',
    },
    {
      key: 'VERIFY',
      label: 'Verify',
      sublabel: 'Check authenticity & source',
      icon: CheckCircle2,
      accentColor: '#10B981',
    },
    {
      key: 'ANALYSE',
      label: 'Analyse',
      sublabel: 'Extract insights & patterns',
      icon: LineChart,
      accentColor: '#F59E0B',
    },
  ];

  // Subtle cyclic animation traveling through stages
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePulseIndex((prev) => (prev + 1) % stages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [stages.length]);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs mb-8 transition-all">
      {/* Title & Subtitle */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#0B285A] tracking-tight">
              Data Processing Pipeline
            </h2>
            <span className="text-[11px] font-semibold text-[#2563EB] bg-[#EEF6FF] px-2.5 py-0.5 rounded-full">
              Automated Pipeline
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            AI-powered workflow from raw data to verified insights (Click any stage to inspect)
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[#64748B]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="font-mono">Processing: 412 docs/sec</span>
        </div>
      </div>

      {/* Horizontal Pipeline Steps */}
      <div className="relative py-2">
        {/* Continuous Connecting Track Line */}
        <div className="hidden lg:block absolute top-[44px] left-[6%] right-[6%] h-[2px] bg-[#E2E8F0] z-0">
          {/* Animated active progress bar highlight */}
          <div
            className="h-full bg-gradient-to-r from-[#2563EB] via-[#22D3EE] to-[#10B981] transition-all duration-700 ease-out"
            style={{
              width: `${((activePulseIndex + 1) / stages.length) * 100}%`,
            }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-2 relative z-10">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isPulsing = activePulseIndex === idx;
            const isSelected = selectedStage === stage.key;

            return (
              <div
                key={stage.key}
                onClick={() => onOpenStageModal(stage.key)}
                className={`flex flex-col items-center text-center p-3 rounded-2xl border transition-all duration-300 cursor-pointer group select-none ${
                  isSelected
                    ? 'bg-[#EEF6FF] border-[#2563EB] shadow-sm'
                    : isPulsing
                    ? 'bg-white border-[#2563EB]/40 shadow-xs scale-[1.02]'
                    : 'bg-white border-[#E2E8F0] hover:border-[#2563EB]/40 hover:bg-[#F8FAFC]'
                }`}
              >
                {/* Elegant Circular Node */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mb-2.5 transition-all duration-300 relative ${
                    isPulsing
                      ? 'scale-110 shadow-md ring-4 ring-[#2563EB]/15'
                      : 'group-hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: `${stage.accentColor}12`,
                    color: stage.accentColor,
                  }}
                >
                  <Icon className="w-6 h-6 transition-transform group-hover:rotate-3" />

                  {/* Tiny step indicator badge */}
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border border-[#E2E8F0] text-[10px] font-mono font-bold text-[#64748B] flex items-center justify-center shadow-xs">
                    0{idx + 1}
                  </span>
                </div>

                {/* Node Title */}
                <span className="text-xs font-bold uppercase tracking-wider text-[#12336B] group-hover:text-[#2563EB] transition-colors">
                  {stage.label}
                </span>

                {/* Node Subtitle */}
                <span className="text-[11px] text-[#64748B] mt-0.5 line-clamp-2 leading-tight">
                  {stage.sublabel}
                </span>

                {/* Click hint pill on hover */}
                <span className="mt-2 text-[10px] font-medium text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                  <span>Inspect</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
