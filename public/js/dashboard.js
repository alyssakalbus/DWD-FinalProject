let currentUser = null;

// Get URL parameters
function getUrlParams() {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    for (const [key, value] of urlParams.entries()) {
        params[key] = value;
    }
    
    return params;
}

// Function to get user data from API
async function getUserData() {
    try {
        // Check if we have user ID in URL or localStorage
        const params = getUrlParams();
        const userId = params.userId || localStorage.getItem('userId');
        
        if (!userId) {
            // If no user ID, redirect to login
            window.location.href = '/login';
            return;
        }
        
        // If we have data in localStorage, use that first for faster loading
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            currentUser = JSON.parse(storedData);
            updateDashboard(currentUser);
        }
        
        // Then fetch latest data from API
        const response = await fetch(`/api/v1/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        
        currentUser = await response.json();
        
        // Store in localStorage for quicker access later
        localStorage.setItem('userData', JSON.stringify(currentUser));
        localStorage.setItem('userId', currentUser._id || currentUser.userId);
        
        // Update the dashboard with fetched data
        updateDashboard(currentUser);
        
    } catch (error) {
        console.error('Error fetching user data:', error);
        document.getElementById('user-name').textContent = 'Error loading data';
        document.getElementById('user-email').textContent = 'Please try again or log in';
        document.getElementById('dna-sequence').textContent = 'Authentication error';
    }
}

// Function to update dashboard UI with user data
function updateDashboard(userData) {
    document.getElementById('user-name').textContent = userData.name;
    document.getElementById('user-email').textContent = userData.email;
    document.getElementById('dna-sequence').textContent = userData.encryptedSequence;
    
    // Set current date in dashboard
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString();
    }
}

// Function to handle logout
function logout() {
    // Clear localStorage
    localStorage.removeItem('userData');
    localStorage.removeItem('userId');
    
    // Redirect to login page
    window.location.href = '/login';
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Get the user data
    getUserData();
    
    // Add logout functionality to the logout button
    const logoutBtn = document.querySelector('.shuffle');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
});