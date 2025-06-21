const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for your frontend domain
app.use(cors({
    origin: ['https://haveibeenhacked.vercel.app', 'http://localhost:3000', 'http://localhost:5000'],
    credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname)));

// Proxy endpoint for HaveIBeenPwned API
app.get('/api/check-breaches/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const { apiKey } = req.query;
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        // Rate limiting for free tier
        if (!apiKey) {
            // Simple in-memory rate limiting (in production, use Redis)
            const clientIP = req.ip;
            const now = Date.now();
            
            // Check if this IP has made a request recently
            if (global.rateLimitMap && global.rateLimitMap[clientIP]) {
                const timeSinceLastRequest = now - global.rateLimitMap[clientIP];
                if (timeSinceLastRequest < 1500) { // 1.5 seconds
                    const waitTime = Math.ceil((1500 - timeSinceLastRequest) / 1000);
                    return res.status(429).json({ 
                        error: `Rate limit exceeded. Please wait ${waitTime} more seconds before making another request (free tier limit)` 
                    });
                }
            }
            
            // Update rate limit map
            if (!global.rateLimitMap) global.rateLimitMap = {};
            global.rateLimitMap[clientIP] = now;
        }

        // Prepare headers for HaveIBeenPwned API
        const headers = {
            'User-Agent': 'Have-I-Been-Pwned-Checker-Website'
        };
        
        if (apiKey) {
            headers['hibp-api-key'] = apiKey;
        }

        // Make request to HaveIBeenPwned API
        const encodedEmail = encodeURIComponent(email);
        const url = `https://haveibeenpwned.com/api/v3/breachedaccount/${encodedEmail}?truncateResponse=false`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });

        // Handle different response statuses
        if (response.status === 404) {
            return res.json([]);
        }

        if (response.status === 429) {
            const retryAfter = response.headers.get('retry-after');
            return res.status(429).json({ 
                error: `Rate limit exceeded. Please try again in ${retryAfter || '60'} seconds.` 
            });
        }

        if (response.status === 401) {
            return res.status(401).json({ 
                error: 'Invalid API key. Please check your API key or try without one (free tier).' 
            });
        }

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const breaches = await response.json();
        res.json(breaches);

    } catch (error) {
        console.error('Error checking breaches:', error);
        res.status(500).json({ 
            error: 'Internal server error. Please try again later.' 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to use the application`);
}); 