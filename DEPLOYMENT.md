# Deployment Guide

## Problem Solved
This guide addresses the CORS (Cross-Origin Resource Sharing) error you were experiencing when trying to access the HaveIBeenPwned API directly from your frontend.

## Solution Overview
We've created a Node.js backend server that acts as a proxy between your frontend and the HaveIBeenPwned API. This eliminates CORS issues and provides better security and control.

## Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Production Deployment Options

### Option 1: Deploy to Vercel (Recommended)

1. **Create a Vercel account** at https://vercel.com

2. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

3. **Deploy the application**:
   ```bash
   vercel
   ```

4. **Update the API_BASE_URL** in `script.js`:
   ```javascript
   const API_BASE_URL = 'https://your-vercel-app-name.vercel.app';
   ```

### Option 2: Deploy to Heroku

1. **Create a Heroku account** at https://heroku.com

2. **Install Heroku CLI**:
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

3. **Create a new Heroku app**:
   ```bash
   heroku create your-app-name
   ```

4. **Deploy to Heroku**:
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push heroku main
   ```

5. **Update the API_BASE_URL** in `script.js`:
   ```javascript
   const API_BASE_URL = 'https://your-app-name.herokuapp.com';
   ```

### Option 3: Deploy to Railway

1. **Create a Railway account** at https://railway.app

2. **Connect your GitHub repository**

3. **Deploy automatically** - Railway will detect the Node.js app and deploy it

4. **Update the API_BASE_URL** in `script.js` with your Railway domain

### Option 4: Deploy to DigitalOcean App Platform

1. **Create a DigitalOcean account**

2. **Create a new app** in the App Platform

3. **Connect your GitHub repository**

4. **Configure the build settings**:
   - Build Command: `npm install`
   - Run Command: `npm start`

5. **Update the API_BASE_URL** in `script.js`

## Environment Variables

For production deployment, you may want to set these environment variables:

```bash
PORT=3000
NODE_ENV=production
```

## Security Considerations

### Rate Limiting
The backend implements rate limiting for the free tier (1 request per 1.5 seconds). For production, consider:

- Using Redis for distributed rate limiting
- Implementing more sophisticated rate limiting strategies
- Adding IP-based blocking for abuse prevention

### API Key Management
- Store API keys securely using environment variables
- Never expose API keys in client-side code
- Implement proper key rotation

### CORS Configuration
The backend is configured to allow requests from:
- `https://haveibeenhacked.vercel.app`
- `http://localhost:3000` (development)
- `http://localhost:5000` (alternative development port)

Update the CORS configuration in `server.js` for your specific domains.

## Monitoring and Logging

### Add Application Monitoring
Consider adding monitoring services like:
- **Sentry** for error tracking
- **LogRocket** for session replay
- **New Relic** for performance monitoring

### Health Check Endpoint
The application includes a health check endpoint at `/api/health` that you can use for monitoring.

## Troubleshooting

### Common Issues

1. **CORS errors still occurring**:
   - Ensure your backend domain is correctly configured in the CORS settings
   - Check that the API_BASE_URL in `script.js` matches your backend domain

2. **Rate limiting issues**:
   - The backend implements server-side rate limiting
   - Check the rate limit headers in the response

3. **API key not working**:
   - Verify the API key is valid
   - Check that the API key is being passed correctly

4. **Server not starting**:
   - Ensure all dependencies are installed: `npm install`
   - Check that port 3000 is available
   - Verify Node.js version (requires 14.0.0 or higher)

### Debug Mode
To enable debug logging, set the NODE_ENV environment variable:
```bash
NODE_ENV=development npm start
```

## Performance Optimization

### Caching
Consider implementing caching strategies:
- Cache API responses for a short period
- Use Redis for distributed caching
- Implement browser caching for static assets

### CDN
For global performance:
- Use a CDN for static assets
- Consider using Cloudflare or similar services

## Backup and Recovery

### Database Backup
If you add a database later:
- Implement regular backup schedules
- Test recovery procedures
- Store backups in multiple locations

### Code Backup
- Use version control (Git)
- Maintain multiple deployment environments
- Document rollback procedures

## Support

If you encounter issues:
1. Check the browser console for errors
2. Review server logs
3. Verify network connectivity
4. Test with a different email address
5. Check the HaveIBeenPwned API status 