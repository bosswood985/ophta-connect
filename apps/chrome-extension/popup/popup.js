// Check authentication status on load
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  
  // Load selected text from storage
  chrome.storage.local.get(['selectedPatient'], (data) => {
    if (data.selectedPatient) {
      document.getElementById('patient-name').value = data.selectedPatient;
      // Clear storage
      chrome.storage.local.remove('selectedPatient');
    }
  });
});

function checkAuth() {
  chrome.storage.sync.get(['accessToken', 'apiUrl'], (data) => {
    if (data.accessToken) {
      showFormSection();
      loadMedecins();
      loadMotifs();
    } else {
      showAuthSection();
    }
  });
}

function showAuthSection() {
  document.getElementById('auth-section').style.display = 'block';
  document.getElementById('form-section').style.display = 'none';
}

function showFormSection() {
  document.getElementById('auth-section').style.display = 'none';
  document.getElementById('form-section').style.display = 'block';
}

// Login button
document.getElementById('login-btn').addEventListener('click', () => {
  // Open options page to configure API and login
  chrome.runtime.openOptionsPage();
});

// Load médecins from API
async function loadMedecins() {
  try {
    const { apiUrl, accessToken } = await chrome.storage.sync.get(['apiUrl', 'accessToken']);
    const url = apiUrl || 'http://localhost:3001';
    
    const response = await fetch(`${url}/api/medecins`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    
    const medecins = await response.json();
    const select = document.getElementById('medecin');
    
    medecins.forEach(medecin => {
      const option = document.createElement('option');
      option.value = medecin.id;
      option.textContent = `Dr ${medecin.prenom} ${medecin.nom}`;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Error loading médecins:', error);
  }
}

// Load motifs from API
async function loadMotifs() {
  try {
    const { apiUrl, accessToken } = await chrome.storage.sync.get(['apiUrl', 'accessToken']);
    const url = apiUrl || 'http://localhost:3001';
    
    const response = await fetch(`${url}/api/motifs`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    
    const motifs = await response.json();
    const select = document.getElementById('motif');
    
    motifs.forEach(motif => {
      const option = document.createElement('option');
      option.value = motif.id;
      option.textContent = motif.libelle;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Error loading motifs:', error);
  }
}

// Form submission
document.getElementById('adressage-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const patientName = document.getElementById('patient-name').value;
  const medecinId = document.getElementById('medecin').value;
  const motifId = document.getElementById('motif').value;
  const urgence = document.getElementById('urgence').value;
  const notes = document.getElementById('notes').value;
  
  // Create patient first (simplified - in production you'd search for existing)
  try {
    const { apiUrl, accessToken } = await chrome.storage.sync.get(['apiUrl', 'accessToken']);
    const url = apiUrl || 'http://localhost:3001';
    
    // Parse patient name (simplified)
    const [prenom, ...nomParts] = patientName.split(' ');
    const nom = nomParts.join(' ');
    
    // Create patient
    const patientResponse = await fetch(`${url}/api/patients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ nom: nom || prenom, prenom })
    });
    
    const patient = await patientResponse.json();
    
    // Get current user ID from token (would need to decode JWT or get from storage)
    const userResponse = await fetch(`${url}/api/medecins`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    const medecins = await userResponse.json();
    const currentUser = medecins[0]; // Simplified
    
    // Create adressage
    const adressageData = {
      medecinReferentId: currentUser.id,
      medecinDestinataireId: medecinId,
      patientId: patient.id,
      motifId,
      urgence,
      notes,
      priseRdvPar: 'SECRETARIAT'
    };
    
    const response = await fetch(`${url}/api/adressages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(adressageData)
    });
    
    if (response.ok) {
      showSuccess();
    } else {
      const error = await response.json();
      showError(error.error || 'Erreur lors de la création');
    }
  } catch (error) {
    showError('Erreur: ' + error.message);
  }
});

function showSuccess() {
  document.getElementById('success-message').style.display = 'block';
  document.getElementById('error-message').style.display = 'none';
  document.getElementById('adressage-form').reset();
  
  setTimeout(() => {
    document.getElementById('success-message').style.display = 'none';
  }, 3000);
}

function showError(message) {
  const errorDiv = document.getElementById('error-message');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
  document.getElementById('success-message').style.display = 'none';
}
