# n8n Workflow Setup - Viral Content Analyzer

## Workflow Overview

This workflow powers the Viral Content Analyzer web app by:
1. Receiving content URLs via webhook
2. Scraping content from TikTok/Instagram/YouTube
3. Analyzing viral factors with AI
4. Generating remake strategies
5. Returning formatted JSON response

## Quick Setup

### Step 1: Import Workflow

1. Log into your n8n instance: https://sentinelpeak.app.n8n.cloud
2. Click "Workflows" → "Add Workflow" → "Import from File"
3. Upload `n8n-viral-analyzer-workflow.json`

### Step 2: Configure Environment Variables

Add these to your n8n instance (Settings → Variables):

```
APIFY_TOKEN=your_apify_token_here
OPENAI_API_KEY=your_openai_key_here
```

### Step 3: Set Up Credentials

The workflow needs these credentials:

1. **OpenAI** (for AI analysis)
   - Node: "Analyze Viral Factors" & "Generate Remake Strategy"
   - Add your OpenAI API key

2. **Apify** (handled via environment variable)
   - Already configured in HTTP Request nodes

### Step 4: Activate Workflow

1. Open the imported workflow
2. Click "Inactive" toggle to "Active"
3. Copy the webhook URL from the "Webhook - Viral Analyzer" node
4. It will look like: `https://sentinelpeak.app.n8n.cloud/webhook/viral-analyzer`

### Step 5: Update Web App

Update `viral-analyzer-production.js` line 7:
```javascript
WEBHOOK_URL: 'https://sentinelpeak.app.n8n.cloud/webhook/viral-analyzer'
```

## Workflow Components

### 1. Webhook Trigger
- **Path**: `/viral-analyzer`
- **Method**: POST
- **CORS**: Enabled for all origins
- **Response**: Via response node

### 2. Platform Router
Automatically detects platform from URL:
- TikTok → TikTok Scraper
- Instagram → Instagram Scraper
- YouTube → YouTube Scraper
- Unknown → Direct to AI analysis

### 3. Scrapers (Apify)
Each scraper is optimized for its platform:

**TikTok Scraper**
- Actor: `clockworks~tiktok-scraper`
- Gets video metadata, metrics, captions

**Instagram Scraper**
- Actor: `apify~instagram-scraper`
- Gets post/reel data, engagement metrics

**YouTube Scraper**
- Actor: `bernardo~youtube-scraper`
- Gets video details, statistics, description

### 4. Data Normalizer
JavaScript code node that standardizes data:
```javascript
{
  platform: "tiktok|instagram|youtube",
  creator: "username",
  metrics: {
    views: 0,
    likes: 0,
    shares: 0,
    comments: 0
  },
  // ... other fields
}
```

### 5. AI Analysis (Parallel)

**Viral Factor Analysis**
- Model: GPT-4o
- Identifies 3-5 key viral factors
- Calculates viral score (0-100)
- Extracts engagement triggers

**Remake Strategy Generation**
- Model: GPT-4o
- Creates 5-7 actionable steps
- Tailored to user's niche
- Platform-specific recommendations

### 6. Response Formatter
Combines all data into final JSON response:
```json
{
  "executionId": "workflow-execution-id",
  "status": "success",
  "creator": "content-creator",
  "platform": "platform-name",
  "metrics": { /* engagement data */ },
  "viralScore": 85,
  "viralFactors": [ /* array of factors */ ],
  "remakeStrategy": [ /* array of steps */ ]
}
```

## Testing the Workflow

### Test via n8n UI

1. Open the workflow
2. Click "Execute Workflow"
3. Use this test data:

```json
{
  "body": {
    "contentUrl": "https://www.tiktok.com/@zachking/video/7234567890",
    "platform": "auto",
    "analysisDepth": "deep",
    "niche": "marketing"
  }
}
```

### Test via cURL

```bash
curl -X POST https://sentinelpeak.app.n8n.cloud/webhook/viral-analyzer \
  -H "Content-Type: application/json" \
  -d '{
    "contentUrl": "https://www.tiktok.com/@zachking/video/7234567890",
    "platform": "auto",
    "analysisDepth": "deep"
  }'
```

### Test via Browser Console

```javascript
fetch('https://sentinelpeak.app.n8n.cloud/webhook/viral-analyzer', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contentUrl: 'https://www.instagram.com/p/ABC123/',
    platform: 'auto',
    analysisDepth: 'deep'
  })
})
.then(r => r.json())
.then(console.log);
```

## Error Handling

The workflow includes error handling for:

1. **Invalid URLs**: Returns error with message
2. **Scraping Failures**: Falls back to basic analysis
3. **AI API Errors**: Uses cached/default responses
4. **Timeout Issues**: 30-second timeout on scrapers

Error response format:
```json
{
  "status": "error",
  "error": "Error message",
  "executionId": "execution-id"
}
```

## Performance Optimization

### Caching (Optional)
Add a cache node to store analyzed URLs:
1. Add "Redis" node after scraping
2. Cache for 24 hours
3. Check cache before scraping

### Rate Limiting
Configure in webhook node:
- Max 10 requests per minute per IP
- Return 429 status when exceeded

### Parallel Processing
Current setup processes AI analysis in parallel:
- Viral factors and strategy generate simultaneously
- Reduces total execution time by ~40%

## Monitoring

### Execution History
View all executions:
- Go to "Executions" tab
- Filter by workflow name
- Check for errors or slow executions

### Alerts
Set up alerts for:
1. Failed executions
2. Slow executions (>30 seconds)
3. High error rate (>10%)

## Troubleshooting

### Common Issues

**1. Webhook not responding**
- Check workflow is active
- Verify webhook URL is correct
- Check n8n instance is running

**2. Scraping errors**
- Verify Apify token is valid
- Check Apify account has credits
- Test scraper actors individually

**3. AI analysis errors**
- Check OpenAI API key is valid
- Verify API has credits
- Test with smaller prompts

**4. CORS errors**
- Ensure CORS is enabled in webhook node
- Add specific origin if needed
- Check browser console for details

## Cost Optimization

### API Usage
- Apify: ~$0.01 per scrape
- OpenAI GPT-4o: ~$0.03 per analysis
- Total: ~$0.04 per request

### Recommendations
1. Implement caching for repeated URLs
2. Use GPT-3.5 for basic analysis
3. Rate limit to prevent abuse
4. Monitor usage in dashboards

## Support

For workflow issues:
1. Check execution logs in n8n
2. Review error messages
3. Test each node individually
4. Contact support with execution ID

## Next Steps

1. ✅ Import and activate workflow
2. ✅ Configure credentials
3. ✅ Test with sample URLs
4. ✅ Update web app with webhook URL
5. ✅ Deploy web app
6. ✅ Monitor performance

The workflow is production-ready and handles all major platforms!