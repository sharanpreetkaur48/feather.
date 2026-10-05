import React from 'react';
import { 
  Home, 
  Database, 
  Cpu, 
  BarChart3, 
  AlertTriangle, 
  MapPin, 
  Settings,
  Sparkles,
  Info
} from 'lucide-react';

export type NavTab = 
  | 'Home'
  | 'Data Sources'
  | 'Processing'
  | 'Analytics'
  | 'Events'
  | 'Map View'
  | 'Admin Panel';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  const navItems: Array<{
    name: NavTab;
    icon: React.ComponentType<{ className?: string }>;
    hasBeta?: boolean;
    badgeCount?: number;
  }> = [
    { name: 'Home', icon: Home },
    { name: 'Data Sources', icon: Database, badgeCount: 6 },
    { name: 'Processing', icon: Cpu },
    { name: 'Analytics', icon: BarChart3 },
    { name: 'Events', icon: AlertTriangle, badgeCount: 6 },
    { name: 'Map View', icon: MapPin, hasBeta: true },
    { name: 'Admin Panel', icon: Settings },
  ];

  return (
    <aside className="w-[205px] shrink-0 bg-[#FFFFFF] border-r border-[#E2E8F0] min-h-[calc(100vh-66px)] flex flex-col justify-between py-5 px-3 select-none">
      <div className="space-y-6">
        {/* Navigation list */}
        <div className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
            Platform Console
          </div>
          {navItems.map((item) => {
            const isActive = activeTab === item.name;
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => onSelectTab(item.name)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-[#EEF6FF] text-[#2563EB] font-semibold shadow-xs'
                    : 'text-[#64748B] hover:text-[#12336B] hover:bg-[#F1F6FD]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-[#2563EB]'
                        : 'text-[#94A3B8] group-hover:text-[#12336B]'
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                {item.hasBeta && (
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#22D3EE]/15 text-[#0284C7]">
                    Beta
                  </span>
                )}

                {item.badgeCount !== undefined && !item.hasBeta && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full tabular-nums ${
                      isActive
                        ? 'bg-blue-100/80 text-[#2563EB]'
                        : 'bg-[#F1F6FD] text-[#94A3B8]'
                    }`}
                  >
                    {item.badgeCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom SIH 2026 Project Box */}
      <div className="pt-4 border-t border-[#F1F6FD] space-y-2">
        <div className="p-2.5 rounded-xl bg-[#F7FAFF] border border-[#E2E8F0]/70 text-left">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#12336B]">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>SIH 2026 Prototype</span>
          </div>
          <p className="text-[10px] text-[#64748B] mt-1 leading-relaxed">
            Problem Statement 26069: Multi-source weather big data analytics.
          </p>
          <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
            <span>MoES / IMD</span>
            <span className="text-[#10B981] font-medium">Synced</span>
          </div>
        </div>

        <div className="px-2 text-[10px] text-[#94A3B8] text-center font-mono">
          feather. Enterprise v2.6
        </div>
      </div>
    </aside>
  );
};
