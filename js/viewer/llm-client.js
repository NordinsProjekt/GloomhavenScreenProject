/**
 * LLM API Client
 * Handles communication with local LLM API
 */

class LLMClient {
    constructor() {
        this.settings = this.loadSettings();
    }

    /**
     * Load settings from localStorage
     */
    loadSettings() {
        const defaultSettings = {
            apiUrl: 'http://localhost:5000',
            model: '',
            temperature: 0.7,
            maxTokens: 512,
            topK: 3,
            minRelevanceScore: 0.5,
            enableRag: false,
            domainFilter: ['gloomhaven']
        };

        const saved = localStorage.getItem('llmSettings');
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    }

    /**
     * Save settings to localStorage
     */
    saveSettings(settings) {
        this.settings = { ...this.settings, ...settings };
        localStorage.setItem('llmSettings', JSON.stringify(this.settings));
    }

    /**
     * Get current settings
     */
    getSettings() {
        return { ...this.settings };
    }

    /**
     * Build full API URL
     */
    buildUrl(endpoint) {
        const baseUrl = this.settings.apiUrl.replace(/\/$/, ''); // Remove trailing slash
        return `${baseUrl}${endpoint}`;
    }

    /**
     * Health check - verify API is accessible
     */
    async healthCheck() {
        try {
            const response = await fetch(this.buildUrl('/api/Health'), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Health check failed:', error);
            throw new Error(`Failed to connect to API: ${error.message}`);
        }
    }

    /**
     * Get available models from the API
     */
    async getAvailableModels() {
        try {
            const response = await fetch(this.buildUrl('/api/Health/models'), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data.models || data || [];
        } catch (error) {
            console.error('Failed to fetch models:', error);
            throw new Error(`Failed to fetch models: ${error.message}`);
        }
    }

    /**
     * Get all available domain filters
     */
    async getDomains() {
        try {
            const response = await fetch(this.buildUrl('/api/Health/domains'), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data.domains || data || [];
        } catch (error) {
            console.error('Failed to fetch domains:', error);
            throw new Error(`Failed to fetch domains: ${error.message}`);
        }
    }

    /**
     * Get all available categories
     */
    async getCategories() {
        try {
            const response = await fetch(this.buildUrl('/api/Health/domains/categories'), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data.categories || data || [];
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            throw new Error(`Failed to fetch categories: ${error.message}`);
        }
    }

    /**
     * Get domains by category
     * @param {string} category - The category to filter by
     */
    async getDomainsByCategory(category) {
        try {
            const response = await fetch(this.buildUrl(`/api/Health/domains/category/${encodeURIComponent(category)}`), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data.domains || data || [];
        } catch (error) {
            console.error('Failed to fetch domains by category:', error);
            throw new Error(`Failed to fetch domains by category: ${error.message}`);
        }
    }

    /**
     * Send a query to the LLM
     * @param {string} question - The question to ask
     * @param {object} overrideSettings - Optional settings to override defaults
     */
    async query(question, overrideSettings = {}) {
        try {
            const settings = { ...this.settings, ...overrideSettings };

            const requestBody = {
                question: question,
                enableRag: settings.enableRag,
                maxTokens: parseInt(settings.maxTokens),
                temperature: parseFloat(settings.temperature),
                topK: parseInt(settings.topK),
                minRelevanceScore: parseFloat(settings.minRelevanceScore)
            };

            // Add domainFilter if RAG is enabled and domains are specified
            if (settings.enableRag && settings.domainFilter && settings.domainFilter.length > 0) {
                requestBody.domainFilter = settings.domainFilter;
            }

            // Add model if specified
            if (settings.model) {
                requestBody.model = settings.model;
            }

            console.log('Sending query:', requestBody);

            const response = await fetch(this.buildUrl('/api/Query'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log('Query response:', data);
            
            return data;
        } catch (error) {
            console.error('Query failed:', error);
            throw new Error(`Query failed: ${error.message}`);
        }
    }

    /**
     * Query with current settings
     * Simple wrapper for consistency
     */
    async queryWithSettings(question) {
        return await this.query(question);
    }
}

// Create global instance
window.llmClient = new LLMClient();
