// Superette Moderne - JavaScript
class SuperetteManager {
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
            const numericTarget = parseInt(target.toString().replace('+', ''));
            const increment = numericTarget / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericTarget) {
                    current = numericTarget;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current) + (isPlus ? '+' : '');
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
        
        // Animation spéciale pour les objectifs
        const objectives = document.querySelectorAll('.objective-item');
        objectives.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
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
        
        // Animation des cartes d'objectifs
        const objectiveItems = document.querySelectorAll('.objective-item');
        
        objectiveItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const icon = item.querySelector('.objective-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(-5deg)';
                    icon.style.transition = 'all 0.3s ease';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const icon = item.querySelector('.objective-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
        
        // Animation des layers d'architecture
        const layers = document.querySelectorAll('.layer');
        
        layers.forEach((layer, index) => {
            layer.style.opacity = '0';
            layer.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                layer.style.transition = 'all 0.6s ease';
                layer.style.opacity = '1';
                layer.style.transform = 'translateX(0)';
            }, index * 200);
        });
        
        // Animation des composants au hover
        const components = document.querySelectorAll('.component');
        
        components.forEach(component => {
            component.addEventListener('mouseenter', () => {
                component.style.transform = 'scale(1.05)';
                component.style.borderColor = 'var(--primary)';
                component.style.color = 'var(--primary)';
            });
            
            component.addEventListener('mouseleave', () => {
                component.style.transform = 'scale(1)';
                component.style.borderColor = 'var(--gray-300)';
                component.style.color = 'var(--gray-700)';
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
            'C#': 'Langage de programmation orienté objet développé par Microsoft',
            '.NET Framework': 'Plateforme de développement pour applications Windows',
            'WinForms': 'Interface utilisateur pour applications desktop Windows',
            'Visual Studio': 'Environnement de développement intégré (IDE)',
            'SQL Server': 'Système de gestion de base de données relationnelle',
            'ADO.NET': 'Technologie d\'accès aux données pour .NET',
            'Entity Framework': 'ORM (Object-Relational Mapping) pour .NET'
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
}

// Initialiser quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    const superetteManager = new SuperetteManager();
    
    // Initialiser les animations supplémentaires après un délai
    setTimeout(() => {
        superetteManager.setupResultsAnimation();
        superetteManager.setupTooltips();
        superetteManager.setupSmoothScroll();
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
    
    // Animation d'entrée pour le mockup de l'app
    const appMockup = document.querySelector('.app-mockup');
    if (appMockup) {
        appMockup.style.transform = 'scale(0.8) rotateY(20deg)';
        appMockup.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            appMockup.style.transform = 'scale(1) rotateY(0deg)';
        }, 500);
    }
});

