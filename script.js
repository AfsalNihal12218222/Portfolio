// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
let isMenuOpen = false;

hamburger.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navLinks.style.padding = '1rem';
        navLinks.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navLinks.style.display = 'none';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        isMenuOpen = false;
        navLinks.style.display = 'none';
    }
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Skills Slider
const skillsTrack = document.querySelector('.skills-track');
const skillsContainer = document.querySelector('.skills-container');
let isHovering = false;
let currentPosition = 0;
let animationSpeed = 2;
let lastTime = 0;

function animateSkills(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    if (!isHovering) {
        currentPosition -= animationSpeed;
        if (currentPosition <= -skillsTrack.offsetWidth / 2) {
            currentPosition = 0;
        }
        skillsTrack.style.transform = `translateX(${currentPosition}px)`;
    }

    requestAnimationFrame(animateSkills);
}

skillsContainer.addEventListener('mouseenter', () => {
    isHovering = true;
    animationSpeed = 0.5;
});

skillsContainer.addEventListener('mouseleave', () => {
    isHovering = false;
    animationSpeed = 2;
});

// Start the animation
requestAnimationFrame(animateSkills);

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item, .project-card, .contact-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Add typing effect to hero title
const heroTitle = document.querySelector('.hero-content h1');
const text = heroTitle.textContent;
heroTitle.textContent = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', typeWriter); 