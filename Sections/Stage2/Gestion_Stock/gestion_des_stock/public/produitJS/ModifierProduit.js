function showDetail(produitId, produitCode, produitNom, produitDescription, produitLimite, produitQuantite, produitCategorie) {
    // Remplir les champs du formulaire de la modale avec les données du produit
    document.getElementById('produitId').value = produitId;
    document.getElementById('produitCode').value = produitCode;
    document.getElementById('produitNom').value = produitNom;
    document.getElementById('produitDescription').value = produitDescription;
    document.getElementById('produitLimite').value = produitLimite;
    document.getElementById('produitQuantite').value = produitQuantite;

    // Sélection automatique de la catégorie actuelle
    const categorieSelect = document.getElementById('produitCategorie');
    for (let i = 0; i < categorieSelect.options.length; i++) {
        if (categorieSelect.options[i].value == produitCategorie) {
            categorieSelect.options[i].selected = true;
            break;
        }
    }

    // Afficher la modale
    const modal = new bootstrap.Modal(document.getElementById('ModifProduit'));
    modal.show();
}

function submitDeleteForm() {
    const produitId = document.getElementById('produitId').value; // Récupère l'ID du produit affiché dans le modal
    const deleteInput = document.getElementById('deleteProduitId'); // Champ caché pour le formulaire de suppression

    if (produitId) {
        deleteInput.value = produitId;

        // Confirmation de suppression
        if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            document.getElementById('deleteProduitForm').submit(); // Soumet le formulaire
        }
    } else {
        alert('Erreur : l\'ID du produit est manquant.');
    }
}