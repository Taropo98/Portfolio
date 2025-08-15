// Stage1 Moderne - JavaScript
class StageManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupScrollEffects();
        this.setupBackToTop();
        this.setupMobileNav();
        this.setupGallery();
        this.setupAnimations();
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
    
    setupGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const overlay = item.querySelector('.gallery-overlay');
                
                if (img && overlay) {
                    this.openLightbox(img.src, overlay.querySelector('h4').textContent, overlay.querySelector('p').textContent);
                }
            });
        });
    }
    
    openLightbox(src, title, description) {
        // Créer la lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay">
                <div class="lightbox-content">
                    <button class="lightbox-close">
                        <i class="fas fa-times"></i>
                    </button>
                    <img src="${src}" alt="${title}">
                    <div class="lightbox-info">
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </div>
                </div>
            </div>
        `;
        
        // Ajouter les styles de la lightbox
        const style = document.createElement('style');
        style.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.9);
                opacity: 0;
                animation: fadeIn 0.3s ease forwards;
            }
            
            .lightbox-overlay {
                position: relative;
                max-width: 90vw;
                max-height: 90vh;
                background: white;
                border-radius: 1rem;
                overflow: hidden;
                transform: scale(0.8);
                animation: scaleIn 0.3s ease forwards;
            }
            
            .lightbox-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                width: 2.5rem;
                height: 2.5rem;
                background: rgba(0, 0, 0, 0.5);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1;
                transition: all 0.3s ease;
            }
            
            .lightbox-close:hover {
                background: rgba(0, 0, 0, 0.8);
                transform: scale(1.1);
            }
            
            .lightbox-content img {
                width: 100%;
                height: auto;
                max-height: 70vh;
                object-fit: contain;
            }
            
            .lightbox-info {
                padding: 1.5rem;
                background: white;
            }
            
            .lightbox-info h3 {
                margin: 0 0 0.5rem 0;
                color: #1f2937;
                font-weight: 600;
            }
            
            .lightbox-info p {
                margin: 0;
                color: #6b7280;
            }
            
            @keyframes fadeIn {
                to { opacity: 1; }
            }
            
            @keyframes scaleIn {
                to { transform: scale(1); }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Fermer la lightbox
        const closeLightbox = () => {
            lightbox.style.opacity = '0';
            lightbox.querySelector('.lightbox-overlay').style.transform = 'scale(0.8)';
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.head.removeChild(style);
                document.body.style.overflow = '';
            }, 300);
        };
        
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Fermer avec Escape
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
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
}

// Initialiser quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    new StageManager();
});

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    // Réajuster les éléments si nécessaire
    const navbar = document.querySelector('.navbar');
    if (window.innerWidth > 768) {
        document.querySelector('.nav-menu').classList.remove('active');
        document.querySelector('.nav-toggle').classList.remove('active');
    }
});

// Préchargement des images pour de meilleures performances
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
});

