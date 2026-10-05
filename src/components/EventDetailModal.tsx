import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  AlertTriangle, 
  Radio, 
  ExternalLink,
  ThumbsUp,
  FileText,
  Camera,
  Video,
  Database,
  ArrowRight,
  TrendingUp,
  HelpCircle,
  Map
} from 'lucide-react';
import { WeatherEvent, EventStatus } from '../types/weather';

interface EventDetailModalProps {
  event: WeatherEvent;
  onClose: () => void;
  onOpenMapLocation?: (event: WeatherEvent) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onOpenMapLocation,
}) => {
  const [validationVotes, setValidationVotes] = useState(event.communityValidation);
  const [userVote, setUserVote] = useState<string | null>(null);

  const timelineSteps: EventStatus[] = [
    'New',
    'Pending',
    'Developing',
    'Verified',
    'Active',
    'Improving',
    'Resolved',
  ];

  const currentStepIndex = timelineSteps.indexOf(event.status);

  const handleVote = (voteType: 'yes' | 'partly' | 'no' | 'outdated' | 'wrongLocation') => {
    if (userVote === voteType) return;

    setValidationVotes((prev) => ({
      ...prev,
      [voteType]: prev[voteType] + 1,
      ...(userVote && { [userVote]: Math.max(0, (prev as any)[userVote] - 1) }),
    }));
    setUserVote(voteType);
  };

  return (
    <div className="fixed inset-0 bg-[#0B285A]/35 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      {/* Floating Glass Panel Container */}
      <div className="bg-white/95 backdrop-blur-xl border border-white/80 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-all transform animate-in slide-in-from-bottom-3 duration-250">
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-[#E2E8F0] flex items-start justify-between bg-white/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB] bg-[#EEF6FF] px-2.5 py-0.5 rounded-full">
                {event.category}
              </span>
              <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200/60 px-2 py-0.5 rounded-full">
                {event.status}
              </span>
              <span className="text-xs text-[#94A3B8] font-mono">
                ID: {event.id}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-[#0B285A] tracking-tight">
              {event.title.toUpperCase()}
            </h2>

            <div className="flex items-center gap-3 text-xs text-[#64748B] mt-1">
              <span className="flex items-center gap-1 font-medium text-[#12336B]">
                <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                {event.location}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <Clock className="w-3.5 h-3.5" />
                Last confirmed {event.lastConfirmedMinutesAgo} minutes ago
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenMapLocation && (
              <button
                onClick={() => onOpenMapLocation(event)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EEF6FF] hover:bg-[#2563EB] text-[#2563EB] hover:text-white text-xs font-semibold transition-all cursor-pointer"
              >
                <Map className="w-3.5 h-3.5" />
                <span>View on Map</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-slate-200/60 flex items-center justify-center text-[#64748B] hover:text-[#12336B] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Top Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-[11px] text-[#64748B] font-medium block">
                Total Reports
              </span>
              <span className="text-xl font-bold font-mono text-[#0B285A] mt-0.5 block tabular-nums">
                {event.reportCount}
              </span>
              <span className="text-[10px] text-[#2563EB]">Clustered Incident</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-[11px] text-[#64748B] font-medium block">
                Independent Sources
              </span>
              <span className="text-xl font-bold font-mono text-[#0B285A] mt-0.5 block tabular-nums">
                {event.independentSources}
              </span>
              <span className="text-[10px] text-emerald-600">Cross-Validated</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-[11px] text-[#64748B] font-medium block">
                Community Confirmations
              </span>
              <span className="text-xl font-bold font-mono text-[#0B285A] mt-0.5 block tabular-nums">
                {event.communityConfirmations}
              </span>
              <span className="text-[10px] text-[#64748B]">Citizen Votes</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#EEF6FF] border border-[#2563EB]/20">
              <span className="text-[11px] text-[#2563EB] font-medium block">
                AI Confidence
              </span>
              <span className="text-xl font-bold font-mono text-[#2563EB] mt-0.5 block tabular-nums">
                {event.confidence}%
              </span>
              <span className="text-[10px] text-[#12336B] font-medium">High Trust Index</span>
            </div>
          </div>

          {/* Time Tracking Details */}
          <div className="flex flex-wrap items-center justify-between text-xs p-3 rounded-xl bg-[#F1F6FD] text-[#12336B]">
            <div>
              <span className="text-[#64748B]">First reported: </span>
              <strong>{event.firstReported}</strong>
            </div>
            <div>
              <span className="text-[#64748B]">Last confirmed: </span>
              <strong>{event.lastConfirmed} ({event.lastConfirmedMinutesAgo} min ago)</strong>
            </div>
            <div>
              <span className="text-[#64748B]">Severity Level: </span>
              <strong className="text-rose-600">{event.severity}</strong>
            </div>
          </div>

          {/* EVENT TIMELINE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#12336B]">
                Event Lifecycle Timeline
              </span>
              <span className="text-[11px] text-[#64748B]">Continuous State Machine</span>
            </div>

            {/* Stepper Bar */}
            <div className="flex items-center justify-between relative px-2 py-1">
              <div className="absolute top-1/2 left-3 right-3 h-[2px] bg-[#E2E8F0] -translate-y-1/2 z-0" />

              {timelineSteps.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div key={step} className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold font-mono transition-all ${
                        isCurrent
                          ? 'bg-[#2563EB] text-white ring-4 ring-[#2563EB]/20 scale-110'
                          : isPassed
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white border-2 border-[#CBD5E1] text-[#94A3B8]'
                      }`}
                    >
                      {isPassed && !isCurrent ? '✓' : idx + 1}
                    </div>
                    <span
                      className={`text-[10px] font-medium mt-1 uppercase ${
                        isCurrent
                          ? 'text-[#2563EB] font-bold'
                          : isPassed
                          ? 'text-[#12336B]'
                          : 'text-[#94A3B8]'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Detailed Timeline Events List */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 space-y-2.5">
              {event.timeline.map((entry, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <span className="font-mono text-[11px] font-medium text-[#2563EB] shrink-0 w-16">
                    {entry.time}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#2563EB] mt-1 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#12336B]">{entry.stage}</span>
                      <span className="text-[10px] text-[#64748B] bg-white px-2 py-0.2 rounded border border-[#E2E8F0]">
                        {entry.source}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#334155] mt-0.5">{entry.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GROUND REALITY vs OFFICIAL INFORMATION (CRITICAL REQUIREMENT) */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#12336B]">
              Ground Reality & Official Corroboration
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Official Information */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
                <div className="flex items-center justify-between text-blue-900">
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    OFFICIAL INFORMATION
                  </span>
                  <span className="text-[10px] font-mono text-blue-700">
                    {event.officialForecast.agency}
                  </span>
                </div>

                <p className="text-sm font-semibold text-[#0B285A]">
                  “{event.officialForecast.statement}”
                </p>

                <div className="text-[11px] text-[#64748B] flex items-center justify-between pt-1">
                  <span>Issued: {event.officialForecast.issuedTime}</span>
                  <span className="font-bold text-amber-600">
                    Alert Code: {event.officialForecast.alertColor}
                  </span>
                </div>
              </div>

              {/* Recent Ground Evidence */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                <div className="flex items-center justify-between text-emerald-900">
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    RECENT GROUND EVIDENCE
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700">
                    Triangulated Ground Truth
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-medium text-[#12336B]">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>{event.groundEvidence.citizenReportsCount} citizen reports</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>{event.groundEvidence.imagesCount} images</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>{event.groundEvidence.videosCount} videos</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>{event.groundEvidence.independentSourcesCount} independent sources</span>
                  </div>
                </div>

                {event.groundEvidence.sensorTelemetry && (
                  <div className="text-[11px] text-emerald-800 bg-white/70 p-2 rounded-lg font-mono">
                    {event.groundEvidence.sensorTelemetry}
                  </div>
                )}
              </div>
            </div>

            {/* Neutral Ground Condition Disclaimer */}
            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
              <span>
                <strong>Ground conditions may differ from official information.</strong> Our platform fuses real-time citizen reports, local sensors, and official broadcasts to synthesize operational ground truth.
              </span>
            </div>
          </div>

          {/* COMMUNITY VALIDATION */}
          <div className="p-4 bg-white border border-[#E2E8F0] rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#12336B] block">
                  Community Validation & Ground Feedback
                </span>
                <span className="text-[11px] text-[#64748B]">
                  Was this weather report accurate according to your local observation?
                </span>
              </div>
              {userVote && (
                <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                  Feedback recorded
                </span>
              )}
            </div>

            {/* Voting Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { key: 'yes', label: '✓ Yes', count: validationVotes.yes, bg: 'hover:bg-emerald-50 hover:border-emerald-200' },
                { key: 'partly', label: '~ Partly', count: validationVotes.partly, bg: 'hover:bg-blue-50 hover:border-blue-200' },
                { key: 'no', label: '✕ No', count: validationVotes.no, bg: 'hover:bg-rose-50 hover:border-rose-200' },
                { key: 'outdated', label: '○ Outdated', count: validationVotes.outdated, bg: 'hover:bg-amber-50 hover:border-amber-200' },
                { key: 'wrongLocation', label: '⌖ Wrong Location', count: validationVotes.wrongLocation, bg: 'hover:bg-purple-50 hover:border-purple-200' },
              ].map((btn) => {
                const isSelected = userVote === btn.key;

                return (
                  <button
                    key={btn.key}
                    onClick={() => handleVote(btn.key as any)}
                    className={`p-2 rounded-xl border text-xs font-medium transition-all flex flex-col items-center justify-center cursor-pointer ${
                      isSelected
                        ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                        : `bg-[#F8FAFC] border-[#E2E8F0] text-[#12336B] ${btn.bg}`
                    }`}
                  >
                    <span className="font-semibold">{btn.label}</span>
                    <span
                      className={`text-[10px] font-mono mt-0.5 ${
                        isSelected ? 'text-blue-100' : 'text-[#64748B]'
                      }`}
                    >
                      {btn.count} votes
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-[10px] text-[#94A3B8] text-right">
              Community feedback is an evidence signal weighted into the Bayes belief network, not absolute truth.
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between">
          <div className="text-xs text-[#64748B]">
            Cryptographic provenance hash: <code className="font-mono text-[#12336B]">0x9b4f...26069</code>
          </div>

          <div className="flex items-center gap-3">
            {onOpenMapLocation && (
              <button
                onClick={() => onOpenMapLocation(event)}
                className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>View Event on Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white border border-[#E2E8F0] text-[#12336B] hover:bg-[#F1F6FD] text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
