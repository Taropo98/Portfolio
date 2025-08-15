// AI Projet Moderne - JavaScript
class AIProjetManager {
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
        this.setupAISystemAnimation();
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
            
            // Gérer les cas spéciaux (BERT, pourcentages)
            if (text === 'BERT') {
                element.textContent = 'BERT';
                return;
            }
            
            const isPercent = text.includes('%');
            const numericTarget = parseInt(text.replace(/[%]/g, ''));
            
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
        
        // Animation spéciale pour les chansons
        const songItems = document.querySelectorAll('.song-item');
        songItems.forEach((song, index) => {
            song.style.opacity = '0';
            song.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                song.style.transition = 'all 0.6s ease';
                song.style.opacity = '1';
                song.style.transform = 'translateY(0)';
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
    
    setupAISystemAnimation() {
        // Animation spéciale pour le système IA
        const aiSystem = document.querySelector('.ai-system');
        if (aiSystem) {
            // Animation d'entrée retardée
            setTimeout(() => {
                aiSystem.style.transform = 'scale(0.9) rotateY(15deg)';
                aiSystem.style.transition = 'all 1s ease';
                
                setTimeout(() => {
                    aiSystem.style.transform = 'scale(1) rotateY(0deg)';
                }, 300);
            }, 800);
            
            // Animation de pulsation légère pour l'icône BERT
            setInterval(() => {
                const bertIcon = aiSystem.querySelector('.system-screen i');
                if (bertIcon) {
                    bertIcon.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        bertIcon.style.transform = 'scale(1)';
                    }, 500);
                }
            }, 3000);
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
            }, 10000 + (index * 1000));
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
        
        // Animation des sections de code
        const codeSections = document.querySelectorAll('.code-section');
        
        codeSections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                section.style.transition = 'all 0.6s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateX(0)';
            }, index * 200);
            
            section.addEventListener('mouseenter', () => {
                const icon = section.querySelector('.code-section h4 i');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(-5deg)';
                    icon.style.transition = 'all 0.3s ease';
                }
                
                // Animation des badges de fonctionnalités
                const features = section.querySelectorAll('.code-feature');
                features.forEach((feature, index) => {
                    setTimeout(() => {
                        feature.style.transform = 'scale(1.05)';
                    }, index * 50);
                });
            });
            
            section.addEventListener('mouseleave', () => {
                const icon = section.querySelector('.code-section h4 i');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
                
                // Reset des badges
                const features = section.querySelectorAll('.code-feature');
                features.forEach(feature => {
                    feature.style.transform = 'scale(1)';
                });
            });
        });
        
        // Animation des éléments d'architecture
        const architectureLayers = document.querySelectorAll('.architecture-layer');
        
        architectureLayers.forEach((layer, index) => {
            layer.style.opacity = '0';
            layer.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                layer.style.transition = 'all 0.6s ease';
                layer.style.opacity = '1';
                layer.style.transform = 'translateX(0)';
            }, index * 150);
            
            layer.addEventListener('mouseenter', () => {
                const icon = layer.querySelector('.layer-title i');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                    icon.style.transition = 'all 0.3s ease';
                }
            });
            
            layer.addEventListener('mouseleave', () => {
                const icon = layer.querySelector('.layer-title i');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
        
        // Animation des statistiques de collection
        const statItems = document.querySelectorAll('.stat-item');
        
        statItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
            
            item.addEventListener('mouseenter', () => {
                const icon = item.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                    icon.style.transition = 'all 0.3s ease';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const icon = item.querySelector('i');
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
    
    // Gestion des tooltips pour les badges tech
    setupTooltips() {
        const techBadges = document.querySelectorAll('.tech-badge');
        
        const tooltipTexts = {
            'BERT Multilingue': 'Modèle de langage pré-entraîné pour la compréhension contextuelle',
            'Transformers': 'Bibliothèque Python pour les modèles de traitement du langage naturel',
            'PyTorch': 'Framework de deep learning pour Python',
            'Similarité Cosinus': 'Mesure de similarité entre vecteurs dans l\'espace multidimensionnel',
            'Python': 'Langage de programmation pour l\'intelligence artificielle',
            'MySQL': 'Système de gestion de base de données relationnelle',
            'mysql-connector': 'Connecteur Python pour MySQL',
            'NumPy': 'Bibliothèque Python pour le calcul scientifique',
            'Wav2Vec2': 'Modèle de reconnaissance vocale par Facebook AI',
            'Librosa': 'Bibliothèque Python pour l\'analyse audio',
            'Speech Recognition': 'Reconnaissance vocale automatique',
            'pyttsx3': 'Synthèse vocale text-to-speech pour Python'
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
                        max-width: 250px;
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
    
    // Animation spéciale pour la collection musicale
    setupMusicCollectionAnimation() {
        const musicCollection = document.querySelector('.music-collection');
        if (musicCollection) {
            // Animation d'entrée pour le titre
            const title = musicCollection.querySelector('p');
            if (title) {
                title.style.opacity = '0';
                title.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    title.style.transition = 'all 0.6s ease';
                    title.style.opacity = '1';
                    title.style.transform = 'translateY(0)';
                }, 500);
            }
            
            // Animation en vague pour les chansons
            const songs = musicCollection.querySelectorAll('.song-item');
            songs.forEach((song, index) => {
                song.style.opacity = '0';
                song.style.transform = 'translateX(-30px)';
                
                setTimeout(() => {
                    song.style.transition = 'all 0.6s ease';
                    song.style.opacity = '1';
                    song.style.transform = 'translateX(0)';
                }, 700 + (index * 100));
                
                // Animation de l'icône musicale
                song.addEventListener('mouseenter', () => {
                    const icon = song.querySelector('i');
                    if (icon) {
                        icon.style.animation = 'pulse 0.6s ease-in-out';
                    }
                });
                
                song.addEventListener('mouseleave', () => {
                    const icon = song.querySelector('i');
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
            // Créer des particules flottantes
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    pointer-events: none;
                    animation: float ${5 + Math.random() * 5}s ease-in-out infinite;
                    animation-delay: ${Math.random() * 5}s;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                `;
                hero.appendChild(particle);
            }
        }
    }
}

// Initialiser quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    const aiProjetManager = new AIProjetManager();
    
    // Initialiser les animations supplémentaires après un délai
    setTimeout(() => {
        aiProjetManager.setupResultsAnimation();
        aiProjetManager.setupTooltips();
        aiProjetManager.setupSmoothScroll();
        aiProjetManager.setupMusicCollectionAnimation();
        aiProjetManager.setupParticleEffect();
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
    
    // Animation spéciale pour le système IA
    const aiSystem = document.querySelector('.ai-system');
    if (aiSystem) {
        aiSystem.style.opacity = '0';
        aiSystem.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            aiSystem.style.transition = 'all 1s ease';
            aiSystem.style.opacity = '1';
            aiSystem.style.transform = 'scale(1)';
        }, 800);
    }
});

