function showCategories(lieuId) {
    const lieu = lieux.find(c => c.id_lieu == lieuId);
    const categories = lieu.categories;
    let categoriesHtml = '';
    categories.forEach(categorie => {
        categoriesHtml += `
            <div class="col-md-4 mb-4">
                <div class="card" onclick="showProduits(${categorie.id_categorie})" style="cursor: pointer;">
                    <div class="card-body text-center">
                        <h5 class="card-title">${categorie.nom_categorie}</h5>
                        <p class="card-text">${categorie.produits.length} produits</p>
                    </div>
                </div>
            </div>`;
    });
    document.getElementById('categoriesList').innerHTML = categoriesHtml;
    document.getElementById('categoriesSection').classList.remove('d-none');
    document.querySelector('.row').classList.add('d-none');
}

function showProduits(categorieId) {
    console.log("Categorie ID sélectionné :", categorieId);

    // Trouver la catégorie
    const categorie = lieux.flatMap(lieu => lieu.categories).find(c => c.id_categorie == categorieId);
    
    // Vérifier si la catégorie a été trouvée
    if (!categorie) {
        console.error("Catégorie non trouvée pour ID:", categorieId);
        return;
    }

    // Trouver le lieu de la catégorie
    const lieu = lieux.find(l => l.id_lieu == categorie.id_lieu) || { nom_lieu: "Lieu inconnu" };

    const produits = categorie.produits || [];
    let produitsHtml = '';

    produits.forEach(produit => {
        let limite = '';

        // Vérifier si le produit appartient à un lieu par défaut
        const categorieProduit = lieux.flatMap(lieu => lieu.categories).find(c => c.id_categorie == produit.categorie_id);
        if (categorieProduit && categorieProduit.id_lieu) {
            const produitLieu = lieux.find(l => l.id_lieu == categorieProduit.id_lieu);
            if (produitLieu && produitLieu.default_lieu) {
                limite = produit.limite > 0 ? `<p class="card-text">Limite : ${produit.limite}</p>` : '';
            }
        }

        produitsHtml += `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body text-center">
                        <h5 class="card-title">${produit.nom_produit}</h5>
                        <p class="card-text">${produit.description ?? 'No description'}</p>
                        <p class="card-text">Quantité : ${produit.quantite}</p>
                        ${limite} <!-- Affichage conditionnel de la limite -->
                        <p class="card-text">Catégorie : ${categorie.nom_categorie ?? 'Non spécifique'}</p>
                        <p class="card-text">Lieu : ${lieu.nom_lieu ?? 'Non spécifié'}</p>
                        <button class="btn btn-primary" 
                            onclick="MoveDetailProduit(
                                ${produit.id_produit}, 
                                '${produit.nom_produit}', 
                                ${produit.quantite},
                                '${categorie.nom_categorie ?? 'Non spécifique'}',
                                ${lieu?.id_lieu ?? 'null'}
                            )">Déplacer</button>
                        <button class="btn btn-danger" 
                            onclick="submitDeleteProduitModal(
                                ${produit.id_produit}, 
                                '${produit.nom_produit}', 
                                ${produit.quantite}
                            )">Supprimer</button>
                    </div>
                </div>
            </div>`;
    });

    document.getElementById('produitsList').innerHTML = produitsHtml;
    document.getElementById('produitsSection').classList.remove('d-none');
    document.getElementById('categoriesSection').classList.add('d-none');
}

/**
 * Affiche le modal avec les détails du produit sélectionné
 */
function MoveDetailProduit(produitId, produitNom, quantite, categorieNom, lieuId) {
    document.getElementById('produitId').value = produitId;
    document.getElementById('produitNom').value = produitNom;
    document.getElementById('produitQuantite').value = quantite;
    document.getElementById('produitCategorie').value = categorieNom;
    document.getElementById('LieuMove').value = lieuId || '';

    // Afficher le modal
    const modal = new bootstrap.Modal(document.getElementById('MoveProduit'));
    modal.show();
}

/**
 * Affiche le modal pour supprimer une quantite d'un produit
 */
function submitDeleteProduitModal(produitId, produitNom, quantite) {
    document.getElementById('deleteProduitId').value = produitId;
    document.getElementById('deleteProduitNom').value = produitNom;
    document.getElementById('deleteProduitQuantite').value = quantite;

    // Afficher le modal
    const modal = new bootstrap.Modal(document.getElementById('DeleteProduit'));
    modal.show();
}

/**
 * Soumet le formulaire pour déplacer le produit
 */
function submitMoveProduit() {
    const produitId = document.getElementById('produitId').value;
    const newLieuId = document.getElementById('LieuMove').value;
    const quantite = document.getElementById('produitQuantite').value;
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    console.log('Produit ID:', produitId);
    console.log('Nouveau Lieu ID:', newLieuId);
    console.log('Quantité:', quantite);

    fetch('/moveproduit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify({
            produit_id: produitId,
            lieu_id: newLieuId,
            quantite: quantite
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.error || 'Erreur serveur'); });
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        location.reload(); // Recharge la page pour actualiser les données
    })
    .catch(error => {
        console.error('Erreur :', error);
        alert('Une erreur est survenue : ' + error.message);
    });
}

function submitDeleteProduit() {
    const produitId = document.getElementById('produitId').value; // Récupère l'ID du produit affiché dans le modal
    const deleteInput = document.getElementById('deleteProduitId'); // Champ caché pour le formulaire de suppression

    if (produitId) {
        deleteInput.value = produitId;

        // Confirmation de suppression
        if (confirm('Êtes-vous sûr de vouloir supprimer ' + document.getElementById('deleteProduitQuantite').value + ' ' + document.getElementById('deleteProduitNom').value + ' ?')) {
            document.getElementById('deleteProduitForm').submit(); // Soumet le formulaire
        }
    } else {
        alert('Erreur : l\'ID du produit est manquant.');
    }
}

function goBackToLieu() {
    document.getElementById('categoriesSection').classList.add('d-none');
    document.querySelector('.row').classList.remove('d-none');
}

function goBackToCategories() {
    document.getElementById('produitsSection').classList.add('d-none');
    document.getElementById('categoriesSection').classList.remove('d-none');
}