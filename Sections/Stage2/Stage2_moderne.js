// Stage2 Moderne - JavaScript (basé sur Stage1 avec adaptations)
class Stage2Manager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupScrollEffects();
        this.setupBackToTop();
        this.setupMobileNav();
        this.setupAnimations();
        this.setupCounters();
        this.setupMissionCards();
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
    
    setupMissionCards() {
        const missionCards = document.querySelectorAll('.mission-card');
        
        missionCards.forEach((card, index) => {
            // Animation d'apparition décalée
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
            
            // Effet hover amélioré
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    setupCounters() {
        // Animation des compteurs dans la section résultats
        const resultNumbers = document.querySelectorAll('.result-number');
        
        const animateCounter = (element, target) => {
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current) + (target >= 1000 ? '+' : '+');
            }, 50);
        };
        
        // Observer pour déclencher l'animation quand visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const number = entry.target;
                    const text = number.textContent;
                    const target = parseInt(text.replace('+', ''));
                    
                    if (!number.dataset.animated) {
                        number.dataset.animated = 'true';
                        animateCounter(number, target);
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
        
        // Animation spéciale pour les éléments de processus
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                step.style.transition = 'all 0.6s ease';
                step.style.opacity = '1';
                step.style.transform = 'translateX(0)';
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
            }, index * 100);
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
    
    // Animation des features au hover
    setupFeatureAnimations() {
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
    }
    
    // Animation des cartes de résultats
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
    
    // Gestion des tooltips pour les badges de statut
    setupTooltips() {
        const statusBadges = document.querySelectorAll('.mission-status');
        
        statusBadges.forEach(badge => {
            badge.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = 'Mission terminée avec succès';
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
        });
    }
}

// Initialiser quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    const stage2Manager = new Stage2Manager();
    
    // Initialiser les animations supplémentaires après un délai
    setTimeout(() => {
        stage2Manager.setupFeatureAnimations();
        stage2Manager.setupResultsAnimation();
        stage2Manager.setupTooltips();
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
});

