//Script AJAX pour la recherche en temps réel
document.getElementById('Barre-de-recherche').addEventListener('input', function() {
    let query = this.value;
    if (query.length > 1) {
        fetch(`/recherche-produit?query=${query}`)
            .then(response => response.json())
            .then(data => {
                let produitsList = document.getElementById('produits-list');
                produitsList.innerHTML = ''; // Effacer les produits actuels

                data.forEach(produit => {
                    let produitItem = `
                        <div class="col-md-4 produit-item">
                            <div class="card mb-4 shadow-sm">
                                <div class="card-body">
                                    <h5 class="card-title">${produit.nom_produit}</h5>
                                    <p class="card-text">Quantité : ${produit.quantite}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    produitsList.insertAdjacentHTML('beforeend', produitItem);
                });
            });
    } else {
        // Optionnel : Recharge la liste initiale des produits si la barre de recherche est vide
        location.reload();
    }
});