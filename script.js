// Search functionality
const searchToggle = document.getElementById('searchToggle');
const searchBox = document.getElementById('searchBox');

searchToggle.addEventListener('click', function () {
    searchBox.classList.toggle('show');
    fullpageMenu.classList.remove('show');
});

// Full page menu functionality
const menuToggle = document.getElementById('menuToggle');
const fullpageMenu = document.getElementById('fullpageMenu');
const closeMenu = document.getElementById('closeMenu');
const menuLinks = document.querySelectorAll('.menu-content a');

// Open menu
menuToggle.addEventListener('click', function () {
    fullpageMenu.classList.add('show');
    document.body.style.overflow = 'hidden';
    searchBox.classList.remove('show');
});

// Close menu when clicking X button
closeMenu.addEventListener('click', function () {
    fullpageMenu.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// Close menu when clicking outside content
fullpageMenu.addEventListener('click', function (e) {
    if (e.target === fullpageMenu) {
        fullpageMenu.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Close menu when clicking any menu link and scroll smoothly
menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        fullpageMenu.classList.remove('show');
        document.body.style.overflow = 'auto';

        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            setTimeout(() => {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }, 300);
        }
    });
});

// Search functionality
const searchData = [
    { title: "About Me", content: "Information about Amir Hamza", link: "#about" },
    { title: "Portfolio", content: "Web projects and work samples", link: "#portfolio" },
    { title: "Contact", content: "Ways to get in touch", link: "#contact" }
];

document.getElementById('searchButton').addEventListener('click', function () {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('searchResults');

    if (searchTerm.trim() === '') {
        resultsContainer.innerHTML = '<div class="search-result-item">Please enter a search term</div>';
        resultsContainer.style.display = 'block';
        return;
    }

    const filteredResults = searchData.filter(item =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.content.toLowerCase().includes(searchTerm)
    );

    resultsContainer.innerHTML = filteredResults.length === 0
        ? '<div class="search-result-item">No results found</div>'
        : filteredResults.map(item => `
                    <div class="search-result-item" onclick="window.location.href='${item.link}'">
                        <h4>${item.title}</h4>
                        <p>${item.content}</p>
                    </div>
                `).join('');

    resultsContainer.style.display = 'block';
});

// Close results when clicking outside
document.addEventListener('click', function (event) {
    if (!event.target.closest('.search-container')) {
        document.getElementById('searchResults').style.display = 'none';
    }
});

// Initialize EmailJS with your User ID
emailjs.init('JpuqI7y0RUa4q8Rzo');

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');

    // Form Validation
    const validateForm = () => {
        let isValid = true;

        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });

        // Name validation
        const name = document.getElementById('name').value.trim();
        if (!name) {
            document.getElementById('nameError').textContent = 'Please enter your name';
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
        }

        // Email validation
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            document.getElementById('emailError').textContent = 'Please enter your email';
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email';
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        }

        // Message validation
        const message = document.getElementById('message').value.trim();
        if (!message) {
            document.getElementById('messageError').textContent = 'Please enter your message';
            document.getElementById('messageError').style.display = 'block';
            isValid = false;
        }

        return isValid;
    };

    // Show status message
    const showMessage = (type, text) => {
        // Remove existing messages
        const oldMsg = document.querySelector('.form-message');
        if (oldMsg) oldMsg.remove();

        // Create new message
        const msgDiv = document.createElement('div');
        msgDiv.className = `form-message ${type}`;
        msgDiv.textContent = text;
        contactForm.appendChild(msgDiv);

        // Auto-hide after 5 seconds
        setTimeout(() => msgDiv.remove(), 5000);
    };

    // Form Submission
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!validateForm()) return;

        // Set loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Send email via EmailJS
        emailjs.sendForm(
            'service_5p2n01p',  // Your EmailJS Service ID
            'template_3sy0er4', // Your EmailJS Template ID
            this,               // Form element
            'JpuqI7y0RUa4q8Rzo' // Your EmailJS User ID
        )
            .then(() => {
                showMessage('success', 'Message sent successfully!');
                contactForm.reset();
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                showMessage('error', 'Failed to send message. Please try again.');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            });
    });

    // Real-time validation
    document.getElementById('name').addEventListener('input', function () {
        if (this.value.trim()) document.getElementById('nameError').style.display = 'none';
    });

    document.getElementById('email').addEventListener('input', function () {
        if (this.value.trim()) document.getElementById('emailError').style.display = 'none';
    });

    document.getElementById('message').addEventListener('input', function () {
        if (this.value.trim()) document.getElementById('messageError').style.display = 'none';
    });
});