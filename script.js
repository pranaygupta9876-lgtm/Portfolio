// ============================================
// THEME MANAGEMENT (Dark/Light Mode)
// ============================================

// Initialize theme from localStorage or default to light
const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
};

// Toggle between dark and light mode
const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
};

// ============================================
// NAVIGATION BAR
// ============================================

// Add scroll effect to navbar
const handleNavbarScroll = () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

// Mobile menu toggle
const toggleMobileMenu = () => {
    const navMenu = document.getElementById('navMenu');
    const mobileToggle = document.getElementById('mobileToggle');
    
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
};

// Close mobile menu when clicking on a link
const closeMobileMenu = () => {
    const navMenu = document.getElementById('navMenu');
    const mobileToggle = document.getElementById('mobileToggle');
    
    navMenu.classList.remove('active');
    mobileToggle.classList.remove('active');
};

// ============================================
// SMOOTH SCROLLING
// ============================================

// Smooth scroll to sections when clicking nav links
const smoothScroll = (e) => {
    e.preventDefault();
    
    const targetId = e.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
    }
};

// ============================================
// INTERSECTION OBSERVER (Scroll Animations)
// ============================================

// Animate elements on scroll
const observeElements = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(30px)';
        header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(header);
    });
    
    // Observe about paragraphs
    const aboutParagraphs = document.querySelectorAll('.about-paragraph');
    aboutParagraphs.forEach((para, index) => {
        para.style.opacity = '0';
        para.style.transform = 'translateY(30px)';
        para.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(para);
    });
};

// ============================================
// CONTACT FORM HANDLING
// ============================================

const handleContactForm = (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate form submission (in a real app, this would send to a server)
    console.log('Form submitted:', formData);
    
    // Show success message
    alert(`Thank you ${formData.name}! Your message has been received. I'll get back to you soon.`);
    
    // Reset form
    document.getElementById('contactForm').reset();
};

// ============================================
// ACTIVE NAVIGATION HIGHLIGHT
// ============================================

// Highlight active section in navigation
const highlightActiveSection = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        
        if (window.scrollY >= (sectionTop - navbarHeight - 100)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
};

// ============================================
// SCROLL TO TOP FUNCTIONALITY
// ============================================

// Show/hide scroll to top button (optional enhancement)
const handleScrollToTop = () => {
    // You can add a "scroll to top" button here if desired
    // For now, clicking the logo will scroll to top (handled in event listeners)
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// ============================================
// INITIALIZATION
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize theme
    initializeTheme();
    
    // Theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation links smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Logo click - scroll to top
    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
        navLogo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            closeMobileMenu();
        });
    }
    
    // Hero buttons smooth scrolling
    const heroButtons = document.querySelectorAll('.hero-buttons a');
    heroButtons.forEach(button => {
        if (button.getAttribute('href').startsWith('#')) {
            button.addEventListener('click', smoothScroll);
        }
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Scroll events (debounced for performance)
    window.addEventListener('scroll', debounce(() => {
        handleNavbarScroll();
        highlightActiveSection();
    }, 10));
    
    // Initialize intersection observer for scroll animations
    observeElements();
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navMenu = document.getElementById('navMenu');
        const mobileToggle = document.getElementById('mobileToggle');
        const isClickInsideNav = navMenu.contains(e.target) || mobileToggle.contains(e.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Close mobile menu on resize to larger screen
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        }, 250);
    });
    
    // Prevent page transitions from being jarring
    window.addEventListener('beforeunload', () => {
        window.scrollTo(0, 0);
    });
    
});

// ============================================
// ADDITIONAL ENHANCEMENTS
// ============================================

// Add custom cursor effect (optional)
const createCustomCursor = () => {
    // You can add custom cursor effects here if desired
    // For minimal design, native cursor works well
};

// Parallax effect for hero section (optional)
const addParallaxEffect = () => {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
};

// Initialize parallax effect
addParallaxEffect();

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        if (navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }
});

// Focus management for better accessibility
const manageFocus = () => {
    const focusableElements = document.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--accent-primary)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
};

// Initialize focus management
manageFocus();

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images (if any are added later)
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
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

// Initialize lazy loading
lazyLoadImages();

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c👋 Welcome to my Portfolio!', 'font-size: 20px; font-weight: bold; color: #ea580c;');
console.log('%cBuilt with HTML, CSS, and Vanilla JavaScript', 'font-size: 14px; color: #78716c;');
console.log('%c💻 Interested in the code? Check out the source files!', 'font-size: 14px; color: #78716c;');
