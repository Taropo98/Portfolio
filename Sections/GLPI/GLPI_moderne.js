// GLPI Moderne - JavaScript
class GLPIProjetManager {
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
        this.setupGLPISystemAnimation();
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
            const text = target.toString();
            const isPercent = text.includes('%');
            const numericTarget = parseInt(text.replace(/[%+]/g, ''));
            
            if (isNaN(numericTarget)) {
                element.textContent = text;
                return;
            }
            
            let current = 0;
            const increment = numericTarget / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericTarget) {
                    current = numericTarget;
                    clearInterval(timer);
                }
                let displayValue = Math.floor(current);
                if (text.includes('+')) displayValue += '+';
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
        
        // Animation spéciale pour les étapes de déploiement
        const deploymentSteps = document.querySelectorAll('.deployment-step');
        deploymentSteps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                step.style.transition = 'all 0.6s ease';
                step.style.opacity = '1';
                step.style.transform = 'translateX(0)';
            }, index * 200);
        });
        
        // Animation pour les cartes de fonctionnalités
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
        
        // Animation pour les sites
        const siteCards = document.querySelectorAll('.site-card');
        siteCards.forEach((site, index) => {
            site.style.opacity = '0';
            site.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                site.style.transition = 'all 0.6s ease';
                site.style.opacity = '1';
                site.style.transform = 'scale(1)';
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
    
    setupGLPISystemAnimation() {
        // Animation spéciale pour le système GLPI
        const glpiSystem = document.querySelector('.glpi-system');
        if (glpiSystem) {
            // Animation d'entrée retardée
            setTimeout(() => {
                glpiSystem.style.transform = 'scale(0.9) rotateY(15deg)';
                glpiSystem.style.transition = 'all 1s ease';
                
                setTimeout(() => {
                    glpiSystem.style.transform = 'scale(1) rotateY(0deg)';
                }, 300);
            }, 800);
            
            // Animation de pulsation légère pour l'icône GLPI
            setInterval(() => {
                const glpiIcon = glpiSystem.querySelector('.system-screen i');
                if (glpiIcon) {
                    glpiIcon.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        glpiIcon.style.transform = 'scale(1)';
                    }, 500);
                }
            }, 4000);
        }
        
        // Animation des éléments flottants
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            // Animation d'apparition séquentielle
            element.style.opacity = '0';
            element.style.transform = 'scale(0.5)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            }, 1000 + (index * 200));
            
            // Animation de rotation continue
            setInterval(() => {
                const currentRotation = parseInt(element.style.transform.match(/rotate\((\d+)deg\)/) || [0, 0])[1];
                element.style.transform = `rotate(${currentRotation + 360}deg)`;
            }, 12000 + (index * 1000));
        });
    }
    
    setupInteractions() {
        // Animation des étapes de déploiement au hover
        const deploymentSteps = document.querySelectorAll('.deployment-step');
        
        deploymentSteps.forEach(step => {
            step.addEventListener('mouseenter', () => {
                const icon = step.querySelector('.step-title i');
                const number = step.querySelector('.step-number');
                
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                    icon.style.transition = 'all 0.3s ease';
                }
                
                if (number) {
                    number.style.transform = 'scale(1.1)';
                    number.style.transition = 'all 0.3s ease';
                }
            });
            
            step.addEventListener('mouseleave', () => {
                const icon = step.querySelector('.step-title i');
                const number = step.querySelector('.step-number');
                
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
                
                if (number) {
                    number.style.transform = 'scale(1)';
                }
            });
        });
        
        // Animation des cartes de fonctionnalités
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                    icon.style.transition = 'all 0.3s ease';
                }
                
                // Animation des éléments de liste
                const listItems = card.querySelectorAll('.feature-list li');
                listItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transform = 'translateX(5px)';
                        item.style.transition = 'all 0.2s ease';
                    }, index * 50);
                });
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
                
                // Reset des éléments de liste
                const listItems = card.querySelectorAll('.feature-list li');
                listItems.forEach(item => {
                    item.style.transform = 'translateX(0)';
                });
            });
        });
        
        // Animation des cartes de sites
        const siteCards = document.querySelectorAll('.site-card');
        
        siteCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.site-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(-5deg)';
                    icon.style.transition = 'all 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.site-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
        
        // Animation des badges tech
        const techBadges = document.querySelectorAll('.tech-badge');
        
        techBadges.forEach((badge, index) => {
            badge.style.opacity = '0';
            badge.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                badge.style.transition = 'all 0.4s ease';
                badge.style.opacity = '1';
                badge.style.transform = 'scale(1)';
            }, index * 80);
            
            badge.addEventListener('mouseenter', () => {
                badge.style.transform = 'scale(1.05) rotate(2deg)';
            });
            
            badge.addEventListener('mouseleave', () => {
                badge.style.transform = 'scale(1) rotate(0deg)';
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
            
            // Animation de l'icône au hover
            item.addEventListener('mouseenter', () => {
                const icon = item.querySelector('.result-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                    icon.style.transition = 'all 0.3s ease';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const icon = item.querySelector('.result-icon');
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
    
    // Gestion des tooltips pour les badges tech
    setupTooltips() {
        const techBadges = document.querySelectorAll('.tech-badge');
        
        const tooltipTexts = {
            'GLPI': 'Gestionnaire Libre de Parc Informatique - Solution ITSM open source',
            'ITSM': 'Information Technology Service Management',
            'Apache': 'Serveur web HTTP open source',
            'MySQL': 'Système de gestion de base de données relationnelle',
            'PHP': 'Langage de programmation web côté serveur',
            'Linux': 'Système d\'exploitation open source',
            'Ubuntu Server': 'Distribution Linux pour serveurs',
            'Inventaire Automatisé': 'Collecte automatique des informations matérielles et logicielles',
            'Gestion des Tickets': 'Système de suivi des demandes et incidents',
            'Base de Connaissances': 'Centralisation des procédures et solutions',
            'Rapports Avancés': 'Génération de rapports détaillés sur le parc informatique',
            'Multi-entités': 'Gestion de plusieurs organisations dans une même instance'
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
                        max-width: 300px;
                        white-space: normal;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
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
    
    // Animation spéciale pour les sites gérés
    setupSitesAnimation() {
        const sitesGrid = document.querySelector('.sites-grid');
        if (sitesGrid) {
            // Animation d'entrée en cascade
            const siteCards = sitesGrid.querySelectorAll('.site-card');
            siteCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.9)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.6s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, 500 + (index * 100));
                
                // Animation de l'icône au hover
                card.addEventListener('mouseenter', () => {
                    const icon = card.querySelector('.site-icon i');
                    if (icon) {
                        icon.style.animation = 'pulse 0.6s ease-in-out';
                    }
                });
                
                card.addEventListener('mouseleave', () => {
                    const icon = card.querySelector('.site-icon i');
                    if (icon) {
                        icon.style.animation = 'none';
                    }
                });
            });
        }
    }
    
    // Effet de particules pour le hero
    setupParticleEffect() {
        const hero = document.querySelector('.hero');
        if (hero) {
            // Créer des particules flottantes représentant des données
            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 50%;
                    pointer-events: none;
                    animation: float ${4 + Math.random() * 4}s ease-in-out infinite;
                    animation-delay: ${Math.random() * 4}s;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                `;
                hero.appendChild(particle);
            }
        }
    }
    
    // Animation progressive des compétences
    setupSkillsAnimation() {
        const skillCategories = document.querySelectorAll('.skill-category');
        
        skillCategories.forEach((category, index) => {
            category.style.opacity = '0';
            category.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                category.style.transition = 'all 0.6s ease';
                category.style.opacity = '1';
                category.style.transform = 'translateX(0)';
            }, index * 200);
            
            // Animation des éléments de liste au hover
            category.addEventListener('mouseenter', () => {
                const listItems = category.querySelectorAll('li');
                listItems.forEach((item, itemIndex) => {
                    setTimeout(() => {
                        item.style.transform = 'translateX(5px)';
                        item.style.transition = 'all 0.2s ease';
                    }, itemIndex * 30);
                });
            });
            
            category.addEventListener('mouseleave', () => {
                const listItems = category.querySelectorAll('li');
                listItems.forEach(item => {
                    item.style.transform = 'translateX(0)';
                });
            });
        });
    }
}

// Initialiser quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    const glpiProjetManager = new GLPIProjetManager();
    
    // Initialiser les animations supplémentaires après un délai
    setTimeout(() => {
        glpiProjetManager.setupResultsAnimation();
        glpiProjetManager.setupTooltips();
        glpiProjetManager.setupSmoothScroll();
        glpiProjetManager.setupSitesAnimation();
        glpiProjetManager.setupParticleEffect();
        glpiProjetManager.setupSkillsAnimation();
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
    
    // Animation d'entrée pour les éléments du hero
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-badges');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });
    
    // Animation spéciale pour le système GLPI
    const glpiSystem = document.querySelector('.glpi-system');
    if (glpiSystem) {
        glpiSystem.style.opacity = '0';
        glpiSystem.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            glpiSystem.style.transition = 'all 1s ease';
            glpiSystem.style.opacity = '1';
            glpiSystem.style.transform = 'scale(1)';
        }, 800);
    }
});

