document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Reset error messages
        nameError.style.display = 'none';
        emailError.style.display = 'none';
        messageError.style.display = 'none';
        
        // Validate name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameError.style.display = 'block';
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            emailError.style.display = 'block';
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email';
            emailError.style.display = 'block';
            isValid = false;
        }
        
        // Validate message
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Message is required';
            messageError.style.display = 'block';
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Message should be at least 10 characters';
            messageError.style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            // In a real application, you would send the form data to a server here
            // For this demo, we'll just show a success message
            contactForm.reset();
            formSuccess.style.display = 'block';
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        }
    });
    
    // News form submission (similar to contact form)
    const newsForm = document.getElementById('newsForm');
    if (newsForm) {
        newsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formSuccess = document.getElementById('formSuccess');
            
            // In a real application, validate and submit the form
            // For this demo, just show success message
            newsForm.reset();
            formSuccess.style.display = 'block';
            
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        });
    }
});