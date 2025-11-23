// EmailJS Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.php-email-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Show loading
            const loading = contactForm.querySelector('.loading');
            const errorMessage = contactForm.querySelector('.error-message');
            const sentMessage = contactForm.querySelector('.sent-message');

            loading.style.display = 'block';
            errorMessage.style.display = 'none';
            sentMessage.style.display = 'none';

            // Collect form data
            const formData = new FormData(contactForm);
            const params = {
                from_name: formData.get('from_name'),
                from_email: formData.get('from_email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Send email using EmailJS
            emailjs.send('service_czc0tyc', 'template_q391yzi', params)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    loading.style.display = 'none';
                    sentMessage.style.display = 'block';
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    loading.style.display = 'none';
                    errorMessage.style.display = 'block';
                    errorMessage.textContent = 'Failed to send message. Please try again.';
                });
        });
    }
});
