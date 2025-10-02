# Viral Content Analyzer - Deployment Guide

## Overview
The Viral Content Analyzer is a web-based tool that analyzes viral content from various social media platforms and provides AI-powered insights and remake strategies.

## Files Included
- `viral-analyzer.html` - Main HTML interface
- `viral-analyzer.css` - Styling
- `viral-analyzer-production.js` - Production-ready JavaScript (no exposed API keys)
- `viral-analyzer.js` - Development version (contains API keys - DO NOT DEPLOY)

## n8n Workflow Setup

### 1. Create the n8n Workflow

The workflow should handle the following:

1. **Webhook Trigger** - Receives POST requests from the web app
2. **Platform Detection** - Identifies the content platform
3. **Content Scraping** - Uses appropriate scrapers for each platform:
   - TikTok: Apify TikTok Scraper
   - Instagram: Apify Instagram Scraper
   - YouTube: Apify YouTube Scraper
4. **AI Analysis** - Analyzes content using AI (Claude, GPT-4, etc.)
5. **Strategy Generation** - Creates remake strategies
6. **Response** - Returns formatted JSON response

### 2. Required n8n Nodes

- **Webhook** node (trigger)
- **Switch** node (platform routing)
- **HTTP Request** nodes (for Apify scrapers)
- **AI/LLM** nodes (Claude, OpenAI, etc.)
- **Set** node (format response)
- **Respond to Webhook** node

### 3. Webhook URL Configuration

1. In n8n, create a new workflow
2. Add a Webhook node as the trigger
3. Set HTTP Method to POST
4. Copy the production webhook URL
5. Update `viral-analyzer-production.js` line 7:
   ```javascript
   WEBHOOK_URL: 'YOUR_N8N_WEBHOOK_URL_HERE'
   ```

### 4. Response Format

The n8n workflow should return JSON in this format:

```json
{
  "executionId": "unique-execution-id",
  "status": "success",
  "creator": "Creator Name",
  "platform": "tiktok|instagram|youtube",
  "postDate": "2024-01-01",
  "thumbnail": "image-url",
  "metrics": {
    "views": 1000000,
    "likes": 50000,
    "shares": 5000,
    "comments": 1000
  },
  "viralScore": 85,
  "viralFactors": [
    {
      "title": "Strong Hook",
      "description": "Captures attention in first 3 seconds"
    }
  ],
  "remakeStrategy": [
    {
      "title": "Step 1: Hook",
      "description": "Start with similar opening"
    }
  ],
  "competitorComparison": "HTML content for comparison (optional)"
}
```

## Deployment Options

### Option 1: Static Hosting (Recommended)

Deploy to any static hosting service:

1. **Netlify**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Deploy
   netlify deploy --dir=. --prod
   ```

2. **Vercel**
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Deploy
   vercel --prod
   ```

3. **GitHub Pages**
   - Push files to a GitHub repository
   - Enable GitHub Pages in Settings
   - Access at: `https://[username].github.io/[repo-name]/viral-analyzer.html`

### Option 2: Cloudflare Pages

1. Push files to GitHub
2. Connect repository to Cloudflare Pages
3. Deploy automatically on push

### Option 3: Self-Hosted

1. Upload files to your web server
2. Ensure HTTPS is enabled
3. Set appropriate CORS headers if needed

## Security Considerations

### API Keys
- **NEVER** deploy `viral-analyzer.js` (development version) to production
- Use `viral-analyzer-production.js` which sends requests to n8n
- Store all API keys securely in n8n workflow environment variables

### n8n Webhook Security

1. **Add Authentication** (optional but recommended):
   - In n8n Webhook node, enable "Authentication"
   - Set a strong API key
   - Update `viral-analyzer-production.js`:
     ```javascript
     API_KEY: 'your-webhook-api-key'
     ```

2. **Rate Limiting**:
   - Configure rate limiting in n8n or use Cloudflare
   - Prevent abuse and excessive API calls

3. **CORS Configuration**:
   - Configure allowed origins in n8n webhook settings
   - Restrict to your domain only

## Environment Variables (n8n)

Set these in your n8n instance:

```bash
# Apify
APIFY_TOKEN=your_apify_token

# AI Services (choose one or more)
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_claude_key
GOOGLE_AI_KEY=your_gemini_key

# Optional
AIRTABLE_TOKEN=your_airtable_token
```

## Testing

1. **Local Testing**:
   ```bash
   # Use any local server
   python3 -m http.server 8000
   # Visit: http://localhost:8000/viral-analyzer.html
   ```

2. **Test Webhook**:
   - Use n8n's test webhook feature
   - Send test payload:
   ```json
   {
     "contentUrl": "https://www.tiktok.com/@user/video/123",
     "platform": "tiktok",
     "analysisDepth": "deep"
   }
   ```

## Monitoring

1. **n8n Execution Logs**:
   - Monitor workflow executions in n8n dashboard
   - Set up error notifications

2. **Analytics** (optional):
   - Add Google Analytics or similar
   - Track usage patterns

## Troubleshooting

### Common Issues

1. **"Connection Error"**
   - Check webhook URL is correct
   - Verify n8n workflow is active
   - Check CORS settings

2. **"Analysis Failed"**
   - Check n8n workflow for errors
   - Verify API keys are valid
   - Check rate limits

3. **No Results Displayed**
   - Verify response format matches expected structure
   - Check browser console for JavaScript errors

## Support

For issues or questions:
1. Check n8n workflow execution logs
2. Review browser console for errors
3. Verify all API keys are valid and have sufficient credits

## License

This tool is provided as-is for Sentinel Peak Solutions.
Ensure compliance with platform ToS when scraping content.