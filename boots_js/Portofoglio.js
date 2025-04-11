// Fonction pour afficher les détails d'une section spécifique
function showDetail(section) {
    // Contenu des détails pour chaque section
    var details = {
        'stage1': "<h3>Mobelec</h3><p>Bornes.</p>",
        'boulot1': "<h3>Auchan</h3><p>En tant que caissier chez Auchan à Saint-Priest, j'ai développé des compétences en service client et en gestion de caisse.</p>",
    };

    // Sélection du panneau de détail par son ID et injection du contenu correspondant à la section
    var detailPanel = document.getElementById('detailPanel');
    detailPanel.innerHTML = details[section];
    detailPanel.style.display = 'block'; // Affiche le panneau de détail

    // Création d'un bouton pour fermer le panneau de détail
    var closeButton = document.createElement('button');
    closeButton.className = 'btn btn-primary mt-3'; // Ajout des classes CSS pour le style du bouton
    closeButton.textContent = 'Fermer'; // Texte affiché sur le bouton
    closeButton.onclick = function() {
        detailPanel.style.display = 'none'; // Cache le panneau de détail lorsque le bouton est cliqué
    };

    // Ajout du bouton de fermeture dans le panneau de détail
    detailPanel.appendChild(closeButton);
}