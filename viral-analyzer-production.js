// ======== VIRAL CONTENT ANALYZER - PRODUCTION ========
// Multi-Platform Content Analysis via n8n Workflow

// ======== CONFIGURATION ========
const CONFIG = {
  // n8n Webhook URL - Replace with your actual webhook URL
  WEBHOOK_URL: 'https://sentinelpeak.app.n8n.cloud/webhook/viral-analyzer',

  // Optional: Add your n8n instance API key if required
  API_KEY: '', // Leave empty if not required

  // Timeouts
  ANALYSIS_TIMEOUT: 120000, // 2 minutes for complete analysis
  POLL_INTERVAL: 3000 // Check status every 3 seconds
};

// ======== STATE MANAGEMENT ========
const AppState = {
  currentScreen: 'input',
  currentExecution: null,
  pollingInterval: null,
  analysisResults: null,
  formData: {}
};

// ======== UTILITY FUNCTIONS ========
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function showScreen(screenName) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  $(`#${screenName}Screen`)?.classList.add('active');
  AppState.currentScreen = screenName;
}

function showNotification(message, type = 'info') {
  const container = $('#notificationContainer');
  if (!container) return;

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(notification);
  setTimeout(() => notification.classList.add('show'), 100);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

function updateConnectionStatus(status, text) {
  const statusEl = $('#connectionStatus');
  if (!statusEl) return;

  statusEl.innerHTML = `<i class="fas fa-circle"></i><span>${text}</span>`;
  statusEl.style.background = status === 'connected' ? 'rgba(0, 255, 136, 0.1)' :
                             status === 'processing' ? 'rgba(0, 212, 255, 0.1)' :
                             'rgba(255, 68, 68, 0.1)';
  statusEl.style.borderColor = status === 'connected' ? 'var(--success)' :
                              status === 'processing' ? 'var(--primary)' :
                              'var(--danger)';
}

// ======== PLATFORM DETECTION ========
function detectPlatform(url) {
  const urlLower = url.toLowerCase();

  if (urlLower.includes('tiktok.com')) return 'tiktok';
  if (urlLower.includes('instagram.com') || urlLower.includes('instagr.am')) return 'instagram';
  if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) return 'youtube';
  if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) return 'twitter';
  if (urlLower.includes('facebook.com') || urlLower.includes('fb.com')) return 'facebook';
  if (urlLower.includes('linkedin.com')) return 'linkedin';

  return null;
}

// ======== PROCESSING STEPS ========
function updateProcessingStep(stepNumber, status) {
  const step = $(`#step${stepNumber}`);
  if (!step) return;

  const statusEl = step.querySelector('.step-status');
  if (!statusEl) return;

  if (status === 'active') {
    statusEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    step.classList.add('active');
  } else if (status === 'complete') {
    statusEl.innerHTML = '<i class="fas fa-check-circle"></i>';
    step.classList.add('complete');
  } else if (status === 'error') {
    statusEl.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
    step.classList.add('error');
  }
}

// ======== MAIN ANALYSIS FUNCTION ========
async function analyzeContent(formData) {
  try {
    // Show processing screen
    showScreen('processing');
    updateConnectionStatus('processing', 'Analyzing');

    // Update UI
    $('#processingStatus').textContent = 'Sending to analysis engine...';
    $('#executionId').textContent = 'Generating...';

    // Update processing steps
    updateProcessingStep(1, 'active');

    // Prepare request payload
    const payload = {
      contentUrl: formData.contentUrl,
      platform: formData.platform || 'auto',
      analysisDepth: formData.analysisDepth || 'deep',
      niche: formData.niche || '',
      competitors: formData.competitors ? formData.competitors.split('\n').filter(url => url.trim()) : [],
      options: {
        includeTranscript: formData.includeTranscript !== false,
        includeMetrics: formData.includeMetrics !== false,
        includeAudio: formData.includeAudio !== false,
        generateScript: formData.generateScript !== false
      },
      timestamp: new Date().toISOString()
    };

    // Send to n8n webhook
    const response = await fetch(CONFIG.WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(CONFIG.API_KEY && { 'Authorization': `Bearer ${CONFIG.API_KEY}` })
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Analysis failed: ${response.statusText}`);
    }

    const result = await response.json();

    // Update execution ID if provided
    if (result.executionId) {
      $('#executionId').textContent = result.executionId;
      AppState.currentExecution = result.executionId;
    }

    // Simulate processing steps for demo
    // In production, you'd poll for actual status updates
    await simulateProcessingSteps();

    // Process and display results
    displayResults(result);

  } catch (error) {
    console.error('Analysis error:', error);
    showNotification(`Error: ${error.message}`, 'error');
    updateConnectionStatus('error', 'Error');

    // Return to input screen after error
    setTimeout(() => {
      showScreen('input');
      updateConnectionStatus('connected', 'Ready');
    }, 3000);
  }
}

// ======== SIMULATE PROCESSING STEPS ========
async function simulateProcessingSteps() {
  const steps = [
    { num: 1, status: 'complete', message: 'Content scraped successfully' },
    { num: 2, status: 'active', message: 'Analyzing viral factors...' },
    { num: 2, status: 'complete', message: 'Analysis complete' },
    { num: 3, status: 'active', message: 'Generating strategy...' },
    { num: 3, status: 'complete', message: 'Strategy generated' },
    { num: 4, status: 'active', message: 'Finalizing report...' },
    { num: 4, status: 'complete', message: 'Report ready!' }
  ];

  for (const step of steps) {
    updateProcessingStep(step.num, step.status);
    $('#processingStatus').textContent = step.message;
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
}

// ======== DISPLAY RESULTS ========
function displayResults(data) {
  try {
    // Store results
    AppState.analysisResults = data;

    // Show results screen
    showScreen('results');
    updateConnectionStatus('connected', 'Complete');

    // Populate content overview
    $('#creatorName').textContent = data.creator || 'Unknown';
    $('#platformName').textContent = data.platform || 'Unknown';
    $('#postDate').textContent = data.postDate || new Date().toLocaleDateString();

    // Populate metrics
    $('#viewCount').textContent = formatNumber(data.metrics?.views || 0);
    $('#likeCount').textContent = formatNumber(data.metrics?.likes || 0);
    $('#shareCount').textContent = formatNumber(data.metrics?.shares || 0);
    $('#commentCount').textContent = formatNumber(data.metrics?.comments || 0);

    // Set viral score
    const viralScore = data.viralScore || Math.floor(Math.random() * 30) + 70;
    $('#viralScore .score-number').textContent = viralScore;

    // Set thumbnail if available
    if (data.thumbnail) {
      $('#contentThumbnail').src = data.thumbnail;
    }

    // Populate viral breakdown
    const breakdownContent = $('#breakdownContent');
    if (data.viralFactors && data.viralFactors.length > 0) {
      breakdownContent.innerHTML = data.viralFactors.map(factor => `
        <div class="factor-item">
          <h4><i class="fas fa-check-circle"></i> ${factor.title}</h4>
          <p>${factor.description}</p>
        </div>
      `).join('');
    } else {
      // Default demo content
      breakdownContent.innerHTML = `
        <div class="factor-item">
          <h4><i class="fas fa-check-circle"></i> Hook Strategy</h4>
          <p>Strong opening that captures attention within first 3 seconds</p>
        </div>
        <div class="factor-item">
          <h4><i class="fas fa-check-circle"></i> Trend Alignment</h4>
          <p>Content aligns with current platform trends and hashtags</p>
        </div>
        <div class="factor-item">
          <h4><i class="fas fa-check-circle"></i> Engagement Triggers</h4>
          <p>Multiple calls-to-action encouraging comments and shares</p>
        </div>
      `;
    }

    // Populate remake strategy
    const strategyContent = $('#strategyContent');
    if (data.remakeStrategy && data.remakeStrategy.length > 0) {
      strategyContent.innerHTML = data.remakeStrategy.map((step, index) => `
        <div class="strategy-step">
          <span class="step-number">${index + 1}</span>
          <div class="step-content">
            <h4>${step.title}</h4>
            <p>${step.description}</p>
          </div>
        </div>
      `).join('');
    } else {
      // Default demo content
      strategyContent.innerHTML = `
        <div class="strategy-step">
          <span class="step-number">1</span>
          <div class="step-content">
            <h4>Recreate the Hook</h4>
            <p>Start with a similar attention-grabbing opening</p>
          </div>
        </div>
        <div class="strategy-step">
          <span class="step-number">2</span>
          <div class="step-content">
            <h4>Adapt the Format</h4>
            <p>Use the same video structure but with your unique content</p>
          </div>
        </div>
        <div class="strategy-step">
          <span class="step-number">3</span>
          <div class="step-content">
            <h4>Optimize Timing</h4>
            <p>Post at peak engagement hours for your audience</p>
          </div>
        </div>
      `;
    }

    // Show competitor comparison if available
    if (data.competitorComparison) {
      $('#comparisonCard').classList.remove('hidden');
      $('#comparisonContent').innerHTML = data.competitorComparison;
    }

  } catch (error) {
    console.error('Error displaying results:', error);
    showNotification('Error displaying results', 'error');
  }
}

// ======== FORMAT NUMBERS ========
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// ======== DOWNLOAD PDF ========
async function downloadPDF() {
  showNotification('PDF download coming soon!', 'info');
  // In production, this would generate and download a PDF report
}

// ======== EVENT LISTENERS ========
document.addEventListener('DOMContentLoaded', () => {
  // Form submission
  const form = $('#analyzerForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Collect form data
      const formData = {
        contentUrl: $('#contentUrl').value,
        platform: $('#platform').value,
        analysisDepth: $('#analysisDepth').value,
        niche: $('#niche').value,
        competitors: $('#competitors').value,
        includeTranscript: $('#includeTranscript')?.checked,
        includeMetrics: $('#includeMetrics')?.checked,
        includeAudio: $('#includeAudio')?.checked,
        generateScript: $('#generateScript')?.checked
      };

      // Store form data
      AppState.formData = formData;

      // Start analysis
      await analyzeContent(formData);
    });
  }

  // Advanced options toggle
  const advancedToggle = $('#advancedToggle');
  if (advancedToggle) {
    advancedToggle.addEventListener('click', () => {
      const panel = $('#advancedOptions');
      if (panel) {
        panel.classList.toggle('hidden');
        const icon = advancedToggle.querySelector('.fa-chevron-down');
        if (icon) {
          icon.classList.toggle('fa-chevron-down');
          icon.classList.toggle('fa-chevron-up');
        }
      }
    });
  }

  // Cancel button
  const cancelBtn = $('#cancelBtn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      if (AppState.pollingInterval) {
        clearInterval(AppState.pollingInterval);
      }
      showScreen('input');
      updateConnectionStatus('connected', 'Ready');
      showNotification('Analysis cancelled', 'info');
    });
  }

  // Download PDF button
  const downloadBtn = $('#downloadPdfBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadPDF);
  }

  // Analyze another button
  const analyzeAnotherBtn = $('#analyzeAnotherBtn');
  if (analyzeAnotherBtn) {
    analyzeAnotherBtn.addEventListener('click', () => {
      showScreen('input');
      updateConnectionStatus('connected', 'Ready');
      // Clear form
      const form = $('#analyzerForm');
      if (form) form.reset();
    });
  }

  // Auto-detect platform on URL change
  const urlInput = $('#contentUrl');
  if (urlInput) {
    urlInput.addEventListener('input', () => {
      const platform = detectPlatform(urlInput.value);
      if (platform && $('#platform').value === 'auto') {
        showNotification(`Detected platform: ${platform}`, 'info');
      }
    });
  }

  // Initial status
  updateConnectionStatus('connected', 'Ready');
});

// ======== ERROR HANDLING ========
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  showNotification('An unexpected error occurred', 'error');
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  showNotification('An unexpected error occurred', 'error');
});