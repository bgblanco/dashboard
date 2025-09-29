// ======== OPTIMIZED DASHBOARD SCRIPT ========

// ======== CONFIGURATION ========
const CONFIG = {
  SHEET_ID: "1YJKGA-TRxxltTFXMejBTgobT-9zTRPJlxYHFUjZ35O8RE",
  SHEET_GID: "0",
  WORKFLOWS: {
    AD_SCRAPER: "https://sentinelpeak.app.n8n.cloud/webhook/DH5OOIKWnkupx9mV",
    PROPOSAL_GEN: "https://sentinelpeak.app.n8n.cloud/webhook/proposal-generator",
    CONTENT_ANALYZER: "https://sentinelpeak.app.n8n.cloud/webhook/content-analyzer",
    EMAIL_CAMPAIGN: "https://sentinelpeak.app.n8n.cloud/webhook/email-campaign",
    GOOGLE_MAPS_SCRAPER: "https://sentinelpeak.app.n8n.cloud/webhook/google-maps-scraper"
  },
  WORKFLOW_TOKEN: "SECRET123",
  API_ENDPOINTS: {
    OPENAI: "https://api.openai.com/v1/chat/completions",
    MAKE_WEBHOOK: "https://hook.us1.make.com/YOUR_WEBHOOK_ID"
  },
  CHART_OPTIONS: {
    animation: {
      duration: 500 // Reduced from default 1000ms
    },
    responsive: true,
    maintainAspectRatio: false
  }
};

// ======== STATE MANAGEMENT ========
let appState = {
  currentSection: 'dashboard',
  adsData: [],
  proposals: [],
  workflows: [],
  metrics: {
    totalAds: 1247,
    viralContent: 523,
    topCompetitors: 12,
    successRate: 87
  },
  filters: {
    search: '',
    platform: '',
    industry: ''
  },
  charts: {
    performance: null
  },
  demoMode: true
};

// ======== UTILITY FUNCTIONS ========
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function showLoading() {
  $('#loadingOverlay').classList.remove('hidden');
}

function hideLoading() {
  $('#loadingOverlay').classList.add('hidden');
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;

  document.body.appendChild(notification);
  setTimeout(() => notification.classList.add('show'), 100);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ======== NAVIGATION ========
function initNavigation() {
  $$('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const section = e.currentTarget.dataset.section;
      navigateToSection(section);
    });
  });
}

function navigateToSection(section) {
  // Update active nav button
  $$('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === section);
  });

  // Show/hide sections
  $$('.content-section').forEach(sec => {
    sec.classList.toggle('active', sec.id === section);
  });

  appState.currentSection = section;

  // Load section-specific data with debouncing
  clearTimeout(window.sectionLoadTimeout);
  window.sectionLoadTimeout = setTimeout(() => {
    switch(section) {
      case 'dashboard':
        loadDashboard();
        break;
      case 'competitors':
        loadCompetitorData();
        break;
      case 'workflows':
        loadWorkflows();
        break;
      case 'proposals':
        loadProposals();
        break;
      case 'clients':
        loadClientData();
        break;
    }
  }, 100);
}

// ======== DASHBOARD FUNCTIONS ========
async function loadDashboard() {
  updateMetrics();
  // AI insights and chart removed, value proposition added to HTML
}

function updateMetrics() {
  // Use demo data for impressive metrics
  animateCounter('#totalAds', appState.metrics.totalAds);
  animateCounter('#viralContent', appState.metrics.viralContent);
  animateCounter('#topCompetitors', appState.metrics.topCompetitors);

  // Show success rate as percentage
  const successElement = $('#successRate');
  if (successElement && !successElement.textContent.includes('%')) {
    successElement.textContent = appState.metrics.successRate + '%';
  }
}

function animateCounter(selector, target) {
  const element = $(selector);
  if (!element) return;

  const start = parseInt(element.textContent) || 0;
  if (start === target) return; // Skip if already at target

  const increment = (target - start) / 20;
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.round(current).toLocaleString();
    }
  }, 30); // Faster animation
}

function renderOptimizedPerformanceChart() {
  const ctx = $('#performanceChart');
  if (!ctx || appState.charts.performance) return;

  // Destroy existing chart if it exists
  if (appState.charts.performance) {
    appState.charts.performance.destroy();
  }

  // Use pre-calculated demo data
  const data = window.DEMO_DATA ? DEMO_DATA.performanceData : {
    labels: Array.from({length: 30}, (_, i) => `Day ${i + 1}`),
    engagement: Array.from({length: 30}, () => 65 + Math.random() * 55),
    conversion: Array.from({length: 30}, () => 28 + Math.random() * 39),
    viral: Array.from({length: 30}, () => 1.2 + Math.random() * 1.6)
  };

  appState.charts.performance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Engagement Rate (%)',
        data: data.engagement,
        borderColor: '#00d4ff',
        backgroundColor: 'rgba(0, 212, 255, 0.1)',
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 0, // Hide points for better performance
        pointHoverRadius: 4
      }, {
        label: 'Conversion Rate (%)',
        data: data.conversion,
        borderColor: '#00ff88',
        backgroundColor: 'rgba(0, 255, 136, 0.1)',
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4
      }, {
        label: 'Viral Coefficient (x)',
        data: data.viral,
        borderColor: '#ff00ff',
        backgroundColor: 'rgba(255, 0, 255, 0.1)',
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        yAxisID: 'y1'
      }]
    },
    options: {
      ...CONFIG.CHART_OPTIONS,
      interaction: {
        mode: 'nearest',
        intersect: false,
        axis: 'x'
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#e6f3f3',
            usePointStyle: true,
            padding: 10,
            font: {
              size: 11
            }
          }
        },
        tooltip: {
          enabled: true,
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#00d4ff',
          bodyColor: '#e6f3f3',
          borderColor: '#00d4ff',
          borderWidth: 1,
          padding: 10
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#9bb',
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 10
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          grid: {
            color: 'rgba(255, 255, 255, 0.05)',
            drawBorder: false
          },
          ticks: {
            color: '#9bb',
            callback: function(value) {
              return value + '%';
            }
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: {
            drawOnChartArea: false
          },
          ticks: {
            color: '#ff00ff',
            callback: function(value) {
              return value.toFixed(1) + 'x';
            }
          }
        }
      }
    }
  });
}

async function loadAIInsights() {
  const insights = window.DEMO_DATA ? DEMO_DATA.aiInsights : [
    { type: 'Trending', text: 'Short-form video content seeing 285% increase in engagement this week' },
    { type: 'Opportunity', text: 'Competitors missing TikTok presence - prime opportunity for first-mover advantage' },
    { type: 'Strategy', text: 'Influencer partnerships showing 4.2x ROI compared to traditional ads' }
  ];

  const container = $('#aiInsightsContent');
  if (container) {
    container.innerHTML = insights.map(insight => `
      <div class="insight-item">
        <span class="insight-badge ${insight.priority === 'critical' ? 'alert' : ''}">${insight.type}</span>
        <p>${insight.text}</p>
      </div>
    `).join('');
  }

  appState.metrics.aiInsights = insights.length;
}

// ======== COMPETITOR DATA FUNCTIONS ========
async function loadCompetitorData() {
  if (appState.demoMode && window.DEMO_DATA) {
    // Use demo data for presentation
    appState.adsData = DEMO_DATA.competitorAds;
    appState.metrics.totalAds = DEMO_DATA.competitorAds.length;
    appState.metrics.viralContent = DEMO_DATA.competitorAds.filter(ad => ad.engagement > 10000).length;
    appState.metrics.topCompetitors = [...new Set(DEMO_DATA.competitorAds.map(ad => ad.competitor))].length;

    renderCompetitorTable(DEMO_DATA.competitorAds);
    showNotification('Competitor data loaded successfully', 'success');
  } else {
    // Load real data from Google Sheets
    showLoading();
    try {
      const response = await fetch(SHEET_JSON_URL, { cache: 'no-store' });
      const text = await response.text();
      const data = parseGoogleSheetsData(text);

      appState.adsData = data;
      renderCompetitorTable(data);
    } catch (error) {
      console.error('Error loading competitor data:', error);
      showNotification('Using demo data for presentation', 'info');
      loadCompetitorData(); // Fallback to demo data
    } finally {
      hideLoading();
    }
  }
}

function renderCompetitorTable(data) {
  const tbody = $('#competitorAdsTable tbody');
  if (!tbody) return;

  // Apply filters
  let filtered = data;
  if (appState.filters.search) {
    filtered = filtered.filter(ad =>
      JSON.stringify(ad).toLowerCase().includes(appState.filters.search.toLowerCase())
    );
  }
  if (appState.filters.platform) {
    filtered = filtered.filter(ad => ad.platform === appState.filters.platform);
  }
  if (appState.filters.industry) {
    filtered = filtered.filter(ad => ad.industry === appState.filters.industry);
  }

  // Render table rows with demo data
  tbody.innerHTML = filtered.slice(0, 20).map(ad => `
    <tr>
      <td>${ad.date_added || new Date().toLocaleDateString()}</td>
      <td><strong>${ad.competitor || 'Unknown'}</strong></td>
      <td><span class="platform-badge platform-${ad.platform}">${ad.platform || 'Facebook'}</span></td>
      <td>
        <div class="ad-summary">
          <strong>${ad.summary || 'No summary available'}</strong>
          <br><small>${ad.ad_copy ? ad.ad_copy.substring(0, 100) + '...' : ''}</small>
        </div>
      </td>
      <td>
        <div class="engagement-metrics">
          <span class="engagement-metric">${(ad.engagement || 0).toLocaleString()}</span>
          <br><small>CTR: ${ad.ctr || '2.3'}%</small>
        </div>
      </td>
      <td>
        <div class="ai-version">
          ${ad.rewritten_copy || 'AI optimization pending...'}
        </div>
      </td>
      <td>
        <button class="btn-sm" onclick="viewAdDetails('${ad.id}')">
          <i class="fas fa-eye"></i>
        </button>
        <button class="btn-sm" onclick="generateVariation('${ad.id}')">
          <i class="fas fa-magic"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// ======== WORKFLOW FUNCTIONS ========
async function loadWorkflows() {
  if (window.DEMO_DATA && window.DEMO_DATA.workflowStats) {
    const stats = DEMO_DATA.workflowStats;

    // Update Google Maps scraper stats
    $('#mapsLeads').textContent = stats['google-maps-scraper'].leadsGenerated;
    $('#mapsEmails').textContent = stats['google-maps-scraper'].emailsExtracted;
  }

  appState.workflows = [
    { id: 'ad-scraper', name: 'Ad Scraper', status: 'active', lastRun: new Date() },
    { id: 'proposal-gen', name: 'Proposal Generator', status: 'active', lastRun: new Date() },
    { id: 'content-analyzer', name: 'Content Analyzer', status: 'active', lastRun: new Date() },
    { id: 'email-campaign', name: 'Email Campaign', status: 'paused', lastRun: null }
  ];

  updateWorkflowCards();
}

function updateWorkflowCards() {
  appState.workflows.forEach(workflow => {
    const card = $(`.workflow-card[data-workflow="${workflow.id}"]`);
    if (card) {
      const badge = card.querySelector('.status-badge');
      if (badge) {
        badge.textContent = workflow.status === 'active' ? 'Active' : 'Paused';
        badge.className = `status-badge ${workflow.status === 'active' ? 'active' : ''}`;
      }
    }
  });
}

async function triggerWorkflow(workflowId) {
  showLoading();

  // Simulate workflow execution
  setTimeout(() => {
    hideLoading();
    showNotification(`Workflow "${workflowId}" executed successfully`, 'success');

    // Update stats for demo
    if (workflowId === 'ad-scraper') {
      appState.metrics.totalAds += 25;
      updateMetrics();
    }
  }, 2000);
}

function configureWorkflow(workflowId) {
  showNotification(`Opening configuration for ${workflowId}`, 'info');
}

// ======== PROPOSAL FUNCTIONS ========
async function loadProposals() {
  if (window.DEMO_DATA && window.DEMO_DATA.proposals) {
    appState.proposals = DEMO_DATA.proposals;
  }
  renderProposals();
}

function renderProposals() {
  // Proposals are rendered via HTML template
  showNotification('Proposals loaded', 'success');
}

async function generateProposal(formData) {
  showLoading();

  setTimeout(() => {
    hideLoading();
    showNotification('AI Proposal generated successfully!', 'success');
    closeProposalForm();
  }, 3000);
}

// ======== CLIENT FUNCTIONS ========
async function loadClientData() {
  showNotification('Client portal loaded', 'info');
}

// ======== GOOGLE MAPS SCRAPER ========
function openMapsScraperModal() {
  $('#mapsScraperModal').classList.remove('hidden');
}

function closeMapsModal() {
  $('#mapsScraperModal').classList.add('hidden');
  $('#mapsScraperResults').classList.add('hidden');
  $('#mapsScraperForm').reset();
}

async function executeMapsSearch(e) {
  e.preventDefault();

  const searchQuery = $('#mapsSearchQuery').value;
  const location = $('#mapsLocation').value;
  const maxResults = $('#mapsMaxResults').value;

  showLoading();

  // Simulate scraping with demo data
  setTimeout(() => {
    hideLoading();

    // Display demo results
    $('#mapsScraperResults').classList.remove('hidden');
    $('#resultLeads').textContent = maxResults;
    $('#resultEmails').textContent = Math.floor(maxResults * 0.72);
    $('#resultPhones').textContent = maxResults;
    $('#resultWebsites').textContent = Math.floor(maxResults * 0.84);

    // Update main stats
    const currentLeads = parseInt($('#mapsLeads').textContent) || 0;
    const currentEmails = parseInt($('#mapsEmails').textContent) || 0;
    $('#mapsLeads').textContent = currentLeads + parseInt(maxResults);
    $('#mapsEmails').textContent = currentEmails + Math.floor(maxResults * 0.72);

    showNotification(`Successfully scraped ${maxResults} leads from Google Maps!`, 'success');

    // Store demo results
    window.lastMapsResults = {
      query: searchQuery,
      location: location,
      leads: window.DEMO_DATA ? DEMO_DATA.mapsLeads.slice(0, maxResults) : []
    };
  }, 2500);
}

function downloadResults() {
  if (!window.lastMapsResults) {
    showNotification('No results to download', 'warning');
    return;
  }

  // Create CSV with demo data
  let csv = 'Business Name,Email,Phone,Website,Rating,Reviews\\n';

  if (window.DEMO_DATA && window.DEMO_DATA.mapsLeads) {
    csv += window.DEMO_DATA.mapsLeads.map(lead =>
      `${lead.business},${lead.email},${lead.phone},${lead.website},${lead.rating},${lead.reviews}`
    ).join('\\n');
  }

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `google-maps-leads-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);

  showNotification('Results downloaded successfully!', 'success');
}

function viewInSheet() {
  window.open('https://docs.google.com/spreadsheets/d/1fcijyZM1oU73i2xUbXYJ4j6RshmVEduOkCJji2SJP68/edit', '_blank');
  showNotification('Opening Google Sheet...', 'info');
}

// ======== HELPER FUNCTIONS ========
function closeModal() {
  $('#workflowModal').classList.add('hidden');
}

function closeProposalForm() {
  $('#proposalForm').classList.add('hidden');
  $('#proposalGenerator').reset();
}

function exportData() {
  const csv = convertToCSV(appState.adsData);
  downloadCSV(csv, 'competitor-ads-export.csv');
}

function convertToCSV(data) {
  if (!data.length) return '';

  const headers = Object.keys(data[0]);
  const rows = data.map(row =>
    headers.map(header => `"${row[header] || ''}"`).join(',')
  );

  return [headers.join(','), ...rows].join('\\n');
}

function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ======== EVENT LISTENERS ========
document.addEventListener('DOMContentLoaded', () => {
  // Load demo data script first
  const demoScript = document.createElement('script');
  demoScript.src = 'demo-data.js';
  demoScript.onload = () => {
    // Initialize after demo data loads
    initNavigation();

    // Dashboard listeners
    $('#runScrapeBtn')?.addEventListener('click', () => triggerWorkflow('ad-scraper'));
    $('#exportDataBtn')?.addEventListener('click', exportData);
    $('#refreshAds')?.addEventListener('click', loadCompetitorData);

    // Search and filter listeners
    $('#searchAds')?.addEventListener('input', (e) => {
      appState.filters.search = e.target.value;
      renderCompetitorTable(appState.adsData);
    });

    $('#platformFilter')?.addEventListener('change', (e) => {
      appState.filters.platform = e.target.value;
      renderCompetitorTable(appState.adsData);
    });

    $('#industryFilter')?.addEventListener('change', (e) => {
      appState.filters.industry = e.target.value;
      renderCompetitorTable(appState.adsData);
    });

    // Proposal form listeners
    $('#newProposalBtn')?.addEventListener('click', () => {
      $('#proposalForm').classList.remove('hidden');
    });

    $('#proposalGenerator')?.addEventListener('submit', (e) => {
      e.preventDefault();
      generateProposal(new FormData(e.target));
    });

    // Maps scraper form
    $('#mapsScraperForm')?.addEventListener('submit', executeMapsSearch);

    // Modal close listener
    $('.close')?.addEventListener('click', closeModal);

    // Workflow buttons
    $('#addWorkflowBtn')?.addEventListener('click', () => configureWorkflow('new-workflow'));

    // Initial load with demo data
    setTimeout(() => {
      navigateToSection('dashboard');
      showNotification('Welcome to Sentinel Peak Solutions Marketing Intelligence Hub', 'info');
    }, 500);
  };
  document.head.appendChild(demoScript);
});

// Export functions for global access
window.triggerWorkflow = triggerWorkflow;
window.configureWorkflow = configureWorkflow;
window.closeProposalForm = closeProposalForm;
window.openMapsScraperModal = openMapsScraperModal;
window.closeMapsModal = closeMapsModal;
window.downloadResults = downloadResults;
window.viewInSheet = viewInSheet;
window.viewAdDetails = (id) => {
  showNotification('Opening ad details...', 'info');
};
window.generateVariation = (id) => {
  showNotification('Generating AI variation...', 'info');
  setTimeout(() => {
    showNotification('AI variation generated successfully!', 'success');
  }, 2000);
};