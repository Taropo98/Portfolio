// SGRC Moderne - JavaScript
class SGRCManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupScrollEffects();
        this.setupBackToTop();
        this.setupMobileNav();
        this.setupAnimations();
        this.setupCounters();
        this.setupInteractions();
        this.setupWorkflowAnimation();
    }
    
    setupScrollEffects() {
        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    setupBackToTop() {
        const backToTop = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    setupMobileNav() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
        
        // Fermer le menu mobile lors du clic sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    setupCounters() {
        // Animation des compteurs dans la section résultats
        const resultNumbers = document.querySelectorAll('.result-number');
        
        const animateCounter = (element, target) => {
            let current = 0;
            const isPlus = target.toString().includes('+');
            const isPercent = target.toString().includes('%');
            const numericTarget = parseInt(target.toString().replace(/[+%]/g, ''));
            const increment = numericTarget / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericTarget) {
                    current = numericTarget;
                    clearInterval(timer);
                }
                let displayValue = Math.floor(current);
                if (isPlus) displayValue += '+';
                if (isPercent) displayValue += '%';
                element.textContent = displayValue;
            }, 50);
        };
        
        // Observer pour déclencher l'animation quand visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const number = entry.target;
                    const text = number.textContent;
                    
                    if (!number.dataset.animated) {
                        number.dataset.animated = 'true';
                        animateCounter(number, text);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        resultNumbers.forEach(number => {
            observer.observe(number);
        });
    }
    
    setupAnimations() {
        // Intersection Observer pour les animations au scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observer les cartes de contenu
        document.querySelectorAll('.content-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.animationDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
        
        // Animation spéciale pour les profils utilisateurs
        const userProfiles = document.querySelectorAll('.user-profile');
        userProfiles.forEach((profile, index) => {
            profile.style.opacity = '0';
            profile.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                profile.style.transition = 'all 0.6s ease';
                profile.style.opacity = '1';
                profile.style.transform = 'translateY(0)';
            }, index * 150);
        });
        
        // Animation pour les badges tech
        const techBadges = document.querySelectorAll('.tech-badge');
        techBadges.forEach((badge, index) => {
            badge.style.opacity = '0';
            badge.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                badge.style.transition = 'all 0.4s ease';
                badge.style.opacity = '1';
                badge.style.transform = 'scale(1)';
            }, index * 80);
        });
        
        // Parallax léger pour les éléments flottants
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-element');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    setupWorkflowAnimation() {
        // Animation séquentielle des étapes du workflow
        const workflowSteps = document.querySelectorAll('.workflow-step');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const steps = Array.from(workflowSteps);
                    const currentIndex = steps.indexOf(entry.target);
                    
                    // Animer les étapes précédentes si elles ne sont pas encore animées
                    for (let i = 0; i <= currentIndex; i++) {
                        const step = steps[i];
                        if (!step.dataset.animated) {
                            step.dataset.animated = 'true';
                            setTimeout(() => {
                                step.style.opacity = '1';
                                step.style.transform = 'translateX(0)';
                                
                                // Animation spéciale pour le numéro
                                const stepNumber = step.querySelector('.step-number');
                                if (stepNumber) {
                                    stepNumber.style.transform = 'scale(1.1)';
                                    setTimeout(() => {
                                        stepNumber.style.transform = 'scale(1)';
                                    }, 200);
                                }
                            }, i * 200);
                        }
                    }
                }
            });
        }, { threshold: 0.3 });
        
        workflowSteps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateX(-30px)';
            step.style.transition = 'all 0.6s ease';
            observer.observe(step);
        });
    }
    
    setupInteractions() {
        // Animation des features au hover
        const features = document.querySelectorAll('.feature');
        
        features.forEach(feature => {
            feature.addEventListener('mouseenter', () => {
                const icon = feature.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(5deg)';
                    icon.style.transition = 'all 0.3s ease';
                }
            });
            
            feature.addEventListener('mouseleave', () => {
                const icon = feature.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
        
        // Animation des profils utilisateurs
        const userProfiles = document.querySelectorAll('.user-profile');
        
        userProfiles.forEach(profile => {
            profile.addEventListener('mouseenter', () => {
                const icon = profile.querySelector('.profile-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(-5deg)';
                    icon.style.transition = 'all 0.3s ease';
                }
                
                // Animation des tags
                const tags = profile.querySelectorAll('.feature-tag');
                tags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.transform = 'scale(1.05)';
                    }, index * 50);
                });
            });
            
            profile.addEventListener('mouseleave', () => {
                const icon = profile.querySelector('.profile-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
                
                // Reset des tags
                const tags = profile.querySelectorAll('.feature-tag');
                tags.forEach(tag => {
                    tag.style.transform = 'scale(1)';
                });
            });
        });
        
        // Animation des améliorations
        const improvementItems = document.querySelectorAll('.improvement-item');
        
        improvementItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
            
            item.addEventListener('mouseenter', () => {
                const icon = item.querySelector('.improvement-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(10deg)';
                    icon.style.transition = 'all 0.3s ease';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const icon = item.querySelector('.improvement-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }
    
    // Smooth scroll pour les liens d'ancrage
    setupSmoothScroll() {
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
    }
    
    // Animation des résultats
    setupResultsAnimation() {
        const resultItems = document.querySelectorAll('.result-item');
        
        resultItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }
    
    // Gestion des tooltips pour les badges tech
    setupTooltips() {
        const techBadges = document.querySelectorAll('.tech-badge');
        
        const tooltipTexts = {
            'HTML5': 'Langage de balisage pour structurer le contenu web',
            'CSS3': 'Langage de style pour la présentation des pages web',
            'JavaScript': 'Langage de programmation pour l\'interactivité web',
            'Bootstrap': 'Framework CSS pour le développement responsive',
            'PHP': 'Langage de programmation côté serveur',
            'MySQL': 'Système de gestion de base de données relationnelle',
            'Apache': 'Serveur web open source',
            'XAMPP': 'Solution de serveur web local pour développement'
        };
        
        techBadges.forEach(badge => {
            const text = badge.textContent.trim();
            const tooltipText = tooltipTexts[text];
            
            if (tooltipText) {
                badge.addEventListener('mouseenter', (e) => {
                    const tooltip = document.createElement('div');
                    tooltip.className = 'tooltip';
                    tooltip.textContent = tooltipText;
                    tooltip.style.cssText = `
                        position: absolute;
                        background: #1f2937;
                        color: white;
                        padding: 0.5rem 1rem;
                        border-radius: 0.5rem;
                        font-size: 0.75rem;
                        white-space: nowrap;
                        z-index: 1000;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                        pointer-events: none;
                        max-width: 200px;
                        white-space: normal;
                    `;
                    
                    document.body.appendChild(tooltip);
                    
                    const rect = badge.getBoundingClientRect();
                    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                    
                    setTimeout(() => {
                        tooltip.style.opacity = '1';
                    }, 10);
                    
                    badge.addEventListener('mouseleave', () => {
                        tooltip.style.opacity = '0';
                        setTimeout(() => {
                            if (tooltip.parentNode) {
                                document.body.removeChild(tooltip);
                            }
                        }, 300);
                    }, { once: true });
                });
            }
        });
    }
    
    // Animation spéciale pour le système restaurant
    setupRestaurantSystemAnimation() {
        const restaurantSystem = document.querySelector('.restaurant-system');
        if (restaurantSystem) {
            // Animation d'entrée retardée
            setTimeout(() => {
                restaurantSystem.style.transform = 'scale(0.9) rotateY(15deg)';
                restaurantSystem.style.transition = 'all 1s ease';
                
                setTimeout(() => {
                    restaurantSystem.style.transform = 'scale(1) rotateY(0deg)';
                }, 300);
            }, 800);
            
            // Animation de pulsation légère
            setInterval(() => {
                const screen = restaurantSystem.querySelector('.system-screen i');
                if (screen) {
                    screen.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        screen.style.transform = 'scale(1)';
                    }, 500);
                }
            }, 3000);
        }
    }
}

// Initialiser quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    const sgrcManager = new SGRCManager();
    
    // Initialiser les animations supplémentaires après un délai
    setTimeout(() => {
        sgrcManager.setupResultsAnimation();
        sgrcManager.setupTooltips();
        sgrcManager.setupSmoothScroll();
        sgrcManager.setupRestaurantSystemAnimation();
    }, 500);
});

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    const navbar = document.querySelector('.navbar');
    if (window.innerWidth > 768) {
        document.querySelector('.nav-menu').classList.remove('active');
        document.querySelector('.nav-toggle').classList.remove('active');
    }
});

// Préchargement et optimisation des performances
window.addEventListener('load', () => {
    // Précharger les images si nécessaire
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
    
    // Optimiser les animations pour les appareils moins performants
    if (window.devicePixelRatio > 2 || navigator.hardwareConcurrency < 4) {
        document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
    }
    
    // Animation d'entrée pour les éléments flottants
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.5)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, 1000 + (index * 200));
    });
});

