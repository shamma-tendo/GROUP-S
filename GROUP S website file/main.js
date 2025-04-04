// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        updateDarkModeIcon(currentTheme);
    }
    
    // Toggle dark/light mode
    darkModeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateDarkModeIcon(newTheme);
    });
    
    function updateDarkModeIcon(theme) {
        const icon = darkModeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // Tab functionality for About page
    const tabButtons = document.querySelectorAll('.tab-button');
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                document.querySelectorAll('.tab-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Accordion functionality for Academics page
    const accordionButtons = document.querySelectorAll('.accordion-button');
    if (accordionButtons.length > 0) {
        accordionButtons.forEach(button => {
            button.addEventListener('click', function() {
                this.classList.toggle('active');
                const content = this.nextElementSibling;
                
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    content.classList.remove('show');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.classList.add('show');
                }
            });
        });
    }
    
    // Testimonials auto-scrolling
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (testimonialContainer) {
        let currentIndex = 0;
        const testimonials = document.querySelectorAll('.testimonial-slide');
        const totalTestimonials = testimonials.length;
        
        function showNextTestimonial() {
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });
            
            currentIndex = (currentIndex + 1) % totalTestimonials;
            testimonials[currentIndex].style.display = 'block';
        }
        
        // Show first testimonial
        testimonials[0].style.display = 'block';
        
        // Set interval for auto-scrolling
        setInterval(showNextTestimonial, 5000);
    }
    
    // Calendar functionality for News page
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const currentMonthYear = document.getElementById('currentMonthYear');
    const calendarDays = document.getElementById('calendarDays');
    
    if (prevMonthBtn && nextMonthBtn) {
        let currentDate = new Date();
        
        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            // Update month/year display
            currentMonthYear.textContent = new Intl.DateTimeFormat('en-US', {
                month: 'long',
                year: 'numeric'
            }).format(currentDate);
            
            // Get first day of month and total days in month
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            // Get days from previous month
            const prevMonthDays = new Date(year, month, 0).getDate();
            
            // Clear calendar
            calendarDays.innerHTML = '';
            
            // Previous month days
            for (let i = firstDay - 1; i >= 0; i--) {
                const dayElement = document.createElement('div');
                dayElement.classList.add('calendar-day', 'prev-month');
                dayElement.textContent = prevMonthDays - i;
                calendarDays.appendChild(dayElement);
            }
            
            // Current month days
            const today = new Date();
            for (let i = 1; i <= daysInMonth; i++) {
                const dayElement = document.createElement('div');
                dayElement.classList.add('calendar-day');
                dayElement.textContent = i;
                
                // Highlight today
                if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    dayElement.classList.add('today');
                }
                
                // Add event indicator (sample - in real app, this would come from data)
                if (i === 5 || i === 15 || i === 25) {
                    dayElement.classList.add('event');
                }
                
                calendarDays.appendChild(dayElement);
            }
            
            // Next month days
            const totalDays = firstDay + daysInMonth;
            const nextMonthDays = 7 - (totalDays % 7);
            
            if (nextMonthDays < 7) {
                for (let i = 1; i <= nextMonthDays; i++) {
                    const dayElement = document.createElement('div');
                    dayElement.classList.add('calendar-day', 'next-month');
                    dayElement.textContent = i;
                    calendarDays.appendChild(dayElement);
                }
            }
        }
        
        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
        
        nextMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
        
        // Initial render
        renderCalendar();
    }
    
    // Gallery filter functionality
    const filterButtons = document.querySelectorAll('.filter-button');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                const galleryItems = document.querySelectorAll('.gallery-item');
                
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Lightbox functionality
    const galleryImages = document.querySelectorAll('.gallery-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (galleryImages.length > 0) {
        let currentImageIndex = 0;
        const imagesArray = Array.from(galleryImages);
        
        galleryImages.forEach((image, index) => {
            image.addEventListener('click', function() {
                currentImageIndex = index;
                openLightbox(this);
            });
        });
        
        function openLightbox(image) {
            lightbox.style.display = 'flex';
            lightboxImg.src = image.src;
            lightboxCaption.textContent = image.nextElementSibling.querySelector('p').textContent;
            document.body.style.overflow = 'hidden';
        }
        
        function closeLightboxFunc() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        function showPrevImage() {
            currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
            updateLightboxImage();
        }
        
        function showNextImage() {
            currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
            updateLightboxImage();
        }
        
        function updateLightboxImage() {
            const image = imagesArray[currentImageIndex];
            lightboxImg.src = image.src;
            lightboxCaption.textContent = image.nextElementSibling.querySelector('p').textContent;
        }
        
        closeLightbox.addEventListener('click', closeLightboxFunc);
        prevBtn.addEventListener('click', showPrevImage);
        nextBtn.addEventListener('click', showNextImage);
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightboxFunc();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (lightbox.style.display === 'flex') {
                if (e.key === 'Escape') {
                    closeLightboxFunc();
                } else if (e.key === 'ArrowLeft') {
                    showPrevImage();
                } else if (e.key === 'ArrowRight') {
                    showNextImage();
                }
            }
        });
    }
});