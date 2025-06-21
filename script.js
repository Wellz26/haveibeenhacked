let isRateLimited = false;
let lastRequestTime = 0;
const FREE_TIER_DELAY = 1500; // 1.5 seconds for free tier

// Determine the API base URL based on environment
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://your-backend-domain.com'; // Replace with your actual backend domain

async function checkBreaches() {
    const email = document.getElementById('emailInput').value.trim();
    const apiKey = document.getElementById('apiKeyInput').value.trim();
    
    if (!email) {
        showError('Please enter an email address');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }

    // Rate limiting for free tier (client-side)
    if (!apiKey) {
        const now = Date.now();
        const timeSinceLastRequest = now - lastRequestTime;
        
        if (timeSinceLastRequest < FREE_TIER_DELAY && lastRequestTime > 0) {
            const waitTime = Math.ceil((FREE_TIER_DELAY - timeSinceLastRequest) / 1000);
            showError(`Please wait ${waitTime} more seconds before making another request (free tier limit)`);
            return;
        }
        lastRequestTime = now;
    }

    showLoading();
    hideError();
    hideResults();

    try {
        // Use our backend proxy instead of direct API call
        const encodedEmail = encodeURIComponent(email);
        const url = `${API_BASE_URL}/api/check-breaches/${encodedEmail}`;
        
        const params = new URLSearchParams();
        if (apiKey) {
            params.append('apiKey', apiKey);
        }

        const fullUrl = params.toString() ? `${url}?${params.toString()}` : url;

        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        hideLoading();

        if (response.status === 404) {
            showResults([], email);
            return;
        }

        if (response.status === 429) {
            const errorData = await response.json();
            showError(errorData.error || 'Rate limit exceeded. Please try again later.');
            return;
        }

        if (response.status === 401) {
            const errorData = await response.json();
            showError(errorData.error || 'Invalid API key. Please check your API key or try without one (free tier).');
            return;
        }

        if (response.status === 400) {
            const errorData = await response.json();
            showError(errorData.error || 'Invalid email address.');
            return;
        }

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const breaches = await response.json();
        showResults(breaches, email);

    } catch (error) {
        hideLoading();
        
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            showError('Unable to connect to the server. Please check your internet connection or try again later.');
        } else {
            showError(`Error checking breaches: ${error.message}`);
        }
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showLoading() {
    document.getElementById('loadingSpinner').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loadingSpinner').classList.add('hidden');
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorDiv.classList.remove('hidden');
}

function hideError() {
    document.getElementById('error').classList.add('hidden');
}

function showResults(breaches, email) {
    const resultsDiv = document.getElementById('results');
    const resultsContent = document.getElementById('resultsContent');
    
    if (breaches.length === 0) {
        resultsContent.innerHTML = `
            <div class="no-breaches">
                <h3>✅ Good News!</h3>
                <p>No breaches were found for <strong>${escapeHtml(email)}</strong></p>
                <p>This email address was not found in any known data breaches.</p>
            </div>
        `;
    } else {
        let html = `
            <div class="breaches-found">
                <h3>⚠️ Breaches Found</h3>
                <p><strong>${breaches.length}</strong> breach${breaches.length === 1 ? '' : 'es'} found for <strong>${escapeHtml(email)}</strong></p>
                <div class="breaches-list">
        `;
        
        breaches.forEach(breach => {
            const breachDate = new Date(breach.BreachDate).toLocaleDateString();
            const dataClasses = breach.DataClasses.join(', ');
            
            html += `
                <div class="breach-item">
                    <div class="breach-header">
                        <h4>${escapeHtml(breach.Title)}</h4>
                        <span class="breach-date">${breachDate}</span>
                    </div>
                    <p class="breach-description">${escapeHtml(breach.Description)}</p>
                    <div class="breach-details">
                        <p><strong>Compromised accounts:</strong> ${breach.PwnCount.toLocaleString()}</p>
                        <p><strong>Compromised data:</strong> ${escapeHtml(dataClasses)}</p>
                        ${breach.Domain ? `<p><strong>Domain:</strong> ${escapeHtml(breach.Domain)}</p>` : ''}
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
                <div class="recommendations">
                    <h4>🛡️ What should you do?</h4>
                    <ul>
                        <li>Change your password immediately if you still use the same password</li>
                        <li>Enable two-factor authentication where possible</li>
                        <li>Monitor your accounts for suspicious activity</li>
                        <li>Consider using a password manager</li>
                    </ul>
                </div>
            </div>
        `;
        
        resultsContent.innerHTML = html;
    }
    
    resultsDiv.classList.remove('hidden');
}

function hideResults() {
    document.getElementById('results').classList.add('hidden');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Allow Enter key to trigger search
document.getElementById('emailInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkBreaches();
    }
});

document.getElementById('apiKeyInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkBreaches();
    }
});