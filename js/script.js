// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Navigation mobile toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');

                // Special animation for skill bars
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-card, .skill-item, .project-card, .skills');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Skill bars animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');

        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            setTimeout(() => {
                bar.style.setProperty('--skill-width', level + '%');
                bar.classList.add('animate');
            }, 200);
        });
    }

    // Contact form handling with Formspree
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Simple validation
            if (!name || !email || !message) {
                showNotification('Veuillez remplir tous les champs.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Veuillez entrer une adresse email valide.', 'error');
                return;
            }

            // Show loading state
            showLoadingState();

            // Submit to Formspree
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                hideLoadingState();
                if (response.ok) {
                    showNotification('Message envoyé avec succès ! Je vous répondrai bientôt.', 'success');
                    contactForm.reset();
                } else {
                    // Handle different types of errors
                    if (response.status === 422) {
                        showNotification('Erreur de validation des données. Vérifiez vos informations.', 'error');
                    } else if (response.status === 429) {
                        showNotification('Trop de tentatives. Veuillez attendre avant de renvoyer.', 'error');
                    } else {
                        showNotification('Erreur lors de l\'envoi. Vous pouvez me contacter directement par email.', 'error');
                    }
                    console.error('Form submission error:', response.status, response.statusText);
                }
            }).catch(error => {
                hideLoadingState();
                console.error('Network error:', error);

                // Fallback: provide alternative contact methods
                showNotification('Problème de connexion. Vous pouvez me contacter directement à jimmyramsamynaick@gmail.com', 'error');
            });
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show loading state on form submission
    function showLoadingState() {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    }

    // Hide loading state
    function hideLoadingState() {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Envoyer le message';
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10000;
                    max-width: 400px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                }
                
                .notification.show {
                    transform: translateX(0);
                }
                
                .notification-success {
                    background: #10b981;
                    color: white;
                }
                
                .notification-error {
                    background: #ef4444;
                    color: white;
                }
                
                .notification-info {
                    background: #3b82f6;
                    color: white;
                }
                
                .notification-content {
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    margin-left: auto;
                    padding: 0.25rem;
                    border-radius: 4px;
                    transition: background 0.2s ease;
                }
                
                .notification-close:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `;
            document.head.appendChild(styles);
        }

        // Add to document
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto remove after 5 seconds
        const autoRemove = setTimeout(() => {
            removeNotification(notification);
        }, 5000);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemove);
            removeNotification(notification);
        });
    }

    // Get notification icon based on type
    function getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // Remove notification
    function removeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Typing effect for hero subtitle
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Initialize typing effect
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 50);
        }, 1000);
    }

    // Parallax effect for hero section (disabled to fix overlapping)
    /*
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const speed = 0.5;
            hero.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });
    */

    // Dynamic project cards hover effect
    const projectCards = document.querySelectorAll('.project-card:not(.coming-soon)');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;

            // Add ripple animation if not exists
            if (!document.querySelector('#ripple-styles')) {
                const rippleStyles = document.createElement('style');
                rippleStyles.id = 'ripple-styles';
                rippleStyles.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                    .btn {
                        position: relative;
                        overflow: hidden;
                    }
                `;
                document.head.appendChild(rippleStyles);
            }

            this.appendChild(ripple);

            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });

    // Lazy loading for images (if any images are added later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Easter egg - Konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);

        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }

        if (konamiCode.length === konamiSequence.length) {
            let match = true;
            for (let i = 0; i < konamiSequence.length; i++) {
                if (konamiCode[i] !== konamiSequence[i]) {
                    match = false;
                    break;
                }
            }

            if (match) {
                showNotification('🎉 Code Konami activé ! Vous êtes un vrai gamer !', 'success');
                // Add some fun effect
                document.body.style.animation = 'rainbow 2s infinite';

                // Add rainbow animation
                if (!document.querySelector('#rainbow-styles')) {
                    const rainbowStyles = document.createElement('style');
                    rainbowStyles.id = 'rainbow-styles';
                    rainbowStyles.textContent = `
                        @keyframes rainbow {
                            0% { filter: hue-rotate(0deg); }
                            100% { filter: hue-rotate(360deg); }
                        }
                    `;
                    document.head.appendChild(rainbowStyles);
                }

                setTimeout(() => {
                    document.body.style.animation = '';
                }, 2000);

                konamiCode = [];
            }
        }
    });

    // Performance optimization - debounce scroll events
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

    // Apply debounce to scroll events
    const debouncedScroll = debounce(() => {
        // Any heavy scroll operations can go here
        console.log('Scroll optimized');
    }, 10);

    window.addEventListener('scroll', debouncedScroll);

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');

        // Add loaded styles if not exists
        if (!document.querySelector('#loading-styles')) {
            const loadingStyles = document.createElement('style');
            loadingStyles.id = 'loading-styles';
            loadingStyles.textContent = `
                body:not(.loaded) {
                    overflow: hidden;
                }
                
                body:not(.loaded)::before {
                    content: '';
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                body:not(.loaded)::after {
                    content: '';
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    width: 50px;
                    height: 50px;
                    border: 3px solid rgba(255, 255, 255, 0.3);
                    border-top: 3px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    z-index: 10001;
                    transform: translate(-50%, -50%);
                }
                
                @keyframes spin {
                    0% { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `;
            document.head.appendChild(loadingStyles);
        }
    });

    // Dynamic content updates
    function updateProjectStatus() {
        const projects = [
            { id: 'yako-bot', status: 'in-progress' },
            { id: 'popeye', status: 'completed' },
            { id: 'sokoban', status: 'needs-improvement' },
            { id: 'printf', status: 'completed' },
            { id: 'bash-project', status: 'completed' }
        ];

        projects.forEach(project => {
            const element = document.querySelector(`[data-project="${project.id}"]`);
            if (element) {
                const statusBadge = element.querySelector('.status-badge');
                if (statusBadge) {
                    statusBadge.className = `status-badge ${project.status}`;
                }
            }
        });
    }

    // Theme switcher (bonus feature)
    function createThemeSwitcher() {
        const themeSwitcher = document.createElement('button');
        themeSwitcher.className = 'theme-switcher';
        themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
        themeSwitcher.setAttribute('aria-label', 'Basculer le thème');
        themeSwitcher.setAttribute('title', 'Basculer entre mode clair et sombre');

        themeSwitcher.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

            // Save theme preference
            try {
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            } catch (e) {
                console.log('LocalStorage non disponible');
            }
        });

        document.body.appendChild(themeSwitcher);

        // Load saved theme
        try {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-theme');
                themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
            }
        } catch (e) {
            console.log('LocalStorage non disponible');
        }
    }

    // Initialize theme switcher
    createThemeSwitcher();

    // Particle animation for hero background
    function createParticles() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const hero = document.querySelector('.hero');

        canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;

        hero.style.position = 'relative';
        hero.appendChild(canvas);

        let particles = [];

        function resizeCanvas() {
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        }

        function Particle() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        Particle.prototype.update = function() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        };

        Particle.prototype.draw = function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
        };

        function init() {
            particles = [];
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        }

        resizeCanvas();
        init();
        animate();

        window.addEventListener('resize', resizeCanvas);
    }

    // Initialize particles
    createParticles();

    // Console message for developers
    console.log(`
    ╔══════════════════════════════════════════╗
    ║           Jimmy Ramsamynaick             ║
    ║    Développeur & Technicien Système     ║
    ║                                          ║
    ║  👋 Salut ! Curieux de voir le code ?   ║
    ║  🚀 GitHub: JimmyRamsamynaick           ║
    ║  💼 Expernet Campus - TSRS              ║
    ║                                          ║
    ║  Passionné par le développement et       ║
    ║  l'administration système !              ║
    ╚══════════════════════════════════════════╝
    `);

    // Performance monitoring
    function logPerformance() {
        if ('performance' in window && 'navigation' in performance) {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`⚡ Page loaded in ${loadTime}ms`);
        }
    }

    // Initialize all components
    setTimeout(() => {
        updateProjectStatus();
        logPerformance();
        console.log('🎉 Portfolio Jimmy Ramsamynaick initialisé avec succès !');
    }, 100);

    // Error handling
    window.addEventListener('error', function(e) {
        console.error('Erreur JavaScript:', e.error);
        showNotification('Une erreur s\'est produite. Veuillez actualiser la page.', 'error');
    });

    // Service Worker registration (for future PWA features)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // navigator.serviceWorker.register('/sw.js')
            //   .then(function(registration) {
            //     console.log('SW registered: ', registration);
            //   })
            //   .catch(function(registrationError) {
            //     console.log('SW registration failed: ', registrationError);
            //   });
        });
    }
});