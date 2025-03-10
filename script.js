// MOBILE RESPONSIVE NAV

const toggleButton = document.querySelector('.dropdown-toggle');
const navigation = document.querySelector('header .nav');
const bodyScroll = document.querySelector('body');

toggleButton.addEventListener('click', () => {
    navigation.classList.toggle('active');

    bodyScroll.classList.toggle('noscroll')
});


// FAQ section

// JavaScript for FAQ accordion functionality
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.toggle-icon');

        // Initially hide all answers
        answer.style.display = 'none';

        question.addEventListener('click', function () {
            // Toggle answer visibility
            if (answer.style.display === 'none') {
                answer.style.display = 'block';
                icon.textContent = '−'; // Minus sign
                item.classList.add('active');
            } else {
                answer.style.display = 'none';
                icon.textContent = '+'; // Plus sign
                item.classList.remove('active');
            }
        });
    });
});


// TESTIMONIALS SLIDER
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.getElementById('sliderDots');
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');
    let currentIndex = 0;
    let interval;

    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('data-index', index);

        dot.addEventListener('click', () => {
            clearInterval(interval);
            showCard(index);
            startAutoSlide();
        });

        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    // Function to show a specific card
    function showCard(index) {
        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        cards[index].classList.add('active');
        dots[index].classList.add('active');

        currentIndex = index;
    }

    // Function to show the next card
    function nextCard() {
        currentIndex = (currentIndex + 1) % cards.length;
        showCard(currentIndex);
    }

    // Function to show the previous card
    function prevCard() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showCard(currentIndex);
    }

    // Event listeners for arrow controls
    prevButton.addEventListener('click', () => {
        clearInterval(interval);
        prevCard();
        startAutoSlide();
    });

    nextButton.addEventListener('click', () => {
        clearInterval(interval);
        nextCard();
        startAutoSlide();
    });

    // Start auto-sliding
    function startAutoSlide() {
        interval = setInterval(nextCard, 5000);
    }

    // Initialize auto-slide
    startAutoSlide();

    // Pause on hover
    const container = document.getElementById('testimonialContainer');

    container.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });

    container.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        clearInterval(interval);

        if (touchEndX < touchStartX - 50) {
            // Swipe left
            nextCard();
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right
            prevCard();
        }

        startAutoSlide();
    }
});


// PRE PLANNING FORM
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('funeralPrePlanningForm');
    const formResult = document.getElementById('formResult');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);

        // Use Formspree endpoint for form submission
        const formspreeEndpoint = 'https://formspree.io/f/xyzeyejn';

        fetch(formspreeEndpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    formResult.textContent = "Thank you! Your pre-planning form has been submitted successfully. Our team will contact you shortly.";
                    formResult.className = "form-result success-message";
                    formResult.style.display = "block";
                    form.reset();
                } else {
                    return response.json().then(err => {
                        throw new Error(err.error || 'Form submission failed');
                    });
                }
            })
            .catch(error => {
                formResult.textContent = "There was an error submitting your form. Please try again or contact us directly.";
                formResult.className = "form-result error-message";
                formResult.style.display = "block";
                console.error('Form submission error:', error);
            })
            .finally(() => {
                formResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
    });
});


// CONTACT FORM
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Form validation
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;
        const formControls = contactForm.querySelectorAll('.form-control[required]');

        // Validation logic remains the same
        formControls.forEach(function (control) {
            control.classList.remove('error');

            if (!control.value.trim()) {
                control.classList.add('error');
                isValid = false;
            }

            if (control.type === 'email' && control.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(control.value)) {
                    control.classList.add('error');
                    isValid = false;
                }
            }

            if (control.id === 'phone' && control.value.trim()) {
                const phonePattern = /^[\d\s\(\)\-\+]{7,20}$/;
                if (!phonePattern.test(control.value)) {
                    control.classList.add('error');
                    isValid = false;
                }
            }
        });

        if (isValid) {
            // Show loading state
            formMessage.textContent = 'Sending message...';
            formMessage.className = 'form-message pending';
            formMessage.style.display = 'block';

            // Use Formspree endpoint
            const formspreeEndpoint = 'https://formspree.io/f/xyzeyejn';

            const formData = new FormData(contactForm);

            fetch(formspreeEndpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                        formMessage.className = 'form-message success';
                        contactForm.reset();
                    } else {
                        throw new Error('Server response was not OK');
                    }
                })
                .catch(error => {
                    console.error('Submission error:', error);
                    formMessage.textContent = 'Oops! Something went wrong. Please try again later.';
                    formMessage.className = 'form-message error';
                })
                .finally(() => {
                    formMessage.style.display = 'block';
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                });

        } else {
            formMessage.textContent = 'Please fill in all required fields correctly.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    // Clear errors on input
    contactForm.querySelectorAll('.form-control').forEach(function (control) {
        control.addEventListener('input', function () {
            this.classList.remove('error');
            if (formMessage.style.display === 'block') {
                formMessage.style.display = 'none';
            }
        });
    });
});

// Initialize AOS
AOS.init({
    duration: 2000,
    once: true
});
