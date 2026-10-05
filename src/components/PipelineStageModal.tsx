import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Layers, 
  CopyCheck, 
  ShieldCheck, 
  Cpu, 
  Inbox, 
  Sparkles, 
  LineChart,
  ArrowRight,
  MapPin,
  Clock,
  FileText,
  AlertTriangle,
  Merge,
  Filter
} from 'lucide-react';
import { PipelineStage, StageDetailData } from '../types/weather';
import { PIPELINE_STAGES } from '../data/mockWeatherData';

interface PipelineStageModalProps {
  stageKey: PipelineStage;
  onClose: () => void;
  onNavigateStage?: (stage: PipelineStage) => void;
}

export const PipelineStageModal: React.FC<PipelineStageModalProps> = ({
  stageKey,
  onClose,
  onNavigateStage,
}) => {
  const [dedupMerged, setDedupMerged] = useState<boolean>(false);
  const stageData: StageDetailData = PIPELINE_STAGES[stageKey];

  const stageKeys: PipelineStage[] = [
    'COLLECT',
    'CLEAN',
    'CLASSIFY',
    'DEDUPLICATE',
    'VERIFY',
    'ANALYSE',
  ];

  return (
    <div className="fixed inset-0 bg-[#0B285A]/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#E2E8F0] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EEF6FF] text-[#2563EB] flex items-center justify-center font-bold text-sm">
              {stageKey === 'COLLECT' && <Inbox className="w-5 h-5" />}
              {stageKey === 'CLEAN' && <Sparkles className="w-5 h-5" />}
              {stageKey === 'CLASSIFY' && <Layers className="w-5 h-5" />}
              {stageKey === 'DEDUPLICATE' && <CopyCheck className="w-5 h-5" />}
              {stageKey === 'VERIFY' && <ShieldCheck className="w-5 h-5" />}
              {stageKey === 'ANALYSE' && <LineChart className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                {stageData.badge}
              </span>
              <h3 className="text-base font-bold text-[#0B285A]">
                {stageData.title}
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* High-level Description */}
          <p className="text-sm text-[#334155] leading-relaxed">
            {stageData.description}
          </p>

          {/* DEDUPLICATE SPECIAL VISUALIZATION */}
          {stageKey === 'DEDUPLICATE' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#12336B]">
                  DUPLICATE DETECTION & CONSOLIDATION
                </span>
                <button
                  onClick={() => setDedupMerged(!dedupMerged)}
                  className="px-3 py-1 rounded-lg bg-[#EEF6FF] text-[#2563EB] font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  {dedupMerged ? '↺ Re-separate Reports' : '⚡ Simulate Merge (1-Click)'}
                </button>
              </div>

              {!dedupMerged ? (
                <div className="space-y-2 p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
                  <div className="flex items-center justify-between text-[#64748B] pb-2 border-b border-[#E2E8F0]">
                    <span className="font-semibold text-rose-600">
                      ● 6 similar reports detected across 3 platforms
                    </span>
                    <span className="text-[11px] font-mono">Radius: 1.8km · Window: 15m</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {[
                      { src: 'Social Post', text: 'Waterlogging near Ludhiana clock tower', time: '10:38 AM' },
                      { src: 'Citizen App', text: 'Knee deep water near Ghanta Ghar, Ludhiana', time: '10:39 AM' },
                      { src: 'Citizen App', text: 'Severe rain and drain overflow clock tower', time: '10:40 AM' },
                      { src: 'Social Post', text: 'Ludhiana clock tower flooded cars stuck', time: '10:41 AM' },
                    ].map((rep, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs"
                      >
                        <div className="flex items-center justify-between text-[10px] text-[#64748B] mb-1">
                          <span className="font-semibold text-[#12336B]">{rep.src}</span>
                          <span>{rep.time}</span>
                        </div>
                        <p className="text-[11px] text-[#334155] truncate">“{rep.text}”</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-[11px] text-[#64748B] flex items-center justify-between">
                    <span>Similarity checks: time · location · text · media</span>
                    <span className="text-[#2563EB] font-semibold">Consolidating...</span>
                  </div>
                </div>
              ) : (
                <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3 animate-in fade-in zoom-in-95">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>1 Consolidated Weather Incident Formed</span>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-emerald-100 space-y-1">
                    <div className="text-xs font-bold text-[#12336B]">
                      Heavy Rainfall & Inundation · Clock Tower, Ludhiana
                    </div>
                    <div className="text-[11px] text-[#64748B]">
                      Consolidated 6 dispatches into single high-confidence evidence graph. Redundant tokens pruned; media perceptual hashes deduplicated.
                    </div>
                  </div>

                  <div className="text-[11px] text-emerald-700 font-medium">
                    ✓ Evaluated: Time (±6 min) · Location (1.8 km) · NLP Semantics (0.84 Cosine) · Media pHash (Match)
                  </div>
                </div>
              )}
            </div>
          ) : stageKey === 'CLASSIFY' ? (
            /* CLASSIFY SPECIAL VISUALIZATION */
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#12336B]">
                AI EVENT CLASSIFICATION
              </span>

              <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] space-y-2">
                <div className="text-[11px] font-semibold text-[#64748B]">
                  Incoming Unstructured Report:
                </div>
                <p className="text-sm font-medium text-[#12336B] leading-relaxed">
                  “Heavy rain and waterlogging in Ludhiana since morning, roads near clock tower completely inundated.”
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="text-[10px] text-blue-600 font-semibold uppercase">
                    Detected Primary Event
                  </div>
                  <div className="text-sm font-bold text-[#12336B] mt-0.5">
                    HEAVY RAIN
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-100">
                  <div className="text-[10px] text-cyan-600 font-semibold uppercase">
                    Secondary Event
                  </div>
                  <div className="text-sm font-bold text-[#12336B] mt-0.5">
                    FLOODING
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-purple-50 border border-purple-100">
                  <div className="text-[10px] text-purple-600 font-semibold uppercase">
                    Extracted Location
                  </div>
                  <div className="text-sm font-bold text-[#12336B] mt-0.5">
                    Ludhiana, Punjab
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <div className="text-[10px] text-emerald-600 font-semibold uppercase">
                    AI Confidence
                  </div>
                  <div className="text-sm font-bold text-emerald-700 mt-0.5 font-mono">
                    94%
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 col-span-2">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">
                    Taxonomy Status
                  </div>
                  <div className="text-sm font-bold text-emerald-600 mt-0.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Classified Successfully</span>
                  </div>
                </div>
              </div>
            </div>
          ) : stageKey === 'VERIFY' ? (
            /* VERIFY SPECIAL VISUALIZATION */
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#12336B]">
                VERIFICATION & CROSS-CORROBORATION
              </span>

              <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#64748B]">Source Diversity:</span>
                    <p className="font-bold text-[#12336B]">8 Independent Platforms</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Timestamp Range:</span>
                    <p className="font-bold text-[#12336B]">10:21 AM – 10:40 AM</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Location Verification:</span>
                    <p className="font-bold text-[#12336B]">GPS 350m radius verified</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Media Evidence:</span>
                    <p className="font-bold text-[#12336B]">6 images + 3 videos verified</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Sensor Corroboration:</span>
                    <p className="font-bold text-[#12336B]">IMD Station 4208 (82.4 mm)</p>
                  </div>
                  <div>
                    <span className="text-[#64748B]">Consistency Score:</span>
                    <p className="font-bold text-emerald-600 font-mono">92% High Confidence</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F1F6FD] flex items-center justify-between text-xs">
                  <span className="text-[#64748B]">Verification Status:</span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                    ✓ Verified Ground Incident
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* STANDARD VIEW FOR COLLECT, CLEAN, ANALYSE */
            <div className="space-y-4">
              <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] space-y-2">
                <div className="text-[11px] font-semibold text-[#64748B]">
                  Incoming Signal Sample:
                </div>
                <p className="text-xs font-mono text-[#0B285A] bg-white p-2.5 rounded-xl border border-[#E2E8F0]">
                  {stageData.incomingExample.rawText}
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#E2E8F0] space-y-2">
                <div className="text-[11px] font-semibold text-[#64748B]">
                  Stage Output:
                </div>
                <div className="text-sm font-bold text-[#2563EB]">
                  {stageData.processedOutcome.label}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  {Object.entries(stageData.processedOutcome.detectedAttributes).map(([k, v]) => (
                    <div key={k} className="p-2 rounded-lg bg-[#F8FAFC]">
                      <span className="text-[10px] text-[#64748B] block">{k}</span>
                      <span className="font-semibold text-[#12336B]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Technical Architecture Notes */}
          <div className="space-y-2 pt-2 border-t border-[#F1F6FD]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              Engine Architecture Highlights
            </span>
            <ul className="space-y-1.5 text-xs text-[#64748B]">
              {stageData.technicalInsight.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#2563EB] font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-1">
            {stageKeys.map((s) => (
              <button
                key={s}
                onClick={() => onNavigateStage && onNavigateStage(s)}
                className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                  s === stageKey
                    ? 'bg-[#2563EB] text-white'
                    : 'text-[#64748B] hover:bg-[#EEF6FF] hover:text-[#2563EB]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#12336B] text-white text-xs font-semibold hover:bg-[#0B285A] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
