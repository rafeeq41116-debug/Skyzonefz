// ===== ENHANCED MOBILE MENU JAVASCRIPT =====
document.addEventListener('DOMContentLoaded', function() {
    
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
        const navbar = document.querySelector('.navbar1');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(174, 231, 241, 0.9)';
                navbar.style.boxShadow = '0 5px 20px rgba(89, 230, 255, 0.3)';
            } else {
                navbar.style.background = 'rgba(174, 231, 241, 0.452)';
                navbar.style.boxShadow = 'none';
            }
        }
    });

    // ===== MOBILE MENU TOGGLE =====
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar1');
    let isMenuOpen = false;

    const toggleMobileMenu = () => {
        isMenuOpen = !isMenuOpen;
        
        // Toggle menu icon
        if (mobileMenu) {
            mobileMenu.innerHTML = isMenuOpen ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars"></i>';
        }
        
        // Toggle menu visibility with enhanced styling
        if (navLinks) {
            if (isMenuOpen) {
                navLinks.classList.add('active');
                // Add mobile-specific styling
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = 'rgba(174, 231, 241, 0.95)';
                navLinks.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                navLinks.style.paddingLeft = '1rem';
                navLinks.style.zIndex = '1000';
            } else {
                navLinks.classList.remove('active');
                // Reset all mobile styles
                navLinks.style.display = '';
                navLinks.style.flexDirection = '';
                navLinks.style.position = '';
                navLinks.style.top = '';
                navLinks.style.left = '';
                navLinks.style.right = '';
                navLinks.style.backgroundColor = '';
                navLinks.style.boxShadow = '';
                navLinks.style.padding = '';
                navLinks.style.zIndex = '';
            }
        }
        
        // Prevent background scrolling when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    };

    // Add click event to mobile menu button
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            toggleMobileMenu();
        });
    }

    // Close mobile menu when clicking on nav links
    if (navLinks) {
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && isMenuOpen) {
                toggleMobileMenu();
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && navbar && !navbar.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // Close mobile menu on window resize (desktop view)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isMenuOpen) {
            toggleMobileMenu();
        }
    });

});
        // ===== SCROLL ANIMATIONS =====
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

        // Observe all service sections
        document.querySelectorAll('.service-section').forEach(section => {
            observer.observe(section);
        });

        // ===== ENHANCED USER INTERACTIONS =====
        
        // Service card hover effects
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Contact button interactions
        document.querySelectorAll('.contact-btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Service button click tracking
        document.querySelectorAll('.service-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });

        // Add loading states for better UX
        document.addEventListener('DOMContentLoaded', function() {
            // Fade in content gradually
            const sections = document.querySelectorAll('.service-section');
            sections.forEach((section, index) => {
                setTimeout(() => {
                    section.style.opacity = '1';
                }, index * 100);
            });
        });

        // Enhanced scroll behavior for better performance
        let ticking = false;
        
        function updateScrollEffects() {
            // Navbar scroll effect with throttling
            const navbar = document.querySelector('.navbar1');
            if (navbar && window.scrollY > 50) {
                navbar.style.background = 'rgba(174, 231, 241, 0.9)';
                navbar.style.boxShadow = '0 5px 20px rgba(89, 230, 255, 0.3)';
            }
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
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

