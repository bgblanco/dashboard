// ======== DEMO DATA FOR CLIENT PRESENTATIONS ========

const DEMO_DATA = {
  // Sample competitor ads data
  competitorAds: [
    {
      id: 'ad_001',
      date_added: '2024-12-15',
      competitor: 'TechFlow Solutions',
      platform: 'facebook',
      industry: 'tech',
      summary: 'AI-powered productivity tools that save you 10 hours per week',
      ad_copy: 'Transform your workflow with our AI assistant. Join 50,000+ professionals already saving time.',
      engagement: 12847,
      clicks: 3421,
      impressions: 145000,
      ctr: 2.36,
      strategy: 'Problem-solution messaging with social proof',
      rewritten_copy: 'Reclaim 10+ hours weekly with AI automation. 50,000+ professionals trust us - Start free today.',
      creative_type: 'video',
      duration: '15s'
    },
    {
      id: 'ad_002',
      date_added: '2024-12-14',
      competitor: 'HealthPlus Wellness',
      platform: 'instagram',
      industry: 'health',
      summary: '30-day transformation challenge with personalized meal plans',
      ad_copy: 'New Year, New You! Get your personalized meal plan and workout routine. Limited spots available!',
      engagement: 28543,
      clicks: 5672,
      impressions: 298000,
      ctr: 1.90,
      strategy: 'Urgency + personalization',
      rewritten_copy: 'Transform in 30 days with YOUR custom meal plan. Only 50 spots left - Claim yours now!',
      creative_type: 'carousel',
      duration: null
    },
    {
      id: 'ad_003',
      date_added: '2024-12-14',
      competitor: 'StyleVibe Fashion',
      platform: 'tiktok',
      industry: 'retail',
      summary: 'Sustainable fashion collection launch with influencer partnership',
      ad_copy: 'Eco-friendly fashion that doesn\'t compromise on style. See what @fashionista is wearing!',
      engagement: 45231,
      clicks: 8934,
      impressions: 512000,
      ctr: 1.74,
      strategy: 'Influencer collaboration + sustainability angle',
      rewritten_copy: 'Sustainable style worn by @fashionista - 30% off first order with code ECO30',
      creative_type: 'short-video',
      duration: '30s'
    },
    {
      id: 'ad_004',
      date_added: '2024-12-13',
      competitor: 'FinanceWise Pro',
      platform: 'linkedin',
      industry: 'finance',
      summary: 'Free webinar on cryptocurrency investment strategies for beginners',
      ad_copy: 'Master crypto investing in 2024. Free webinar by industry experts. Register now!',
      engagement: 6234,
      clicks: 2145,
      impressions: 87000,
      ctr: 2.47,
      strategy: 'Educational content + authority positioning',
      rewritten_copy: 'Crypto Investing Masterclass: From $0 to Portfolio - Free seats available',
      creative_type: 'static-image',
      duration: null
    },
    {
      id: 'ad_005',
      date_added: '2024-12-13',
      competitor: 'GrowthLab Marketing',
      platform: 'facebook',
      industry: 'tech',
      summary: 'Case study showing 300% ROI for e-commerce client',
      ad_copy: 'We helped an e-commerce brand achieve 300% ROI in 90 days. Download the case study.',
      engagement: 9876,
      clicks: 3421,
      impressions: 123000,
      ctr: 2.78,
      strategy: 'Case study + specific results',
      rewritten_copy: 'From $10K to $40K monthly revenue in 90 days - Get the exact blueprint we used',
      creative_type: 'video',
      duration: '60s'
    },
    {
      id: 'ad_006',
      date_added: '2024-12-12',
      competitor: 'FitLife Gym',
      platform: 'instagram',
      industry: 'health',
      summary: 'New Year special membership offer with personal training',
      ad_copy: 'New Year Special: 3 months membership + 5 PT sessions for $199. Limited time!',
      engagement: 15432,
      clicks: 4532,
      impressions: 198000,
      ctr: 2.29,
      strategy: 'Seasonal offer + value bundling',
      rewritten_copy: 'Transform your 2024: 3 months + personal trainer for less than $2/day',
      creative_type: 'reels',
      duration: '15s'
    },
    {
      id: 'ad_007',
      date_added: '2024-12-12',
      competitor: 'CloudTech Solutions',
      platform: 'linkedin',
      industry: 'tech',
      summary: 'White paper on cloud migration best practices',
      ad_copy: 'Avoid the top 10 cloud migration mistakes. Download our free guide.',
      engagement: 4567,
      clicks: 1890,
      impressions: 67000,
      ctr: 2.82,
      strategy: 'Lead magnet + pain point focus',
      rewritten_copy: 'Cloud Migration Checklist: Save $100K+ by avoiding these mistakes',
      creative_type: 'document',
      duration: null
    },
    {
      id: 'ad_008',
      date_added: '2024-12-11',
      competitor: 'BeautyGlow Cosmetics',
      platform: 'tiktok',
      industry: 'retail',
      summary: 'User-generated content campaign featuring customer transformations',
      ad_copy: 'Real results from real people. See the #BeautyGlowChallenge transformations!',
      engagement: 67890,
      clicks: 12345,
      impressions: 789000,
      ctr: 1.56,
      strategy: 'UGC + hashtag campaign',
      rewritten_copy: 'Join 10K+ women in the #GlowUp challenge - Share your transformation',
      creative_type: 'ugc-compilation',
      duration: '45s'
    },
    {
      id: 'ad_009',
      date_added: '2024-12-11',
      competitor: 'PropTech Realty',
      platform: 'facebook',
      industry: 'realestate',
      summary: 'Virtual home tours with AR technology showcase',
      ad_copy: 'Tour your dream home from your couch. AR-powered virtual tours available now.',
      engagement: 8765,
      clicks: 2987,
      impressions: 134000,
      ctr: 2.23,
      strategy: 'Technology differentiation',
      rewritten_copy: 'Skip the drive - Tour 50+ homes in AR from your phone today',
      creative_type: 'interactive',
      duration: null
    },
    {
      id: 'ad_010',
      date_added: '2024-12-10',
      competitor: 'EduTech Academy',
      platform: 'instagram',
      industry: 'tech',
      summary: 'Coding bootcamp with job guarantee program',
      ad_copy: 'Learn to code in 12 weeks. Get a job or your money back. Apply now!',
      engagement: 23456,
      clicks: 6789,
      impressions: 345000,
      ctr: 1.97,
      strategy: 'Risk reversal + clear timeline',
      rewritten_copy: 'Developer in 12 weeks - $80K average salary or full refund guaranteed',
      creative_type: 'testimonial',
      duration: '30s'
    },
    {
      id: 'ad_011',
      date_added: '2024-12-10',
      competitor: 'GreenHome Solar',
      platform: 'facebook',
      industry: 'realestate',
      summary: 'Solar panel installation with government rebate information',
      ad_copy: 'Save $5000 on solar installation with government rebates. Free consultation!',
      engagement: 11234,
      clicks: 3456,
      impressions: 156000,
      ctr: 2.21,
      strategy: 'Savings focus + urgency',
      rewritten_copy: '$0 down solar + $5000 rebate ending soon - Calculate your savings',
      creative_type: 'calculator-tool',
      duration: null
    },
    {
      id: 'ad_012',
      date_added: '2024-12-09',
      competitor: 'MindWell Therapy',
      platform: 'instagram',
      industry: 'health',
      summary: 'Online therapy sessions with licensed professionals',
      ad_copy: 'Mental health support from home. First session 50% off. Book today.',
      engagement: 18976,
      clicks: 4532,
      impressions: 234000,
      ctr: 1.94,
      strategy: 'Accessibility + introductory offer',
      rewritten_copy: 'Talk to a therapist in 24 hours - Your first session just $49',
      creative_type: 'animation',
      duration: '20s'
    }
  ],

  // Viral content examples
  viralContent: [
    {
      id: 'viral_001',
      platform: 'tiktok',
      content_type: 'short-video',
      description: 'Day in the life of a startup founder',
      views: 2450000,
      engagement: 384000,
      shares: 45000,
      viral_factors: ['Authenticity', 'Relatable struggles', 'Trending audio'],
      posted_date: '2024-12-10'
    },
    {
      id: 'viral_002',
      platform: 'instagram',
      content_type: 'reels',
      description: 'Before/after home renovation timelapse',
      views: 1890000,
      engagement: 267000,
      shares: 34000,
      viral_factors: ['Transformation content', 'Satisfying visual', 'Perfect timing'],
      posted_date: '2024-12-08'
    },
    {
      id: 'viral_003',
      platform: 'linkedin',
      content_type: 'text-post',
      description: 'Why I rejected a $500K job offer',
      views: 567000,
      engagement: 89000,
      shares: 12000,
      viral_factors: ['Contrarian view', 'Story format', 'Career insights'],
      posted_date: '2024-12-07'
    }
  ],

  // AI-generated insights
  aiInsights: [
    {
      type: 'Trending',
      text: 'Short-form video content with authentic storytelling seeing 285% higher engagement than polished ads',
      priority: 'high',
      actionable: true
    },
    {
      type: 'Opportunity',
      text: 'Your competitors are underutilizing TikTok - only 23% have active presence vs 89% on Instagram',
      priority: 'high',
      actionable: true
    },
    {
      type: 'Strategy',
      text: 'User-generated content campaigns showing 4.2x better ROI than traditional advertising',
      priority: 'medium',
      actionable: true
    },
    {
      type: 'Alert',
      text: 'New competitor "DigitalBoost Pro" entered market with aggressive pricing - monitor closely',
      priority: 'critical',
      actionable: false
    },
    {
      type: 'Prediction',
      text: 'AI-powered personalization expected to become standard by Q2 2024 - early adoption recommended',
      priority: 'medium',
      actionable: true
    }
  ],

  // Performance metrics for charts
  performanceData: {
    labels: generateDateLabels(30),
    engagement: [
      65, 68, 72, 70, 75, 78, 76, 82, 85, 83,
      88, 91, 89, 93, 95, 92, 97, 99, 96, 102,
      105, 103, 108, 110, 107, 112, 115, 113, 118, 120
    ],
    conversion: [
      28, 30, 32, 31, 35, 36, 34, 38, 40, 39,
      42, 44, 43, 46, 48, 47, 50, 52, 51, 54,
      56, 55, 58, 60, 59, 62, 64, 63, 66, 67
    ],
    viral: [
      1.2, 1.3, 1.4, 1.3, 1.5, 1.6, 1.5, 1.7, 1.8, 1.7,
      1.9, 2.0, 1.9, 2.1, 2.2, 2.1, 2.3, 2.4, 2.3, 2.5,
      2.6, 2.5, 2.7, 2.8, 2.7, 2.6, 2.7, 2.8, 2.7, 2.8
    ]
  },

  // Google Maps scraper results
  mapsLeads: [
    {
      business: 'Digital Marketing Pro Calgary',
      email: 'info@digitalmarketingpro.ca',
      phone: '(403) 555-0001',
      website: 'www.digitalmarketingpro.ca',
      rating: 4.8,
      reviews: 234
    },
    {
      business: 'Calgary SEO Experts',
      email: 'contact@calgaryseo.com',
      phone: '(403) 555-0002',
      website: 'www.calgaryseo.com',
      rating: 4.9,
      reviews: 189
    },
    {
      business: 'Social Media Masters YYC',
      email: 'hello@socialmediayyc.com',
      phone: '(403) 555-0003',
      website: 'www.socialmediayyc.com',
      rating: 4.7,
      reviews: 156
    }
  ],

  // Sample proposals
  proposals: [
    {
      id: 'prop_001',
      client: 'TechStart Inc.',
      title: 'Comprehensive Digital Marketing Strategy Q1 2024',
      status: 'sent',
      date: '2024-12-10',
      value: 15000,
      description: 'Social media marketing strategy with focus on LinkedIn and Twitter growth'
    },
    {
      id: 'prop_002',
      client: 'HealthPlus Wellness',
      title: 'Content Marketing & Influencer Campaign',
      status: 'won',
      date: '2024-12-08',
      value: 22500,
      description: 'Content marketing campaign targeting health-conscious millennials'
    },
    {
      id: 'prop_003',
      client: 'EcoStyle Boutique',
      title: 'E-commerce Growth Strategy',
      status: 'draft',
      date: '2024-12-12',
      value: 18000,
      description: 'Instagram and TikTok focused campaign for sustainable fashion brand'
    }
  ],

  // Workflow statistics
  workflowStats: {
    'ad-scraper': {
      lastRun: '2024-12-15T14:30:00Z',
      totalRuns: 342,
      successRate: 95,
      adsCollected: 1247,
      avgExecutionTime: '45s'
    },
    'proposal-generator': {
      lastRun: '2024-12-14T10:15:00Z',
      totalRuns: 87,
      successRate: 100,
      proposalsGenerated: 87,
      winRate: 68
    },
    'content-analyzer': {
      lastRun: '2024-12-15T00:00:00Z',
      totalRuns: 156,
      successRate: 92,
      postsAnalyzed: 523,
      insightsGenerated: 156
    },
    'google-maps-scraper': {
      lastRun: '2024-12-13T16:45:00Z',
      totalRuns: 67,
      successRate: 98,
      leadsGenerated: 1834,
      emailsExtracted: 1456
    }
  }
};

// Helper function to generate date labels
function generateDateLabels(days) {
  const labels = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }

  return labels;
}

// Export for use in other scripts
window.DEMO_DATA = DEMO_DATA;