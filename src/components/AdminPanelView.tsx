import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Sliders, 
  Save, 
  Bell, 
  Cpu, 
  Database,
  CheckCircle2
} from 'lucide-react';

export const AdminPanelView: React.FC = () => {
  const [spatialRadius, setSpatialRadius] = useState<number>(2.5);
  const [temporalWindow, setTemporalWindow] = useState<number>(30);
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(85);
  const [bayesSensorWeight, setBayesSensorWeight] = useState<number>(0.85);
  const [bayesCitizenWeight, setBayesCitizenWeight] = useState<number>(0.65);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0B285A]">
            System Administrator & AI Model Controls
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Tune DBSCAN spatio-temporal clustering heuristics, Bayes belief networks, and emergency alert triggers
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Parameters</span>
        </button>
      </div>

      {savedNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Parameters successfully hot-reloaded across national Kafka consumer cluster!</span>
        </div>
      )}

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Spatial & Temporal Clustering */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E2E8F0]">
            <Sliders className="w-4 h-4 text-[#2563EB]" />
            <h3 className="text-sm font-bold text-[#0B285A]">
              DBSCAN Spatio-Temporal Clustering
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between font-medium text-[#12336B] mb-1.5">
                <span>Cluster Geographic Radius (Epsilon):</span>
                <span className="font-mono font-bold text-[#2563EB]">{spatialRadius} km</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10.0"
                step="0.5"
                value={spatialRadius}
                onChange={(e) => setSpatialRadius(parseFloat(e.target.value))}
                className="w-full accent-[#2563EB] cursor-pointer"
              />
              <span className="text-[11px] text-[#94A3B8]">
                Radius within which citizen dispatches are merged into a single event candidate.
              </span>
            </div>

            <div>
              <div className="flex justify-between font-medium text-[#12336B] mb-1.5">
                <span>Temporal Window (Time Delta):</span>
                <span className="font-mono font-bold text-[#2563EB]">{temporalWindow} mins</span>
              </div>
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={temporalWindow}
                onChange={(e) => setTemporalWindow(parseInt(e.target.value))}
                className="w-full accent-[#2563EB] cursor-pointer"
              />
              <span className="text-[11px] text-[#94A3B8]">
                Maximum timestamp delta between incoming reports for incident consolidation.
              </span>
            </div>
          </div>
        </div>

        {/* Bayes Belief Network Weights */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E2E8F0]">
            <Cpu className="w-4 h-4 text-[#8B5CF6]" />
            <h3 className="text-sm font-bold text-[#0B285A]">
              Bayes Belief Network Trust Weights
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between font-medium text-[#12336B] mb-1.5">
                <span>AWS Sensor & Doppler Radar Trust:</span>
                <span className="font-mono font-bold text-[#8B5CF6]">{bayesSensorWeight}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.0"
                step="0.05"
                value={bayesSensorWeight}
                onChange={(e) => setBayesSensorWeight(parseFloat(e.target.value))}
                className="w-full accent-[#8B5CF6] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-medium text-[#12336B] mb-1.5">
                <span>Citizen Mobile App Geotagged Trust:</span>
                <span className="font-mono font-bold text-[#8B5CF6]">{bayesCitizenWeight}</span>
              </div>
              <input
                type="range"
                min="0.3"
                max="0.9"
                step="0.05"
                value={bayesCitizenWeight}
                onChange={(e) => setBayesCitizenWeight(parseFloat(e.target.value))}
                className="w-full accent-[#8B5CF6] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-medium text-[#12336B] mb-1.5">
                <span>Automated Alert Dispatch Threshold:</span>
                <span className="font-mono font-bold text-emerald-600">{confidenceThreshold}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="98"
                step="1"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
