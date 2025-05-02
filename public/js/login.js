// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form from submitting normally
        
        // Get form data
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            // Send data to login endpoint
            const response = await fetch('/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Login successful
                console.log('Login successful:', data);
                
                // Store user data or token in localStorage for future requests
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('token', data.token); // If you implement token-based auth
                
                // Redirect to user dashboard or home page
                window.location.href = '/userhome'; // or wherever you want to redirect after login
            } else {
                // Login failed
                console.error('Login failed:', data.error);
                alert(`Login failed: ${data.error}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again.');
        }
    });
});