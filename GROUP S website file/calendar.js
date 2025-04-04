    // Get calendar navigation elements
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const currentMonthYear = document.getElementById('currentMonthYear');
    const calendarDays = document.getElementById('calendarDays');
    
    // Only run if calendar exists
    if (prevMonthBtn && nextMonthBtn) {
        // Start with current date
        let currentDate = new Date();
        
        // Function to render the calendar
        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            // Update month/year display (e.g., "October 2023")
            currentMonthYear.textContent = new Intl.DateTimeFormat('en-US', {
                month: 'long',
                year: 'numeric'
            }).format(currentDate);
            
            // Get first day of month (0-6, where 0 is Sunday)
            const firstDay = new Date(year, month, 1).getDay();
            // Get number of days in current month
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            // Get number of days in previous month
            const prevMonthDays = new Date(year, month, 0).getDate();
            
            // Clear existing calendar days
            calendarDays.innerHTML = '';
            
            // Add days from previous month (to fill first week)
            for (let i = firstDay - 1; i >= 0; i--) {
                const dayElement = document.createElement('div');
                dayElement.classList.add('calendar-day', 'prev-month');
                dayElement.textContent = prevMonthDays - i;
                calendarDays.appendChild(dayElement);
            }
            
            // Add days for current month
            const today = new Date();
            for (let i = 1; i <= daysInMonth; i++) {
                const dayElement = document.createElement('div');
                dayElement.classList.add('calendar-day');
                dayElement.textContent = i;
                
                // Highlight today's date
                if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                    dayElement.classList.add('today');
                }
                
                // Add indicator for sample events
                if (i === 5 || i === 15 || i === 25) {
                    dayElement.classList.add('event');
                }
                
                calendarDays.appendChild(dayElement);
            }
            
            // Calculate days needed from next month to fill last week
            const totalDays = firstDay + daysInMonth;
            const nextMonthDays = 7 - (totalDays % 7);
            
            // Add days from next month if needed
            if (nextMonthDays < 7) {
                for (let i = 1; i <= nextMonthDays; i++) {
                    const dayElement = document.createElement('div');
                    dayElement.classList.add('calendar-day', 'next-month');
                    dayElement.textContent = i;
                    calendarDays.appendChild(dayElement);
                }
            }
        }
        
        // Previous month button handler
        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
        
        // Next month button handler
        nextMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
        
        // Initial render
        renderCalendar();
    }