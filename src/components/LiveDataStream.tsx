import React, { useState } from 'react';
import { 
  Share2, 
  Camera, 
  Globe, 
  Cpu, 
  Database, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Filter, 
  Plus, 
  RefreshCw,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { LiveReportItem, SourceType } from '../types/weather';
import { INITIAL_LIVE_REPORTS } from '../data/mockWeatherData';

interface LiveDataStreamProps {
  onSelectReport?: (report: LiveReportItem) => void;
  searchFilter?: string;
}

export const LiveDataStream: React.FC<LiveDataStreamProps> = ({
  onSelectReport,
  searchFilter = '',
}) => {
  const [reports, setReports] = useState<LiveReportItem[]>(INITIAL_LIVE_REPORTS);
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<string>('All');
  const [selectedReportDetail, setSelectedReportDetail] = useState<LiveReportItem | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const getSourceIcon = (source: SourceType) => {
    switch (source) {
      case 'Social Media':
        return <Share2 className="w-3.5 h-3.5 text-[#2563EB]" />;
      case 'Citizen Report':
        return <Camera className="w-3.5 h-3.5 text-[#10B981]" />;
      case 'News Website':
        return <Globe className="w-3.5 h-3.5 text-[#8B5CF6]" />;
      case 'Public API':
        return <Cpu className="w-3.5 h-3.5 text-[#06B6D4]" />;
      case 'Public Dataset':
        return <Database className="w-3.5 h-3.5 text-[#F59E0B]" />;
    }
  };

  const getSourceBadgeBg = (source: SourceType) => {
    switch (source) {
      case 'Social Media':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Citizen Report':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'News Website':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'Public API':
        return 'bg-cyan-50 text-cyan-700 border-cyan-100';
      case 'Public Dataset':
        return 'bg-amber-50 text-amber-700 border-amber-100';
    }
  };

  // Simulate new incoming real-time weather dispatch
  const handleSimulateNewDispatch = () => {
    setIsSimulating(true);
    const simulatedOptions: LiveReportItem[] = [
      {
        id: `sim-${Date.now()}`,
        source: 'Citizen Report',
        author: 'Gurpreet Singh',
        content: 'Heavy cloudburst over Dugri Road, Ludhiana. Visibility under 200m and water gushing into storm drains.',
        location: 'Ludhiana, Punjab',
        timestamp: 'Just now',
        timeAgo: 'Just now',
        confidence: 96,
        verified: true,
        tags: ['#Cloudburst', 'Ludhiana', 'CitizenVideo'],
        mediaType: 'video',
      },
      {
        id: `sim-${Date.now() + 1}`,
        source: 'Public API',
        author: 'Doppler Radar Patiala',
        content: 'Reflectivity core intensified to 52 dBZ over Ludhiana-Rupnagar atmospheric corridor.',
        location: 'Patiala / Ludhiana, Punjab',
        timestamp: 'Just now',
        timeAgo: 'Just now',
        confidence: 99,
        verified: true,
        tags: ['RadarReflectivity', '52dBZ', 'Doppler'],
        metric: 'Core: 52 dBZ',
        mediaType: 'sensor',
      },
      {
        id: `sim-${Date.now() + 2}`,
        source: 'Social Media',
        author: '@jaipur_traffic_updates',
        content: 'Traffic advisory: Diverting vehicles away from MI Road due to waterlogging near Ajmeri Gate.',
        location: 'Jaipur, Rajasthan',
        timestamp: 'Just now',
        timeAgo: 'Just now',
        confidence: 88,
        verified: false,
        tags: ['JaipurTraffic', 'Waterlogging', 'Diversion'],
        mediaType: 'image',
      }
    ];

    const randomPick = simulatedOptions[Math.floor(Math.random() * simulatedOptions.length)];

    setTimeout(() => {
      setReports((prev) => [randomPick, ...prev]);
      setIsSimulating(false);
    }, 400);
  };

  const filteredReports = reports.filter((rep) => {
    const matchesSource = selectedSourceFilter === 'All' || rep.source === selectedSourceFilter;
    const query = searchFilter.toLowerCase().trim();
    if (!query) return matchesSource;

    const matchesSearch =
      rep.content.toLowerCase().includes(query) ||
      rep.location.toLowerCase().includes(query) ||
      rep.author.toLowerCase().includes(query) ||
      rep.tags.some((t) => t.toLowerCase().includes(query));

    return matchesSource && matchesSearch;
  });

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-xs overflow-hidden transition-all">
      {/* Header */}
      <div className="p-5 border-b border-[#E2E8F0]/70 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <h2 className="text-base font-bold text-[#0B285A] tracking-tight">
            Live Data Stream
          </h2>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>● Live</span>
          </div>
          <span className="text-xs text-[#94A3B8] font-mono tabular-nums">
            ({filteredReports.length} reports)
          </span>
        </div>

        {/* Filter Controls & Simulate Button */}
        <div className="flex items-center gap-2">
          {/* Source Filter Tabs */}
          <div className="hidden sm:flex items-center gap-1 bg-[#F1F6FD] p-1 rounded-xl text-xs font-medium">
            {['All', 'Social Media', 'Citizen Report', 'News Website', 'Public API'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedSourceFilter(tab)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedSourceFilter === tab
                    ? 'bg-white text-[#2563EB] shadow-xs font-semibold'
                    : 'text-[#64748B] hover:text-[#12336B]'
                }`}
              >
                {tab === 'Social Media' ? 'Social' : tab === 'Citizen Report' ? 'Citizen' : tab === 'News Website' ? 'News' : tab === 'Public API' ? 'APIs' : 'All'}
              </button>
            ))}
          </div>

          <button
            onClick={handleSimulateNewDispatch}
            disabled={isSimulating}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EEF6FF] hover:bg-[#2563EB] text-[#2563EB] hover:text-white text-xs font-semibold border border-[#2563EB]/20 transition-all cursor-pointer disabled:opacity-50"
            title="Inject simulated incoming report"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>Simulate Report</span>
          </button>
        </div>
      </div>

      {/* Stream List */}
      <div className="divide-y divide-[#F1F6FD] max-h-[460px] overflow-y-auto">
        {filteredReports.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#94A3B8]">
            No reports found matching criteria.
          </div>
        ) : (
          filteredReports.map((report) => (
            <div
              key={report.id}
              onClick={() => {
                setSelectedReportDetail(report);
                if (onSelectReport) onSelectReport(report);
              }}
              className="p-4 hover:bg-[#F7FAFF] transition-all cursor-pointer group flex items-start justify-between gap-4"
            >
              {/* Left Column: Source Icon & Author Info */}
              <div className="flex items-start gap-3 min-w-0 flex-1">
                {/* Visual Thumbnail / Icon */}
                <div className="w-10 h-10 rounded-xl bg-[#F1F6FD] border border-[#E2E8F0] flex items-center justify-center shrink-0 group-hover:border-[#2563EB]/30 transition-colors">
                  {getSourceIcon(report.source)}
                </div>

                <div className="min-w-0 flex-1">
                  {/* Meta Bar */}
                  <div className="flex flex-wrap items-center gap-2 mb-1 text-xs">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getSourceBadgeBg(
                        report.source
                      )}`}
                    >
                      {report.source}
                    </span>

                    <span className="font-semibold text-[#12336B] truncate">
                      {report.author}
                    </span>

                    {report.handle && (
                      <span className="text-[#94A3B8] text-[11px] font-mono">
                        {report.handle}
                      </span>
                    )}

                    {report.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    )}
                  </div>

                  {/* Report Content */}
                  <p className="text-[13px] text-[#334155] leading-snug group-hover:text-[#0B285A]">
                    {report.content}
                  </p>

                  {/* Footer Meta */}
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-[#64748B]">
                    <span className="flex items-center gap-1 font-medium text-[#2563EB]">
                      <MapPin className="w-3 h-3 text-[#2563EB]" />
                      {report.location}
                    </span>

                    <span className="text-[#CBD5E1]">·</span>

                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#94A3B8]" />
                      {report.timeAgo}
                    </span>

                    {report.metric && (
                      <>
                        <span className="text-[#CBD5E1]">·</span>
                        <span className="font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded font-medium">
                          {report.metric}
                        </span>
                      </>
                    )}

                    {/* Tags */}
                    <div className="hidden sm:flex items-center gap-1.5 ml-auto">
                      {report.tags.slice(0, 2).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] text-[#64748B] bg-[#F1F6FD] px-1.5 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Confidence Pill */}
              <div className="shrink-0 text-right">
                <div className="text-[11px] font-mono font-bold text-[#12336B] tabular-nums">
                  {report.confidence}%
                </div>
                <div className="text-[9px] text-[#94A3B8] uppercase tracking-wider">
                  AI Conf.
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Report Modal Inspector */}
      {selectedReportDetail && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E2E8F0] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#EEF6FF] flex items-center justify-center">
                  {getSourceIcon(selectedReportDetail.source)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#12336B]">
                    Incoming Report Telemetry
                  </h3>
                  <p className="text-[11px] text-[#64748B]">
                    ID: {selectedReportDetail.id} · Received {selectedReportDetail.timestamp}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReportDetail(null)}
                className="text-[#94A3B8] hover:text-[#12336B] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-2">
              <div className="text-xs font-semibold text-[#64748B]">Raw Text Payload:</div>
              <p className="text-sm text-[#0B285A] font-medium leading-relaxed">
                “{selectedReportDetail.content}”
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#EEF6FF] rounded-xl">
                <div className="text-[#64748B] text-[11px]">Source Platform</div>
                <div className="font-bold text-[#2563EB] mt-0.5">
                  {selectedReportDetail.source}
                </div>
              </div>

              <div className="p-3 bg-[#ECFDF5] rounded-xl">
                <div className="text-[#64748B] text-[11px]">AI Confidence Score</div>
                <div className="font-bold text-[#10B981] mt-0.5 font-mono">
                  {selectedReportDetail.confidence}% Match
                </div>
              </div>

              <div className="p-3 bg-[#F1F6FD] rounded-xl">
                <div className="text-[#64748B] text-[11px]">Extracted Location</div>
                <div className="font-bold text-[#12336B] mt-0.5">
                  {selectedReportDetail.location}
                </div>
              </div>

              <div className="p-3 bg-[#F1F6FD] rounded-xl">
                <div className="text-[#64748B] text-[11px]">Verification Status</div>
                <div className="font-bold text-[#12336B] mt-0.5">
                  {selectedReportDetail.verified ? '✓ Corroborated' : '○ Pending Clustering'}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedReportDetail(null)}
                className="px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-semibold hover:bg-[#1D4ED8] transition-colors"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
