# 🔐 Have I Been Pwned Checker

A secure web application to check if email addresses have been compromised in data breaches using the HaveIBeenPwned API.

## 🚀 Quick Start

### Option 1: Using the Quick Start Script (Recommended)
```bash
./quick-start.sh
```

### Option 2: Manual Setup
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Architecture

This application uses a **backend proxy architecture** to solve CORS (Cross-Origin Resource Sharing) issues:

```
Frontend (Browser) → Backend Proxy → HaveIBeenPwned API
```

### Why This Architecture?

- **Solves CORS Issues**: The HaveIBeenPwned API doesn't support CORS for browser requests
- **Enhanced Security**: API keys are kept secure on the backend
- **Better Control**: Rate limiting and error handling on the server
- **Improved Performance**: Caching and optimization opportunities

## 📁 Project Structure

```
passwords/
├── server.js              # Backend proxy server
├── package.json           # Node.js dependencies
├── index.html             # Main HTML page
├── script.js              # Frontend JavaScript
├── styles.css             # CSS styles
├── DEPLOYMENT.md          # Deployment guide
├── AI_AGENT_GUIDELINES.md # AI agent guidelines
└── quick-start.sh         # Quick start script
```

## 🔧 Features

- ✅ **Email Validation**: Ensures valid email format
- ✅ **Rate Limiting**: Respects HaveIBeenPwned API limits
- ✅ **API Key Support**: Enhanced features with API key
- ✅ **Error Handling**: Comprehensive error messages
- ✅ **Responsive Design**: Works on all devices
- ✅ **Security Focused**: Secure by design

## 🛡️ Security Features

- **Input Validation**: All user inputs are validated
- **Rate Limiting**: Prevents API abuse
- **CORS Protection**: Proper CORS configuration
- **Error Sanitization**: Prevents information leakage
- **Secure Headers**: Proper security headers

## 📊 API Usage

### Free Tier
- 1 request per 1.5 seconds
- Basic breach information
- No API key required

### Enhanced Tier (with API key)
- Faster response times
- More detailed breach information
- Higher rate limits

[Get your API key here](https://haveibeenpwned.com/API/Key)

## 🚀 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deployment Options:
- **Vercel**: `vercel`
- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repository
- **DigitalOcean**: App Platform deployment

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**: ✅ **SOLVED** - Backend proxy eliminates CORS issues
2. **Rate Limiting**: Built-in rate limiting on both client and server
3. **API Key Issues**: Proper error handling and validation
4. **Server Not Starting**: Check Node.js version (requires 14+)

### Debug Mode
```bash
NODE_ENV=development npm start
```

## 🤖 AI Agent Guidelines

This project includes comprehensive guidelines for AI agents working on the codebase. See [AI_AGENT_GUIDELINES.md](AI_AGENT_GUIDELINES.md) for detailed protocols.

## 📝 API Endpoints

### Backend Proxy Endpoints

- `GET /api/check-breaches/:email` - Check for breaches
- `GET /api/health` - Health check endpoint
- `GET /` - Serve the main application

### Query Parameters

- `apiKey` (optional): Your HaveIBeenPwned API key

### Response Format

```json
[
  {
    "Name": "Adobe",
    "Title": "Adobe",
    "Domain": "adobe.com",
    "BreachDate": "2013-10-04",
    "AddedDate": "2013-12-04T00:00:00Z",
    "ModifiedDate": "2013-12-04T00:00:00Z",
    "PwnCount": 152445165,
    "Description": "In October 2013, 153 million Adobe accounts were breached...",
    "DataClasses": ["Email addresses", "Password hints", "Passwords", "Usernames"],
    "IsVerified": true,
    "IsFabricated": false,
    "IsSensitive": false,
    "IsRetired": false,
    "IsSpamList": false,
    "LogoPath": "https://haveibeenpwned.com/Content/Images/PwnedLogos/Adobe.png"
  }
]
```

## 🔄 Development

### Prerequisites
- Node.js 14.0.0 or higher
- npm or yarn

### Development Commands
```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Check for linting issues
npm run lint
```

### Environment Variables
```bash
PORT=3000                    # Server port
NODE_ENV=production          # Environment mode
```

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- [HaveIBeenPwned](https://haveibeenpwned.com/) for providing the breach data API
- [Troy Hunt](https://www.troyhunt.com/) for creating and maintaining the service

## 🆘 Support

If you encounter any issues:

1. Check the [troubleshooting section](#troubleshooting)
2. Review the [deployment guide](DEPLOYMENT.md)
3. Check the browser console for errors
4. Verify your internet connection
5. Test with a different email address

## 🔗 Links

- [HaveIBeenPwned API Documentation](https://haveibeenpwned.com/API/v3)
- [Get API Key](https://haveibeenpwned.com/API/Key)
- [Report a Bug](https://github.com/yourusername/passwords/issues)