/**
 * LLM UI Handler
 * Manages the LLM chat interface and settings modal
 */

function initializeLLMUI() {
    // Button event listeners
    document.getElementById('llmSettingsBtn')?.addEventListener('click', openLLMSettings);
    document.getElementById('llmChatBtn')?.addEventListener('click', openLLMChat);
    document.getElementById('saveLLMSettings')?.addEventListener('click', saveLLMSettings);
    document.getElementById('testConnection')?.addEventListener('click', testConnection);
    document.getElementById('refreshModels')?.addEventListener('click', refreshModels);
    document.getElementById('refreshDomains')?.addEventListener('click', refreshDomains);
    document.getElementById('sendMessage')?.addEventListener('click', sendMessage);

    // Temperature slider
    const tempSlider = document.getElementById('llmTemperature');
    const tempValue = document.getElementById('tempValue');
    tempSlider?.addEventListener('input', (e) => {
        tempValue.textContent = e.target.value;
    });

    // Enter key to send message
    document.getElementById('chatInput')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Load saved settings into UI
    loadSettingsIntoUI();
}

/**
 * Open LLM Settings Modal
 */
function openLLMSettings() {
    const modal = document.getElementById('llmSettingsModal');
    modal.classList.add('show');
    loadSettingsIntoUI();
    
    // Don't auto-refresh models - let user click refresh when ready
    // This avoids connection errors if API isn't running yet
}

/**
 * Close LLM Settings Modal
 */
function closeLLMSettings() {
    const modal = document.getElementById('llmSettingsModal');
    modal.classList.remove('show');
}

/**
 * Open LLM Chat Modal
 */
function openLLMChat() {
    const modal = document.getElementById('llmChatModal');
    modal.classList.add('show');
    
    // Focus on input
    setTimeout(() => {
        document.getElementById('chatInput')?.focus();
    }, 100);
}

/**
 * Close LLM Chat Modal
 */
function closeLLMChat() {
    const modal = document.getElementById('llmChatModal');
    modal.classList.remove('show');
}

/**
 * Load settings into UI form
 */
function loadSettingsIntoUI() {
    const settings = window.llmClient.getSettings();
    
    document.getElementById('llmApiUrl').value = settings.apiUrl || '';
    document.getElementById('llmTemperature').value = settings.temperature || 0.7;
    document.getElementById('tempValue').textContent = settings.temperature || 0.7;
    document.getElementById('llmMaxTokens').value = settings.maxTokens || 512;
    document.getElementById('llmTopK').value = settings.topK || 3;
    document.getElementById('llmMinRelevanceScore').value = settings.minRelevanceScore || 0.5;
    document.getElementById('llmEnableRag').checked = settings.enableRag || false;
    
    // Set domain filter multi-select
    const domainSelect = document.getElementById('llmDomainFilter');
    const savedDomains = settings.domainFilter || ['gloomhaven'];
    Array.from(domainSelect.options).forEach(option => {
        option.selected = savedDomains.includes(option.value);
    });
    
    // Set model if available
    if (settings.model) {
        const modelSelect = document.getElementById('llmModel');
        const option = Array.from(modelSelect.options).find(opt => opt.value === settings.model);
        if (option) {
            modelSelect.value = settings.model;
        }
    }
}

/**
 * Save LLM Settings
 */
function saveLLMSettings() {
    // Get selected domains from multi-select
    const domainSelect = document.getElementById('llmDomainFilter');
    const domainFilter = Array.from(domainSelect.selectedOptions).map(opt => opt.value);
    
    const settings = {
        apiUrl: document.getElementById('llmApiUrl').value.trim(),
        model: document.getElementById('llmModel').value,
        temperature: parseFloat(document.getElementById('llmTemperature').value),
        maxTokens: parseInt(document.getElementById('llmMaxTokens').value),
        topK: parseInt(document.getElementById('llmTopK').value),
        minRelevanceScore: parseFloat(document.getElementById('llmMinRelevanceScore').value),
        enableRag: document.getElementById('llmEnableRag').checked,
        domainFilter: domainFilter.length > 0 ? domainFilter : ['gloomhaven']
    };
    
    window.llmClient.saveSettings(settings);
    
    showConnectionStatus('Settings saved successfully!', 'success');
    
    setTimeout(() => {
        closeLLMSettings();
    }, 1000);
}

/**
 * Test API Connection
 */
async function testConnection() {
    const statusDiv = document.getElementById('connectionStatus');
    const testBtn = document.getElementById('testConnection');
    
    // Update API URL before testing
    const apiUrl = document.getElementById('llmApiUrl').value.trim();
    window.llmClient.saveSettings({ apiUrl });
    
    testBtn.disabled = true;
    showConnectionStatus('Testing connection...', 'info');
    
    try {
        const result = await window.llmClient.healthCheck();
        showConnectionStatus('✅ Connection successful! API is responding.', 'success');
        
        // Auto-refresh models on successful connection
        setTimeout(() => {
            refreshModels();
        }, 500);
    } catch (error) {
        showConnectionStatus(`❌ Connection failed: ${error.message}`, 'error');
    } finally {
        testBtn.disabled = false;
    }
}

/**
 * Refresh available models
 */
async function refreshModels() {
    const modelSelect = document.getElementById('llmModel');
    const refreshBtn = document.getElementById('refreshModels');
    
    refreshBtn.disabled = true;
    showConnectionStatus('Fetching models...', 'info');
    
    try {
        const models = await window.llmClient.getAvailableModels();
        
        // Clear existing options except first
        modelSelect.innerHTML = '<option value="">Select a model...</option>';
        
        // Add model options
        if (Array.isArray(models) && models.length > 0) {
            models.forEach(model => {
                const option = document.createElement('option');
                option.value = typeof model === 'string' ? model : model.id || model.name;
                option.textContent = typeof model === 'string' ? model : model.name || model.id;
                modelSelect.appendChild(option);
            });
            
            // Restore previously selected model
            const savedModel = window.llmClient.getSettings().model;
            if (savedModel) {
                modelSelect.value = savedModel;
            }
            
            showConnectionStatus(`✅ Found ${models.length} model(s)`, 'success');
        } else {
            showConnectionStatus('⚠️ No models found', 'warning');
        }
    } catch (error) {
        showConnectionStatus(`❌ Failed to fetch models: ${error.message}`, 'error');
    } finally {
        refreshBtn.disabled = false;
    }
}

/**
 * Refresh available domains
 */
async function refreshDomains() {
    const domainSelect = document.getElementById('llmDomainFilter');
    const refreshBtn = document.getElementById('refreshDomains');
    
    refreshBtn.disabled = true;
    showConnectionStatus('Fetching domains...', 'info');
    
    try {
        const domains = await window.llmClient.getDomains();
        
        // Save currently selected domains
        const selectedDomains = Array.from(domainSelect.selectedOptions).map(opt => opt.value);
        
        // Clear existing options
        domainSelect.innerHTML = '';
        
        // Add domain options
        if (Array.isArray(domains) && domains.length > 0) {
            domains.forEach(domain => {
                const option = document.createElement('option');
                const domainValue = typeof domain === 'string' ? domain : domain.name || domain.id;
                option.value = domainValue;
                option.textContent = domainValue;
                
                // Restore selection if it was previously selected
                option.selected = selectedDomains.includes(domainValue);
                
                domainSelect.appendChild(option);
            });
            
            showConnectionStatus(`✅ Found ${domains.length} domain(s)`, 'success');
        } else {
            // Fallback to default
            const option = document.createElement('option');
            option.value = 'gloomhaven';
            option.textContent = 'gloomhaven';
            option.selected = true;
            domainSelect.appendChild(option);
            
            showConnectionStatus('⚠️ No domains found, using default', 'warning');
        }
    } catch (error) {
        showConnectionStatus(`❌ Failed to fetch domains: ${error.message}`, 'error');
        
        // Keep existing domains on error
    } finally {
        refreshBtn.disabled = false;
    }
}

/**
 * Show connection status message
 */
function showConnectionStatus(message, type) {
    const statusDiv = document.getElementById('connectionStatus');
    statusDiv.textContent = message;
    statusDiv.className = `connection-status ${type}`;
    statusDiv.style.display = 'block';
}

/**
 * Send message to LLM
 */
async function sendMessage() {
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    const loadingBar = document.getElementById('llmLoadingBar');
    const sendBtn = document.getElementById('sendMessage');
    
    const message = input.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addChatMessage(message, 'user');
    
    // Clear input
    input.value = '';
    
    // Show loading
    loadingBar.style.display = 'block';
    sendBtn.disabled = true;
    input.disabled = true;
    
    // Start loading animation
    startLoadingAnimation();
    
    try {
        // Send query with current settings
        const response = await window.llmClient.queryWithSettings(message);
        
        // Extract response text
        const responseText = response.answer || response.response || response.text || JSON.stringify(response);
        
        // Add AI response to chat
        addChatMessage(responseText, 'assistant');
        
    } catch (error) {
        addChatMessage(`Error: ${error.message}`, 'error');
    } finally {
        // Hide loading
        loadingBar.style.display = 'none';
        sendBtn.disabled = false;
        input.disabled = false;
        input.focus();
        
        // Stop loading animation
        stopLoadingAnimation();
    }
}

/**
 * Add message to chat
 */
function addChatMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Loading animation
 */
let loadingInterval = null;

function startLoadingAnimation() {
    const progressBar = document.querySelector('.loading-progress');
    let width = 0;
    
    loadingInterval = setInterval(() => {
        // Simulate progress (never reaches 100%)
        width += Math.random() * 2;
        if (width > 95) width = 95;
        
        progressBar.style.width = width + '%';
    }, 500);
}

function stopLoadingAnimation() {
    if (loadingInterval) {
        clearInterval(loadingInterval);
        loadingInterval = null;
    }
    
    const progressBar = document.querySelector('.loading-progress');
    progressBar.style.width = '0%';
}

/**
 * Close modals when clicking outside
 */
window.addEventListener('click', (e) => {
    const settingsModal = document.getElementById('llmSettingsModal');
    const chatModal = document.getElementById('llmChatModal');
    
    if (e.target === settingsModal) {
        closeLLMSettings();
    }
    if (e.target === chatModal) {
        closeLLMChat();
    }
});
