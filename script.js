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
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(217, 249, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(89, 230, 255, 0.2)';
        } else {
            navbar.style.background = 'rgba(217, 249, 255, 0.95)';
            navbar.style.boxShadow = 'none';
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

// ===== SERVICE DETAILS FUNCTION =====
let mainContent = '';

function openServiceDetails(serviceType) {
    let content = '';
    let title = '';
    
    switch(serviceType) {
            
        case 'typing-services':
            title = 'Typing Services';
            content = `
                <div class="service-detail-content">
                    <h2>Typing Services</h2>
                    <p>Professional typing and administrative support services.</p>
                    <ul>
                        <li>Document typing and formatting</li>
                        <li>Form filling assistance</li>
                        <li>Administrative documentation</li>
                        <li>Digital document preparation</li>
                    </ul>
                </div>
            `;
            break;
    }
    
    // Store the current page content
    mainContent = document.body.innerHTML;
    
    // Update the page with service details
    document.body.innerHTML = `
        <div class="service-details-container">
            <button onclick="goBack()" class="btn btn-primary back-button">← Back to Home</button>
            <div class="service-details-content-wrapper">
                ${content}
                <a href="https://wa.me/971555746898?text=Hi! I'am looking for ${encodeURIComponent(title)}. Please provide more information." 
                   class="btn btn-primary contact-us-button" 
                   target="_blank">
                    Contact Us for more Information
                </a>
            </div>
        </div>
    `;
    
    // Initialize scroll animations for the new content
    initializeScrollAnimations();
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
    const message = formData.get('message');
    
    // Create WhatsApp message
    const whatsappMessage = `Hello Sky Zone Solutions!%0A%0A` +
        `Name: ${encodeURIComponent(name)}%0A` +
        `Email: ${encodeURIComponent(email)}%0A` +
        `Phone: ${encodeURIComponent(phone)}%0A` +
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

// ===== PACKAGE SELECTION HANDLER ===== 
function handlePackageSelection(packageType) {
    // Package data
    const packages = {
        basic: {
            name: 'Business License with Visa',
            price: 'AED 12,000',
            features: ['Business License', '1 Investor/Partner Visa', 'Emirates ID Processing', 'Bank Account Opening', 'Government Approvals']
        },
        standard: {
            name: 'Business License with 2 Visas',
            price: 'AED 18,000',
            features: ['Business License', '2 Investor/Partner Visas', 'Emirates ID Processing', 'Bank Account Opening', 'Government Approvals', 'Free Consultation']
        },
        premium: {
            name: 'Business License + Office Space',
            price: 'AED 22,000',
            features: ['Business License', '1 Investor/Partner Visa', 'Office Space Rental', 'Emirates ID Processing', 'Bank Account Opening', 'Government Approvals']
        },
        enterprise: {
            name: 'Business License + 3 Visas + Office',
            price: 'AED 28,000',
            features: ['Business License', '3 Investor/Partner Visas', 'Office Space Rental', 'Emirates ID Processing', 'Bank Account Opening', 'Government Approvals', 'PRO Services Included', 'Priority Support']
        }
    };

    const selectedPackage = packages[packageType];
    
    // Create WhatsApp message
    const message = `Hi! I'm interested in the *${selectedPackage.name}* package (${selectedPackage.price}). Could you please provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/971555746898?text=${encodedMessage}`;
    
    // Show selection animation
    showPackageSelection(packageType);
    
    // Open WhatsApp after animation
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
    }, 800);
}

// ===== PACKAGE SELECTION ANIMATION ===== 
function showPackageSelection(packageType) {
    const selectedCard = document.querySelector(`[data-package="${packageType}"]`);
    const allCards = document.querySelectorAll('.package-card');
    
    // Add selection class
    selectedCard.classList.add('selected');
    
    // Dim other cards
    allCards.forEach(card => {
        if (card !== selectedCard) {
            card.style.opacity = '0.3';
            card.style.transform = 'scale(0.95)';
        }
    });
    
    // Show success feedback
    showSuccessMessage(selectedCard);
    
    // Reset after animation
    setTimeout(() => {
        allCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = '';
            card.classList.remove('selected');
        });
    }, 2000);
}

// ===== SUCCESS MESSAGE ===== 
function showSuccessMessage(card) {
    const button = card.querySelector('.package-btn');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-check"></i> Redirecting to WhatsApp...';
    button.style.background = '#25D366';
    button.style.color = '#ffffff';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
        button.style.color = '';
    }, 2000);
}

// ===== SCROLL ANIMATIONS ===== 
function observePackageCards() {
    const cards = document.querySelectorAll('.package-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// ===== HOVER EFFECTS ===== 
function addHoverEffects() {
    const cards = document.querySelectorAll('.package-card');
    
    cards.forEach(card => {
        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            if (e.target.closest('.package-btn')) return;
            
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(89, 230, 255, 0.3);
                transform: scale(0);
                animation: rippleEffect 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: 20px;
                height: 20px;
                margin-left: -10px;
                margin-top: -10px;
                pointer-events: none;
                z-index: 10;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Enhanced hover animations
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.package-icon i');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.package-icon i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// ===== COUNTER ANIMATIONS ===== 
function animateCounters() {
    const counters = document.querySelectorAll('.amount');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const finalValue = parseInt(element.textContent.replace(/,/g, ''));
    let startValue = 0;
    const duration = 1500;
    const increment = finalValue / (duration / 16);
    
    const timer = setInterval(() => {
        startValue += increment;
        if (startValue >= finalValue) {
            element.textContent = finalValue.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(startValue).toLocaleString();
        }
    }, 16);
}

// ===== PACKAGE COMPARISON FEATURE ===== 
function togglePackageComparison() {
    const compareBtn = document.querySelector('.compare-packages-btn');
    const grid = document.querySelector('.packages-grid');
    
    if (grid.classList.contains('comparison-mode')) {
        grid.classList.remove('comparison-mode');
        compareBtn.textContent = 'Compare Packages';
    } else {
        grid.classList.add('comparison-mode');
        compareBtn.textContent = 'Exit Comparison';
    }
}

// ===== KEYBOARD NAVIGATION ===== 
document.addEventListener('keydown', function(e) {
    const cards = document.querySelectorAll('.package-card');
    const buttons = document.querySelectorAll('.package-btn');
    
    // Allow Enter key to trigger package selection
    if (e.key === 'Enter' && document.activeElement.classList.contains('package-btn')) {
        document.activeElement.click();
    }
    
    // Arrow key navigation
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const focusedButton = document.activeElement;
        const currentIndex = Array.from(buttons).indexOf(focusedButton);
        
        if (currentIndex !== -1) {
            let nextIndex;
            if (e.key === 'ArrowRight') {
                nextIndex = (currentIndex + 1) % buttons.length;
            } else {
                nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
            }
            
            buttons[nextIndex].focus();
            e.preventDefault();
        }
    }
});

// ===== MOBILE TOUCH INTERACTIONS ===== 
function addMobileTouchEffects() {
    if ('ontouchstart' in window) {
        const cards = document.querySelectorAll('.package-card');
        
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            });
        });
    }
}

// ===== PACKAGE ANALYTICS ===== 
function trackPackageInteraction(packageType, action) {
    // Analytics tracking (integrate with your analytics service)
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: 'Package Interaction',
            event_label: packageType,
            value: 1
        });
    }
    
    console.log(`Package Analytics: ${action} - ${packageType}`);
}

// ===== DYNAMIC PRICING UPDATES ===== 
function updatePackagePricing(newPrices) {
    const packages = {
        basic: document.querySelector('[data-package="basic"] .amount'),
        standard: document.querySelector('[data-package="standard"] .amount'),
        premium: document.querySelector('[data-package="premium"] .amount'),
        enterprise: document.querySelector('[data-package="enterprise"] .amount')
    };
    
    Object.keys(newPrices).forEach(packageType => {
        if (packages[packageType]) {
            packages[packageType].textContent = newPrices[packageType];
            animateCounter(packages[packageType]);
        }
    });
}

// ===== PACKAGE RECOMMENDATIONS ===== 
function showPackageRecommendation(userRequirements) {
    const recommendations = {
        'single-entrepreneur': 'basic',
        'small-business': 'standard',
        'established-business': 'premium',
        'large-company': 'enterprise'
    };
    
    const recommendedPackage = recommendations[userRequirements];
    if (recommendedPackage) {
        highlightRecommendedPackage(recommendedPackage);
    }
}

function highlightRecommendedPackage(packageType) {
    const recommendedCard = document.querySelector(`[data-package="${packageType}"]`);
    if (recommendedCard) {
        // Add recommendation badge
        const badge = document.createElement('div');
        badge.className = 'recommendation-badge';
        badge.innerHTML = '<i class="fas fa-star"></i> Recommended for You';
        recommendedCard.appendChild(badge);
        
        // Scroll to recommended package
        recommendedCard.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        // Add highlight animation
        recommendedCard.classList.add('recommended');
        
        setTimeout(() => {
            recommendedCard.classList.remove('recommended');
        }, 3000);
    }
}

// ===== CURRENCY CONVERTER ===== 
function convertCurrency(fromCurrency, toCurrency) {
    // This would typically connect to a currency API
    const exchangeRates = {
        'AED_USD': 0.27,
        'AED_EUR': 0.25,
        'AED_GBP': 0.22
    };
    
    const amounts = document.querySelectorAll('.amount');
    const currencies = document.querySelectorAll('.currency');
    
    amounts.forEach((amount, index) => {
        const currentAmount = parseInt(amount.textContent.replace(/,/g, ''));
        const rate = exchangeRates[`${fromCurrency}_${toCurrency}`];
        
        if (rate) {
            const convertedAmount = Math.round(currentAmount * rate);
            amount.textContent = convertedAmount.toLocaleString();
            currencies[index].textContent = toCurrency;
        }
    });
}

// ===== FAQ INTEGRATION ===== 
function showPackageFAQ(packageType) {
    const faqs = {
        basic: [
            { q: "What's included in the basic package?", a: "Business license, 1 visa, Emirates ID processing, bank account opening assistance, and government approvals." },
            { q: "How long does processing take?", a: "Typically 7-10 business days for complete processing." }
        ],
        standard: [
            { q: "Can I add more visas later?", a: "Yes, additional visas can be processed separately." },
            { q: "What consultation is included?", a: "Free 1-hour business setup consultation with our experts." }
        ],
        premium: [
            { q: "What type of office space is included?", a: "Shared office space in RAKEZ with basic amenities." },
            { q: "Can I upgrade the office?", a: "Yes, private offices and larger spaces are available for additional fees." }
        ],
        enterprise: [
            { q: "What PRO services are included?", a: "Complete PRO services including document renewals and government liaison." },
            { q: "What is priority support?", a: "Dedicated account manager and 24/7 support for urgent matters." }
        ]
    };
    
    // Create and display FAQ modal (implementation would depend on your modal system)
    console.log(`FAQ for ${packageType}:`, faqs[packageType]);
}

// ===== INITIALIZATION ===== 
document.addEventListener('DOMContentLoaded', function() {
    initializePackages();
    addMobileTouchEffects();
    
    // Add event listeners for enhanced features
    document.querySelectorAll('.package-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const packageType = this.closest('.package-card').dataset.package;
            trackPackageInteraction(packageType, 'button_click');
        });
    });
});

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
        

