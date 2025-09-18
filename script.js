// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const navbar1 = document.querySelector('.navbar1');
    if (navbar1) {
        if (window.scrollY > 50) {
            navbar1.style.background = 'rgba(174, 231, 241, 0)';
            navbar1.style.boxShadow = '0 5px 20px rgba(89, 230, 255, 0)';
        } else {
            navbar1.style.background = 'rgba(217, 249, 255, 0)';
            navbar1.style.boxShadow = 'none';
        }
    }
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
let isMenuOpen = false;

const toggleMobileMenu = () => {
    isMenuOpen = !isMenuOpen;
    
    // Toggle menu icon
    if (mobileMenu) {
        mobileMenu.innerHTML = isMenuOpen ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    }
    
    // Toggle menu visibility with animation
    if (navLinks) {
        if (isMenuOpen) {
            navLinks.style.display = 'flex';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(217, 249, 255, 0.98)';
            navLinks.style.flexDirection = 'column';
            navLinks.style.padding = '1rem';
            navLinks.style.borderRadius = '0 0 10px 10px';
            navLinks.style.boxShadow = '0 5px 20px rgba(89, 230, 255, 0.2)';
            
            // Animate menu items
            const menuItems = navLinks.querySelectorAll('li');
            menuItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        } else {
            // Animate menu items out
            const menuItems = navLinks.querySelectorAll('li');
            menuItems.forEach((item, index) => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '0';
                item.style.transform = 'translateY(-20px)';
            });
            
            // Hide menu after animation
            setTimeout(() => {
                navLinks.style.display = 'none';
                menuItems.forEach(item => {
                    item.style.opacity = '';
                    item.style.transform = '';
                });
            }, 300);
        }
    }
};

if (mobileMenu) {
    mobileMenu.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !e.target.closest('.nav-container')) {
        toggleMobileMenu();
    }
});

// ===== CONTACT FORM SUBMISSION =====
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');

    
    // Show success notification
    showNotification('Thank you for your message! We will contact you soon.', 'success');
    
    // Reset form
    event.target.reset();
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto close after 5 seconds
    const timeout = setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            clearTimeout(timeout);
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 300);
        });
    }
}

function goBack() {
    document.body.innerHTML = mainContent;
    
    // Re-initialize all JavaScript functionality
    setTimeout(() => {
        initializeAllFunctions();
    }, 100);
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add cascade effect for child elements
                if (entry.target.classList.contains('cascade-parent')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.service-card, .about-card, .process-step, .benefit-card, .freezone-card, .timeline-item, .benefit-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ===== INITIALIZE ALL FUNCTIONS =====
function initializeAllFunctions() {
    // Reinitialize smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Reinitialize mobile menu
    const newMobileMenu = document.querySelector('.mobile-menu');
    const newNavLinks = document.querySelector('.nav-links');
    
    if (newMobileMenu) {
        newMobileMenu.addEventListener('click', toggleMobileMenu);
    }
    
    // Reinitialize scroll animations
    initializeScrollAnimations();
    
    // Reinitialize parallax effect
    const parallax = document.querySelector('.hero-gif');
    if (parallax) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        });
    }
}


// ===== LOADING ANIMATION =====
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// ===== PARALLAX EFFECT FOR HERO SECTION =====
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-gif');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// ===== INITIALIZE ON DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
});
// ===== CONTACT FORM SUBMISSION =====
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Create WhatsApp message
    const whatsappMessage = `Hello Sky Zone Solutions!%0A%0A` +
        `Name: ${encodeURIComponent(name)}%0A` +
        `Email: ${encodeURIComponent(email)}%0A` +
        `Phone: ${encodeURIComponent(phone)}%0A` +
        `Service: ${encodeURIComponent(service)}%0A` +
        `Message: ${encodeURIComponent(message)}%0A%0A` +
        `Please contact me.`;
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/971555746898?text=${whatsappMessage}`, '_blank');
    
    // Show success message
    alert('Thank you for your message! You will be redirected to WhatsApp to complete your inquiry.');
    
    // Reset form
    event.target.reset();
}
// ==== Hero Section text ====//
 class TypewriterEffect {
            constructor(elementId, words, options = {}) {
                this.element = document.getElementById(elementId);
                this.words = words;
                this.currentWordIndex = 0;
                this.currentText = '';
                this.isDeleting = false;
                
                // Configuration options
                this.typeSpeed = options.typeSpeed || 100;
                this.deleteSpeed = options.deleteSpeed || 50;
                this.pauseTime = options.pauseTime || 2000;
                this.deleteDelay = options.deleteDelay || 1000;
                
                // Start the effect
                this.type();
            }
            
            type() {
                const currentWord = this.words[this.currentWordIndex];
                
                if (this.isDeleting) {
                    // Remove characters
                    this.currentText = currentWord.substring(0, this.currentText.length - 1);
                } else {
                    // Add characters
                    this.currentText = currentWord.substring(0, this.currentText.length + 1);
                }
                
                // Update the text content
                this.element.textContent = this.currentText;
                
                let nextDelay = this.typeSpeed;
                
                if (this.isDeleting) {
                    nextDelay = this.deleteSpeed;
                }
                
                // Check if word is complete
                if (!this.isDeleting && this.currentText === currentWord) {
                    // Word is complete, start deleting after pause
                    nextDelay = this.pauseTime;
                    this.isDeleting = true;
                } else if (this.isDeleting && this.currentText === '') {
                    // Word is fully deleted, move to next word
                    this.isDeleting = false;
                    this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
                    nextDelay = this.deleteDelay;
                }
                
                // Continue the animation
                setTimeout(() => this.type(), nextDelay);
            }
        }
        
        // Initialize the typewriter effect when page loads
        document.addEventListener('DOMContentLoaded', function() {
            const services = [
                'Document Clearing',
                'Visa Processing', 
                'Business Consulting',
                'License Renewal',
                'Legal Documentation',
                'Travel Management',
            ];
            
            // Create typewriter effect
            new TypewriterEffect('typewriter-text', services, {
                typeSpeed: 80,     // Speed of typing (ms per character)
                deleteSpeed: 40,   // Speed of deleting (ms per character)
                pauseTime: 2500,   // Pause after word is complete (ms)
                deleteDelay: 500   // Delay before starting to delete (ms)
            });
        });
                // ===== PACKAGES SECTION JAVASCRIPT ===== 

document.addEventListener('DOMContentLoaded', function() {
    initializePackages();
});

// ===== INITIALIZE PACKAGES ===== 
function initializePackages() {
    // Add scroll animations
    observePackageCards();
    
    // Add interactive hover effects
    addHoverEffects();
    
    // Initialize counter animations
    animateCounters();
}

// ===== CSS ANIMATIONS FOR JAVASCRIPT ===== 
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .touch-active {
        transform: scale(0.98);
        transition: transform 0.1s ease;
    }
    
    .package-card.recommended {
        animation: recommendedPulse 1s ease-in-out 3;
    }
    
    @keyframes recommendedPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .recommendation-badge {
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(45deg, #FFD700, #FFA500);
        color: #112A46;
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        box-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
        z-index: 10;
    }
    
    .package-card.selected {
        transform: scale(1.1) !important;
        box-shadow: 0 25px 50px rgba(89, 230, 255, 0.3) !important;
        z-index: 10;
        position: relative;
    }
    
    .packages-grid.comparison-mode .package-card {
        transform: none !important;
        box-shadow: 0 5px 15px rgba(17, 42, 70, 0.1);
    }
    
    .packages-grid.comparison-mode .package-card:hover {
        transform: none !important;
    }
`;

document.head.appendChild(style);

// ===== RESPONSIVE MOUSE/TOUCH RING EFFECT =====
        (function() {
            // Create the ring element
            const ring = document.createElement('div');
            ring.style.position = 'fixed';
            ring.style.pointerEvents = 'none';
            ring.style.width = '20px';
            ring.style.height = '20px';
            ring.style.border = '2px solid #00bcd4';
            ring.style.borderRadius = '50%';
            ring.style.zIndex = '9999';
            ring.style.transform = 'translate(-50%, -50%)';
            ring.style.background = 'rgba(255, 255, 255, 0)';
            ring.style.transition = 'width 0.2s ease, height 0.2s ease, border-width 0.2s ease';
            
            // Create center point
            const centerPoint = document.createElement('div');
            centerPoint.style.position = 'fixed';
            centerPoint.style.pointerEvents = 'none';
            centerPoint.style.width = '6px';
            centerPoint.style.height = '6px';
            centerPoint.style.backgroundColor = '#00bcd4';
            centerPoint.style.borderRadius = '50%';
            centerPoint.style.zIndex = '9999';
            centerPoint.style.transform = 'translate(-50%, -50%)';
            centerPoint.style.boxShadow = '0 0 10px rgba(0, 188, 212, 0.6)';
            
            document.body.appendChild(ring);
            document.body.appendChild(centerPoint);

            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;
            let centerX = mouseX;
            let centerY = mouseY;
            let velocityX = 0;
            let velocityY = 0;
            let isMoving = false;
            let lastMouseX = mouseX;
            let lastMouseY = mouseY;
            let isTouching = false;
            
            function animate() {
                if (isMoving || isTouching) {
                    // Add inertia to movement
                    velocityX = (mouseX - centerX) * 0.08;
                    velocityY = (mouseY - centerY) * 0.08;
                } else {
                    // When mouse/touch stops, move towards last position
                    velocityX = (lastMouseX - centerX) * 0.08;
                    velocityY = (lastMouseY - centerY) * 0.08;
                }

                // Apply velocity with damping
                centerX += velocityX;
                centerY += velocityY;
                
                // Update positions
                ring.style.left = mouseX + 'px';
                ring.style.top = mouseY + 'px';
                centerPoint.style.left = centerX + 'px';
                centerPoint.style.top = centerY + 'px';
                
                requestAnimationFrame(animate);
            }

            let moveTimeout;
            
            // Function to update cursor position
            function updateCursor(clientX, clientY) {
                mouseX = clientX;
                mouseY = clientY;
                
                // Clear existing timeout
                clearTimeout(moveTimeout);
                
                // Set new timeout
                moveTimeout = setTimeout(() => {
                    isMoving = false;
                    isTouching = false;
                    lastMouseX = mouseX;
                    lastMouseY = mouseY;
                    
                    // Reset ring size after movement stops
                    ring.style.width = '20px';
                    ring.style.height = '20px';
                    ring.style.borderWidth = '2px';
                }, 100);
            }
            
            // Mouse events for desktop
            document.addEventListener('mousemove', function(e) {
                isMoving = true;
                updateCursor(e.clientX, e.clientY);
            });
            
            // Touch events for mobile
            document.addEventListener('touchstart', function(e) {
                e.preventDefault();
                isTouching = true;
                isMoving = true;
                const touch = e.touches[0];
                updateCursor(touch.clientX, touch.clientY);
                
                // Make ring slightly larger on touch start
                ring.style.width = '25px';
                ring.style.height = '25px';
                ring.style.borderWidth = '3px';
            }, { passive: false });
            
            document.addEventListener('touchmove', function(e) {
                e.preventDefault();
                isTouching = true;
                isMoving = true;
                const touch = e.touches[0];
                updateCursor(touch.clientX, touch.clientY);
            }, { passive: false });
            
            document.addEventListener('touchend', function(e) {
                e.preventDefault();
                isTouching = false;
                isMoving = false;
                
                // Reset ring size
                ring.style.width = '20px';
                ring.style.height = '20px';
                ring.style.borderWidth = '2px';
                
                // Set final position
                setTimeout(() => {
                    lastMouseX = mouseX;
                    lastMouseY = mouseY;
                }, 50);
            }, { passive: false });

            // Handle window resize
            window.addEventListener('resize', function() {
                if (!isMoving && !isTouching) {
                    mouseX = window.innerWidth / 2;
                    mouseY = window.innerHeight / 2;
                    centerX = mouseX;
                    centerY = mouseY;
                }
            });

            // Start animation loop
            animate();
            
            // Hide default cursor on desktop
            if (!('ontouchstart' in window)) {
                document.body.style.cursor = 'none';
            }
        })();

class OffersCarousel {
    constructor() {
        this.currentIndex = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.totalSlides = this.slides.length;
        this.leftArrow = document.querySelector('.nav-arrow.left');
        this.rightArrow = document.querySelector('.nav-arrow.right');
        this.progressDots = document.querySelectorAll('.progress-dot');
        this.autoTimer = null;
        this.isAnimating = false;
        this.isForward = true;

        this.init();
    }

    init() {
        // Set initial positions - first slide active, others to the right
        this.slides.forEach((slide, index) => {
            slide.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            if (index === 0) {
                slide.classList.add('active');
                slide.style.transform = 'translateX(0%)';
            } else {
                slide.style.transform = 'translateX(100%)';
            }
        });

        // Add event listeners
        this.leftArrow.addEventListener('click', () => this.previousSlide());
        this.rightArrow.addEventListener('click', () => this.nextSlide());
        
        // Add click listeners to progress dots
        this.progressDots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.slideToIndex(index, this.getDirectionToIndex(index)));
        });

        // Update progress dots
        this.updateProgressDots();

        // Start auto-advance
        this.startAutoAdvance();

        // Pause auto-advance on hover
        const carousel = document.querySelector('.offers-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.pauseAutoAdvance());
            carousel.addEventListener('mouseleave', () => this.startAutoAdvance());
        }
    }

    getDirectionToIndex(targetIndex) {
        // For auto-advance and next button, always go forward
        if (this.isForward || targetIndex === (this.currentIndex + 1) % this.totalSlides) {
            return 1;
        }
        // For previous button
        if (targetIndex === (this.currentIndex - 1 + this.totalSlides) % this.totalSlides) {
            return -1;
        }
        // For dot clicks, choose shortest path
        const forwardDistance = targetIndex > this.currentIndex ? 
            targetIndex - this.currentIndex : 
            (this.totalSlides - this.currentIndex) + targetIndex;
        const backwardDistance = targetIndex < this.currentIndex ? 
            this.currentIndex - targetIndex : 
            this.currentIndex + (this.totalSlides - targetIndex);
        
        return forwardDistance <= backwardDistance ? 1 : -1;
    }

    nextSlide() {
        if (this.isAnimating) return;
        this.isForward = true;
        const nextIndex = (this.currentIndex + 1) % this.totalSlides;
        this.slideToIndex(nextIndex, 1);
    }

    previousSlide() {
        if (this.isAnimating) return;
        this.isForward = false;
        const prevIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.slideToIndex(prevIndex, -1);
    }

    slideToIndex(newIndex, direction) {
        if (this.isAnimating || newIndex === this.currentIndex) return;

        this.isAnimating = true;
        
        const currentSlide = this.slides[this.currentIndex];
        const nextSlide = this.slides[newIndex];

        // Temporarily disable transitions for instant positioning
        nextSlide.style.transition = 'none';
        
        // Position next slide based on direction
        if (direction === 1) {
            // Moving forward - next slide starts from right
            nextSlide.style.transform = 'translateX(100%)';
        } else {
            // Moving backward - next slide starts from left
            nextSlide.style.transform = 'translateX(-100%)';
        }

        // Force reflow and re-enable transition
        nextSlide.offsetHeight;
        nextSlide.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

        // Start animation with small delay to ensure positioning is complete
        requestAnimationFrame(() => {
            // Move current slide out
            if (direction === 1) {
                currentSlide.style.transform = 'translateX(-100%)';
            } else {
                currentSlide.style.transform = 'translateX(100%)';
            }
            
            // Move next slide in
            nextSlide.style.transform = 'translateX(0%)';
            
            // Update active class immediately for next slide
            nextSlide.classList.add('active');
        });
        // Clean up after animation completes
        setTimeout(() => {
            // Reset all slides except the current one
            this.slides.forEach((slide, index) => {
                if (index !== newIndex) {
                    slide.style.transition = 'none';
                    slide.style.transform = 'translateX(100%)';
                    slide.classList.remove('active');
                    // Re-enable transition after repositioning
                    slide.offsetHeight;
                    slide.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                }
            });

            this.currentIndex = newIndex;
            this.updateProgressDots();
            this.isAnimating = false;
        }, 850);

        // Restart auto-advance
        this.restartAutoAdvance();
    }

    updateProgressDots() {
        this.progressDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoAdvance() {
        this.pauseAutoAdvance();
        this.isForward = true;
        this.autoTimer = setInterval(() => {
            if (!this.isAnimating) {
                this.nextSlide();
            }
        }, 5000);
    }

    pauseAutoAdvance() {
        if (this.autoTimer) {
            clearInterval(this.autoTimer);
            this.autoTimer = null;
        }
    }

    restartAutoAdvance() {
        this.startAutoAdvance();
    }

    // Method to destroy carousel (cleanup)
    destroy() {
        this.pauseAutoAdvance();
        // Remove event listeners if needed
        this.leftArrow.removeEventListener('click', () => this.previousSlide());
        this.rightArrow.removeEventListener('click', () => this.nextSlide());
    }
}

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', () => {
    new OffersCarousel();
});
// Enhanced version with error handling and fallbacks
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    // Check if target element exists
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Align to top of viewport
        inline: 'nearest'
      });
    } else {
      console.warn(`Target element ${targetId} not found`);
    }
  });
});
function scrollToServices() {
            document.getElementById('services').scrollIntoView({
                behavior: 'smooth'
            });
        }

