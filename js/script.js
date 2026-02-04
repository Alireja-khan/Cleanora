const today = new Date().toISOString().split('T')[0];
document.getElementById('bookingDate').min = today;

const bookingModal = document.getElementById('bookingModal');
const closeBtn = document.getElementById('closeBookingModal');
const cancelBooking = document.getElementById('cancelBooking');
const scheduleBooking = document.getElementById('scheduleBooking');
const bookNowButtons = document.querySelectorAll('.plan-1-btn, .plan-2-btn, .plan-3-btn');


const serviceData = {
    'plan-1-btn': {
        name: 'Basic Plan',
        price: '$450',
        description: 'Perfect for small apartments and basic cleaning needs.'
    },
    'plan-2-btn': {
        name: 'Professional Plan',
        price: '$650',
        description: 'Ideal for medium-sized homes with comprehensive cleaning.'
    },
    'plan-3-btn': {
        name: 'Advanced Plan',
        price: '$950',
        description: 'Complete cleaning solution for large homes and thorough cleaning.'
    }
};


function openBookingModal(serviceClass) {
    const serviceInfo = serviceData[serviceClass];
    
    if (serviceInfo) {
        document.getElementById('serviceType').value = serviceInfo.name;
        document.getElementById('servicePrice').value = serviceInfo.price;
        document.getElementById('modalTitle').textContent = `Book ${serviceInfo.name}`;
        document.getElementById('modalDescription').textContent = serviceInfo.description;
        bookingModal.setAttribute('data-service-class', serviceClass);
    }
    
    bookingModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeBookingModal() {
    bookingModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('customerName').value = '';
    document.getElementById('customerEmail').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('bookingDate').value = '';
    document.getElementById('bookingDate').min = today;
}

bookNowButtons.forEach(button => {
    button.addEventListener('click', function() {
        openBookingModal(this.classList[0]);
    });
});

closeBtn.addEventListener('click', closeBookingModal);
cancelBooking.addEventListener('click', closeBookingModal);

window.addEventListener('click', function(event) {
    if (event.target === bookingModal) {
        closeBookingModal();
    }
});

scheduleBooking.addEventListener('click', function() {
    const customerName = document.getElementById('customerName').value.trim();
    const customerEmail = document.getElementById('customerEmail').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const bookingDate = document.getElementById('bookingDate').value;
    const bookingTime = document.getElementById('bookingTime').value;
    const serviceType = document.getElementById('serviceType').value;
    const servicePrice = document.getElementById('servicePrice').value;
    
    if (!customerName || !customerEmail || !bookingDate) {
        alert('Please fill in all required fields (Name, Email, and Date).');
        return;
    }
    
    const emailRegex = /^[\w\.-]+@[\w\.-]+\.\w+$/;
    if (!emailRegex.test(customerEmail)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    const dateTime = new Date(`${bookingDate} ${bookingTime}`);
    
    const startDate = dateTime.toISOString().replace(/-|:|\.\d{3}/g, '');
    
    const endDate = new Date(dateTime.getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d{3}/g, '');
    
    const eventName = encodeURIComponent(`Cleaning Service - ${serviceType}`);
    const eventDetails = encodeURIComponent(
        `Customer: ${customerName}\n` +
        `Email: ${customerEmail}\n` +
        `Phone: ${customerPhone}\n` +
        `Service: ${serviceType} (${servicePrice})\n` +
        `Duration: 2 hours\n` +
        `Thank you for choosing Cleanora!`
    );
    
    const eventLocation = encodeURIComponent('Your Address');
    
    const googleCalendarUrl = 
        `https://calendar.google.com/calendar/render?action=TEMPLATE` +
        `&text=${eventName}` +
        `&dates=${startDate}/${endDate}` +
        `&details=${eventDetails}` +
        `&location=${eventLocation}` +
        `&sf=true&output=xml`;
    
    window.open(googleCalendarUrl, '_blank');
    
    alert(`Thank you for booking with Cleanora!

A Google Calendar event has been created for your ${serviceType} on ${bookingDate} at ${bookingTime}.

Please check your email (${customerEmail}) for confirmation.`);
    
    closeBookingModal();
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && bookingModal.style.display === 'block') {
        closeBookingModal();
    }
});