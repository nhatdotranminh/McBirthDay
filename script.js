// Party Configuration - Customize these details
const PARTY_CONFIG = {
    daughter: {
        name: "Minh Châu", // Change this to your daughter's name
        age: "1st" // Change this to the birthday age
    },
    details: {
        date: "Saturday, September 27th, 2025",
        time: "10:00 AM - 1:00 PM",
        location: "123 Birthday Street, Celebration City",
        theme: "Princess & Unicorn Theme"
    },
    contact: {
        phone: "+1 (555) 123-4567",
        email: "party@example.com",
        address: "123 Birthday Street, Celebration City, ST 12345"
    }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 DEBUG: DOM Content Loaded - Starting initialization...');
    initializePartyDetails();
    initializeEventListeners();
    initializeAnimations();
    initializeParallaxEffects();
    initializeCarousel();
    initializeInteractiveFeatures();
    
    // Add a delay to ensure all elements are rendered
    setTimeout(() => {
        initializeMagicalFeatures();
        
        // Add debug buttons for testing
    }, 100);
    
    console.log('🔧 DEBUG: Initial setup complete');
});

// Initialize party details on the page
function initializePartyDetails() {
    // Update daughter's name in hero section
    const nameElements = document.querySelectorAll('.name-highlight');
    nameElements.forEach(element => {
        element.textContent = PARTY_CONFIG.daughter.name;
    });

    // Update party details
    const detailElements = {
        'party-date': PARTY_CONFIG.details.date,
        'party-time': PARTY_CONFIG.details.time,
        'party-location': PARTY_CONFIG.details.location,
        'party-theme': PARTY_CONFIG.details.theme
    };

    Object.entries(detailElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });

}

// Initialize event listeners
function initializeEventListeners() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });

    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
}


// Handle smooth scrolling
function handleSmoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Handle header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Share party function
function shareParty() {
    const shareData = {
        title: `🎉 You're Invited to ${PARTY_CONFIG.daughter.name}'s Birthday Party!`,
        text: `Join us for ${PARTY_CONFIG.daughter.name}'s ${PARTY_CONFIG.daughter.age} birthday celebration on ${PARTY_CONFIG.details.date}!`,
        url: window.location.href
    };

    if (navigator.share) {
        // Use native sharing if available
        navigator.share(shareData).catch(err => {
            console.log('Error sharing:', err);
            fallbackShare(shareData);
        });
    } else {
        fallbackShare(shareData);
    }
}

// Fallback sharing method
function fallbackShare(data) {
    const shareText = `${data.text}\n\nRSVP at: ${data.url}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('🔗 Invitation link copied to clipboard!', 'success');
        }).catch(() => {
            showManualCopyDialog(shareText);
        });
    } else {
        showManualCopyDialog(shareText);
    }
}

// Show manual copy dialog
function showManualCopyDialog(text) {
    const dialog = document.createElement('div');
    dialog.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 2rem; border-radius: 15px; max-width: 500px; margin: 1rem;">
                <h3 style="margin-bottom: 1rem; color: #2d3748;">📋 Copy Invitation Text</h3>
                <textarea readonly style="width: 100%; height: 150px; padding: 1rem; border: 2px solid #e2e8f0; border-radius: 8px; font-family: inherit; resize: none;">${text}</textarea>
                <div style="margin-top: 1rem; text-align: right;">
                    <button onclick="this.closest('div').parentElement.remove()" style="background: #ff6b9d; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">Close</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(dialog);
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.detail-card, .contact-card, .special-notes');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}


// Countdown timer (optional feature)
function initializeCountdown() {
    const partyDate = new Date(PARTY_CONFIG.details.date);
    const countdownElement = document.getElementById('countdown');
    
    if (!countdownElement) return;

    function updateCountdown() {
        const now = new Date();
        const timeDiff = partyDate - now;
        
        if (timeDiff > 0) {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">Days</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">Hours</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">Minutes</span>
                </div>
            `;
        } else {
            countdownElement.innerHTML = '<h3>🎉 The party is today! 🎉</h3>';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}

// Initialize party configuration customization
function initializeCustomization() {
    // This function can be extended to allow real-time customization
    // For now, it just logs the current configuration
    console.log('Party Configuration:', PARTY_CONFIG);
    
    // In a real application, you might want to:
    // 1. Load configuration from a database
    // 2. Allow admin panel customization
    // 3. Support multiple party templates
    // 4. Enable theme switching
}

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    // Replace with your analytics service (Google Analytics, etc.)
    console.log('Event tracked:', eventName, eventData);
    
    // Example Google Analytics tracking:
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, eventData);
    // }
}

// Track important events
document.addEventListener('DOMContentLoaded', function() {
    trackEvent('page_loaded', { page: 'birthday_landing' });
    
    // Track navigation clicks
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('navigation_click', { target: this.getAttribute('href') });
        });
    });
});

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = [
        'party-date',
        'party-time',
        'party-location',
        'party-theme',
        'carouselTrack'
    ];
    
    const missingElements = requiredElements.filter(id => !document.getElementById(id));
    
    if (missingElements.length > 0) {
        console.warn('Missing required elements:', missingElements);
    }
}

// Call error handling on load
document.addEventListener('DOMContentLoaded', handleMissingElements);

// Parallax Effects
function initializeParallaxEffects() {
    let ticking = false;
    
    // Get all parallax elements
    const parallaxElements = document.querySelectorAll('[data-speed]');
    const parallaxContainer = document.querySelector('.parallax-container');
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollTop;
            const elementHeight = element.offsetHeight;
            
            // Check if element is in viewport area (with buffer)
            const buffer = windowHeight * 0.5;
            if (elementTop < scrollTop + windowHeight + buffer && 
                elementTop + elementHeight > scrollTop - buffer) {
                
                // Calculate parallax offset
                const yPos = -(scrollTop * speed);
                const xPos = Math.sin(scrollTop * 0.001) * 10; // Subtle horizontal movement
                
                // Apply transform with 3D acceleration
                element.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
                element.style.opacity = '1';
            }
        });
        
        // Update main parallax container position
        if (parallaxContainer) {
            const containerSpeed = 0.3;
            const containerY = -(scrollTop * containerSpeed);
            parallaxContainer.style.transform = `translate3d(0, ${containerY}px, 0)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Throttled scroll listener
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Initial call
    updateParallax();
    
    // Add dynamic floating elements based on scroll
    addDynamicFloatingElements();
}

function addDynamicFloatingElements() {
    const dynamicElements = [];
    const emojis = ['🎈', '✨', '🎉', '💖', '⭐', '🎁', '🎊', '🎂'];
    
    function createFloatingElement() {
        const element = document.createElement('div');
        element.className = 'dynamic-float';
        element.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        element.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 1.5 + 1}rem;
            opacity: ${Math.random() * 0.6 + 0.2};
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            animation: float-up ${Math.random() * 10 + 15}s linear infinite;
        `;
        
        document.body.appendChild(element);
        dynamicElements.push(element);
        
        // Remove element after animation
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
                const index = dynamicElements.indexOf(element);
                if (index > -1) {
                    dynamicElements.splice(index, 1);
                }
            }
        }, 25000);
    }
    
    // Create floating elements periodically
    function createElements() {
        if (dynamicElements.length < 6) {
            createFloatingElement();
        }
    }
    
    // Create initial elements and set interval
    setInterval(createElements, 3000);
    
    // Create some initial elements
    for (let i = 0; i < 3; i++) {
        setTimeout(createFloatingElement, i * 1000);
    }
}

// Enhanced scroll-based animations for cards
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                
                // Add staggered animation for grid items
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.detail-card, .contact-card, .special-notes');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.95)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Mouse parallax effect for hero section
function initializeMouseParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    });
    
    function animateMouseParallax() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        const floatingElements = hero.querySelectorAll('.birthday-decorations i');
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const x = currentX * speed * 20;
            const y = currentY * speed * 20;
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        requestAnimationFrame(animateMouseParallax);
    }
    
    animateMouseParallax();
}

// Add CSS for dynamic floating elements
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-up {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .dynamic-float {
            will-change: transform;
            backface-visibility: hidden;
        }
        
        .animate-in {
            animation: slideInUp 0.8s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        /* Performance optimizations */
        .parallax-container,
        .floating-element,
        .section-float,
        .rsvp-float {
            will-change: transform;
            backface-visibility: hidden;
            transform-style: preserve-3d;
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
            .floating-element,
            .section-float,
            .rsvp-float,
            .dynamic-float {
                animation: none !important;
                transform: none !important;
            }
            
            .parallax-container {
                transform: none !important;
            }
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
            .floating-element {
                font-size: 1.5rem;
            }
            
            .section-float,
            .rsvp-float {
                font-size: 2rem;
            }
            
            .confetti-1, .confetti-2, .confetti-3, .confetti-4,
            .confetti-5, .confetti-6, .confetti-7, .confetti-8 {
                display: none; /* Hide confetti on mobile for performance */
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize enhanced animations
function initializeAnimations() {
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize mouse parallax
    initializeMouseParallax();
    
    // Add dynamic styles
    addDynamicStyles();
    
    // Original intersection observer for basic elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that weren't caught by other observers
    const basicElements = document.querySelectorAll('.special-notes:not(.animate-in)');
    basicElements.forEach(el => {
        if (!el.style.opacity) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(el);
    });
}

// Image Carousel Functionality
function initializeCarousel() {
    const carousel = {
        track: document.getElementById('carouselTrack'),
        slides: document.querySelectorAll('.carousel-slide'),
        indicators: document.querySelectorAll('.indicator'),
        prevBtn: document.getElementById('prevBtn'),
        nextBtn: document.getElementById('nextBtn'),
        playPauseBtn: document.getElementById('playPauseBtn'),
        fullscreenBtn: document.getElementById('fullscreenBtn'),
        currentSlide: 0,
        isPlaying: true,
        autoPlayInterval: null,
        touchStartX: 0,
        touchEndX: 0
    };

    // Return early if carousel elements don't exist
    if (!carousel.track || !carousel.slides.length) {
        console.warn('Carousel elements not found');
        return;
    }

    // Initialize carousel
    startAutoPlay();
    addEventListeners();
    addTouchSupport();
    addKeyboardSupport();
    preloadImages();

    // Auto-play functionality
    function startAutoPlay() {
        if (carousel.autoPlayInterval) {
            clearInterval(carousel.autoPlayInterval);
        }
        
        carousel.autoPlayInterval = setInterval(() => {
            if (carousel.isPlaying) {
                nextSlide();
            }
        }, 4000); // Change slide every 4 seconds
    }

    function stopAutoPlay() {
        if (carousel.autoPlayInterval) {
            clearInterval(carousel.autoPlayInterval);
            carousel.autoPlayInterval = null;
        }
    }

    function toggleAutoPlay() {
        carousel.isPlaying = !carousel.isPlaying;
        const icon = carousel.playPauseBtn.querySelector('i');
        
        if (carousel.isPlaying) {
            icon.className = 'fas fa-pause';
            startAutoPlay();
        } else {
            icon.className = 'fas fa-play';
            stopAutoPlay();
        }
    }

    // Navigation functions
    function goToSlide(slideIndex) {
        // Remove active class from current slide and indicator
        carousel.slides[carousel.currentSlide].classList.remove('active');
        carousel.indicators[carousel.currentSlide].classList.remove('active');
        
        // Update current slide index
        carousel.currentSlide = slideIndex;
        
        // Add active class to new slide and indicator
        carousel.slides[carousel.currentSlide].classList.add('active');
        carousel.indicators[carousel.currentSlide].classList.add('active');
        
        // Move carousel track
        const translateX = -carousel.currentSlide * 10; // 10% per slide
        carousel.track.style.transform = `translateX(${translateX}%)`;
        
        // Track event
        trackEvent('carousel_slide_change', { 
            slide_index: carousel.currentSlide,
            slide_name: carousel.slides[carousel.currentSlide].querySelector('img').alt
        });
    }

    function nextSlide() {
        const nextIndex = (carousel.currentSlide + 1) % carousel.slides.length;
        goToSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (carousel.currentSlide - 1 + carousel.slides.length) % carousel.slides.length;
        goToSlide(prevIndex);
    }

    // Event listeners
    function addEventListeners() {
        // Navigation buttons
        carousel.nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });

        carousel.prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });

        // Indicators
        carousel.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
                resetAutoPlay();
            });
        });

        // Play/Pause button
        carousel.playPauseBtn.addEventListener('click', toggleAutoPlay);

        // Fullscreen button
        carousel.fullscreenBtn.addEventListener('click', openFullscreen);

        // Pause on hover
        carousel.track.addEventListener('mouseenter', () => {
            if (carousel.isPlaying) {
                stopAutoPlay();
            }
        });

        carousel.track.addEventListener('mouseleave', () => {
            if (carousel.isPlaying) {
                startAutoPlay();
            }
        });

        // Image click for fullscreen
        carousel.slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img) {
                img.addEventListener('click', openFullscreen);
                img.style.cursor = 'pointer';
            }
        });
    }

    function resetAutoPlay() {
        if (carousel.isPlaying) {
            startAutoPlay();
        }
    }

    // Touch/Swipe support
    function addTouchSupport() {
        carousel.track.addEventListener('touchstart', handleTouchStart, { passive: true });
        carousel.track.addEventListener('touchend', handleTouchEnd, { passive: true });
        carousel.track.addEventListener('touchmove', handleTouchMove, { passive: true });

        function handleTouchStart(e) {
            carousel.touchStartX = e.touches[0].clientX;
        }

        function handleTouchMove(e) {
            if (!carousel.touchStartX) return;
            
            carousel.touchEndX = e.touches[0].clientX;
            const diff = carousel.touchStartX - carousel.touchEndX;
            
            // Add visual feedback during swipe
            const opacity = Math.min(Math.abs(diff) / 100, 0.3);
            if (diff > 0) {
                // Swiping left (next)
                carousel.nextBtn.style.backgroundColor = `rgba(255, 107, 157, ${opacity})`;
            } else {
                // Swiping right (prev)
                carousel.prevBtn.style.backgroundColor = `rgba(255, 107, 157, ${opacity})`;
            }
        }

        function handleTouchEnd(e) {
            if (!carousel.touchStartX || !carousel.touchEndX) return;
            
            const diff = carousel.touchStartX - carousel.touchEndX;
            const threshold = 50; // Minimum swipe distance
            
            // Reset button styles
            carousel.nextBtn.style.backgroundColor = '';
            carousel.prevBtn.style.backgroundColor = '';
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swiped left (next)
                    nextSlide();
                } else {
                    // Swiped right (prev)
                    prevSlide();
                }
                resetAutoPlay();
            }
            
            carousel.touchStartX = 0;
            carousel.touchEndX = 0;
        }
    }

    // Keyboard support
    function addKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            // Only handle keys when carousel is in view
            const carouselRect = carousel.track.getBoundingClientRect();
            const isVisible = carouselRect.top < window.innerHeight && carouselRect.bottom > 0;
            
            if (!isVisible) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    prevSlide();
                    resetAutoPlay();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextSlide();
                    resetAutoPlay();
                    break;
                case ' ': // Spacebar
                    e.preventDefault();
                    toggleAutoPlay();
                    break;
                case 'f':
                case 'F':
                    if (!e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                        openFullscreen();
                    }
                    break;
            }
        });
    }

    // Preload images for better performance
    function preloadImages() {
        carousel.slides.forEach((slide, index) => {
            const img = slide.querySelector('img');
            if (img && !img.complete) {
                img.addEventListener('load', () => {
                    slide.classList.add('loaded');
                });
                
                img.addEventListener('error', () => {
                    console.warn(`Failed to load image: ${img.src}`);
                    slide.classList.add('error');
                });
            } else if (img && img.complete) {
                slide.classList.add('loaded');
            }
        });
    }

    // Fullscreen functionality
    function openFullscreen() {
        const currentImg = carousel.slides[carousel.currentSlide].querySelector('img');
        if (!currentImg) return;

        // Create fullscreen modal
        const modal = document.createElement('div');
        modal.className = 'fullscreen-modal active';
        
        const img = document.createElement('img');
        img.src = currentImg.src;
        img.alt = currentImg.alt;
        img.className = 'fullscreen-image';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'fullscreen-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.setAttribute('aria-label', 'Close fullscreen');
        
        modal.appendChild(img);
        modal.appendChild(closeBtn);
        document.body.appendChild(modal);
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
        
        // Close functionality
        function closeFullscreen() {
            modal.remove();
            document.body.style.overflow = '';
        }
        
        closeBtn.addEventListener('click', closeFullscreen);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeFullscreen();
            }
        });
        
        // Keyboard close
        function handleKeydown(e) {
            if (e.key === 'Escape') {
                closeFullscreen();
                document.removeEventListener('keydown', handleKeydown);
            }
        }
        document.addEventListener('keydown', handleKeydown);
        
        // Track event
        trackEvent('image_fullscreen_opened', { 
            image_src: currentImg.src,
            slide_index: carousel.currentSlide
        });
    }

    // Intersection Observer for pause when out of view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (carousel.isPlaying && !carousel.autoPlayInterval) {
                    startAutoPlay();
                }
            } else {
                stopAutoPlay();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(carousel.track);

    // Update navigation menu to include gallery
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && !navMenu.querySelector('a[href="#photo-gallery"]')) {
        const galleryItem = document.createElement('li');
        galleryItem.innerHTML = '<a href="#photo-gallery">Gallery</a>';
        // Insert before RSVP
        const rsvpItem = navMenu.querySelector('a[href="#rsvp"]')?.parentElement;
        if (rsvpItem) {
            navMenu.insertBefore(galleryItem, rsvpItem);
        } else {
            navMenu.appendChild(galleryItem);
        }
    }

    // Return carousel object for external access
    return carousel;
}

// Enhanced scroll animations to include gallery
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                
                // Add staggered animation for grid items
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
                
                // Special handling for carousel
                if (entry.target.classList.contains('carousel-container')) {
                    entry.target.style.animation = 'slideInUp 1s ease-out forwards';
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations including carousel
    const animatedElements = document.querySelectorAll('.detail-card, .contact-card, .special-notes, .carousel-container');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.95)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Interactive Features for Baby's First Birthday
function initializeInteractiveFeatures() {
    initializeSpectacularHeroEntrance();
    initializeBabyDragon();
    initializeAsianElements();
    initializeFloatingToys();
    initializeBalloonGame();
    initializeInteractiveCake();
    initializeMouseSparkles();
    initializeMilestoneAnimations();
    initializeDragonZodiacSection();
    addInteractiveSounds();
}

// Spectacular Hero Entrance Effects
function initializeSpectacularHeroEntrance() {
    // Create immediate fireworks on load
    createHeroFireworks();
    
    // Create entrance particles
    setTimeout(() => {
        createHeroEntranceParticles();
    }, 500);
    
    // Add interactive announcement card
    const announcementCard = document.querySelector('.announcement-card');
    if (announcementCard) {
        announcementCard.addEventListener('click', function() {
            createAnnouncementCelebration(this);
            playDragonSound(3);
        });
    }
    
    // Add sparkle effects to buttons
    const spectacularBtns = document.querySelectorAll('.spectacular-btn');
    spectacularBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            createButtonSparkles(this);
        });
    });
    
    // Trigger balloon reduction game update
    updateBalloonGame();
}

function createHeroFireworks() {
    const fireworksContainer = document.getElementById('heroFireworks');
    if (!fireworksContainer) return;
    
    // Create 5 firework bursts
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight * 0.6);
            createFireworkBurst(x, y, fireworksContainer);
        }, i * 300);
    }
}

function createFireworkBurst(x, y, container) {
    const colors = ['#ff6b9d', '#ffd93d', '#6bcf7f', '#667eea', '#ff6b6b'];
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.borderRadius = '50%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.pointerEvents = 'none';
        
        const angle = (i / 12) * Math.PI * 2;
        const velocity = 100 + Math.random() * 150;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        container.appendChild(particle);
        
        let currentX = x;
        let currentY = y;
        let currentVy = vy;
        const gravity = 300; // pixels per second squared
        const startTime = Date.now();
        
        function animateParticle() {
            const elapsed = (Date.now() - startTime) / 1000;
            currentX += vx * 0.016;
            currentVy += gravity * 0.016;
            currentY += currentVy * 0.016;
            
            particle.style.left = currentX + 'px';
            particle.style.top = currentY + 'px';
            particle.style.opacity = Math.max(0, 1 - elapsed / 2);
            
            if (elapsed < 2 && particle.style.opacity > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        }
        
        animateParticle();
    }
    
    // Play firework sound
    playSound('celebration');
}

function createHeroEntranceParticles() {
    const particlesContainer = document.getElementById('heroEntranceParticles');
    if (!particlesContainer) return;
    
    const particles = ['✨', '🌟', '💫', '⭐', '🎊', '🎉'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = window.innerHeight + 'px';
            particle.style.fontSize = (1 + Math.random() * 2) + 'rem';
            particle.style.pointerEvents = 'none';
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.animation = 'magical-particle-rise 4s ease-out forwards';
            
            particlesContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 4000);
        }, i * 200);
    }
}

function createAnnouncementCelebration(card) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create dragon celebration
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createParticle(centerX, centerY, ['🐲', '👑', '✨', '🌟', '🎉'][Math.floor(Math.random() * 5)]);
        }, i * 100);
    }
    
    showFloatingText('🐲👑 DRAGON PRINCESS! 👑🐲', centerX, centerY - 100, '#ffd700');
    
    // Add special sparkle burst
    setTimeout(() => {
        for (let i = 0; i < 8; i++) {
            createParticle(centerX, centerY, '💎');
        }
    }, 800);
}

function createButtonSparkles(button) {
    const rect = button.getBoundingClientRect();
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            sparkle.style.fontSize = '1rem';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            sparkle.textContent = '✨';
            sparkle.style.animation = 'sparkle-fade 1s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }, i * 100);
    }
}

function updateBalloonGame() {
    // Update balloon game to work with reduced balloons
    const balloons = document.querySelectorAll('.game-balloon');
    let score = 0;
    
    balloons.forEach(balloon => {
        // Remove old event listeners and add new ones
        const newBalloon = balloon.cloneNode(true);
        balloon.parentNode.replaceChild(newBalloon, balloon);
        
        newBalloon.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            popBalloon(this, color);
            score++;
            
            if (score === 3) { // Changed from 5 to 3
                showBalloonGameComplete();
                setTimeout(() => {
                    respawnBalloons();
                    score = 0;
                }, 3000);
            }
        });
    });
}

// Baby Dragon Interaction
function initializeBabyDragon() {
    const dragon = document.getElementById('babyDragon');
    if (!dragon) return;
    
    let dragonClicks = 0;
    
    dragon.addEventListener('click', function() {
        dragonClicks++;
        createDragonMagic(this);
        playDragonSound(dragonClicks);
        
        // Special celebration every 3 clicks
        if (dragonClicks % 3 === 0) {
            createDragonCelebration(this);
        }
        
        // Add celebration effect
        this.style.animation = 'dragon-celebrate 1s ease-in-out';
        setTimeout(() => {
            this.style.animation = '';
        }, 1000);
    });
    
    dragon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.3) rotate(15deg)';
        this.style.filter = 'drop-shadow(0 15px 35px rgba(255,215,0,0.6))';
        playDragonSound(0); // Gentle hover sound
    });
    
    dragon.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.filter = '';
    });
    
    // Make dragon follow mouse slightly
    document.addEventListener('mousemove', function(e) {
        if (!dragon) return;
        const rect = dragon.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const deltaX = (mouseX - centerX) * 0.05;
        const deltaY = (mouseY - centerY) * 0.05;
        
        dragon.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
}

function createDragonMagic(dragon) {
    const rect = dragon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create dragon fire particles
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            createParticle(centerX, centerY, getDragonParticle());
        }, i * 50);
    }
    
    // Show dragon message
    showFloatingText('🐉 Little Dragon Magic! 🐉', centerX, centerY - 80, '#ffd700');
}

function createDragonCelebration(dragon) {
    const rect = dragon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create rainbow dragon celebration
    const colors = ['#ff6b9d', '#ffd93d', '#6bcf7f', '#667eea', '#ff6b6b'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createColoredParticle(centerX, centerY, '🌈', colors[i % colors.length]);
        }, i * 100);
    }
    
    showFloatingText('🎊 DRAGON POWER! 🎊', centerX, centerY - 120, '#ff6b9d');
    playSound('celebration');
}

function getDragonParticle() {
    const particles = ['🔥', '✨', '⭐', '💫', '🌟', '💎', '🏮', '🐲'];
    return particles[Math.floor(Math.random() * particles.length)];
}

// Asian Cultural Elements Interaction
function initializeAsianElements() {
    initializeLanterns();
    initializeCherryBlossoms();
    initializeCoins();
    initializeFans();
}

function initializeLanterns() {
    const lanterns = document.querySelectorAll('.floating-lantern');
    
    lanterns.forEach(lantern => {
        lantern.addEventListener('click', function() {
            createLanternWish(this);
            playAsianSound('lantern');
        });
    });
}

function initializeCherryBlossoms() {
    const blossoms = document.querySelectorAll('.cherry-blossoms');
    
    blossoms.forEach(blossom => {
        blossom.addEventListener('click', function() {
            createBlossomShower(this);
            playAsianSound('blossom');
        });
    });
}

function initializeCoins() {
    const coins = document.querySelectorAll('.floating-coin');
    
    coins.forEach(coin => {
        coin.addEventListener('click', function() {
            createGoldenBurst(this);
            playAsianSound('coin');
        });
    });
}

function initializeFans() {
    const fans = document.querySelectorAll('.floating-fan');
    
    fans.forEach(fan => {
        fan.addEventListener('click', function() {
            createFanBreeze(this);
            playAsianSound('fan');
        });
    });
}

function createLanternWish(lantern) {
    const rect = lantern.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        createParticle(centerX, centerY, '🎋');
    }
    
    showFloatingText('🏮 Good Fortune! 🏮', centerX, centerY - 60, '#ff0000');
}

function createBlossomShower(blossom) {
    const rect = blossom.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createParticle(centerX, centerY, '🌸');
        }, i * 100);
    }
    
    showFloatingText('🌸 Beauty & Growth! 🌸', centerX, centerY - 60, '#ffb6c1');
}

function createGoldenBurst(coin) {
    const rect = coin.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 10; i++) {
        createParticle(centerX, centerY, ['🪙', '💰', '✨'][Math.floor(Math.random() * 3)]);
    }
    
    showFloatingText('💰 Prosperity! 💰', centerX, centerY - 60, '#ffd700');
}

function createFanBreeze(fan) {
    const rect = fan.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            createParticle(centerX, centerY, ['💨', '🌺', '🍃'][Math.floor(Math.random() * 3)]);
        }, i * 150);
    }
    
    showFloatingText('🌺 Gentle Breeze! 🌺', centerX, centerY - 60, '#ff69b4');
}

// Dragon Zodiac Section Interactions
function initializeDragonZodiacSection() {
    const zodiacCards = document.querySelectorAll('.element-card');
    const dragonCard = document.querySelector('.dragon-year-card');
    const zodiacDragon = document.querySelector('.zodiac-dragon');
    
    // Zodiac dragon interaction
    if (zodiacDragon) {
        zodiacDragon.addEventListener('click', function() {
            createZodiacCelebration(this);
            playDragonSound(5); // Special zodiac sound
        });
    }
    
    // Element cards interaction
    zodiacCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardType = this.className.includes('lantern') ? 'lantern' :
                            this.className.includes('blossom') ? 'blossom' : 'coin';
            createElementCelebration(this, cardType);
            playAsianSound(cardType);
        });
    });
    
    // Dragon card special interaction
    if (dragonCard) {
        dragonCard.addEventListener('click', function() {
            createDragonYearCelebration(this);
            playSound('celebration');
        });
    }
    
    // Dragon stats interaction
    const dragonStats = document.querySelectorAll('.dragon-stat');
    dragonStats.forEach(stat => {
        stat.addEventListener('click', function() {
            createDragonStatCelebration(this);
            playDragonSound(Math.floor(Math.random() * 5));
        });
    });
}

function createZodiacCelebration(dragon) {
    const rect = dragon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create zodiac power burst
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createParticle(centerX, centerY, ['🐲', '⚡', '🔥', '✨', '💫'][Math.floor(Math.random() * 5)]);
        }, i * 75);
    }
    
    showFloatingText('🐲 YEAR OF THE DRAGON! 🐲', centerX, centerY - 100, '#ffd700');
}

function createElementCelebration(card, type) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const particles = {
        lantern: ['🏮', '✨', '🎋'],
        blossom: ['🌸', '🌺', '🌼'],
        coin: ['🪙', '💰', '💎']
    };
    
    for (let i = 0; i < 8; i++) {
        createParticle(centerX, centerY, particles[type][Math.floor(Math.random() * 3)]);
    }
}

function createDragonYearCelebration(card) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Rainbow dragon year celebration
    const dragonElements = ['🐉', '🐲', '🔥', '⚡', '🌈', '✨', '💫', '🌟'];
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            createParticle(centerX, centerY, dragonElements[Math.floor(Math.random() * dragonElements.length)]);
        }, i * 100);
    }
    
    showFloatingText('🎊 BORN IN THE YEAR OF THE DRAGON! 🎊', centerX, centerY - 150, '#ff6b9d');
}

// Floating Toys Interaction
function initializeFloatingToys() {
    const toys = document.querySelectorAll('.floating-toy');
    
    toys.forEach(toy => {
        toy.addEventListener('click', function() {
            const toyType = this.getAttribute('data-toy');
            createToyInteraction(this, toyType);
            playToySound(toyType);
            
            // Add celebration effect
            this.style.animation = 'toy-bounce 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
        
        toy.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
            this.style.filter = 'drop-shadow(0 10px 25px rgba(0,0,0,0.3))';
        });
        
        toy.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.filter = '';
        });
    });
}

function createToyInteraction(toy, toyType) {
    const rect = toy.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create particle effect
    for (let i = 0; i < 8; i++) {
        createParticle(centerX, centerY, getToyParticle(toyType));
    }
    
    // Show toy message
    showToyMessage(toyType, centerX, centerY);
}

function getToyParticle(toyType) {
    const particles = {
        bear: ['🧸', '❤️', '🤗'],
        blocks: ['🧩', '🔷', '🔸'],
        rattle: ['🎵', '🎶', '♪'],
        bottle: ['🍼', '💕', '🤱'],
        duck: ['🦆', '💦', '🌊'],
        pacifier: ['🍭', '😴', '💤']
    };
    const options = particles[toyType] || ['✨', '⭐', '🌟'];
    return options[Math.floor(Math.random() * options.length)];
}

// Balloon Popping Game
function initializeBalloonGame() {
    const balloons = document.querySelectorAll('.game-balloon');
    let score = 0;
    
    balloons.forEach(balloon => {
        balloon.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            popBalloon(this, color);
            score++;
            
            if (score === 5) {
                showBalloonGameComplete();
                setTimeout(() => {
                    respawnBalloons();
                    score = 0;
                }, 3000);
            }
        });
    });
}

function popBalloon(balloon, color) {
    const rect = balloon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Pop animation
    balloon.style.animation = 'balloon-pop 0.3s ease-out forwards';
    balloon.style.transform = 'scale(0)';
    
    // Create pop particles
    for (let i = 0; i < 12; i++) {
        createParticle(centerX, centerY, '🎊');
    }
    
    // Play pop sound
    playSound('pop');
    
    // Show points
    showFloatingText('+10', centerX, centerY - 50, '#ff6b9d');
    
    // Hide balloon temporarily
    setTimeout(() => {
        balloon.style.display = 'none';
    }, 300);
}

function respawnBalloons() {
    const balloons = document.querySelectorAll('.game-balloon');
    balloons.forEach((balloon, index) => {
        setTimeout(() => {
            balloon.style.display = 'block';
            balloon.style.transform = '';
            balloon.style.animation = '';
        }, index * 200);
    });
}

// Interactive Birthday Cake
function initializeInteractiveCake() {
    const cake = document.getElementById('interactiveCake');
    const candles = document.querySelectorAll('.candle');
    let candlesLit = candles.length;
    
    cake.addEventListener('click', function() {
        if (candlesLit > 0) {
            blowOutCandles();
        } else {
            relightCandles();
        }
    });
}

function blowOutCandles() {
    const candles = document.querySelectorAll('.candle');
    const particles = document.getElementById('wishParticles');
    
    candles.forEach((candle, index) => {
        setTimeout(() => {
            const flame = candle.querySelector('.flame');
            flame.style.opacity = '0';
            flame.style.transform = 'scale(0)';
            
            // Create smoke effect
            createSmokeEffect(candle);
        }, index * 100);
    });
    
    // Show wish particles
    setTimeout(() => {
        createWishEffect();
        showFloatingText('🌠 Make a wish! 🌠', window.innerWidth / 2, window.innerHeight / 2, '#ffd93d');
        playSound('wish');
    }, 500);
    
    // Update instruction
    const instruction = document.querySelector('.cake-instruction p');
    instruction.textContent = '✨ Wish made! Click to relight! ✨';
}

function relightCandles() {
    const candles = document.querySelectorAll('.candle');
    
    candles.forEach((candle, index) => {
        setTimeout(() => {
            const flame = candle.querySelector('.flame');
            flame.style.opacity = '1';
            flame.style.transform = 'scale(1)';
        }, index * 100);
    });
    
    const instruction = document.querySelector('.cake-instruction p');
    instruction.textContent = '🌬️ Click to blow out the candle! 🌬️';
    
    playSound('light');
}

// Mouse Sparkle Trail
function initializeMouseSparkles() {
    const sparkleTrail = document.querySelector('.sparkle-trail');
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create sparkle every few pixels
        if (Math.random() > 0.8) {
            createSparkle(mouseX, mouseY);
        }
    });
    
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = ['✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 4)];
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkleTrail.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// Milestone Animations
function initializeMilestoneAnimations() {
    const milestones = document.querySelectorAll('.milestone-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const milestone = entry.target;
                const milestoneType = milestone.getAttribute('data-milestone');
                
                // Add special animation
                milestone.style.animation = 'milestone-celebrate 1s ease-out';
                
                // Create celebration effect
                if (milestoneType === 'birthday') {
                    setTimeout(() => {
                        createBirthdayExplosion(milestone);
                    }, 500);
                }
                
                // Add floating particles
                createMilestoneParticles(milestone);
            }
        });
    }, { threshold: 0.5 });
    
    milestones.forEach(milestone => {
        observer.observe(milestone);
        
        milestone.addEventListener('click', function() {
            const milestoneType = this.getAttribute('data-milestone');
            createMilestoneInteraction(this, milestoneType);
        });
    });
    
    // Add birth stats interactivity
    const birthStats = document.querySelectorAll('.stat');
    birthStats.forEach(stat => {
        stat.addEventListener('click', function() {
            createBirthStatCelebration(this);
            playSound('celebration');
        });
    });
}

// Helper Functions
function createParticle(x, y, emoji) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.fontSize = '1.5rem';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.textContent = emoji;
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 50 + Math.random() * 100;
    const gravity = 0.5;
    let vx = Math.cos(angle) * velocity;
    let vy = Math.sin(angle) * velocity;
    
    document.body.appendChild(particle);
    
    function animate() {
        x += vx;
        y += vy;
        vy += gravity;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = Math.max(0, 1 - y / window.innerHeight);
        
        if (y < window.innerHeight && parseFloat(particle.style.opacity) > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }
    
    animate();
}

function showFloatingText(text, x, y, color = '#ff6b9d') {
    const textElement = document.createElement('div');
    textElement.style.position = 'fixed';
    textElement.style.left = x + 'px';
    textElement.style.top = y + 'px';
    textElement.style.color = color;
    textElement.style.fontSize = '2rem';
    textElement.style.fontWeight = 'bold';
    textElement.style.pointerEvents = 'none';
    textElement.style.zIndex = '9999';
    textElement.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
    textElement.textContent = text;
    textElement.style.animation = 'float-up-fade 2s ease-out forwards';
    
    document.body.appendChild(textElement);
    
    setTimeout(() => {
        textElement.remove();
    }, 2000);
}

function createWishEffect() {
    const colors = ['#ff6b9d', '#ffd93d', '#6bcf7f', '#667eea'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = (window.innerWidth / 2) + 'px';
            particle.style.top = (window.innerHeight / 2) + 'px';
            particle.style.width = '10px';
            particle.style.height = '10px';
            particle.style.borderRadius = '50%';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            
            const angle = (i / 20) * Math.PI * 2;
            const distance = 100 + Math.random() * 200;
            const targetX = Math.cos(angle) * distance;
            const targetY = Math.sin(angle) * distance;
            
            particle.style.animation = `wish-particle 2s ease-out forwards`;
            particle.style.setProperty('--target-x', targetX + 'px');
            particle.style.setProperty('--target-y', targetY + 'px');
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }, i * 50);
    }
}

// Sound Effects (Web Audio API)
function addInteractiveSounds() {
    // Create audio context for sound effects
    window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Sound library
    window.sounds = {
        toy: () => playTone(523.25, 0.1), // C5
        pop: () => playTone(659.25, 0.05), // E5
        wish: () => playTone(783.99, 0.2), // G5
        light: () => playTone(440, 0.1), // A4
        celebration: () => playCelebrationChord()
    };
}

function playSound(soundName) {
    if (window.sounds && window.sounds[soundName]) {
        window.sounds[soundName]();
    }
}

function playTone(frequency, duration) {
    if (!window.audioContext) return;
    
    const oscillator = window.audioContext.createOscillator();
    const gainNode = window.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(window.audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, window.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioContext.currentTime + duration);
    
    oscillator.start(window.audioContext.currentTime);
    oscillator.stop(window.audioContext.currentTime + duration);
}

function playToySound(toyType) {
    playSound('toy');
}

function playDragonSound(clickCount) {
    // Different dragon sounds based on interaction
    const frequencies = [523.25, 659.25, 783.99, 987.77, 1174.66]; // C5, E5, G5, B5, D6
    const frequency = frequencies[clickCount % frequencies.length];
    playTone(frequency, 0.2);
}

function playAsianSound(elementType) {
    const sounds = {
        lantern: 880,    // A5 - warm, glowing
        blossom: 1174.66, // D6 - light, delicate  
        coin: 698.46,    // F5 - metallic, prosperity
        fan: 1046.50     // C6 - airy, gentle
    };
    playTone(sounds[elementType] || 440, 0.15);
}

function createColoredParticle(x, y, emoji, color) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.fontSize = '1.5rem';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.color = color;
    particle.textContent = emoji;
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 50 + Math.random() * 100;
    const gravity = 0.5;
    let vx = Math.cos(angle) * velocity;
    let vy = Math.sin(angle) * velocity;
    
    document.body.appendChild(particle);
    
    function animate() {
        x += vx;
        y += vy;
        vy += gravity;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = Math.max(0, 1 - y / window.innerHeight);
        
        if (y < window.innerHeight && parseFloat(particle.style.opacity) > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }
    
    animate();
}

// Missing helper functions
function showToyMessage(toyType, x, y) {
    const messages = {
        bear: 'Teddy Bear Hugs! 🧸',
        blocks: 'Building Fun! 🧩',
        rattle: 'Shake It! 🎵',
        bottle: 'Feeding Time! 🍼',
        duck: 'Rubber Ducky! 🦆',
        pacifier: 'Sweet Dreams! 🍭'
    };
    showFloatingText(messages[toyType] || 'So Fun!', x, y - 50, '#ff6b9d');
}

function showBalloonGameComplete() {
    showFloatingText('🎉 All Balloons Popped! 🎉', window.innerWidth / 2, window.innerHeight / 2, '#ffd93d');
    playSound('celebration');
}

function createSmokeEffect(candle) {
    const rect = candle.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createParticle(x, y, '💨');
        }, i * 100);
    }
}

function createBirthdayExplosion(milestone) {
    const rect = milestone.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 15; i++) {
        createParticle(centerX, centerY, ['🎉', '🎊', '✨', '🌟'][Math.floor(Math.random() * 4)]);
    }
    
    playSound('celebration');
}

function createMilestoneParticles(milestone) {
    const rect = milestone.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            createParticle(centerX, centerY, ['⭐', '✨', '💫'][Math.floor(Math.random() * 3)]);
        }, i * 200);
    }
}

function createMilestoneInteraction(milestone, milestoneType) {
    const rect = milestone.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const messages = {
        birth: 'Hello World! 👶',
        smile: 'First Smile! 😊',
        laugh: 'Giggles! 😄',
        rollover: 'Rolling! 🤸‍♀️',
        sitting: 'Sitting Up! 🪑',
        crawling: 'Crawling! 🚼',
        walking: 'First Steps! 🚶‍♀️',
        birthday: 'Happy 1st Birthday! 🎉'
    };
    
    showFloatingText(messages[milestoneType] || 'Milestone!', centerX, centerY - 100, '#6bcf7f');
    
    for (let i = 0; i < 8; i++) {
        createParticle(centerX, centerY, '🌟');
    }
}

function playCelebrationChord() {
    // Play a happy chord
    playTone(523.25, 0.3); // C5
    setTimeout(() => playTone(659.25, 0.3), 50); // E5
    setTimeout(() => playTone(783.99, 0.3), 100); // G5
}

function createBirthStatCelebration(stat) {
    const rect = stat.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Determine if it's weight or height stat
    const isWeight = stat.querySelector('.stat-text').textContent.includes('kg');
    const isHeight = stat.querySelector('.stat-text').textContent.includes('cm');
    
    if (isWeight) {
        // Weight celebration - golden particles
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createParticle(centerX, centerY, ['⚖️', '💖', '👶', '✨', '🌟'][Math.floor(Math.random() * 5)]);
            }, i * 100);
        }
        showFloatingText('🥰 Perfect Weight! 🥰', centerX, centerY - 80, '#ffd700');
    } else if (isHeight) {
        // Height celebration - growth particles
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createParticle(centerX, centerY, ['📏', '🌱', '👶', '💕', '🌈'][Math.floor(Math.random() * 5)]);
            }, i * 100);
        }
        showFloatingText('🌟 Perfect Size! 🌟', centerX, centerY - 80, '#ff6b9d');
    }
    
    // Add special dragon celebration
    setTimeout(() => {
        createParticle(centerX, centerY, '🐉');
        showFloatingText('Little Dragon Stats! 🐲', centerX, centerY - 120, '#667eea');
    }, 500);
}

function createDragonStatCelebration(stat) {
    const rect = stat.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Determine if it's weight or height stat in dragon section
    const statText = stat.textContent.trim();
    const isWeight = statText.includes('kg');
    const isHeight = statText.includes('cm');
    
    if (isWeight) {
        // Dragon weight celebration
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                createParticle(centerX, centerY, ['🐲', '⚖️', '💎', '✨', '🌟'][Math.floor(Math.random() * 5)]);
            }, i * 80);
        }
        showFloatingText('🐲 Strong Dragon! 🐲', centerX, centerY - 90, '#ffd700');
    } else if (isHeight) {
        // Dragon height celebration
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                createParticle(centerX, centerY, ['🐉', '📏', '🌈', '💫', '⭐'][Math.floor(Math.random() * 5)]);
            }, i * 80);
        }
        showFloatingText('🐉 Mighty Dragon! 🐉', centerX, centerY - 90, '#ff6b9d');
    }
    
    // Add special dragon power burst
    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            createParticle(centerX, centerY, '🔥');
        }
        showFloatingText('Dragon Power Stats! ⚡', centerX, centerY - 130, '#667eea');
    }, 800);
}

// Add custom CSS for new animations
function addInteractiveCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes balloon-pop {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(0); opacity: 0; }
        }
        
        @keyframes float-up-fade {
            0% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-100px); }
        }
        
        @keyframes milestone-celebrate {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.05) rotate(2deg); }
            75% { transform: scale(1.05) rotate(-2deg); }
        }
        
        @keyframes wish-particle {
            0% { 
                opacity: 1; 
                transform: translate(0, 0) scale(1); 
            }
            100% { 
                opacity: 0; 
                transform: translate(var(--target-x), var(--target-y)) scale(0); 
            }
        }
        
        @keyframes magical-particle-rise {
            0% { 
                opacity: 0; 
                transform: translateY(0px) scale(0) rotate(0deg); 
            }
            20% { 
                opacity: 1; 
                transform: translateY(-200px) scale(1) rotate(180deg); 
            }
            80% { 
                opacity: 1; 
                transform: translateY(-600px) scale(1.2) rotate(540deg); 
            }
            100% { 
                opacity: 0; 
                transform: translateY(-800px) scale(0) rotate(720deg); 
            }
        }
    `;
    document.head.appendChild(style);
}

// ===================================================
// ✨ MAGICAL NEW FEATURES JAVASCRIPT ✨
// ===================================================

// ===== TIME CAPSULE MESSAGES =====
function initializeTimeCapsule() {
    const bottle = document.getElementById('timeCapsuleBottle');
    const modal = document.getElementById('timeCapsuleModal');
    const closeBtn = document.getElementById('closeTimeCapsule');
    const saveBtn = document.getElementById('saveMessage');
    const messageInput = document.getElementById('timeCapsuleMessage');
    const nameInput = document.getElementById('senderName');
    const savedMessagesContainer = document.getElementById('savedMessages');

    if (!bottle || !modal) return;

    // Open modal when bottle is clicked
    bottle.addEventListener('click', () => {
        modal.classList.add('active');
        loadSavedMessages();
        playTone(523.25, 0.2); // C5 note
    });

    // Close modal
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.classList.remove('active');
        playTone(391.995, 0.2); // G4 note
    }

    // Save message
    saveBtn.addEventListener('click', saveMessage);

    function saveMessage() {
        const message = messageInput.value.trim();
        const name = nameInput.value.trim() || 'Anonymous';

        if (!message) {
            showNotification('Please write a message for Minh Châu! 💕', 'error');
            return;
        }

        const messageData = {
            text: message,
            author: name,
            date: new Date().toLocaleDateString(),
            timestamp: Date.now()
        };

        // Save to localStorage
        let savedMessages = JSON.parse(localStorage.getItem('timeCapsuleMessages') || '[]');
        savedMessages.push(messageData);
        localStorage.setItem('timeCapsuleMessages', JSON.stringify(savedMessages));

        // Create celebration effect
        createTimeCapsuleCelebration();

        // Clear inputs and reload messages
        messageInput.value = '';
        nameInput.value = '';
        loadSavedMessages();

        showNotification(`Message saved for Minh Châu's future! ✨`, 'success');
        playTone(659.25, 0.3); // E5 note
    }

    function loadSavedMessages() {
        const savedMessages = JSON.parse(localStorage.getItem('timeCapsuleMessages') || '[]');
        savedMessagesContainer.innerHTML = '';

        if (savedMessages.length === 0) {
            savedMessagesContainer.innerHTML = '<p style="text-align: center; opacity: 0.7;">No messages yet. Be the first to leave one! 💌</p>';
            return;
        }

        savedMessages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'saved-message';
            messageDiv.innerHTML = `
                <div class="message-text">"${msg.text}"</div>
                <div class="message-author">- ${msg.author} (${msg.date})</div>
            `;
            savedMessagesContainer.appendChild(messageDiv);
        });
    }

    function createTimeCapsuleCelebration() {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    right: 60px;
                    top: 25%;
                    width: 20px;
                    height: 20px;
                    background: ${['💌', '💝', '✨', '💫', '🌟'][Math.floor(Math.random() * 5)]};
                    font-size: 20px;
                    pointer-events: none;
                    z-index: 1000;
                    animation: time-capsule-particle 2s ease-out forwards;
                `;
                document.body.appendChild(particle);

                setTimeout(() => particle.remove(), 2000);
            }, i * 100);
        }
    }

    // Add CSS for time capsule particles
    if (!document.getElementById('time-capsule-css')) {
        const style = document.createElement('style');
        style.id = 'time-capsule-css';
        style.textContent = `
            @keyframes time-capsule-particle {
                0% { transform: translate(0, 0) scale(1); opacity: 1; }
                50% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1.2); opacity: 1; }
                100% { transform: translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) scale(0); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== INTERACTIVE STORY BOOK =====
function initializeStoryBook() {
    const openBookBtn = document.getElementById('openBook');
    const bookCover = document.querySelector('.book-cover');
    const storyPages = document.getElementById('storyPages');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageIndicator = document.getElementById('pageIndicator');

    let currentPage = 1;
    const totalPages = 4;

    if (!openBookBtn || !bookCover || !storyPages) {
        console.error('❌ Story Book: Missing required elements!');
        return;
    }

    // Ensure button is fully clickable
    openBookBtn.style.cssText = `
        ${openBookBtn.style.cssText || ''}
        pointer-events: auto !important;
        cursor: pointer !important;
        z-index: 9999 !important;
        position: relative !important;
    `;

    // Open book - multiple event listeners for reliability
    openBookBtn.addEventListener('click', function(e) {
        console.log('📖 Story book button clicked via click event!');
        e.preventDefault();
        e.stopPropagation();
        openBook();
    });
    
    openBookBtn.addEventListener('touchstart', function(e) {
        console.log('📖 Story book button touched!');
        e.preventDefault();
        e.stopPropagation();
        openBook();
    });
    
    // Also add direct onclick as backup
    openBookBtn.onclick = function(e) {
        console.log('📖 Story book button clicked via onclick!');
        e.preventDefault();
        e.stopPropagation();
        openBook();
        return false;
    };

    function openBook() {
        console.log('📖 openBook() function called!');
        console.log('📖 Elements found:', { bookCover: !!bookCover, storyPages: !!storyPages });
        
        bookCover.classList.add('opened');
        storyPages.classList.add('active');
        
        // Show navigation when story is opened
        const storyNav = document.querySelector('.story-nav');
        if (storyNav) {
            console.log('📖 Story navigation found, adding active class');
            storyNav.classList.add('active');
            storyNav.style.display = 'flex';
            storyNav.style.opacity = '1';
        } else {
            console.log('📖 Story navigation not found!');
        }
        
        playTone(523.25, 0.3); // C5 note
        createBookOpenEffect();
        updatePageDisplay();
        
        // Show success notification
        showNotification('Story book opened! 📖✨', 'success');
        console.log('📖 Story book opened successfully!');
    }

    // Navigation - add event listeners even if hidden initially
    if (prevBtn) {
        prevBtn.addEventListener('click', () => changePage(currentPage - 1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => changePage(currentPage + 1));
    }
    
    // Close story functionality
    const closeBtn = document.getElementById('closeStory');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeBook);
    }

    function closeBook() {
        bookCover.classList.remove('opened');
        storyPages.classList.remove('active');
        
        // Hide navigation when story is closed
        const storyNav = document.querySelector('.story-nav');
        if (storyNav) {
            storyNav.classList.remove('active');
        }
        
        // Reset to first page
        currentPage = 1;
        updatePageDisplay();
        
        playTone(391.995, 0.3); // G4 note (lower than open)
    }

    function changePage(newPage) {
        if (newPage < 1 || newPage > totalPages) return;

        // Hide current page
        const currentPageElement = document.querySelector(`.story-page[data-page="${currentPage}"]`);
        if (currentPageElement) {
            currentPageElement.classList.remove('active');
        }

        currentPage = newPage;

        // Show new page
        const newPageElement = document.querySelector(`.story-page[data-page="${currentPage}"]`);
        if (newPageElement) {
            newPageElement.classList.add('active');
        }

        updatePageDisplay();
        createPageTurnEffect();
        playTone(392 + (currentPage * 50), 0.2); // Different note for each page
    }

    function updatePageDisplay() {
        pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    function createBookOpenEffect() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 15px;
                    height: 15px;
                    background: ${['📖', '✨', '🌟', '💫', '🎭'][Math.floor(Math.random() * 5)]};
                    font-size: 15px;
                    pointer-events: none;
                    z-index: 100;
                    animation: book-open-particle 2s ease-out forwards;
                `;
                document.querySelector('.story-book').appendChild(particle);

                setTimeout(() => particle.remove(), 2000);
            }, i * 50);
        }
    }

    function createPageTurnEffect() {
        const storyBook = document.querySelector('.story-book');
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                width: 10px;
                height: 10px;
                background: ✨;
                font-size: 10px;
                pointer-events: none;
                z-index: 100;
                animation: page-turn-sparkle 1s ease-out forwards;
            `;
            storyBook.appendChild(particle);

            setTimeout(() => particle.remove(), 1000);
        }
    }

    // Add CSS for story book effects
    if (!document.getElementById('story-book-css')) {
        const style = document.createElement('style');
        style.id = 'story-book-css';
        style.textContent = `
            @keyframes book-open-particle {
                0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                100% { transform: translate(${Math.random() * 300 - 150}px, ${Math.random() * 300 - 150}px) scale(0); opacity: 0; }
            }
            @keyframes page-turn-sparkle {
                0% { transform: scale(1) rotate(0deg); opacity: 1; }
                100% { transform: scale(0) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== GROWING MEMORY GARDEN =====
function initializeMemoryGarden() {
    console.log('🌸 Initializing Memory Garden...');
    
    const flowerBed = document.getElementById('flowerBed');
    const butterfliesContainer = document.getElementById('butterfliesContainer');
    const flowerCountEl = document.getElementById('flowerCount');
    const butterflyCountEl = document.getElementById('butterflyCount');
    const memoryCountEl = document.getElementById('memoryCount');
    
    let flowerCount = parseInt(localStorage.getItem('gardenFlowerCount') || '0');
    let butterflyCount = 0;
    let memoryCount = parseInt(localStorage.getItem('gardenMemoryCount') || '0');
    
    const flowerTypes = ['🌸', '🌺', '🌻', '🌷', '🌹', '🏵️', '🌼', '💐'];
    const butterflyTypes = ['🦋', '🦄', '🧚‍♀️'];
    
    if (!flowerBed) {
        console.error('❌ Memory Garden: Missing flower bed element!');
        return;
    }
    
    // Initialize garden
    updateGardenStats();
    loadExistingFlowers();
    initializeCarouselPhotoClicks();
    
    function initializeCarouselPhotoClicks() {
        // Add click handlers to all carousel images
        const carouselImages = document.querySelectorAll('.carousel-slide img');
        console.log('🌸 Found carousel images:', carouselImages.length);
        
        carouselImages.forEach((img, index) => {
            img.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent carousel navigation
                plantFlowerFromPhoto(img, index);
            });
            
            // Add visual indication that photos are clickable
            img.style.cursor = 'pointer';
            img.title = 'Click to plant a flower for this memory! 🌸';
        });
    }
    
    function plantFlowerFromPhoto(imgElement, photoIndex) {
        console.log('🌸 Planting flower from photo:', photoIndex);
        
        // Check if already planted
        const existingFlower = flowerBed.querySelector(`[data-photo="${photoIndex}"]`);
        if (existingFlower) {
            // Animate existing flower
            existingFlower.style.animation = 'flower-celebrate 1s ease-out';
            showNotification('This memory is already blooming in your garden! 🌸', 'info');
            return;
        }
        
        // Create new flower
        const flower = document.createElement('div');
        flower.className = 'garden-flower';
        flower.setAttribute('data-photo', photoIndex);
        
        // Choose flower type based on photo index
        const flowerType = flowerTypes[photoIndex % flowerTypes.length];
        flower.textContent = flowerType;
        
        // Random position in flower bed
        const x = 10 + Math.random() * 80; // 10% to 90% width
        const y = 20 + Math.random() * 60; // 20% to 80% height
        
        flower.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            animation-delay: ${Math.random() * 0.5}s;
        `;
        
        // Add to flower bed
        flowerBed.appendChild(flower);
        
        // Animate flower growth
        setTimeout(() => {
            flower.classList.add('bloomed');
        }, 100);
        
        // Update stats
        flowerCount++;
        memoryCount++;
        updateGardenStats();
        saveGardenProgress();
        
        // Create planting effect
        createPlantingEffect(flower);
        
        // Spawn butterfly after flower blooms
        setTimeout(() => {
            if (Math.random() < 0.7) { // 70% chance
                spawnButterfly(flower);
            }
        }, 2000);
        
        // Show success message
        showNotification(`Beautiful ${flowerType} planted for this memory! 🌸`, 'success');
        playTone(523.25 + (photoIndex * 25), 0.3);
        
        // Add click handler to flower
        flower.addEventListener('click', () => {
            createFlowerClickEffect(flower);
            showImageFromFlower(imgElement);
        });
    }
    
    function createPlantingEffect(flower) {
        const rect = flower.getBoundingClientRect();
        const gardenRect = flowerBed.getBoundingClientRect();
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    left: ${flower.style.left};
                    top: ${flower.style.top};
                    width: 15px;
                    height: 15px;
                    background: ${['✨', '🌟', '💫', '🌸'][Math.floor(Math.random() * 4)]};
                    font-size: 15px;
                    pointer-events: none;
                    z-index: 100;
                    animation: planting-particle 1.5s ease-out forwards;
                `;
                flowerBed.appendChild(particle);
                
                setTimeout(() => particle.remove(), 1500);
            }, i * 50);
        }
    }
    
    function createFlowerClickEffect(flower) {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    left: ${flower.style.left};
                    top: ${flower.style.top};
                    width: 12px;
                    height: 12px;
                    background: ${flower.textContent};
                    font-size: 12px;
                    pointer-events: none;
                    z-index: 100;
                    animation: flower-click-burst 1s ease-out forwards;
                `;
                flowerBed.appendChild(particle);
                
                setTimeout(() => particle.remove(), 1000);
            }, i * 40);
        }
    }
    
    function spawnButterfly(targetFlower) {
        const butterfly = document.createElement('div');
        butterfly.className = 'garden-butterfly';
        butterfly.textContent = butterflyTypes[Math.floor(Math.random() * butterflyTypes.length)];
        
        butterfly.style.cssText = `
            left: -50px;
            top: ${20 + Math.random() * 60}%;
            animation-delay: ${Math.random() * 2}s;
            animation-duration: ${6 + Math.random() * 4}s;
        `;
        
        butterfliesContainer.appendChild(butterfly);
        
        setTimeout(() => {
            butterfly.classList.add('active');
        }, 100);
        
        butterflyCount++;
        updateGardenStats();
        
        // Remove butterfly after animation
        setTimeout(() => {
            butterfly.remove();
            butterflyCount = Math.max(0, butterflyCount - 1);
            updateGardenStats();
        }, 8000);
    }
    
    function showImageFromFlower(imgElement) {
        // Create modal to show the original image
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            cursor: pointer;
        `;
        
        const img = document.createElement('img');
        img.src = imgElement.src;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        `;
        
        modal.appendChild(img);
        document.body.appendChild(modal);
        
        modal.addEventListener('click', () => {
            modal.remove();
        });
    }
    
    function updateGardenStats() {
        if (flowerCountEl) flowerCountEl.textContent = flowerCount;
        if (butterflyCountEl) butterflyCountEl.textContent = butterflyCount;
        if (memoryCountEl) memoryCountEl.textContent = memoryCount;
    }
    
    function saveGardenProgress() {
        localStorage.setItem('gardenFlowerCount', flowerCount.toString());
        localStorage.setItem('gardenMemoryCount', memoryCount.toString());
        
        // Save flower positions and types
        const flowers = Array.from(flowerBed.querySelectorAll('.garden-flower')).map(flower => ({
            photoIndex: flower.getAttribute('data-photo'),
            type: flower.textContent,
            left: flower.style.left,
            top: flower.style.top
        }));
        localStorage.setItem('gardenFlowers', JSON.stringify(flowers));
    }
    
    function loadExistingFlowers() {
        const savedFlowers = JSON.parse(localStorage.getItem('gardenFlowers') || '[]');
        
        savedFlowers.forEach(flowerData => {
            const flower = document.createElement('div');
            flower.className = 'garden-flower bloomed';
            flower.setAttribute('data-photo', flowerData.photoIndex);
            flower.textContent = flowerData.type;
            flower.style.cssText = `
                left: ${flowerData.left};
                top: ${flowerData.top};
            `;
            
            flowerBed.appendChild(flower);
            
            // Add click handler
            flower.addEventListener('click', () => {
                createFlowerClickEffect(flower);
                const carouselImg = document.querySelector(`.carousel-slide:nth-child(${parseInt(flowerData.photoIndex) + 1}) img`);
                if (carouselImg) {
                    showImageFromFlower(carouselImg);
                }
            });
        });
    }
    
    // Add CSS for garden effects
    if (!document.getElementById('garden-effects-css')) {
        const style = document.createElement('style');
        style.id = 'garden-effects-css';
        style.textContent = `
            @keyframes planting-particle {
                0% { transform: scale(1) translateY(0) rotate(0deg); opacity: 1; }
                50% { transform: scale(1.3) translateY(-20px) rotate(180deg); opacity: 1; }
                100% { transform: scale(0) translateY(-40px) rotate(360deg); opacity: 0; }
            }
            @keyframes flower-click-burst {
                0% { transform: scale(1) rotate(0deg); opacity: 1; }
                100% { transform: scale(0) rotate(360deg) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); opacity: 0; }
            }
            @keyframes flower-celebrate {
                0%, 100% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(1.2) rotate(5deg); }
                50% { transform: scale(1.3) rotate(-5deg); }
                75% { transform: scale(1.1) rotate(3deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== HORIZONTAL PARALLAX MEMORIES CAROUSEL =====
function initializeMemoriesGallery() {
    console.log('🎠 Initializing Horizontal Parallax Memories Carousel...');
    
    // Define all memory images from the folder (complete list from your memories folder)
    const memoryImages = [
        'images/memories/IMG_1708.JPG', 'images/memories/IMG_1709.JPG', 'images/memories/IMG_1710.JPG',
        'images/memories/IMG_1711.JPG', 'images/memories/IMG_1712.JPG', 'images/memories/IMG_1713.JPG',
        'images/memories/IMG_1714.JPG', 'images/memories/IMG_1715.JPG', 'images/memories/IMG_1716.JPG',
        'images/memories/IMG_1717.JPG', 'images/memories/IMG_1718.JPG', 'images/memories/IMG_1719.JPG',
        'images/memories/IMG_1720.JPG', 'images/memories/IMG_1721.JPG', 'images/memories/IMG_1722.JPG',
        'images/memories/IMG_1723.JPG', 'images/memories/IMG_1724.JPG', 'images/memories/IMG_1725.JPG',
        'images/memories/IMG_1726.JPG', 'images/memories/IMG_1727.JPG', 'images/memories/IMG_1728.JPG',
        'images/memories/IMG_1729.JPG', 'images/memories/IMG_1730.JPG', 'images/memories/IMG_1731.JPG',
        'images/memories/IMG_1732.JPG', 'images/memories/IMG_1733.JPG', 'images/memories/IMG_1734.JPG',
        'images/memories/IMG_1735.JPG', 'images/memories/IMG_1736.JPG', 'images/memories/IMG_1737.JPG',
        'images/memories/IMG_1738.JPG', 'images/memories/IMG_1739.JPG', 'images/memories/IMG_1740.JPG',
        'images/memories/IMG_1741.JPG', 'images/memories/IMG_1742.JPG', 'images/memories/IMG_1744.JPG',
        'images/memories/IMG_1745.JPG', 'images/memories/IMG_1746.JPG', 'images/memories/IMG_1747.JPG',
        'images/memories/IMG_1748.JPG', 'images/memories/IMG_1750.JPG', 'images/memories/IMG_1751.JPG',
        'images/memories/IMG_1752.JPG', 'images/memories/IMG_1753.JPG', 'images/memories/IMG_1754.JPG',
        'images/memories/IMG_1756.JPG', 'images/memories/IMG_1757.JPG', 'images/memories/IMG_1758.JPG',
        'images/memories/IMG_1759.JPG', 'images/memories/IMG_1760.JPG', 'images/memories/IMG_1761.JPG',
        'images/memories/IMG_1762.JPG', 'images/memories/IMG_1763.JPG', 'images/memories/IMG_1764.JPG',
        'images/memories/IMG_1765.JPG', 'images/memories/IMG_1767.JPG', 'images/memories/IMG_1768.JPG',
        'images/memories/IMG_1769.JPG', 'images/memories/IMG_1772.JPG', 'images/memories/IMG_1773.JPG',
        'images/memories/IMG_1774.JPG'
    ];
    
    console.log(`📂 Loaded ${memoryImages.length} memory images from folder`);
    
    // Preload images for better performance
    const preloadedImages = [];
    memoryImages.forEach((src, index) => {
        const img = new Image();
        img.onload = () => {
            console.log(`✅ Preloaded memory ${index + 1}/${memoryImages.length}`);
        };
        img.onerror = () => {
            console.warn(`⚠️ Failed to load memory image: ${src}`);
        };
        img.src = src;
        preloadedImages.push(img);
    });
    
    const track = document.getElementById('parallaxTrack');
    const dotsContainer = document.getElementById('parallaxDots');
    const prevBtn = document.getElementById('parallaxPrev');
    const nextBtn = document.getElementById('parallaxNext');
    const currentMemorySpan = document.getElementById('currentMemory');
    const totalMemoriesSpan = document.getElementById('totalMemories');
    const lightbox = document.getElementById('memoriesLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeLightbox = document.getElementById('closeLightbox');
    const prevMemory = document.getElementById('prevMemory');
    const nextMemory = document.getElementById('nextMemory');
    
    if (!track || !dotsContainer) {
        console.error('❌ Parallax Carousel: Missing required elements!');
        return;
    }
    
    let currentIndex = 0;
    let isTransitioning = false;
    let autoplayInterval;
    
    // Initialize carousel
    function initCarousel() {
        // Create slides grouped by 3 images each
        const slidesData = [];
        for (let i = 0; i < memoryImages.length; i += 3) {
            slidesData.push(memoryImages.slice(i, i + 3));
        }
        
        // Generate slides HTML
        track.innerHTML = '';
        slidesData.forEach((slideImages, slideIndex) => {
            const slide = document.createElement('div');
            slide.className = 'parallax-slide';
            
            const imageContainer = document.createElement('div');
            imageContainer.className = 'parallax-image-container';
            
            slideImages.forEach((imageSrc, imgIndex) => {
                const imageDiv = document.createElement('div');
                const imageClass = imgIndex === 1 ? 'main' : (imgIndex === 0 ? 'side' : 'hidden');
                imageDiv.className = `parallax-image ${imageClass}`;
                
                const img = document.createElement('img');
                img.src = imageSrc;
                img.alt = `Memory from Minh Châu's first year`;
                img.loading = 'lazy';
                
                const caption = document.createElement('div');
                caption.className = 'image-caption';
                caption.textContent = `Memory ${slideIndex * 3 + imgIndex + 1}`;
                
                imageDiv.appendChild(img);
              //  imageDiv.appendChild(caption);
                imageContainer.appendChild(imageDiv);
                
                // Add click handler for lightbox
                imageDiv.addEventListener('click', () => {
                    openLightbox(slideIndex * 3 + imgIndex);
                });
            });
            
            slide.appendChild(imageContainer);
            track.appendChild(slide);
        });
        
        // Generate dots
        dotsContainer.innerHTML = '';
        slidesData.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `parallax-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        // Update counters
        if (totalMemoriesSpan) totalMemoriesSpan.textContent = memoryImages.length;
        if (currentMemorySpan) currentMemorySpan.textContent = 1;
        
        console.log(`🎠 Parallax Carousel initialized with ${slidesData.length} slides and ${memoryImages.length} memories!`);
    }
    
    // Navigation functions
    function goToSlide(index) {
        if (isTransitioning) return;
        
        const slides = track.children;
        const totalSlides = slides.length;
        
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentIndex = index;
        isTransitioning = true;
        
        // Update track position
        const translateX = -currentIndex * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        document.querySelectorAll('.parallax-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
        // Update counter
        if (currentMemorySpan) {
            currentMemorySpan.textContent = currentIndex * 3 + 2; // Focus on main image
        }
        
        // Create parallax effect
        createParallaxEffect();
        playTone(440 + currentIndex * 50, 0.15);
        
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }
    
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Lightbox functions
    function openLightbox(imageIndex) {
        if (!lightbox || !lightboxImage) return;
        
        lightboxImage.src = memoryImages[imageIndex];
        lightboxImage.alt = `Memory ${imageIndex + 1} from Minh Châu's first year`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        createMemoryViewEffect();
        playTone(550, 0.2);
    }
    
    function closeLightboxHandler() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxImage.src = '';
    }
    
    // Effects
    function createParallaxEffect() {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * window.innerWidth}px;
                    top: ${window.innerHeight / 2 + Math.random() * 100 - 50}px;
                    width: 12px;
                    height: 12px;
                    background: ${['✨', '💫', '🌟'][Math.floor(Math.random() * 3)]};
                    font-size: 12px;
                    pointer-events: none;
                    z-index: 1000;
                    animation: parallax-slide-in 1s ease-out forwards;
                `;
                document.body.appendChild(particle);
                
                setTimeout(() => particle.remove(), 1000);
            }, i * 100);
        }
    }
    
    function createMemoryViewEffect() {
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    left: ${window.innerWidth / 2}px;
                    top: ${window.innerHeight / 2}px;
                    width: 15px;
                    height: 15px;
                    background: ${['📷', '💕', '✨', '🌟'][Math.floor(Math.random() * 4)]};
                    font-size: 15px;
                    pointer-events: none;
                    z-index: 10000;
                    animation: memory-view-particle 1.5s ease-out forwards;
                `;
                document.body.appendChild(particle);
                
                setTimeout(() => particle.remove(), 1500);
            }, i * 50);
        }
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    if (closeLightbox) closeLightbox.addEventListener('click', closeLightboxHandler);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightboxHandler();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightboxHandler();
                    break;
                case 'ArrowLeft':
                    if (prevMemory) prevMemory.click();
                    break;
                case 'ArrowRight':
                    if (nextMemory) nextMemory.click();
                    break;
            }
        } else {
            switch(e.key) {
                case 'ArrowLeft':
                    prevSlide();
                    break;
                case 'ArrowRight':
                    nextSlide();
                    break;
            }
        }
    });
    
    // Auto-play
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            if (!isTransitioning && (!lightbox || !lightbox.classList.contains('active'))) {
                nextSlide();
            }
        }, 5000);
    }
    
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }
    
    // Touch/swipe support
    let startX = 0;
    let startY = 0;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    track.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
    
    // Initialize and start autoplay
    initCarousel();
    startAutoplay();
    
    // Pause autoplay on hover
    const parallaxViewer = document.getElementById('parallaxViewer');
    if (parallaxViewer) {
        parallaxViewer.addEventListener('mouseenter', stopAutoplay);
        parallaxViewer.addEventListener('mouseleave', startAutoplay);
    }
    
    // Add dynamic CSS for particle animations
    if (!document.getElementById('parallax-effects-css')) {
        const style = document.createElement('style');
        style.id = 'parallax-effects-css';
        style.textContent = `
            @keyframes memory-view-particle {
                0% { transform: scale(1) rotate(0deg); opacity: 1; }
                50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
                100% { transform: scale(0) rotate(360deg) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== INITIALIZE ALL NEW FEATURES =====
function initializeMagicalFeatures() {
    console.log('🔧 DEBUG: Starting magical features initialization...');
    initializeTimeCapsule();
    initializeMemoryGarden();
    initializeMemoriesGallery();
    console.log('🔧 DEBUG: Magical features initialization complete!');
}


// Initialize interactive CSS
document.addEventListener('DOMContentLoaded', addInteractiveCSS);

// Export functions for potential external use
window.partyApp = {
    shareParty,
    showNotification,
    PARTY_CONFIG,
    trackEvent,
    initializeParallaxEffects,
    addDynamicFloatingElements,
    initializeCarousel,
    initializeInteractiveFeatures,
    initializeMagicalFeatures,
    initializeTimeCapsule,
    initializeConstellation
};
