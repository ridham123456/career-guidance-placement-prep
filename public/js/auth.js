/**
 * Authentication and Session Management for Vanilla JS Frontend
 */

const TOKEN_KEY = 'societal_prep_token';
const USER_KEY = 'societal_prep_user';

// Get current auth token
function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Get cached user info
function getCurrentUser() {
  const data = localStorage.getItem(USER_KEY);
  try {
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

// Save authentication session
function setAuth(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Clear authentication session
function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

// Logout handler
async function logout() {
  const token = getAuthToken();
  try {
    if (token) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
  } catch (err) {
    console.warn('Logout API call failed:', err);
  } finally {
    clearAuth();
    window.location.href = 'login.html';
  }
}

// Authenticated fetch wrapper
async function fetchWithAuth(url, options = {}) {
  const token = getAuthToken();
  if (!token) {
    clearAuth();
    window.location.href = 'login.html';
    return null;
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...(options.headers || {})
  };

  try {
    const response = await fetch(url, { ...options, headers });
    
    // If unauthorized, redirect to login
    if (response.status === 401) {
      clearAuth();
      window.location.href = 'login.html?expired=1';
      return null;
    }

    return response;
  } catch (error) {
    console.error(`Fetch error on ${url}:`, error);
    throw error;
  }
}

// Route Guard logic
function checkAuthGuard(isProtected = true) {
  const token = getAuthToken();

  if (isProtected && !token) {
    window.location.href = 'login.html';
  } else if (!isProtected && token) {
    // If user is already logged in and attempts to open login or register
    window.location.href = 'dashboard.html';
  }
}

// Helper to inject logged-in student info in top-bar and sidebar
function initUserNavbar() {
  const user = getCurrentUser();
  if (!user) return;

  const nameElements = document.querySelectorAll('.student-name');
  nameElements.forEach((el) => {
    el.textContent = user.name || 'Student';
  });

  const branchElements = document.querySelectorAll('.student-branch');
  branchElements.forEach((el) => {
    el.textContent = `${user.branch || 'CSE'} (${user.semester || '5th Sem'})`;
  });

  const avatarElements = document.querySelectorAll('.user-avatar');
  avatarElements.forEach((el) => {
    const initials = (user.name || 'S')
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    el.textContent = initials || 'ST';
  });

  // Mobile sidebar drawer toggler
  const mobileToggle = document.getElementById('mobileToggle');
  const sidebar = document.querySelector('.sidebar');
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    // Close when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target) && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    });
  }
}

