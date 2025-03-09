// MOBILE RESPONSIVE NAV

const toggleButton = document.querySelector('.dropdown-toggle');
const navigation = document.querySelector('header .nav');
const bodyScroll = document.querySelector('body');

toggleButton.addEventListener('click', () => {
    navigation.classList.toggle('active');

    bodyScroll.classList.toggle('noscroll')
});


// FAQ section

const faqQuestion = document.querySelectorAll('.faq-question');

faqQuestion.forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        parent.classList.toggle('active');
    });
});


// POP-UP FORM JS

// Get elements
const popupFormContainer = document.querySelector('.popup-form-container');
const requestInviteBtn = document.querySelectorAll('.request-btn');
const closePopupBtn = document.querySelector('.close-btn');
const popupForm = document.querySelector('.popup-form');


// Show the popup form with a smooth transition

//use for each to target each button click with a loop
requestInviteBtn.forEach((button) => {
    button.addEventListener('click', () => {
        popupFormContainer.classList.add('show');
        popupForm.classList.add('show');
    })
})

// Close the popup
closePopupBtn.addEventListener('click', () => {
    popupFormContainer.classList.remove('show');
    popupForm.classList.remove('show');
});

// Close the popup when clicked outside the form
window.addEventListener('click', (event) => {
    if (event.target === popupFormContainer) {
        popupFormContainer.classList.remove('show');
        popupForm.classList.remove('show');
    }
});

// Form validation
const inviteForm = document.getElementById('invite-form');
inviteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // alert message plus close
    if (name && email && phone) {
        alert("Invite request submitted!");
        popupFormContainer.classList.remove("show");
        popupForm.classList.remove("show");
        inviteForm.reset();
    } else {
        alert("Please fill in all the required fields.");
    }
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


// Initialize AOS
AOS.init({
    duration: 1500,
    once: true,
});
