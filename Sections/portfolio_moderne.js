// Portfolio Moderne - JavaScript
class PortfolioManager {
    constructor() {
        this.projects = document.querySelectorAll('.project-card');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.searchInput = document.getElementById('searchInput');
        this.noResults = document.getElementById('noResults');
        this.projectsGrid = document.getElementById('projectsGrid');
        
        this.activeFilters = new Set(['all']);
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.animateStats();
        this.updateCounters();
        this.setupIntersectionObserver();
    }
    
    setupEventListeners() {
        // Filtres
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleFilterClick(e));
        });
        
        // Recherche
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
        
        // Navigation mobile
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
        
        // Fermeture modale
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
    
    handleFilterClick(e) {
        const button = e.currentTarget;
        const filter = button.dataset.filter;
        
        // Gestion des filtres principaux vs secondaires
        if (button.closest('.primary-filters')) {
            // Filtres principaux - exclusifs
            this.filterButtons.forEach(btn => {
                if (btn.closest('.primary-filters')) {
                    btn.classList.remove('active');
                }
            });
            button.classList.add('active');
            this.activeFilters.clear();
            this.activeFilters.add(filter);
        } else {
            // Filtres secondaires - cumulatifs
            if (this.activeFilters.has('all')) {
                this.activeFilters.clear();
                document.querySelector('[data-filter="all"]').classList.remove('active');
            }
            
            if (button.classList.contains('active')) {
                button.classList.remove('active');
                this.activeFilters.delete(filter);
                
                if (this.activeFilters.size === 0) {
                    this.activeFilters.add('all');
                    document.querySelector('[data-filter="all"]').classList.add('active');
                }
            } else {
                button.classList.add('active');
                this.activeFilters.add(filter);
            }
        }
        
        this.filterProjects();
        this.updateCounters();
    }
    
    handleSearch(e) {
        const searchTerm = e.target.value.toLowerCase();
        this.filterProjects(searchTerm);
    }
    
    filterProjects(searchTerm = '') {
        let visibleCount = 0;
        
        this.projects.forEach(project => {
            const categories = project.dataset.category.split(' ');
            const keywords = project.dataset.keywords || '';
            const title = project.querySelector('.card-title').textContent.toLowerCase();
            const description = project.querySelector('.card-description').textContent.toLowerCase();
            
            // Vérification des filtres
            let matchesFilter = false;
            
            if (this.activeFilters.has('all')) {
                matchesFilter = true;
            } else {
                matchesFilter = Array.from(this.activeFilters).some(filter => {
                    return categories.includes(filter);
                });
            }
            
            // Vérification de la recherche
            let matchesSearch = true;
            if (searchTerm) {
                matchesSearch = title.includes(searchTerm) || 
                              description.includes(searchTerm) || 
                              keywords.includes(searchTerm);
            }
            
            // Affichage/masquage avec animation
            if (matchesFilter && matchesSearch) {
                this.showProject(project);
                visibleCount++;
            } else {
                this.hideProject(project);
            }
        });
        
        // Affichage du message "aucun résultat"
        if (visibleCount === 0) {
            this.noResults.style.display = 'block';
            this.projectsGrid.style.display = 'none';
        } else {
            this.noResults.style.display = 'none';
            this.projectsGrid.style.display = 'grid';
        }
    }
    
    showProject(project) {
        project.style.display = 'block';
        project.classList.remove('fade-out');
        project.classList.add('fade-in');
        
        setTimeout(() => {
            project.classList.remove('fade-in');
        }, 500);
    }
    
    hideProject(project) {
        project.classList.add('fade-out');
        
        setTimeout(() => {
            project.style.display = 'none';
            project.classList.remove('fade-out');
        }, 300);
    }
    
    updateCounters() {
        const counters = {
            all: this.projects.length,
            stage: 0,
            bts: 0,
            personnel: 0,
            outils: 0,
            tech: 0,
            web: 0,
            ia: 0,
            video: 0,
            jeux: 0,
            creative: 0
        };
        
        this.projects.forEach(project => {
            const categories = project.dataset.category.split(' ');
            categories.forEach(category => {
                if (counters.hasOwnProperty(category)) {
                    counters[category]++;
                }
            });
        });
        
        // Mise à jour des badges
        Object.keys(counters).forEach(filter => {
            const button = document.querySelector(`[data-filter="${filter}"]`);
            if (button) {
                const badge = button.querySelector('.badge');
                if (badge) {
                    badge.textContent = counters[filter];
                }
            }
        });
    }
    
    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 50);
        });
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.projects.forEach(project => {
            observer.observe(project);
        });
    }
    
    resetFilters() {
        // Réinitialiser tous les filtres
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('[data-filter="all"]').classList.add('active');
        
        this.activeFilters.clear();
        this.activeFilters.add('all');
        
        // Réinitialiser la recherche
        this.searchInput.value = '';
        
        // Réappliquer les filtres
        this.filterProjects();
        this.updateCounters();
    }
    
    openModal(type) {
        const modal = document.getElementById('modal');
        const modalOverlay = document.getElementById('modalOverlay');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        
        const modalData = this.getModalData(type);
        
        modalTitle.textContent = modalData.title;
        modalContent.innerHTML = modalData.content;
        
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        const modalOverlay = document.getElementById('modalOverlay');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    getModalData(type) {
        const modalData = {
            'midjourney': {
                title: 'Midjourney',
                content: `
                    <div class="modal-project">
                        <img src="images/Midjourney.png" alt="Midjourney" style="width: 100%; max-width: 200px; margin-bottom: 1rem;">
                        <h4>Utilisation et expérience</h4>
                        <p>Midjourney est un outil d'IA que j'utilise pour créer des images de haute qualité à partir de descriptions textuelles. Cette technologie m'a permis d'explorer la création visuelle sans avoir besoin de compétences en dessin traditionnel.</p>
                        
                        <h4>Applications</h4>
                        <ul>
                            <li>Création de concepts visuels pour mes projets</li>
                            <li>Génération d'illustrations pour mes présentations</li>
                            <li>Exploration de styles artistiques variés</li>
                            <li>Prototypage rapide d'idées visuelles</li>
                        </ul>
                        
                        <h4>Compétences développées</h4>
                        <ul>
                            <li>Rédaction de prompts efficaces</li>
                            <li>Compréhension des paramètres d'IA générative</li>
                            <li>Curation et sélection d'images</li>
                            <li>Post-traitement et optimisation</li>
                        </ul>
                    </div>
                `
            },
            'stable-diffusion': {
                title: 'Stable Diffusion',
                content: `
                    <div class="modal-project">
                        <img src="images/Stable_Diffusion.png" alt="Stable Diffusion" style="width: 100%; max-width: 200px; margin-bottom: 1rem;">
                        <h4>Avantages de l'open source</h4>
                        <p>Stable Diffusion étant open-source, j'ai pu l'installer localement et expérimenter avec différents modèles et paramètres. Cela m'a donné un contrôle total sur le processus de génération.</p>
                        
                        <h4>Fonctionnalités explorées</h4>
                        <ul>
                            <li>Génération d'images statiques</li>
                            <li>Création d'animations et de vidéos</li>
                            <li>Inpainting et outpainting</li>
                            <li>Style transfer et variations</li>
                        </ul>
                        
                        <h4>Aspects techniques</h4>
                        <ul>
                            <li>Installation et configuration locale</li>
                            <li>Optimisation des performances GPU</li>
                            <li>Gestion des modèles et checkpoints</li>
                            <li>Scripting et automatisation</li>
                        </ul>
                    </div>
                `
            },
            'chatgpt': {
                title: 'ChatGPT',
                content: `
                    <div class="modal-project">
                        <img src="images/ChatGPT.png" alt="ChatGPT" style="width: 100%; max-width: 200px; margin-bottom: 1rem;">
                        <h4>Assistant quotidien</h4>
                        <p>ChatGPT est devenu un outil essentiel dans mon workflow de développement et d'apprentissage. Je l'utilise pour diverses tâches allant de la programmation à la rédaction.</p>
                        
                        <h4>Cas d'usage principaux</h4>
                        <ul>
                            <li>Aide au débogage de code</li>
                            <li>Génération de documentation</li>
                            <li>Brainstorming et idéation</li>
                            <li>Apprentissage de nouvelles technologies</li>
                            <li>Rédaction et correction de textes</li>
                        </ul>
                        
                        <h4>Techniques d'optimisation</h4>
                        <ul>
                            <li>Prompt engineering avancé</li>
                            <li>Conversations contextuelles longues</li>
                            <li>Utilisation des modes spécialisés</li>
                            <li>Intégration dans les workflows</li>
                        </ul>
                    </div>
                `
            },
            'replay': {
                title: 'Replay (Voice Cloning)',
                content: `
                    <div class="modal-project">
                        <img src="images/Replay.png" alt="Replay" style="width: 100%; max-width: 200px; margin-bottom: 1rem;">
                        <h4>Synthèse vocale avancée</h4>
                        <p>Replay est un outil open-source que j'ai exploré pour le clonage vocal et le remplacement de voix dans des contenus audio et vidéo.</p>
                        
                        <h4>Expérimentations réalisées</h4>
                        <ul>
                            <li>Clonage de voix à partir d'échantillons</li>
                            <li>Remplacement vocal dans des vidéos</li>
                            <li>Création de voix synthétiques</li>
                            <li>Modification de tonalité et d'accent</li>
                        </ul>
                        
                        <h4>Défis techniques</h4>
                        <ul>
                            <li>Qualité des échantillons d'entraînement</li>
                            <li>Temps de traitement et optimisation</li>
                            <li>Synchronisation audio-vidéo</li>
                            <li>Considérations éthiques d'usage</li>
                        </ul>
                    </div>
                `
            },
            'suno': {
                title: 'Suno AI',
                content: `
                    <div class="modal-project">
                        <img src="images/Suno.png" alt="Suno" style="width: 100%; max-width: 200px; margin-bottom: 1rem;">
                        <h4>Création musicale par IA</h4>
                        <p>Suno AI m'a permis d'explorer la création musicale sans connaissances musicales approfondies, en générant des compositions originales à partir de descriptions textuelles.</p>
                        
                        <h4>Types de créations</h4>
                        <ul>
                            <li>Musiques d'ambiance pour projets</li>
                            <li>Jingles et sons courts</li>
                            <li>Exploration de genres musicaux</li>
                            <li>Bandes sonores personnalisées</li>
                        </ul>
                        
                        <h4>Apprentissages</h4>
                        <ul>
                            <li>Description efficace de styles musicaux</li>
                            <li>Compréhension des structures musicales</li>
                            <li>Post-production et mixage basique</li>
                            <li>Droits d'auteur et IA générative</li>
                        </ul>
                    </div>
                `
            },
            'africbantu': {
                title: 'AfricBantu - E-commerce',
                content: `
                    <div class="modal-project">
                        <img src="images/ecommerce_poupees.jpg" alt="AfricBantu" style="width: 100%; margin-bottom: 1rem;">
                        <h4>E-commerce de poupées célébrant la culture africaine</h4>
                        <p>AfricBantu est un site e-commerce que j'ai développé pour valoriser la culture africaine à travers une collection unique de poupées noires. Chaque poupée raconte une histoire authentique inspirée de différents pays africains.</p>
                        
                        <h4>Collection de 17 poupées uniques</h4>
                        <ul>
                            <li><strong>Poupées Premium (72€)</strong> : 12 modèles avec histoires détaillées</li>
                            <li><strong>Poupées Standard (25€)</strong> : 5 modèles avec designs traditionnels</li>
                            <li>Storytelling authentique pour chaque personnage</li>
                            <li>Inspiration de pays africains (Ghana, Nigeria, Kenya, Tanzanie...)</li>
                        </ul>
                        
                        <h4>Fonctionnalités e-commerce</h4>
                        <ul>
                            <li>Catalogue produits avec images professionnelles</li>
                            <li>Système de panier intégré</li>
                            <li>Navigation intuitive et responsive</li>
                            <li>Design chaleureux aux tons terreux</li>
                            <li>Mission de représentation et d'authenticité</li>
                        </ul>
                        
                        <h4>Impact culturel</h4>
                        <ul>
                            <li>Représentation positive de la culture africaine</li>
                            <li>Permettre aux enfants de se reconnaître</li>
                            <li>Valorisation de l'artisanat et de l'authenticité</li>
                            <li>Éducation par le storytelling</li>
                        </ul>
                        
                        <div style="margin-top: 1rem;">
                            <a href="https://africbantu.fr/" target="_blank" class="btn btn-primary">
                                <i class="fas fa-external-link-alt"></i>
                                Visiter AfricBantu.fr
                            </a>
                        </div>
                    </div>
                `
            },
            'feteloc': {
                title: 'FêteLoc - Location',
                content: `
                    <div class="modal-project">
                        <img src="images/location_machines.png" alt="FêteLoc" style="width: 100%; margin-bottom: 1rem;">
                        <h4>Plateforme de location de machines pour événements</h4>
                        <p>FêteLoc est un site web que j'ai développé pour faciliter la location de machines festives (barbe à papa, glaces, pop-corn) avec un processus simple en 4 étapes pour rendre les événements inoubliables.</p>
                        
                        <h4>Machines disponibles</h4>
                        <ul>
                            <li><strong>Barbe à Papa</strong> : Pour anniversaires, mariages, fêtes d'entreprise</li>
                            <li><strong>Machines à Glace</strong> : Rafraîchissement pour journées chaudes</li>
                            <li><strong>Pop-Corn</strong> : Ambiance cinéma pour soirées films</li>
                            <li>Service complet avec livraison et installation</li>
                        </ul>
                        
                        <h4>Processus de location en 4 étapes</h4>
                        <ul>
                            <li><strong>1. Choisissez</strong> : Parcourir le catalogue et sélectionner</li>
                            <li><strong>2. Réservez</strong> : Vérifier disponibilité et réserver</li>
                            <li><strong>3. Livraison</strong> : Installation et explication du fonctionnement</li>
                            <li><strong>4. Profitez</strong> : Régaler les invités et créer des souvenirs</li>
                        </ul>
                        
                        <h4>Design et expérience utilisateur</h4>
                        <ul>
                            <li>Interface festive avec fond bokeh coloré</li>
                            <li>Navigation simple et intuitive</li>
                            <li>Design responsive mobile/desktop</li>
                            <li>Système de panier e-commerce intégré</li>
                            <li>Processus clairement expliqué avec icônes</li>
                        </ul>
                        
                        <h4>Mission et valeurs</h4>
                        <ul>
                            <li>"Donnez vie à vos événements"</li>
                            <li>Rendre les événements inoubliables</li>
                            <li>Service clé en main professionnel</li>
                            <li>Ciblage particuliers et entreprises</li>
                        </ul>
                        
                        <div style="margin-top: 1rem;">
                            <a href="https://feteloc.fr/" target="_blank" class="btn btn-primary">
                                <i class="fas fa-external-link-alt"></i>
                                Visiter FêteLoc.fr
                            </a>
                        </div>
                    </div>
                `
            }
        };
        
        return modalData[type] || { title: 'Projet', content: '<p>Informations non disponibles.</p>' };
    }
}

// Fonctions globales pour les modales
function openModal(type) {
    portfolioManager.openModal(type);
}

function closeModal() {
    portfolioManager.closeModal();
}

function resetFilters() {
    portfolioManager.resetFilters();
}

// Initialisation
let portfolioManager;

document.addEventListener('DOMContentLoaded', () => {
    portfolioManager = new PortfolioManager();
    
    // Animation de la navbar au scroll
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scroll pour les ancres
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
});

