    // Get all accordion buttons
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    // Only run if accordions exist
    if (accordionButtons.length > 0) {
        // Add click handler to each accordion button
        accordionButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Toggle active state on button
                this.classList.toggle('active');
                // Get the content panel to show/hide
                const content = this.nextElementSibling;
                
                // If content is currently visible
                if (content.style.maxHeight) {
                    // Hide it
                    content.style.maxHeight = null;
                    content.classList.remove('show');
                } else {
                    // Show it by setting maxHeight to its full height
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.classList.add('show');
                }
            });
        });
    }