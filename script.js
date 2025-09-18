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
    initializePartyDetails();
    initializeEventListeners();
    initializeAnimations();
    initializeParallaxEffects();
    initializeCarousel();
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

// Export functions for potential external use
window.partyApp = {
    shareParty,
    showNotification,
    PARTY_CONFIG,
    trackEvent,
    initializeParallaxEffects,
    addDynamicFloatingElements,
    initializeCarousel
};
