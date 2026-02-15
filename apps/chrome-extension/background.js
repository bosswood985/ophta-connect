// Background service worker for Chrome extension
chrome.runtime.onInstalled.addListener(() => {
  // Create context menu
  chrome.contextMenus.create({
    id: 'ophtaconnect-adresser',
    title: 'Adresser via OphtaConnect',
    contexts: ['selection']
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'ophtaconnect-adresser') {
    const selectedText = info.selectionText;
    
    // Store selected text for popup to access
    chrome.storage.local.set({ selectedPatient: selectedText }, () => {
      // Open popup
      chrome.action.openPopup();
    });
  }
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'createAdressage') {
    // Get API URL from storage
    chrome.storage.sync.get(['apiUrl', 'accessToken'], (data) => {
      const apiUrl = data.apiUrl || 'http://localhost:3001';
      const token = data.accessToken;

      if (!token) {
        sendResponse({ success: false, error: 'Non authentifié' });
        return;
      }

      // Send to API
      fetch(`${apiUrl}/api/adressages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(request.data)
      })
        .then(response => response.json())
        .then(data => sendResponse({ success: true, data }))
        .catch(error => sendResponse({ success: false, error: error.message }));
    });

    return true; // Keep channel open for async response
  }
});
