import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Sidebar, NavTab } from './components/Sidebar';
import { HeroSection } from './components/HeroSection';
import { KpiStrip } from './components/KpiStrip';
import { LiveDataStream } from './components/LiveDataStream';
import { DataProcessingPipeline } from './components/DataProcessingPipeline';
import { WeatherEventDistribution } from './components/WeatherEventDistribution';
import { RealTimeAnalytics } from './components/RealTimeAnalytics';
import { LatestWeatherEvents } from './components/LatestWeatherEvents';
import { EventDetailModal } from './components/EventDetailModal';
import { PipelineStageModal } from './components/PipelineStageModal';
import { EventFusionExplainer } from './components/EventFusionExplainer';
import { MapPreviewCard } from './components/MapPreviewCard';
import { FullMapView } from './components/FullMapView';
import { WatchDemoModal } from './components/WatchDemoModal';
import { DataSourcesView } from './components/DataSourcesView';
import { ProcessingDeepDiveView } from './components/ProcessingDeepDiveView';
import { EventsRegistryView } from './components/EventsRegistryView';
import { AdminPanelView } from './components/AdminPanelView';

import { INITIAL_WEATHER_EVENTS } from './data/mockWeatherData';
import { WeatherEvent, PipelineStage } from './types/weather';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('Home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Interactive Modals State
  const [selectedEvent, setSelectedEvent] = useState<WeatherEvent | null>(null);
  const [selectedPipelineStage, setSelectedPipelineStage] = useState<PipelineStage | null>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);

  // References for smooth scrolling
  const liveStreamRef = useRef<HTMLDivElement>(null);

  const handleExploreData = () => {
    if (activeTab !== 'Home') {
      setActiveTab('Home');
    }
    setTimeout(() => {
      liveStreamRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectEventById = (eventId: string) => {
    const found = INITIAL_WEATHER_EVENTS.find((e) => e.id === eventId);
    if (found) {
      setSelectedEvent(found);
    }
  };

  const handleOpenMapWithEvent = (event: WeatherEvent) => {
    setSelectedEvent(null);
    setActiveTab('Map View');
  };

  return (
    <div className="min-h-screen bg-[#F7FAFF] flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* 66px Clean White Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectEventId={handleSelectEventById}
      />

      {/* Main Body with Sidebar + Content Canvas */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* ~205px Wide Left Sidebar */}
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Dynamic Main Content Viewport */}
        <main className="flex-1 p-6 lg:p-8 min-w-0 overflow-y-auto">
          {/* VIEW: HOME */}
          {activeTab === 'Home' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Main Hero with Data-Flow Visual (NOT a map) */}
              <HeroSection
                onExploreData={handleExploreData}
                onWatchDemo={() => setIsDemoModalOpen(true)}
                onSelectPipelineStage={(stageKey) =>
                  setSelectedPipelineStage(stageKey as PipelineStage)
                }
              />

              {/* KPI Strip */}
              <KpiStrip
                onFilterChange={(filterType) => {
                  if (filterType === 'suspicious') {
                    setSearchQuery('quarantine');
                  }
                }}
              />

              {/* Data Processing Pipeline (Interactive with animated particles) */}
              <DataProcessingPipeline
                onOpenStageModal={(stage) => setSelectedPipelineStage(stage)}
                selectedStage={selectedPipelineStage}
              />

              {/* Trusted Weather Event Fusion (Core SIH Innovation) */}
              <EventFusionExplainer
                sampleEvent={INITIAL_WEATHER_EVENTS[0]}
                onInspectEvent={(ev) => setSelectedEvent(ev)}
              />

              {/* 2-Column Grid: Live Stream + Latest Events & Distribution */}
              <div
                ref={liveStreamRef}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left (7 cols): Live Data Stream */}
                <div className="lg:col-span-7">
                  <LiveDataStream
                    searchFilter={searchQuery}
                    onSelectReport={(report) => {
                      // Optionally find matching event or inspect
                    }}
                  />
                </div>

                {/* Right (5 cols): Latest Weather Events & Weather Event Distribution */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Latest Weather Events */}
                  <LatestWeatherEvents
                    events={INITIAL_WEATHER_EVENTS}
                    selectedEventId={selectedEvent?.id || null}
                    onSelectEvent={(ev) => setSelectedEvent(ev)}
                  />

                  {/* Weather Event Distribution */}
                  <WeatherEventDistribution
                    onSelectCategory={(category) => {
                      setSearchQuery(category);
                    }}
                  />
                </div>
              </div>

              {/* Real-time Analytics (Line Chart + Tabs) */}
              <RealTimeAnalytics />

              {/* Map Preview Secondary Feature Card */}
              <MapPreviewCard
                activeEventsCount={INITIAL_WEATHER_EVENTS.length}
                onOpenMap={() => setActiveTab('Map View')}
              />
            </div>
          )}

          {/* VIEW: DATA SOURCES */}
          {activeTab === 'Data Sources' && <DataSourcesView />}

          {/* VIEW: PROCESSING */}
          {activeTab === 'Processing' && (
            <ProcessingDeepDiveView
              onOpenStageModal={(stage) => setSelectedPipelineStage(stage)}
            />
          )}

          {/* VIEW: ANALYTICS */}
          {activeTab === 'Analytics' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
                <h1 className="text-xl font-bold text-[#0B285A]">
                  National Weather Big Data Analytics Console
                </h1>
                <p className="text-xs text-[#64748B] mt-1">
                  Temporal volume, source corroboration distribution, and verification precision benchmarks
                </p>
              </div>

              <RealTimeAnalytics />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <WeatherEventDistribution />
                <EventFusionExplainer
                  sampleEvent={INITIAL_WEATHER_EVENTS[0]}
                  onInspectEvent={(ev) => setSelectedEvent(ev)}
                />
              </div>
            </div>
          )}

          {/* VIEW: EVENTS */}
          {activeTab === 'Events' && (
            <EventsRegistryView
              events={INITIAL_WEATHER_EVENTS}
              onSelectEvent={(ev) => setSelectedEvent(ev)}
            />
          )}

          {/* VIEW: MAP VIEW */}
          {activeTab === 'Map View' && (
            <FullMapView
              events={INITIAL_WEATHER_EVENTS}
              onSelectEvent={(ev) => setSelectedEvent(ev)}
              onBackToDashboard={() => setActiveTab('Home')}
            />
          )}

          {/* VIEW: ADMIN PANEL */}
          {activeTab === 'Admin Panel' && <AdminPanelView />}
        </main>
      </div>

      {/* Floating Glass Event Detail Panel */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onOpenMapLocation={handleOpenMapWithEvent}
        />
      )}

      {/* Pipeline Stage Deep Inspection Modal */}
      {selectedPipelineStage && (
        <PipelineStageModal
          stageKey={selectedPipelineStage}
          onClose={() => setSelectedPipelineStage(null)}
          onNavigateStage={(stage) => setSelectedPipelineStage(stage)}
        />
      )}

      {/* Watch Demo Guided Tour Modal */}
      {isDemoModalOpen && (
        <WatchDemoModal
          onClose={() => setIsDemoModalOpen(false)}
          onExploreData={handleExploreData}
        />
      )}
    </div>
  );
}
