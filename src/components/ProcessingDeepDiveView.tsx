import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  Layers, 
  CopyCheck, 
  ShieldCheck, 
  LineChart, 
  Activity, 
  Sliders, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { DataProcessingPipeline } from './DataProcessingPipeline';
import { PipelineStage } from '../types/weather';

interface ProcessingDeepDiveViewProps {
  onOpenStageModal: (stage: PipelineStage) => void;
}

export const ProcessingDeepDiveView: React.FC<ProcessingDeepDiveViewProps> = ({
  onOpenStageModal,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0B285A]">
            AI Data Processing & Event Extraction Engine
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Real-time pipeline analytics: NLP tokenization, DBSCAN clustering, Bayes belief fusion, and verification
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold">All 6 Processing Nodes Operational</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Pipeline Component */}
      <DataProcessingPipeline onOpenStageModal={onOpenStageModal} />

      {/* Deep Dive Grid Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[#12336B]">
              Stage 1–2: Ingest & Cleaning
            </span>
            <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Lag: 12ms
            </span>
          </div>

          <div className="space-y-2 text-xs text-[#64748B]">
            <div className="flex justify-between py-1 border-b border-[#F1F6FD]">
              <span>Raw Messages Ingested:</span>
              <strong className="text-[#12336B] font-mono">12,482/hr</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-[#F1F6FD]">
              <span>Advertising & Spam Dropped:</span>
              <strong className="text-rose-600 font-mono">1,140 (9.1%)</strong>
            </div>
            <div className="flex justify-between py-1">
              <span>Geotag Resolution Success:</span>
              <strong className="text-emerald-600 font-mono">98.2%</strong>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[#12336B]">
              Stage 3–4: AI Classification & Deduplication
            </span>
            <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Cluster Precision: 98%
            </span>
          </div>

          <div className="space-y-2 text-xs text-[#64748B]">
            <div className="flex justify-between py-1 border-b border-[#F1F6FD]">
              <span>DBSCAN Active Clusters:</span>
              <strong className="text-[#12336B] font-mono">34 clusters</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-[#F1F6FD]">
              <span>Duplicate Forwarded Photos Merged:</span>
              <strong className="text-[#2563EB] font-mono">428 images</strong>
            </div>
            <div className="flex justify-between py-1">
              <span>Average Cluster Compression:</span>
              <strong className="text-[#12336B] font-mono">8.4 : 1</strong>
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[#12336B]">
              Stage 5–6: Multi-Source Verification
            </span>
            <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Confidence: 92%
            </span>
          </div>

          <div className="space-y-2 text-xs text-[#64748B]">
            <div className="flex justify-between py-1 border-b border-[#F1F6FD]">
              <span>AWS Sensor Corroborations:</span>
              <strong className="text-[#12336B] font-mono">2,341 events</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-[#F1F6FD]">
              <span>Radar Beam Matches:</span>
              <strong className="text-[#12336B] font-mono">1,890</strong>
            </div>
            <div className="flex justify-between py-1">
              <span>Disaster Ops Dispatch Latency:</span>
              <strong className="text-emerald-600 font-mono">&lt; 3.2 sec</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
