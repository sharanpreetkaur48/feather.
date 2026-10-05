import { WeatherEvent, LiveReportItem, PipelineStage, StageDetailData } from '../types/weather';

export const KPI_METRICS = {
  totalReports: 12482,
  totalTrend: '+18% vs. yesterday',
  processed: 8942,
  processedTrend: '+12% throughput',
  verified: 2341,
  verifiedTrend: '+24% ground verified',
  pending: 856,
  pendingTrend: '-8% queue lag',
  suspicious: 342,
  suspiciousTrend: 'Flagged & isolated',
};

export const EVENT_DISTRIBUTION = [
  { name: 'Heavy Rain', percentage: 38, count: 4743, color: '#2563EB', bg: 'bg-blue-500' },
  { name: 'Thunderstorm', percentage: 21, count: 2621, color: '#8B5CF6', bg: 'bg-purple-500' },
  { name: 'Flooding', percentage: 17, count: 2122, color: '#06B6D4', bg: 'bg-cyan-500' },
  { name: 'Heatwave', percentage: 9, count: 1123, color: '#F59E0B', bg: 'bg-amber-500' },
  { name: 'Others (Fog/Gale)', percentage: 8, count: 998, color: '#94A3B8', bg: 'bg-slate-400' },
];

export const INITIAL_WEATHER_EVENTS: WeatherEvent[] = [
  {
    id: 'ev-ludhiana-01',
    title: 'Heavy Rainfall',
    category: 'Heavy Rain',
    location: 'Ludhiana, Punjab',
    state: 'Punjab',
    coords: { xPercent: 34, yPercent: 24, lat: 30.9010, lng: 75.8573 },
    firstReported: '10:21 AM',
    lastConfirmed: '10:40 AM',
    lastConfirmedMinutesAgo: 2,
    reportCount: 126,
    independentSources: 8,
    communityConfirmations: 41,
    confidence: 92,
    status: 'Active',
    severity: 'Severe',
    officialForecast: {
      agency: 'India Meteorological Department (IMD)',
      statement: 'Heavy rainfall expected in Punjab.',
      alertColor: 'Orange',
      issuedTime: '08:30 AM IST',
    },
    groundEvidence: {
      citizenReportsCount: 18,
      imagesCount: 6,
      videosCount: 3,
      independentSourcesCount: 4,
      sensorTelemetry: 'Automated Weather Station (AWS) Ludhiana: 82.4 mm/hr at 10:35 AM',
      summary: 'Widespread waterlogging across Ferozepur Road and Gill Road. Heavy downpour continuous for 95 minutes.',
    },
    timeline: [
      { time: '10:21 AM', stage: 'NEW', source: 'Citizen App #9402', description: 'Initial geotagged report of sudden cloudburst on GT Road' },
      { time: '10:26 AM', stage: 'PENDING', source: 'Twitter/X Ingest', description: 'Multiple mentions of #LudhianaRain and traffic diversions detected' },
      { time: '10:31 AM', stage: 'DEVELOPING', source: 'AI Clustering Engine', description: 'Cross-referenced 34 social posts with 4 local news blogs' },
      { time: '10:36 AM', stage: 'VERIFIED', source: 'IMD AWS Station 4208', description: 'Automated rain gauge confirms 82.4 mm spike within 60 mins' },
      { time: '10:40 AM', stage: 'ACTIVE', source: 'Fusion Engine v2.6', description: 'Event consolidated: 126 reports synthesized into high-confidence severe alert' },
    ],
    communityValidation: {
      yes: 89,
      partly: 9,
      no: 2,
      outdated: 1,
      wrongLocation: 0,
    },
    sourceBreakdown: [
      { type: 'Social Media', count: 68, iconColor: '#2563EB', sampleSnippet: '@weatherindia #IMD #Rainfall: Water levels rising rapidly near clock tower' },
      { type: 'Citizen Report', count: 32, iconColor: '#10B981', sampleSnippet: 'Citizen uploaded 4 geotagged pictures of knee-deep water on Civil Lines' },
      { type: 'Public API', count: 14, iconColor: '#06B6D4', sampleSnippet: 'IMD Open Data telemetry feed recorded 82.4 mm accumulation' },
      { type: 'News Website', count: 8, iconColor: '#8B5CF6', sampleSnippet: 'The Tribune regional flash bulletin on city water pump deployments' },
      { type: 'Public Dataset', count: 4, iconColor: '#F59E0B', sampleSnippet: 'Historical 10-year drainage basin threshold exceeded' },
    ],
  },
  {
    id: 'ev-jaipur-02',
    title: 'Thunderstorm',
    category: 'Thunderstorm',
    location: 'Jaipur, Rajasthan',
    state: 'Rajasthan',
    coords: { xPercent: 36, yPercent: 37, lat: 26.9124, lng: 75.7873 },
    firstReported: '10:14 AM',
    lastConfirmed: '10:30 AM',
    lastConfirmedMinutesAgo: 12,
    reportCount: 74,
    independentSources: 5,
    communityConfirmations: 28,
    confidence: 88,
    status: 'Developing',
    severity: 'Moderate',
    officialForecast: {
      agency: 'IMD Regional Centre Jaipur',
      statement: 'Scattered squall lines with convective thunderstorm clouds moving east-northeast.',
      alertColor: 'Yellow',
      issuedTime: '09:15 AM IST',
    },
    groundEvidence: {
      citizenReportsCount: 14,
      imagesCount: 4,
      videosCount: 2,
      independentSourcesCount: 5,
      sensorTelemetry: 'Anemometer reading 48 km/h gusts at Sanganer Airport',
      summary: 'Strong gusts with lightning strikes near Mansarovar and Tonk Road; short intense showers started.',
    },
    timeline: [
      { time: '10:14 AM', stage: 'NEW', source: 'Citizen App #8192', description: 'Strong lightning strikes observed from Raja Park' },
      { time: '10:22 AM', stage: 'DEVELOPING', source: 'Doppler Radar Jaipur', description: 'Reflectivity core reaching 45 dBZ over southwestern perimeter' },
      { time: '10:30 AM', stage: 'VERIFIED', source: 'Ground Observers', description: 'Wind gusts exceeding 50 km/h verified with 28 community confirmations' },
    ],
    communityValidation: {
      yes: 54,
      partly: 6,
      no: 1,
      outdated: 2,
      wrongLocation: 1,
    },
    sourceBreakdown: [
      { type: 'Social Media', count: 38, iconColor: '#2563EB', sampleSnippet: '#JaipurWeather sudden gusty winds and dark clouds engulfing Walled City' },
      { type: 'Citizen Report', count: 22, iconColor: '#10B981', sampleSnippet: 'Waterlogging on main road in Jaipur, two fallen branches cleared' },
      { type: 'News Website', count: 8, iconColor: '#8B5CF6', sampleSnippet: 'Patrika Alert: Sudden squall disrupts traffic on Tonk Road' },
      { type: 'Public API', count: 6, iconColor: '#06B6D4', sampleSnippet: 'Doppler Radar beam velocity 24 m/s' },
    ],
  },
  {
    id: 'ev-chennai-03',
    title: 'Flooding',
    category: 'Flooding',
    location: 'Chennai, Tamil Nadu',
    state: 'Tamil Nadu',
    coords: { xPercent: 51, yPercent: 82, lat: 13.0827, lng: 80.2707 },
    firstReported: '10:04 AM',
    lastConfirmed: '10:24 AM',
    lastConfirmedMinutesAgo: 18,
    reportCount: 53,
    independentSources: 4,
    communityConfirmations: 19,
    confidence: 78,
    status: 'Pending',
    severity: 'Severe',
    officialForecast: {
      agency: 'Regional Meteorological Centre (RMC) Chennai',
      statement: 'Isolated coastal showers; localized low-lying water accumulation advisory.',
      alertColor: 'Yellow',
      issuedTime: '07:45 AM IST',
    },
    groundEvidence: {
      citizenReportsCount: 11,
      imagesCount: 5,
      videosCount: 2,
      independentSourcesCount: 3,
      sensorTelemetry: 'Basin telemetry shows Adyar river level steady at 4.2m',
      summary: 'Velachery residential sub-lanes reporting street inundation up to 1 foot; stormwater pumps operating.',
    },
    timeline: [
      { time: '10:04 AM', stage: 'NEW', source: 'Citizen Geotag', description: 'Submerged service lane on Velachery bypass' },
      { time: '10:15 AM', stage: 'PENDING', source: 'AI Deduplicator', description: 'Clustered 12 duplicate photos of the same subway' },
      { time: '10:24 AM', stage: 'DEVELOPING', source: 'Local Municipal Sensor', description: 'Drainage sensor reports high water head' },
    ],
    communityValidation: {
      yes: 39,
      partly: 4,
      no: 3,
      outdated: 0,
      wrongLocation: 0,
    },
    sourceBreakdown: [
      { type: 'Citizen Report', count: 24, iconColor: '#10B981', sampleSnippet: 'Velachery main road junction water stagnation causing slow traffic' },
      { type: 'Social Media', count: 18, iconColor: '#2563EB', sampleSnippet: 'Chennai Rains community thread discussing drainage pump efficiency' },
      { type: 'News Website', count: 7, iconColor: '#8B5CF6', sampleSnippet: 'DT Next: Corporation deploys 14 high-power suction units' },
      { type: 'Public API', count: 4, iconColor: '#06B6D4', sampleSnippet: 'Smart City sensor #CH-902 water level marker' },
    ],
  },
  {
    id: 'ev-nagpur-04',
    title: 'Heatwave',
    category: 'Heatwave',
    location: 'Nagpur, Maharashtra',
    state: 'Maharashtra',
    coords: { xPercent: 49, yPercent: 53, lat: 21.1458, lng: 79.0882 },
    firstReported: '09:40 AM',
    lastConfirmed: '10:10 AM',
    lastConfirmedMinutesAgo: 32,
    reportCount: 89,
    independentSources: 7,
    communityConfirmations: 35,
    confidence: 95,
    status: 'Verified',
    severity: 'Moderate',
    officialForecast: {
      agency: 'IMD Nagpur Division',
      statement: 'Heat wave conditions very likely over Vidarbha region with dry northerly winds.',
      alertColor: 'Orange',
      issuedTime: '06:00 AM IST',
    },
    groundEvidence: {
      citizenReportsCount: 16,
      imagesCount: 2,
      videosCount: 0,
      independentSourcesCount: 6,
      sensorTelemetry: 'Mercury touched 44.2°C at 10:05 AM; relative humidity dropped to 18%',
      summary: 'Prolonged dry heat and hot loo winds. Peak temperatures surpassing regional safety thresholds.',
    },
    timeline: [
      { time: '09:40 AM', stage: 'NEW', source: 'State Disaster Portal API', description: 'Thermal threshold trigger exceeded 43°C' },
      { time: '09:55 AM', stage: 'DEVELOPING', source: 'Citizen Sensors', description: 'Cluster of 14 personal weather stations corroborate extreme dry heat' },
      { time: '10:10 AM', stage: 'VERIFIED', source: 'Multi-Station Consolidation', description: 'Confirmed heat wave event across Nagpur urban & rural belt' },
    ],
    communityValidation: {
      yes: 72,
      partly: 5,
      no: 1,
      outdated: 0,
      wrongLocation: 0,
    },
    sourceBreakdown: [
      { type: 'Public API', count: 34, iconColor: '#06B6D4', sampleSnippet: 'Automated Weather Stations across Vidarbha logging 43.8°C to 44.5°C' },
      { type: 'Social Media', count: 29, iconColor: '#2563EB', sampleSnippet: '#NagpurHeat extreme loo winds causing markets to empty out early' },
      { type: 'News Website', count: 14, iconColor: '#8B5CF6', sampleSnippet: 'Hitavada: Municipal Corporation issues public cooling center list' },
      { type: 'Citizen Report', count: 12, iconColor: '#10B981', sampleSnippet: 'Citizen thermal infrared thermometer photos at zero shade' },
    ],
  },
  {
    id: 'ev-amritsar-05',
    title: 'Dense Fog',
    category: 'Fog',
    location: 'Amritsar, Punjab',
    state: 'Punjab',
    coords: { xPercent: 32, yPercent: 21, lat: 31.6340, lng: 74.8723 },
    firstReported: '08:15 AM',
    lastConfirmed: '09:42 AM',
    lastConfirmedMinutesAgo: 60,
    reportCount: 42,
    independentSources: 6,
    communityConfirmations: 18,
    confidence: 84,
    status: 'Resolved',
    severity: 'Advisory',
    officialForecast: {
      agency: 'IMD Chandigarh',
      statement: 'Dense fog conditions dissipated as sun emerged and wind picked up.',
      alertColor: 'Green',
      issuedTime: '09:30 AM IST',
    },
    groundEvidence: {
      citizenReportsCount: 9,
      imagesCount: 6,
      videosCount: 1,
      independentSourcesCount: 5,
      sensorTelemetry: 'Runway Visibility Range (RVR) at Raja Sansi Airport improved from 150m to >1200m',
      summary: 'Morning radiation fog has cleared up completely; flight departures and highway traffic normal.',
    },
    timeline: [
      { time: '08:15 AM', stage: 'NEW', source: 'Airport METAR Feed', description: 'Visibility below 150m' },
      { time: '08:50 AM', stage: 'ACTIVE', source: 'Highway Patrol Citizen Reports', description: 'Slow moving traffic on NH-1 bypass' },
      { time: '09:42 AM', stage: 'RESOLVED', source: 'Ground Fusion Engine', description: 'All camera and sensor readings show crystal clear visibility' },
    ],
    communityValidation: {
      yes: 34,
      partly: 2,
      no: 0,
      outdated: 0,
      wrongLocation: 0,
    },
    sourceBreakdown: [
      { type: 'Public API', count: 18, iconColor: '#06B6D4', sampleSnippet: 'METAR VIAR visibility report' },
      { type: 'Social Media', count: 12, iconColor: '#2563EB', sampleSnippet: 'Early morning golden temple foggy visuals' },
      { type: 'Citizen Report', count: 8, iconColor: '#10B981', sampleSnippet: 'Commuter reports highway clear now' },
      { type: 'News Website', count: 4, iconColor: '#8B5CF6', sampleSnippet: 'Punjab Kesari weather round-up' },
    ],
  },
  {
    id: 'ev-mumbai-06',
    title: 'High Wind Surge',
    category: 'High Winds',
    location: 'Mumbai, Maharashtra',
    state: 'Maharashtra',
    coords: { xPercent: 37, yPercent: 61, lat: 19.0760, lng: 72.8777 },
    firstReported: '10:08 AM',
    lastConfirmed: '10:32 AM',
    lastConfirmedMinutesAgo: 10,
    reportCount: 62,
    independentSources: 6,
    communityConfirmations: 24,
    confidence: 86,
    status: 'Developing',
    severity: 'Moderate',
    officialForecast: {
      agency: 'IMD Colaba Observatory',
      statement: 'Gusty coastal squalls expected along western coastline with wave surge 2.5m.',
      alertColor: 'Yellow',
      issuedTime: '08:00 AM IST',
    },
    groundEvidence: {
      citizenReportsCount: 12,
      imagesCount: 4,
      videosCount: 3,
      independentSourcesCount: 5,
      sensorTelemetry: 'Coastal buoy #CB-4 logged 54 km/h gusts and sea swell 2.8m',
      summary: 'High tide combined with strong southwesterly gusts along Marine Drive and Bandra Bandstand.',
    },
    timeline: [
      { time: '10:08 AM', stage: 'NEW', source: 'Citizen Video', description: 'High sea waves crashing over Marine Drive promenade' },
      { time: '10:20 AM', stage: 'DEVELOPING', source: 'INCOIS Ocean Buoy', description: 'Wave height reading 2.8 meters' },
      { time: '10:32 AM', stage: 'ACTIVE', source: 'BMC Disaster Cell Feed', description: 'Advisory issued for small fishermen' },
    ],
    communityValidation: {
      yes: 46,
      partly: 3,
      no: 1,
      outdated: 0,
      wrongLocation: 0,
    },
    sourceBreakdown: [
      { type: 'Social Media', count: 32, iconColor: '#2563EB', sampleSnippet: '#MumbaiWeather strong coastal winds rocking hoardings at Worli Sea Link' },
      { type: 'Citizen Report', count: 18, iconColor: '#10B981', sampleSnippet: 'Citizen video of rough sea at Bandra Carter Road' },
      { type: 'Public API', count: 8, iconColor: '#06B6D4', sampleSnippet: 'INCOIS real-time wave rider telemetry' },
      { type: 'News Website', count: 4, iconColor: '#8B5CF6', sampleSnippet: 'Mid-Day Mumbai coastal advisory notice' },
    ],
  },
];

export const INITIAL_LIVE_REPORTS: LiveReportItem[] = [
  {
    id: 'rep-01',
    source: 'Social Media',
    author: '@weatherindia',
    handle: '@weatherindia',
    content: 'Heavy rainfall in Ludhiana since morning, roads near clock tower completely inundated. Stay safe everyone! #IMD #Rainfall #Flood',
    location: 'Ludhiana, Punjab',
    timestamp: '10:40 AM',
    timeAgo: '2 min ago',
    confidence: 94,
    verified: true,
    tags: ['#IMD', '#Rainfall', '#Flood', '#Ludhiana'],
    mediaType: 'image',
  },
  {
    id: 'rep-02',
    source: 'Citizen Report',
    author: 'Aarav Sharma (Verified Citizen)',
    content: 'Waterlogging on main road in Jaipur near Mansarovar metro pillar 42. Traffic moving at crawl pace.',
    location: 'Jaipur, Rajasthan',
    timestamp: '10:37 AM',
    timeAgo: '5 min ago',
    confidence: 89,
    verified: true,
    tags: ['Waterlogging', 'Mansarovar', 'CitizenReport'],
    mediaType: 'image',
  },
  {
    id: 'rep-03',
    source: 'News Website',
    author: 'The Tribune Flash Bureau',
    content: 'IMD issues heavy rain alert for Punjab and northern plains over next 6 hours; district administrations on alert.',
    location: 'Chandigarh, Punjab',
    timestamp: '10:35 AM',
    timeAgo: '7 min ago',
    confidence: 98,
    verified: true,
    tags: ['IMD Alert', 'Punjab', 'BreakingNews'],
    mediaType: 'document',
  },
  {
    id: 'rep-04',
    source: 'Public API',
    author: 'IMD Open Data Telemetry Station #4208',
    content: 'Rainfall data: Ludhiana 82.4 mm accumulated in past 90 mins. Precipitation rate: 24.1 mm/hr. Barometric pressure: 998.2 hPa.',
    location: 'Ludhiana, Punjab',
    timestamp: '10:33 AM',
    timeAgo: '9 min ago',
    confidence: 99,
    verified: true,
    tags: ['Telemetry', 'AWS-4208', 'SensorGroundTruth'],
    metric: '82.4 mm / 90 min',
    mediaType: 'sensor',
  },
  {
    id: 'rep-05',
    source: 'Social Media',
    author: 'Rohan Mehra',
    handle: '@rohan_delhincr',
    content: 'Strong winds in Delhi NCR area, dust storm kicking up along Noida expressway! Sudden temperature drop of 4 degrees. #Thunderstorm',
    location: 'Delhi NCR',
    timestamp: '10:30 AM',
    timeAgo: '12 min ago',
    confidence: 82,
    verified: false,
    tags: ['#Thunderstorm', '#DelhiNCR', '#Squall'],
    mediaType: 'video',
  },
  {
    id: 'rep-06',
    source: 'Citizen Report',
    author: 'Priya Sundaram',
    content: 'Velachery high road underpass has knee-deep stagnant rainwater. Corporation workers deployed with diesel pumps.',
    location: 'Chennai, Tamil Nadu',
    timestamp: '10:24 AM',
    timeAgo: '18 min ago',
    confidence: 91,
    verified: true,
    tags: ['Velachery', 'Stormwater', 'CitizenGround'],
    mediaType: 'image',
  },
  {
    id: 'rep-07',
    source: 'Public Dataset',
    author: 'State Hydro-Disaster Observation Cell',
    content: 'Dam release advisory: Upper catchment inflows increased by 14% following upper basin precipitation in Sutlej tributary.',
    location: 'Rupnagar, Punjab',
    timestamp: '10:18 AM',
    timeAgo: '24 min ago',
    confidence: 96,
    verified: true,
    tags: ['HydroData', 'InflowTelemetry', 'Reservoir'],
    metric: 'Inflow: 18,200 cusecs',
    mediaType: 'sensor',
  },
  {
    id: 'rep-08',
    source: 'Social Media',
    author: 'Vidarbha Farmer Voice',
    handle: '@vidarbha_agri',
    content: 'Scorching afternoon sun in Nagpur, dry hot winds blowing across soybean fields. Need cooling shelter for cattle.',
    location: 'Nagpur, Maharashtra',
    timestamp: '10:10 AM',
    timeAgo: '32 min ago',
    confidence: 87,
    verified: true,
    tags: ['#Nagpur', '#Heatwave', '#Vidarbha'],
    mediaType: 'image',
  },
];

export const PIPELINE_STAGES: Record<PipelineStage, StageDetailData> = {
  COLLECT: {
    key: 'COLLECT',
    title: 'Multi-Source Ingestion',
    subtitle: 'High-throughput stream processing across fragmented public & citizen streams',
    badge: 'Stage 01 · Ingestion Engine',
    description: 'Ingests raw unstructured text, images, videos, web feeds, open APIs and crowdsourced smartphone reports in real-time with automatic geo-tag resolution and metadata stamping.',
    incomingExample: {
      source: 'Multi-Protocol Webhooks & Scrapers',
      rawText: 'Incoming firehose: 1,420 events/sec across X/Twitter streaming API, IMD REST endpoint, Citizen Mobile App upload, and 48 RSS news portals.',
      receivedAt: 'Real-time (0.4s buffer)',
      metadata: {
        'Active Connectors': '18 pipelines',
        'Protocol': 'Kafka + Webhook Gateway',
        'Drop Rate': '0.001%',
        'Geo Parsing': 'Spatial gazetteer v4.2'
      }
    },
    processedOutcome: {
      label: 'Standardized Ingest Schema (JSON-LD)',
      confidence: 99,
      detectedAttributes: {
        'Payload ID': 'RAW-2026-X8841',
        'Coordinate Resolution': 'Polygon (Ludhiana Urban)',
        'Temporal Drift': '< 1.8 seconds',
        'Language Detected': 'English + Hindi + Punjabi'
      },
      statusTag: 'Ingested & Normalized'
    },
    technicalInsight: [
      'Asynchronous backpressure queue buffering up to 100k events/minute',
      'Dual-pass language recognition supporting 12 official Indian languages',
      'Exif and GPS metadata extraction with privacy-preserving geolocation fuzzing',
      'Deduplication hash calculated at ingest boundary for instant identical payload drops'
    ]
  },
  CLEAN: {
    key: 'CLEAN',
    title: 'Remove Noise & Duplicates',
    subtitle: 'NLP noise filtering, spam rejection, bot detection & text normalization',
    badge: 'Stage 02 · Pre-Processing',
    description: 'Strips advertising, promotional spam, irrelevant political commentary, memes, copy-pasted retweets, and corrupted sensor telemetry.',
    incomingExample: {
      source: 'Raw Social Text Stream',
      rawText: 'RT @user99: OMG heavy rain in Ludhiana check out my crypto profile link below!! #Rain #CryptoDiscount http://bit.ly/...',
      receivedAt: '10:39:12 AM',
      metadata: {
        'Spam Probability': '89.4%',
        'Has Links': 'True (External URL)',
        'Bot Score': '0.78 (New account, 0 followers)'
      }
    },
    processedOutcome: {
      label: 'Cleaned Signal Extracted',
      confidence: 96,
      detectedAttributes: {
        'Action': 'Quarantined promotional spam',
        'Signal Preserved': 'Location: Ludhiana, Event: Rain',
        'Content Sanitized': 'Filtered out advertising URLs and unrelated hashtags',
        'Spam Status': 'Isolated to quarantine database'
      },
      statusTag: 'Cleaned & Sanitized'
    },
    technicalInsight: [
      'Fine-tuned transformer classifier for weather relevancy scoring (Precision: 98.4%)',
      'Heuristic URL reputation lookup against national cyber threat database',
      'Sensor outlier rejection using 3-sigma anomaly boundary for extreme rain spikes',
      'Text lemmatization and colloquial vernacular dialect translation'
    ]
  },
  CLASSIFY: {
    key: 'CLASSIFY',
    title: 'AI Event Categorization',
    subtitle: 'Deep semantic categorization, severity scoring & multi-label detection',
    badge: 'Stage 03 · AI Classifier',
    description: 'Classifies verified unstructured text and multimodal images into standardized meteorological taxonomy according to IMD & WMO criteria.',
    incomingExample: {
      source: 'Filtered Citizen & Social Report',
      rawText: 'Heavy rain and waterlogging in Ludhiana since morning, roads near clock tower completely inundated. Water levels rising rapidly.',
      receivedAt: '10:40:02 AM',
      metadata: {
        'Location': 'Ludhiana, Punjab',
        'Media': '1 Geotagged Image (Knee-deep water)',
        'Source Category': 'Citizen Smartphone Upload'
      }
    },
    processedOutcome: {
      label: 'AI EVENT CLASSIFICATION',
      confidence: 94,
      detectedAttributes: {
        'Incoming Report': 'Heavy rain and waterlogging in Ludhiana since morning...',
        'Detected Event': 'HEAVY RAIN',
        'Secondary Event': 'FLOODING',
        'Location': 'Ludhiana, Punjab',
        'Confidence': '94%',
        'Severity Level': 'Orange / Severe',
        'Status': 'Classified Successfully'
      },
      statusTag: 'Classified Successfully'
    },
    technicalInsight: [
      'Multi-label zero-shot classification for concurrent events (Rain + Flooding + Wind)',
      'Computer Vision inference verifies ground rain slick and water depth from citizen photos',
      'Temporal urgency extraction recognizing ongoing ("since morning") vs forecasted events',
      'Automatic alignment with National Disaster Management Authority (NDMA) severity matrix'
    ]
  },
  DEDUPLICATE: {
    key: 'DEDUPLICATE',
    title: 'Merge Similar Reports',
    subtitle: 'Spatio-temporal clustering & consolidation of redundant dispatches',
    badge: 'Stage 04 · Clustering Engine',
    description: 'Groups multiple reports originating from the same geographic coordinate radius within a 30-minute window into a single unified incident graph.',
    incomingExample: {
      source: 'Clustering Pool (Ludhiana Urban Core)',
      rawText: 'Incoming: 6 separate citizen dispatches, 2 tweets, 1 news snippet describing the same flooded underpass near Ludhiana Clock Tower.',
      receivedAt: '10:35 AM – 10:41 AM window',
      metadata: {
        'Geographic Radius': '1.8 km cluster radius',
        'Time Delta': '± 6 minutes',
        'Textual Jaccard Similarity': '0.78',
        'Image Perceptual Hash': 'Match found (3 identical photos forwarded)'
      }
    },
    processedOutcome: {
      label: 'DUPLICATE DETECTION & CONSOLIDATION',
      confidence: 98,
      detectedAttributes: {
        'Input Cluster': '6 similar reports detected',
        'Consolidation Result': '1 consolidated event created',
        'Spatial Overlap': 'Ludhiana Central (30.9010° N, 75.8573° E)',
        'Redundancy Pruning': 'Merged 3 identical forwarded images into single evidence thread',
        'Similarity Factors': 'Time (15m window) • Location (1.8km) • Text Semantics • Media Hash'
      },
      statusTag: 'Consolidated into Single Incident'
    },
    technicalInsight: [
      'DBSCAN spatio-temporal clustering algorithm tailored for urban micro-climates',
      'Perceptual image hashing (pHash) detects viral forwarded photos across social networks',
      'Entity resolution linking localized landmarks ("Clock Tower", "Ghanta Ghar", "GT Road Junction")',
      'Maintains full provenance tree so every source citation remains auditable'
    ]
  },
  VERIFY: {
    key: 'VERIFY',
    title: 'Check Authenticity & Source',
    subtitle: 'Cross-source triangulation, sensor telemetry corroboration & trust scoring',
    badge: 'Stage 05 · Verification Engine',
    description: 'Triangulates citizen and social observations against nearby automated weather stations (AWS), doppler weather radar, and historical weather patterns.',
    incomingExample: {
      source: 'Consolidated Incident #LUD-26069',
      rawText: 'Candidate event: Severe Heavy Rainfall and Inundation in Ludhiana, Punjab (126 reports clustered).',
      receivedAt: '10:41:30 AM',
      metadata: {
        'Report Volume': '126 reports',
        'Independent Sources': '8 diverse platforms',
        'Radar Reflectivity': 'IMD Patiala Doppler: 48 dBZ',
        'Ground AWS Reading': '82.4 mm (Station 4208)'
      }
    },
    processedOutcome: {
      label: 'VERIFICATION & CROSS-CORROBORATION',
      confidence: 92,
      detectedAttributes: {
        'Source Diversity': '8 independent channels (Social, News, Citizen App, IMD AWS, Satellite)',
        'Timestamp Corroboration': 'Matches continuous rainfall window 09:15 AM – 10:40 AM',
        'Location Verification': 'GPS coordinates within 350m of local weather sensor',
        'Media Authenticity': 'EXIF verified, no synthetic generation or re-upload artifact',
        'Radar Consistency': '48 dBZ convective cloud cell verified directly above coordinates',
        'Verification Status': 'VERIFIED · ACTIVE DISASTER EVENT'
      },
      statusTag: 'Ground Truth Corroborated'
    },
    technicalInsight: [
      'Multi-source Bayes belief network calculating final confidence coefficient (92%)',
      'Detection of coordination campaigns or coordinated rumor generation',
      'Automatic elevation to NDMA and state disaster management dashboards upon threshold passing',
      'Permanent cryptographic hash stamped for post-incident auditability'
    ]
  },
  ANALYSE: {
    key: 'ANALYSE',
    title: 'Extract Insights & Patterns',
    subtitle: 'Ground reality comparison, trend forecasting & impact assessment',
    badge: 'Stage 06 · Big Data Analytics',
    description: 'Synthesizes consolidated verified events into national weather big data trends, comparing official forecast predictions with immediate ground reality.',
    incomingExample: {
      source: 'Verified National Incident Graph',
      rawText: 'Synthesizing national active weather cells across Punjab, Rajasthan, Tamil Nadu, and Maharashtra.',
      receivedAt: 'Continuous real-time stream',
      metadata: {
        'Active Events': '6 verified clusters',
        'National Query Rate': '450 requests/sec',
        'Regional Anomaly Index': 'High (Northern plains precipitation +38% above 10-yr seasonal normal)'
      }
    },
    processedOutcome: {
      label: 'TRUSTED NATIONAL WEATHER INTELLIGENCE',
      confidence: 95,
      detectedAttributes: {
        'Ground Reality vs Forecast': 'Ground rainfall intensity exceeding official forecast by +18 mm/hr in Ludhiana',
        'Vulnerability Hotspots': 'Low-lying urban drainage basins identified',
        'Actionable Alert Generated': 'Automated advisory sent to district emergency operations center',
        'Trend Prediction': 'Squall line shifting south-east towards Haryana over next 90 minutes'
      },
      statusTag: 'Actionable Intelligence Dispatched'
    },
    technicalInsight: [
      'Predictive spatial modeling using Kalman filtering over real-time multi-source data',
      'Big Data time-series aggregation storing 250M historical ground observations in columnar storage',
      'Automated natural language briefing generator for disaster response commanders',
      'Continuous feedback loop recalibrating local sensor and social trust weights'
    ]
  }
};

export const HOURLY_REPORTS_CHART_DATA = [
  { time: '04:00 AM', reports: 340, verified: 120, avgConfidence: 84 },
  { time: '05:00 AM', reports: 420, verified: 160, avgConfidence: 85 },
  { time: '06:00 AM', reports: 610, verified: 280, avgConfidence: 87 },
  { time: '07:00 AM', reports: 890, verified: 490, avgConfidence: 89 },
  { time: '08:00 AM', reports: 1420, verified: 810, avgConfidence: 91 },
  { time: '09:00 AM', reports: 2150, verified: 1340, avgConfidence: 93 },
  { time: '10:00 AM', reports: 2840, verified: 1890, avgConfidence: 94 },
  { time: '10:42 AM', reports: 3762, verified: 2341, avgConfidence: 92, activeTooltip: true },
];

export const SOURCE_DISTRIBUTION_DATA = [
  { source: 'Social Media (X, Bluesky, FB)', share: 44, reports: 5492, color: '#2563EB' },
  { source: 'Citizen Geotagged App', share: 26, reports: 3245, color: '#10B981' },
  { source: 'Public APIs (IMD, CPCB, AWS)', share: 15, reports: 1872, color: '#06B6D4' },
  { source: 'News Portals & Regional RSS', share: 10, reports: 1248, color: '#8B5CF6' },
  { source: 'Public Datasets & Historicals', share: 5, reports: 625, color: '#F59E0B' },
];

export const DATA_SOURCES_STATUS = [
  {
    name: 'India Meteorological Dept (IMD) API',
    category: 'Government API',
    status: 'Operational',
    latency: '142 ms',
    throughput: '380 req/min',
    uptime: '99.98%',
    description: 'High-frequency telemetry from Doppler radar networks, automatic weather stations, and cyclone warnings.',
    lastSync: '22 sec ago',
  },
  {
    name: 'Citizen Weather Watch Mobile App',
    category: 'Crowdsourced',
    status: 'Operational',
    latency: '85 ms',
    throughput: '1,240 uploads/min',
    uptime: '99.94%',
    description: 'Direct geotagged photos, videos, and ground reality surveys submitted by verified Indian citizens.',
    lastSync: '5 sec ago',
  },
  {
    name: 'Social Media Firehose (X/Twitter, Threads)',
    category: 'Social Signals',
    status: 'Operational',
    latency: '210 ms',
    throughput: '4,850 msgs/min',
    uptime: '99.82%',
    description: 'Real-time NLP stream tracking vernacular hashtags (#Rainfall, #Mausam, #IMD, #Flood, #Thunderstorm).',
    lastSync: '1 sec ago',
  },
  {
    name: 'Central Pollution Control Board (CPCB) Feed',
    category: 'Environmental API',
    status: 'Operational',
    latency: '190 ms',
    throughput: '220 req/min',
    uptime: '99.75%',
    description: 'Air quality index, particulate matter, humidity, and thermal sensor matrices from 430 national monitoring stations.',
    lastSync: '45 sec ago',
  },
  {
    name: 'National RSS News Aggregator',
    category: 'Media Scraper',
    status: 'Operational',
    latency: '340 ms',
    throughput: '95 feeds/min',
    uptime: '99.60%',
    description: 'Live news reports from national and regional vernacular outlets covering flash floods, road closures, and alerts.',
    lastSync: '1 min ago',
  },
  {
    name: 'INSAT-3DR & 3DS Satellite Geostationary Feed',
    category: 'Satellite Dataset',
    status: 'Operational',
    latency: '450 ms',
    throughput: '1 image/15 min',
    uptime: '100.0%',
    description: 'Infrared, water vapor, and visible spectrum cloud-top brightness imagery over the Indian subcontinent.',
    lastSync: '8 min ago',
  },
];
