// ============================================
// NAVIGATION INTERACTIVITY
// ============================================

const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll Event - Change navbar style on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Add active class to current link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ============================================
// SMOOTH SCROLL INDICATOR
// ============================================

function updateScrollIndicator() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
}

window.addEventListener('scroll', updateScrollIndicator);

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.about-card, .work-card, .service-item').forEach(el => {
    observer.observe(el);
});

// ============================================
// SMOOTH HORIZONTAL SCROLLING
// ============================================

function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ============================================
// PARALLAX EFFECT
// ============================================

document.addEventListener('mousemove', (e) => {
    const floating = document.querySelectorAll('.hero::before, .hero::after');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Subtle parallax effect on hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `perspective(1000px) rotateX(${mouseY * 5}deg) rotateY(${mouseX * 5}deg)`;
    }
});

// Reset parallax on mouse leave
document.addEventListener('mouseleave', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
});

// ============================================
// ENHANCED HOVER EFFECTS
// ============================================

const cards = document.querySelectorAll('.about-card, .work-card, .service-item');

cards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.1)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================
// FORM INTERACTIONS
// ============================================

const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show success state
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #00C851, #7cb342)';
        
        // Reset after 2 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            form.reset();
        }, 2000);
    });
}

// ============================================
// INPUT FOCUS EFFECTS
// ============================================

const inputs = document.querySelectorAll('input, textarea');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
    });
});

// ============================================
// CTA BUTTON INTERACTIONS
// ============================================

const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const section = document.querySelector('#about');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ============================================
// ACTIVE LINK TRACKING
// ============================================

function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ============================================
// STAGGERED ANIMATION
// ============================================

function staggerAnimation(elements, delayIncrement = 0.1) {
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * delayIncrement}s`;
    });
}

const aboutCards = document.querySelectorAll('.about-card');
staggerAnimation(aboutCards);

const workCards = document.querySelectorAll('.work-card');
staggerAnimation(workCards);

const serviceItems = document.querySelectorAll('.service-item');
staggerAnimation(serviceItems);

// ============================================
// MOUSE TRACKING FOR CARDS
// ============================================

document.querySelectorAll('.about-card, .work-card, .service-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// ============================================
// SCROLL VELOCITY EFFECTS
// ============================================

let lastScrollY = 0;
let scrollVelocity = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    scrollVelocity = Math.abs(currentScrollY - lastScrollY);
    lastScrollY = currentScrollY;
    
    // Adjust navbar blur based on scroll velocity
    if (scrollVelocity > 20) {
        navbar.style.backdropFilter = 'blur(30px)';
        navbar.style.webkitBackdropFilter = 'blur(30px)';
    } else {
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.webkitBackdropFilter = 'blur(20px)';
    }
});

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Animate page elements on load
    const elementsToAnimate = document.querySelectorAll(
        '.section-title, .about-card, .work-card, .service-item'
    );
    
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `slideUp 0.8s ease-out ${index * 0.1}s forwards`;
    });
});

// ============================================
// ADD RIPPLE CSS ANIMATION
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease-in;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Mark body as loaded
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
    
    // Navigate with arrow keys
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
        const links = Array.from(document.querySelectorAll('.nav-link'));
        const currentIndex = links.indexOf(activeLink);
        
        if (e.key === 'ArrowRight' && currentIndex < links.length - 1) {
            links[currentIndex + 1].click();
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            links[currentIndex - 1].click();
        }
    }
});

// ============================================
// LAZY LOAD IMAGES (for future use)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// SCROLL TO TOP BUTTON (Optional Enhancement)
// ============================================

function createScrollToTopButton() {
    const btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.className = 'scroll-to-top';
    btn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #0a84ff, #a2845d);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    `;
    
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.1)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
    });
}

createScrollToTopButton();

// ============================================
// PERFORMANCE: DEBOUNCE SCROLL EVENT
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScroll = debounce(updateActiveLink, 50);
window.addEventListener('scroll', debouncedScroll);

console.log('🚀 Interactive Navigation Loaded Successfully!');
