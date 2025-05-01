document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.signup-form');
    const messageContainer = document.getElementById('signup-message');
    
    // Function to display messages
    function showMessage(message, isError = false) {
        messageContainer.textContent = message;
        messageContainer.className = isError ? 'error-message' : 'success-message';
        messageContainer.style.display = 'block';
        
        // Scroll to message
        messageContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Function to validate DNA sequence format
    function validateDNASequence(sequence) {
        // Check if sequence contains only A, T, C, G characters
        const validChars = /^[ATCG]+$/i;
        return validChars.test(sequence) && sequence.length >= 10;
    }
    
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const birthday = document.getElementById('birthday').value;
        const dnaSequence = document.getElementById('dnaSequence').value.trim().toUpperCase();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Basic validation
        if (password !== confirmPassword) {
            showMessage('Passwords do not match', true);
            return;
        }
        
        if (password.length < 8) {
            showMessage('Password must be at least 8 characters long', true);
            return;
        }
        
        if (!validateDNASequence(dnaSequence)) {
            showMessage('DNA sequence must contain only A, T, C, G characters and be at least 10 characters long', true);
            return;
        }
        
        try {
            // Send data to API
            const response = await fetch('/api/v1/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    birthday,
                    dnaSequence,
                    password
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Success
                showMessage('Account created successfully! Your DNA has been encrypted. Redirecting to login...');
                
                // Clear form
                signupForm.reset();
                
                // Redirect to login page after a delay
                setTimeout(() => {
                    window.location.href = '/login';
                }, 3000);
            } else {
                // API returned an error
                showMessage(`Error: ${data.error || 'Something went wrong'}`, true);
            }
        } catch (error) {
            console.error('Signup error:', error);
            showMessage('An error occurred while creating your account. Please try again.', true);
        }
    });

});