// Gestion Stock Moderne - JavaScript
class GestionStockManager {
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
        this.setupStockSystemAnimation();
        this.setupTooltips();
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
            const hasPlus = text.includes('+');
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
                if (hasPlus) displayValue += '+';
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
        
        // Animation pour les cartes de base de données
        const tableCards = document.querySelectorAll('.table-card');
        tableCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, index * 200);
        });
        
        // Animation pour les routes
        const routeItems = document.querySelectorAll('.route-item');
        routeItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-10px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.4s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 50);
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
    
    setupStockSystemAnimation() {
        // Animation spéciale pour le système de stock
        const stockSystem = document.querySelector('.stock-system');
        if (stockSystem) {
            // Animation d'entrée retardée
            setTimeout(() => {
                stockSystem.style.transform = 'scale(0.9) rotateY(15deg)';
                stockSystem.style.transition = 'all 1s ease';
                
                setTimeout(() => {
                    stockSystem.style.transform = 'scale(1) rotateY(0deg)';
                }, 300);
            }, 800);
            
            // Animation de pulsation légère pour l'icône stock
            setInterval(() => {
                const stockIcon = stockSystem.querySelector('.system-screen i');
                if (stockIcon) {
                    stockIcon.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        stockIcon.style.transform = 'scale(1)';
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
        
        // Animation des cartes de base de données
        const tableCards = document.querySelectorAll('.table-card');
        
        tableCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('h4 i');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                    icon.style.transition = 'all 0.3s ease';
                }
                
                // Animation des champs
                const fields = card.querySelectorAll('.field');
                fields.forEach((field, index) => {
                    setTimeout(() => {
                        field.style.transform = 'translateX(5px)';
                        field.style.transition = 'all 0.2s ease';
                    }, index * 30);
                });
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('h4 i');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
                
                // Reset des champs
                const fields = card.querySelectorAll('.field');
                fields.forEach(field => {
                    field.style.transform = 'translateX(0)';
                });
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
        
        // Animation des routes
        const routeItems = document.querySelectorAll('.route-item');
        
        routeItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const method = item.querySelector('.method');
                if (method) {
                    method.style.transform = 'scale(1.1)';
                    method.style.transition = 'all 0.2s ease';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const method = item.querySelector('.method');
                if (method) {
                    method.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    setupTooltips() {
        // Gestion des tooltips pour les badges tech
        const techBadges = document.querySelectorAll('.tech-badge');
        
        const tooltipTexts = {
            'Laravel 10': 'Framework PHP moderne avec architecture MVC et Eloquent ORM intégré',
            'PHP 8.2': 'Langage de programmation web côté serveur avec nouvelles fonctionnalités',
            'Eloquent ORM': 'Object-Relational Mapping pour Laravel avec relations avancées',
            'Blade Templates': 'Moteur de templates Laravel avec syntaxe simple et puissante',
            'Artisan CLI': 'Interface en ligne de commande Laravel pour automatisation',
            'MySQL 8.0': 'Système de gestion de base de données relationnelle performant',
            'Migrations Laravel': 'Système de versioning pour schéma de base de données',
            'Relations Eloquent': 'Gestion des relations entre modèles (hasMany, belongsTo)',
            'Contraintes FK': 'Contraintes de clés étrangères pour intégrité référentielle',
            'Bootstrap 5': 'Framework CSS responsive pour interfaces modernes',
            'JavaScript ES6': 'JavaScript moderne avec nouvelles fonctionnalités',
            'AJAX': 'Requêtes asynchrones pour interfaces dynamiques'
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
        
        // Tooltips pour les méthodes HTTP
        const methods = document.querySelectorAll('.method');
        
        const methodTooltips = {
            'GET': 'Récupération de données - Lecture seule',
            'POST': 'Création de nouvelles ressources',
            'PUT': 'Mise à jour complète de ressources existantes',
            'DELETE': 'Suppression de ressources'
        };
        
        methods.forEach(method => {
            const text = method.textContent.trim().toUpperCase();
            const tooltipText = methodTooltips[text];
            
            if (tooltipText) {
                method.addEventListener('mouseenter', (e) => {
                    const tooltip = document.createElement('div');
                    tooltip.className = 'method-tooltip';
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
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    `;
                    
                    document.body.appendChild(tooltip);
                    
                    const rect = method.getBoundingClientRect();
                    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                    
                    setTimeout(() => {
                        tooltip.style.opacity = '1';
                    }, 10);
                    
                    method.addEventListener('mouseleave', () => {
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
    
    // Effet de particules pour le hero
    setupParticleEffect() {
        const hero = document.querySelector('.hero');
        if (hero) {
            // Créer des particules flottantes représentant des données de stock
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.3);
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
    
    // Animation progressive des catégories tech
    setupTechCategoriesAnimation() {
        const techCategories = document.querySelectorAll('.tech-category');
        
        techCategories.forEach((category, index) => {
            category.style.opacity = '0';
            category.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                category.style.transition = 'all 0.6s ease';
                category.style.opacity = '1';
                category.style.transform = 'translateY(0)';
            }, index * 200);
            
            // Animation des badges au hover de la catégorie
            category.addEventListener('mouseenter', () => {
                const badges = category.querySelectorAll('.tech-badge');
                badges.forEach((badge, badgeIndex) => {
                    setTimeout(() => {
                        badge.style.transform = 'scale(1.05)';
                        badge.style.transition = 'all 0.2s ease';
                    }, badgeIndex * 50);
                });
            });
            
            category.addEventListener('mouseleave', () => {
                const badges = category.querySelectorAll('.tech-badge');
                badges.forEach(badge => {
                    badge.style.transform = 'scale(1)';
                });
            });
        });
    }
    
    // Animation spéciale pour la highlight box
    setupHighlightBoxAnimation() {
        const highlightBox = document.querySelector('.highlight-box');
        if (highlightBox) {
            highlightBox.style.opacity = '0';
            highlightBox.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                highlightBox.style.transition = 'all 0.8s ease';
                highlightBox.style.opacity = '1';
                highlightBox.style.transform = 'scale(1)';
            }, 500);
            
            // Animation de l'icône
            const icon = highlightBox.querySelector('i');
            if (icon) {
                setInterval(() => {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                    setTimeout(() => {
                        icon.style.transform = 'scale(1) rotate(0deg)';
                    }, 300);
                }, 3000);
            }
        }
    }
    
    // Animation des champs de base de données
    setupDatabaseFieldsAnimation() {
        const fields = document.querySelectorAll('.field');
        
        fields.forEach((field, index) => {
            field.style.opacity = '0';
            field.style.transform = 'translateX(-10px)';
            
            setTimeout(() => {
                field.style.transition = 'all 0.4s ease';
                field.style.opacity = '1';
                field.style.transform = 'translateX(0)';
            }, index * 50);
            
            // Animation au hover
            field.addEventListener('mouseenter', () => {
                field.style.transform = 'translateX(5px)';
                field.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            });
            
            field.addEventListener('mouseleave', () => {
                field.style.transform = 'translateX(0)';
                field.style.boxShadow = 'none';
            });
        });
    }
}

// Initialiser quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    const gestionStockManager = new GestionStockManager();
    
    // Initialiser les animations supplémentaires après un délai
    setTimeout(() => {
        gestionStockManager.setupResultsAnimation();
        gestionStockManager.setupSmoothScroll();
        gestionStockManager.setupParticleEffect();
        gestionStockManager.setupTechCategoriesAnimation();
        gestionStockManager.setupHighlightBoxAnimation();
        gestionStockManager.setupDatabaseFieldsAnimation();
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
    
    // Animation spéciale pour le système de stock
    const stockSystem = document.querySelector('.stock-system');
    if (stockSystem) {
        stockSystem.style.opacity = '0';
        stockSystem.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            stockSystem.style.transition = 'all 1s ease';
            stockSystem.style.opacity = '1';
            stockSystem.style.transform = 'scale(1)';
        }, 800);
    }
});

