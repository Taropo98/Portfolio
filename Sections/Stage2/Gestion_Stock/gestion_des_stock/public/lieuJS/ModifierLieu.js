function showDetail(id, nom, description, default_lieu) {
    
    // Remplir les champs de la modale avec les données de la catégorie
    document.getElementById('lieuId').value = id;
    document.getElementById('lieuxName').value = nom;
    document.getElementById('lieuxDescription').value = description;

    // Afficher ou masquer le bouton "Supprimer" en fonction de default_lieu
    const deleteButton = document.querySelector('#deleteLieuForm button[type="submit"]');
    if (default_lieu == 1) {
        deleteButton.style.display = 'none'; // Masquer le bouton
    } else {
        deleteButton.style.display = 'block'; // Afficher le bouton
    }

    // Ouvrir la modale
    var myModal = new bootstrap.Modal(document.getElementById('ModifLieu'));
    myModal.show();
}

function submitDeleteForm() {
    const lieuId = document.getElementById('lieuId').value;
    const deleteInput = document.getElementById('deleteLieuId');

    if (lieuId) {
        deleteInput.value = lieuId;

        // Confirmation de suppression
        if (confirm('Êtes-vous sûr de vouloir supprimer ce lieu ?')) {
            document.getElementById('deleteLieuForm').submit(); // Soumet le formulaire
        }
    }
}