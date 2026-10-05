import React, { useState, useEffect } from 'react';
import { CloudLightning, Search, Bell, ChevronDown, CheckCircle2, SlidersHorizontal, ShieldCheck, User } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectEventId?: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onSelectEventId
}) => {
  const [timeString, setTimeString] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }) + ' · ' +
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const notifications = [
    { id: 1, title: 'Severe Rain Alert in Ludhiana', time: '2m ago', unread: true },
    { id: 2, title: '12 new citizen geotagged photos verified in Jaipur', time: '14m ago', unread: true },
    { id: 3, title: 'IMD Doppler Radar Patiala synchronized', time: '28m ago', unread: false },
  ];

  const quickSearchSuggestions = [
    { label: 'Ludhiana, Punjab', type: 'Location', eventId: 'ev-ludhiana-01' },
    { label: '#Rainfall & #Waterlogging', type: 'Hashtag', query: '#Rainfall' },
    { label: 'Jaipur, Rajasthan', type: 'Location', eventId: 'ev-jaipur-02' },
    { label: 'Flooding in Chennai', type: 'Event', eventId: 'ev-chennai-03' },
    { label: 'Nagpur Heatwave', type: 'Event', eventId: 'ev-nagpur-04' },
  ];

  return (
    <header className="h-[66px] bg-white border-b border-[#E2E8F0] px-6 flex items-center justify-between sticky top-0 z-40 transition-colors">
      {/* Left: Brand Lockup */}
      <div className="flex items-center gap-3 min-w-[240px]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#22D3EE] flex items-center justify-center shadow-sm text-white shrink-0">
          <CloudLightning className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-[20px] font-bold tracking-tight text-[#12336B] leading-none">
              feather<span className="text-[#2563EB]">.</span>
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-100">
              Intelligence
            </span>
          </div>
          <span className="text-[11px] font-medium text-[#64748B] tracking-wide mt-1">
            National Weather Big Data Analytics
          </span>
        </div>
      </div>

      {/* Center: Search Field */}
      <div className="relative max-w-xl w-full mx-6">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setShowSearchDropdown(true)}
            onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
            placeholder="Search reports, hashtags, locations, events..."
            className="w-full h-10 pl-10 pr-10 text-[13px] bg-[#F1F6FD] border border-transparent focus:border-[#2563EB]/40 focus:bg-white rounded-full text-[#12336B] placeholder-[#94A3B8] focus:outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 text-xs text-[#94A3B8] hover:text-[#12336B]"
            >
              ✕
            </button>
          )}
        </div>

        {/* Search Quick Dropdown */}
        {showSearchDropdown && (
          <div className="absolute top-12 left-0 right-0 bg-white border border-[#E2E8F0] rounded-2xl shadow-lg p-2 z-50 text-xs">
            <div className="px-3 py-1.5 text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">
              Quick Suggestions & Hotspots
            </div>
            <div className="space-y-0.5">
              {quickSearchSuggestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (item.eventId && onSelectEventId) {
                      onSelectEventId(item.eventId);
                    } else if (item.query) {
                      onSearchChange(item.query);
                    } else {
                      onSearchChange(item.label);
                    }
                    setShowSearchDropdown(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#EEF6FF] flex items-center justify-between text-[#12336B] transition-colors"
                >
                  <span className="font-medium">{item.label}</span>
                  <span className="text-[11px] text-[#64748B] bg-[#F1F6FD] px-2 py-0.5 rounded-md">
                    {item.type}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Live Pill */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Live</span>
        </div>

        {/* Date / Time */}
        <div className="hidden lg:flex flex-col text-right">
          <span className="text-xs font-mono font-medium text-[#12336B] tabular-nums">
            {timeString || 'Loading time...'}
          </span>
          <span className="text-[10px] text-[#64748B]">National Sensor Grid v2.6</span>
        </div>

        <div className="h-6 w-[1px] bg-[#E2E8F0] hidden sm:block"></div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-full hover:bg-[#F1F6FD] flex items-center justify-center text-[#64748B] hover:text-[#12336B] transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EF4444] ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-11 w-80 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#F1F6FD]">
                <span className="text-xs font-bold text-[#12336B]">Live Dispatches & Alerts</span>
                <span className="text-[11px] text-[#2563EB] font-medium cursor-pointer">Mark read</span>
              </div>
              <div className="divide-y divide-[#F1F6FD] my-1 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2.5 px-2 hover:bg-[#F7FAFF] rounded-lg cursor-pointer">
                    <p className="text-xs font-medium text-[#12336B]">{n.title}</p>
                    <span className="text-[10px] text-[#94A3B8]">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-full hover:bg-[#F1F6FD] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#12336B] text-white flex items-center justify-center text-xs font-bold shadow-sm">
              AD
            </div>
            <div className="text-left hidden md:block">
              <div className="text-xs font-bold text-[#12336B] leading-tight">Admin</div>
              <div className="text-[10px] text-[#64748B]">System Administrator</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 top-11 w-56 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-2 z-50">
              <div className="px-3 py-2 border-b border-[#F1F6FD]">
                <p className="text-xs font-semibold text-[#12336B]">Dr. Rajeshwar Sharma</p>
                <p className="text-[11px] text-[#64748B]">Chief Weather Data Architect</p>
              </div>
              <div className="py-1 text-xs text-[#64748B]">
                <div className="px-3 py-1.5 hover:bg-[#EEF6FF] rounded-lg text-[#12336B] cursor-pointer flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Security & Auditing</span>
                </div>
                <div className="px-3 py-1.5 hover:bg-[#EEF6FF] rounded-lg text-[#12336B] cursor-pointer flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>AI Ingest Thresholds</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
