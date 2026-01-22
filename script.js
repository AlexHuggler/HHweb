/**
 * Huggler Holdings LLC - Corporate Website
 * JavaScript for dynamic effects and interactivity
 */

(function() {
    'use strict';

    // =========================================
    // DOM Elements
    // =========================================
    const header = document.getElementById('header');
    const nav = document.getElementById('nav');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contact-form');
    const parallaxElements = document.querySelectorAll('.parallax');
    const fadeInElements = document.querySelectorAll('.fade-in, .slide-up');
    const statNumbers = document.querySelectorAll('.stat-number');

    // =========================================
    // Header Scroll Effect
    // =========================================
    function handleHeaderScroll() {
        const scrollPosition = window.scrollY;

        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // =========================================
    // Mobile Navigation Toggle
    // =========================================
    function toggleMobileMenu() {
        mobileMenuBtn.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        mobileMenuBtn.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
    }

    // =========================================
    // Smooth Scroll Navigation
    // =========================================
    function handleSmoothScroll(e) {
        const href = this.getAttribute('href');

        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                closeMobileMenu();
            }
        }
    }

    // =========================================
    // Parallax Scrolling Effect
    // =========================================
    function handleParallax() {
        const scrollPosition = window.scrollY;

        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.speed) || 0.5;
            const yPos = -(scrollPosition * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }

    // =========================================
    // Intersection Observer for Animations
    // =========================================
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Check if this element contains stat numbers to animate
                    const statNumbersInView = entry.target.querySelectorAll('.stat-number');
                    if (statNumbersInView.length > 0) {
                        statNumbersInView.forEach(animateCounter);
                    }
                }
            });
        }, observerOptions);

        fadeInElements.forEach(element => {
            observer.observe(element);
        });
    }

    // =========================================
    // Counter Animation for Statistics
    // =========================================
    function animateCounter(element) {
        // Check if already animated
        if (element.dataset.animated === 'true') return;
        element.dataset.animated = 'true';

        const target = parseInt(element.dataset.count, 10);
        const duration = 2000; // 2 seconds
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        const easeOutQuad = t => t * (2 - t);

        let frame = 0;

        const counter = setInterval(() => {
            frame++;
            const progress = easeOutQuad(frame / totalFrames);
            const currentCount = Math.round(target * progress);

            element.textContent = currentCount;

            if (frame === totalFrames) {
                clearInterval(counter);
                element.textContent = target;
            }
        }, frameDuration);
    }

    // =========================================
    // Active Navigation Link Highlighting
    // =========================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + header.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // =========================================
    // Contact Form Handling
    // =========================================
    function handleFormSubmit(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Show success message (in production, this would send to a server)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        submitBtn.disabled = true;

        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }

    // =========================================
    // Throttle Function for Performance
    // =========================================
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // =========================================
    // Debounce Function for Performance
    // =========================================
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // =========================================
    // Initialize Hero Animations
    // =========================================
    function initHeroAnimations() {
        const heroElements = document.querySelectorAll('.hero .fade-in');

        // Trigger hero animations after a short delay
        setTimeout(() => {
            heroElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('visible');
                }, index * 150);
            });
        }, 300);
    }

    // =========================================
    // Keyboard Navigation Support
    // =========================================
    function handleKeyboardNavigation(e) {
        // Close mobile menu on Escape key
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            closeMobileMenu();
        }
    }

    // =========================================
    // Preload Critical Assets
    // =========================================
    function preloadAssets() {
        // Add loading class to body
        document.body.classList.add('loaded');
    }

    // =========================================
    // Event Listeners
    // =========================================
    function bindEvents() {
        // Scroll events (throttled for performance)
        window.addEventListener('scroll', throttle(() => {
            handleHeaderScroll();
            handleParallax();
            updateActiveNavLink();
        }, 16));

        // Mobile menu toggle
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        }

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', handleSmoothScroll);
        });

        // Contact form submission
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboardNavigation);

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') &&
                !nav.contains(e.target) &&
                !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Handle resize events
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth > 768 && nav.classList.contains('active')) {
                closeMobileMenu();
            }
        }, 250));
    }

    // =========================================
    // Initialize Application
    // =========================================
    function init() {
        // Wait for DOM to be fully loaded
        bindEvents();
        initScrollAnimations();
        initHeroAnimations();
        preloadAssets();
        handleHeaderScroll();

        // Initial check for elements in view
        updateActiveNavLink();
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
