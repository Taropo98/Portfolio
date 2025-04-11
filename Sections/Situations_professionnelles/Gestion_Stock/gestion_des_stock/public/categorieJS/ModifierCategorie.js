// Fonction pour afficher la modale de modification d'une catégorie
function showDetail(categorieId, categorieNom, categorieDescription, lieuxIds = '') {
    // Remplir les champs du formulaire
    document.getElementById('categorieId').value = categorieId;
    document.getElementById('categorieNom').value = categorieNom;
    document.getElementById('categorieDescription').value = categorieDescription;

    // Mettre à jour dynamiquement l'action du formulaire
    const editForm = document.getElementById('editCategorieForm');
    editForm.action = `/updatecategorie/${categorieId}`; // URL correcte avec l'ID

    // Gestion des lieux associés (affichage)
    const lieuxArray = lieuxIds.split(', ').filter(id => id.trim() !== '');
    const lieuxContainer = document.getElementById('lieuxContainer');
    lieuxContainer.innerHTML = '';
    if (lieuxArray.length > 0) {
        lieuxArray.forEach(lieuId => {
            const lieuElement = document.createElement('span');
            lieuElement.className = 'badge bg-primary me-2';
            lieuElement.textContent = `Lieu ID: ${lieuId}`;
            lieuxContainer.appendChild(lieuElement);
        });
    } else {
        const noLieuElement = document.createElement('span');
        noLieuElement.className = 'badge bg-secondary';
        noLieuElement.textContent = 'Aucun lieu associé';
        lieuxContainer.appendChild(noLieuElement);
    }

    // Afficher la modale
    const modal = new bootstrap.Modal(document.getElementById('ModifCategorie'));
    modal.show();
}

function submitDeleteForm() {
    const categorieId = document.getElementById('categorieId').value;
    const deleteForm = document.getElementById('deleteCategorieForm');

    if (categorieId) {
        deleteForm.action = `/deletecategorie/${categorieId}`; // URL correcte avec l'ID

        // Confirmation de suppression
        if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
            deleteForm.submit();
        }
    }
}