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




// Initialize AOS
AOS.init({
    duration: 1500,
    once: true,
});
