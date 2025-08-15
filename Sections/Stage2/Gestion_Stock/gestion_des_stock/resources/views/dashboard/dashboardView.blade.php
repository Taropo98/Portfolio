@extends('admin')
@section('content')
<div class="container py-5"> 

    <!--Ici on pourra voir si il y a des quantite de produits qui seront au-dessous de la limite. Avec un defile de tout les noms des produits, leur quantite dans le lieu par defaut, leur limite et la difference-->
    @if (!empty($produitsEnAlerte))
        <div class="alert alert-warning">
            <h4>⚠️ Alerte de stock insuffisant</h4>
            <ul>
                @foreach ($produitsEnAlerte as $produit)
                    <li>
                        <strong>{{ $produit['nom'] }}</strong> - 
                        Quantité actuelle : <span class="badge bg-danger">{{ $produit['quantite'] }}</span> /
                        Limite : <span class="badge bg-warning">{{ $produit['limite'] }}</span> - 
                        <strong>À commander :</strong> <span class="badge bg-primary">{{ $produit['a_commander'] }}</span>
                    </li>
                @endforeach
            </ul>
        </div>
    @endif

    <h2 class="mb-4">Inventaire</h2>
    <meta name="csrf-token" content="{{ csrf_token() }}">


    <!-- Liste des catégories -->
    @if (!empty($lieux))
        <div class="row">
            @foreach($lieux as $lieu)
                <div class="col-md-4 mb-4">
                    <div class="card" onclick="showCategories({{ $lieu->id_lieu }})" style="cursor: pointer;">
                        <div class="card-body text-center">
                            <h5 class="card-title">{{ $lieu->nom_lieu }}</h5>
                            <p class="card-text">{{ $lieu->categories->count() }} Categories</p>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    @endif

    <!-- Section des categories -->
    <div class="row d-none" id="categoriesSection">
        <div class="col-12">
            <h3 class="mb-4">Categories</h3>
            <button class="btn btn-secondary mb-3" onclick="goBackToLieu()">Retour aux Lieu</button>
            <div class="row" id="categoriesList"></div>
        </div>
    </div>

    <!-- Section des produits -->
    <div class="row d-none" id="produitsSection">
        <div class="col-12">
            <h3 class="mb-4">Produits</h3>
            <button class="btn btn-secondary mb-3" onclick="goBackToCategories()">Retour aux Categories</button>
            <div class="row" id="produitsList"></div>
        </div>
    </div>

    <div class="container mt-4">
        <h2>📜 Historique des actions</h2>
        <div class="card">
            <div class="card-body">
                @if(empty($historique))
                    <p>Aucune action enregistrée aujourd'hui.</p>
                @else
                    <ul id="logList">
                        @foreach ($historique as $log)
                            <li>{{ $log }}</li>
                        @endforeach
                    </ul>
                    <a href="{{ route('historique.complet') }}" class="btn btn-secondary mt-2">Voir plus</a>
                @endif
            </div>
        </div>
    </div>   
    
</div>

@if (!$produits->isEmpty())
<!-- Modal Déplacer un Produit -->
<div class="modal fade" id="MoveProduit" tabindex="-1" aria-labelledby="MoveProduitLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- En-tête du Modal -->
            <div class="modal-header">
                <h5 class="modal-title" id="MoveProduitLabel">Déplacer un Produit</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <!-- Corps du Modal -->
            <div class="modal-body">
                <form id="moveProduitForm">
                    <!-- Champ caché pour l'ID du produit -->
                    <input type="hidden" id="produitId" name="produit_id">
                    
                    <!-- Nom du Produit -->
                    <div class="mb-3">
                        <label class="form-label">Nom du produit :</label>
                        <input type="text" id="produitNom" class="form-control" disabled>
                    </div>
                    
                    <!-- Quantité -->
                    <div class="mb-3">
                        <label for="produitQuantite" class="form-label">Quantité :</label>
                        <input type="number" id="produitQuantite" name="quantite" class="form-control" min="1" required>
                    </div>

                    <!-- Catégorie -->
                    <div class="mb-3">
                        <label class="form-label">Catégorie actuelle :</label>
                        <input type="text" id="produitCategorie" class="form-control" disabled>
                    </div>

                    <!-- Nouveau Lieu -->
                    <div class="mb-3">
                        <label for="LieuMove" class="form-label">Nouveau Lieu :</label>
                        <select id="LieuMove" name="lieu_id" class="form-select">
                            @foreach($lieux as $lieu)
                                <option value="{{ $lieu->id_lieu }}">{{ $lieu->nom_lieu }}</option>
                            @endforeach
                        </select>
                    </div>
                </form>
            </div>

            <!-- Pied du Modal -->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button type="button" class="btn btn-primary" onclick="submitMoveProduit()">Enregistrer</button>
            </div>
        </div>
    </div>
</div>

@endif

@if (!$produits->isEmpty())
<!-- Modal Supprimer un Produit avec la quantite voulu -->
<div class="modal fade" id="DeleteProduit" tabindex="-1" aria-labelledby="DeleteProduitLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- En-tête du Modal -->
            <div class="modal-header">
                <h5 class="modal-title" id="DeleteProduitLabel">Supprimer un Produit</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <!-- Corps du Modal -->
            <div class="modal-body">
                <form id="deleteProduitForm">
                    <!-- Champ caché pour l'ID du produit -->
                    <input type="hidden" id="deleteProduitId" name="produit_id">
                    
                    <!-- Nom du Produit -->
                    <div class="mb-3">
                        <label class="form-label">Nom du produit :</label>
                        <input type="text" id="deleteProduitNom" class="form-control" disabled>
                    </div>
                    
                    <!-- Quantité -->
                    <div class="mb-3">
                        <label for="produitQuantite" class="form-label">Quantité à supprimer:</label>
                        <input type="number" id="deleteProduitQuantite" name="quantite" class="form-control" min="1" required>
                    </div>
                </form>
            </div>

            <!-- Pied du Modal -->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button type="button" class="btn btn-danger" onclick="submitDeleteProduit()">Confirmer la suppression</button>
            </div>
        </div>
    </div>
</div>
@endif

<script>let lieux = @json($lieux->load('categories.produits'));</script>

<script src="{{ asset('dashboardJS/dashboard.js') }}"></script>

<script>
    document.getElementById("showMoreLogs").addEventListener("click", function() {
        window.location.href = "{{ route('historique.complet') }}"; // Lien vers la page complète des logs
    });
</script>
@endsection