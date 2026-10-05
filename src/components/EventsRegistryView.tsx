import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Download, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { WeatherEvent, EventCategory, EventStatus } from '../types/weather';

interface EventsRegistryViewProps {
  events: WeatherEvent[];
  onSelectEvent: (event: WeatherEvent) => void;
}

export const EventsRegistryView: React.FC<EventsRegistryViewProps> = ({
  events,
  onSelectEvent,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filtered = events.filter((ev) => {
    const matchesSearch =
      ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.state.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || ev.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || ev.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: EventStatus) => {
    switch (status) {
      case 'Active':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Developing':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Verified':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Resolved':
        return 'bg-slate-50 text-slate-600 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0B285A]">
            National Weather Event Registry
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Consolidated active and historical multi-source incident graphs across India
          </p>
        </div>

        <button
          onClick={() => alert('Exporting 126 consolidated weather incident schemas in JSON-LD format...')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F1F6FD] hover:bg-[#EEF6FF] text-[#12336B] text-xs font-semibold transition-colors cursor-pointer border border-[#E2E8F0]"
        >
          <Download className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>Export Schema (JSON)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by event, city, or state..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#12336B] placeholder-[#94A3B8] focus:bg-white focus:border-[#2563EB]/40 outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#12336B] outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Developing">Developing</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#12336B] outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Heavy Rain">Heavy Rain</option>
            <option value="Thunderstorm">Thunderstorm</option>
            <option value="Flooding">Flooding</option>
            <option value="Heatwave">Heatwave</option>
            <option value="Fog">Fog</option>
          </select>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Event & Category</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Reports</th>
                <th className="py-3.5 px-4">Sources</th>
                <th className="py-3.5 px-4">Confidence</th>
                <th className="py-3.5 px-4">Last Confirmed</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F6FD]">
              {filtered.map((ev) => (
                <tr
                  key={ev.id}
                  onClick={() => onSelectEvent(ev)}
                  className="hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#12336B] group-hover:text-[#2563EB]">
                      {ev.title}
                    </div>
                    <div className="text-[10px] text-[#64748B]">{ev.category}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-medium text-[#12336B]">{ev.location}</div>
                    <div className="text-[10px] text-[#94A3B8]">{ev.state}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${getStatusBadge(
                        ev.status
                      )}`}
                    >
                      {ev.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-[#12336B] tabular-nums">
                    {ev.reportCount}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[#64748B] tabular-nums">
                    {ev.independentSources} indep.
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-emerald-600 tabular-nums">
                      {ev.confidence}%
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-[#64748B] text-[11px]">
                    {ev.lastConfirmedMinutesAgo} min ago
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span className="text-[#2563EB] font-semibold text-xs flex items-center justify-end gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Inspect</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
