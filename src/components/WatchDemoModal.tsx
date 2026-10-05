import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Share2, 
  Cpu, 
  ShieldAlert, 
  Activity, 
  Layers 
} from 'lucide-react';

interface WatchDemoModalProps {
  onClose: () => void;
  onExploreData: () => void;
}

export const WatchDemoModal: React.FC<WatchDemoModalProps> = ({
  onClose,
  onExploreData,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      title: 'Problem Statement 26069 Context',
      subtitle: 'Fragmented, Unstructured Weather Dispatches',
      description: 'During monsoons, cyclones, and heatwaves, thousands of citizens, news outlets, and weather stations publish unstructured information across social channels, regional blogs, and APIs. Disparate sources cause noise, delayed emergency responses, and misinformation.',
      highlight: 'Challenge: How to automatically collect, clean, categorize, deduplicate, and verify scattered dispatches in real-time.',
      icon: Share2,
      badge: 'Step 01 / 04',
      badgeColor: 'text-blue-600 bg-blue-50',
    },
    {
      title: 'Multi-Source Ingestion & NLP Cleaning',
      subtitle: 'Real-Time Pipeline Processing',
      description: 'The platform ingests streaming data from Twitter/X, citizen smartphone uploads, IMD Doppler radars, AWS stations, and regional news RSS feeds. Ingest engines strip spam, fake rumors, and advertising while normalizing vernacular Indian languages.',
      highlight: 'Performance: 12,482 reports/hr normalized into standard geospatial schema.',
      icon: Cpu,
      badge: 'Step 02 / 04',
      badgeColor: 'text-cyan-600 bg-cyan-50',
    },
    {
      title: 'AI Deduplication & Cross-Corroboration',
      subtitle: 'Spatio-Temporal Event Clustering',
      description: 'DBSCAN clustering and perceptual media hashing merge redundant reports originating from the same coordinates. The AI cross-references citizen photos with automated rain gauges to generate a probabilistic Bayes confidence score.',
      highlight: 'Result: 126 scattered posts consolidated into 1 verified severe weather incident.',
      icon: Layers,
      badge: 'Step 03 / 04',
      badgeColor: 'text-purple-600 bg-purple-50',
    },
    {
      title: 'Ground Reality vs Official Forecast',
      subtitle: 'Actionable Intelligence for Disaster Response',
      description: 'Commanders receive synthesized event dossiers showing both official IMD forecasts and ground evidence (citizen photos, street inundation depths). Community feedback validates real-time conditions without declaring forecasts wrong.',
      highlight: 'Outcome: Safer communities and data-backed disaster mitigation.',
      icon: ShieldAlert,
      badge: 'Step 04 / 04',
      badgeColor: 'text-emerald-600 bg-emerald-50',
    },
  ];

  const activeDemo = demoSteps[currentStep];
  const Icon = activeDemo.icon;

  return (
    <div className="fixed inset-0 bg-[#0B285A]/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#E2E8F0] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#2563EB] text-white flex items-center justify-center">
              <Play className="w-4 h-4 fill-white" />
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                Interactive Architecture Demo
              </span>
              <h3 className="text-base font-bold text-[#0B285A]">
                Smart India Hackathon 2026 Solution Walkthrough
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200/60 flex items-center justify-center text-[#64748B] hover:text-[#12336B] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="grid grid-cols-4 border-b border-[#E2E8F0] text-center text-[11px] font-medium">
          {demoSteps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`py-3 px-2 transition-all cursor-pointer ${
                currentStep === idx
                  ? 'bg-white text-[#2563EB] border-b-2 border-[#2563EB] font-bold'
                  : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#12336B]'
              }`}
            >
              0{idx + 1}. {step.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-8 space-y-6 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${activeDemo.badgeColor}`}
              >
                {activeDemo.badge}
              </span>
              <h4 className="text-xl font-bold text-[#0B285A] mt-1">
                {activeDemo.title}
              </h4>
              <p className="text-xs text-[#64748B]">{activeDemo.subtitle}</p>
            </div>
          </div>

          <p className="text-sm text-[#334155] leading-relaxed">
            {activeDemo.description}
          </p>

          <div className="p-4 rounded-2xl bg-[#EEF6FF] border border-[#2563EB]/20 text-[#12336B] font-medium text-xs">
            <span className="font-bold text-[#2563EB] block mb-1">Architecture Insight:</span>
            {activeDemo.highlight}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-4 py-2 rounded-xl bg-white border border-[#E2E8F0] text-[#12336B] hover:bg-slate-50 text-xs font-semibold cursor-pointer"
              >
                Previous
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {currentStep < demoSteps.length - 1 ? (
              <button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onExploreData();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Explore Live Platform</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
