// Content script - runs on all pages
console.log('OphtaConnect extension loaded');

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSelectedText') {
    const selection = window.getSelection();
    sendResponse({ text: selection ? selection.toString() : '' });
  }
  return true;
});
