export type EventCategory = 
  | 'Heavy Rain'
  | 'Thunderstorm'
  | 'Flooding'
  | 'Heatwave'
  | 'Fog'
  | 'High Winds'
  | 'Hailstorm';

export type EventStatus = 
  | 'New'
  | 'Pending'
  | 'Developing'
  | 'Verified'
  | 'Active'
  | 'Improving'
  | 'Resolved';

export type SourceType = 
  | 'Social Media'
  | 'Citizen Report'
  | 'News Website'
  | 'Public API'
  | 'Public Dataset';

export interface TimelineEntry {
  time: string;
  stage: string;
  source: string;
  description: string;
  verified?: boolean;
}

export interface CommunityValidation {
  yes: number;
  partly: number;
  no: number;
  outdated: number;
  wrongLocation: number;
  userVoted?: 'yes' | 'partly' | 'no' | 'outdated' | 'wrongLocation';
}

export interface WeatherEvent {
  id: string;
  title: string;
  category: EventCategory;
  location: string;
  state: string;
  coords: { xPercent: number; yPercent: number; lat: number; lng: number };
  firstReported: string;
  lastConfirmed: string;
  lastConfirmedMinutesAgo: number;
  reportCount: number;
  independentSources: number;
  communityConfirmations: number;
  confidence: number; // 0 - 100
  status: EventStatus;
  severity: 'Advisory' | 'Moderate' | 'Severe' | 'Critical';
  officialForecast: {
    agency: string;
    statement: string;
    alertColor: 'Green' | 'Yellow' | 'Orange' | 'Red';
    issuedTime: string;
  };
  groundEvidence: {
    citizenReportsCount: number;
    imagesCount: number;
    videosCount: number;
    independentSourcesCount: number;
    sensorTelemetry?: string;
    summary: string;
  };
  timeline: TimelineEntry[];
  communityValidation: CommunityValidation;
  sourceBreakdown: Array<{
    type: SourceType;
    count: number;
    iconColor: string;
    sampleSnippet: string;
  }>;
}

export interface LiveReportItem {
  id: string;
  source: SourceType;
  author: string;
  handle?: string;
  content: string;
  location: string;
  timestamp: string;
  timeAgo: string;
  confidence: number;
  verified: boolean;
  tags: string[];
  metric?: string;
  mediaType?: 'image' | 'video' | 'sensor' | 'document';
}

export type PipelineStage = 
  | 'COLLECT'
  | 'CLEAN'
  | 'CLASSIFY'
  | 'DEDUPLICATE'
  | 'VERIFY'
  | 'ANALYSE';

export interface StageDetailData {
  key: PipelineStage;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  incomingExample: {
    source: string;
    rawText: string;
    receivedAt: string;
    metadata: Record<string, string>;
  };
  processedOutcome: {
    label: string;
    confidence: number;
    detectedAttributes: Record<string, string>;
    statusTag: string;
  };
  technicalInsight: string[];
}
