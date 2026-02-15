// Load saved options
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['apiUrl'], (data) => {
    if (data.apiUrl) {
      document.getElementById('api-url').value = data.apiUrl;
    }
  });
});

// Save options and login
document.getElementById('config-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const apiUrl = document.getElementById('api-url').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  try {
    // Login to get token
    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) {
      throw new Error('Échec de la connexion');
    }
    
    const data = await response.json();
    
    // Save API URL and tokens
    await chrome.storage.sync.set({
      apiUrl,
      accessToken: data.tokens.accessToken,
      refreshToken: data.tokens.refreshToken,
      user: data.user
    });
    
    showMessage('Configuration sauvegardée avec succès!', 'success');
    
    // Clear password field
    document.getElementById('password').value = '';
    
  } catch (error) {
    showMessage('Erreur: ' + error.message, 'error');
  }
});

function showMessage(text, type) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = 'block';
  
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 3000);
}
