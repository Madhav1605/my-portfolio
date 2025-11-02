// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Update active navigation link on scroll
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    const navHeight = navbar.offsetHeight;
    
    let currentSection = '';
    const scrollPosition = window.pageYOffset + navHeight + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.education-card, .skill-category, .project-card, .achievement-card, .stat-card').forEach(el => {
    el.classList.add('section-loading');
    observer.observe(el);
});

// Add loading animation on page load
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// Smooth reveal for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const revealPoint = 150;

        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealSections);
revealSections();

// Prevent image drag
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});

// Console message for developers
console.log('%c👋 Hello Developer!', 'color: #E50914; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to Kotha Madhav\'s Portfolio', 'color: #ffffff; font-size: 14px;');
console.log('%cInterested in the code? Check out my GitHub!', 'color: #808080; font-size: 12px;');

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`%cPage loaded in ${loadTime}ms`, 'color: #10b981; font-weight: bold;');
});

// Lazy loading for images
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

// Initialize functions
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
});