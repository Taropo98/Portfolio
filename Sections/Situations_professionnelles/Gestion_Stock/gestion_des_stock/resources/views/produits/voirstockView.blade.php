@extends('admin')
@section('content')
    <div class="text-center bg-light py-5 px-4 w-100">
        <h2 class="text-dark font-weight-bold display-4 mb-4">Voir le stock</h2>
        <h4 class="text-dark font-weight-bold display-4 mb-4"> {{ $paginatedGroupedProducts->total() }} produits</h4>
        
        <!-- Formulaire de recherche et tri -->

        <form method="GET" action="{{ route('voirstockView') }}" class="mb-4">
            
            <!-- Champ de recherche par code produit -->
            <div class="row justify-content-center">
                <div class="col-md-2">
                    <label for="searchNumber" class="form-label">Rechercher par code :</label>
                    <input type="number" name="searchNumber" id="searchNumber" 
                           class="form-control" value="{{ request('searchNumber') }}" 
                           placeholder="Code du produit">
                </div>

                <!-- Champ de recherche par nom ou catégorie -->
                <div class="col-md-3">
                    <label for="search" class="form-label">Rechercher par nom :</label>
                    <input type="text" name="search" id="search" 
                           class="form-control" value="{{ request('search') }}" 
                           placeholder="Nom du produit">
                </div>

            <!-- Sélecteur pour le tri -->
            <div class="row justify-content-center mt-3">
                <div class="col-md-2">
                    <label for="sort_by" class="form-label">Trier par :</label>
                    <select name="sort_by" id="sort_by" class="form-control">
                        <option value="nom_produit" {{ request('sort_by') == 'nom_produit' ? 'selected' : '' }}>Nom (alphabétique)</option>
                        <option value="quantite" {{ request('sort_by') == 'quantite' ? 'selected' : '' }}>Quantité</option>
                        <option value="lieu_id" {{ request('sort_by') == 'lieu_id' ? 'selected' : '' }}>Lieu</option>
                    </select>
                </div>

                <!-- Sélecteur pour l'ordre -->
                <div class="col-md-2">
                    <label for="order" class="form-label">Ordre :</label>
                    <select name="order" id="order" class="form-control">
                        <option value="asc" {{ request('order') == 'asc' ? 'selected' : '' }}>Croissant</option>
                        <option value="desc" {{ request('order') == 'desc' ? 'selected' : '' }}>Décroissant</option>
                    </select>
                </div>
            
                <!-- Sélecteur pour le nombre de produits par page -->
                <div class="col-md-1">
                    <label for="per_page" class="form-label">Produits par page :</label>
                    <select name="per_page" id="per_page" class="form-control">
                        <option value="6" {{ request('per_page') == 6 ? 'selected' : '' }}>6</option>
                        <option value="12" {{ request('per_page') == 12 ? 'selected' : '' }}>12</option>
                        <option value="24" {{ request('per_page') == 24 ? 'selected' : '' }}>24</option>
                        <option value="48" {{ request('per_page') == 48 ? 'selected' : '' }}>48</option>
                    </select>
                </div>
                
                <!-- Bouton de soumission -->
                <div class="col-md-2 d-flex align-items-end">
                    <button type="submit" class="btn btn-primary w-100">Appliquer</button>
                </div>
            </div>
            </div>
        </form>
        
        @if (session()->has('success'))
    <div class="alert alert-success">
        {{ session('success') }}
    </div>
@endif
@if (session()->has('error'))
    <div class="alert alert-danger">
        {{ session('error') }}
    </div>
@endif


<!-- Affichage des produits -->
<div class="container mt-4">
    <div class="row">
        @foreach ($paginatedGroupedProducts as $produit)
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">{{ $produit['nom_produit'] }}</h5>
                        <p class="card-text">Categorie : {{ $produit['nom_categorie'] ?? 'N/A' }}</p>
                        <p class="card-text">Description : {{ $produit['description'] }}</p>
                        <p class="card-text">Quantité : {{ $produit['quantite'] }}</p>
                        <p class="card-text">Limite : {{ $produit['limite'] }}</p>
                        <p class="card-text">
                            Lieux :
                            @foreach ($produit['lieux'] as $lieu => $quantite)
                                <span class="badge bg-primary">{{ $lieu }} : {{ $quantite }}</span>
                            @endforeach
                        </p>
                        <button class="btn btn-primary" onclick="showDetail('{{ $produit['id_produit'] }}','{{ $produit['code_produit'] }}', '{{ $produit['nom_produit'] }}', '{{ $produit['description'] }}', '{{ $produit['limite'] }}', '{{ $produit['quantite'] }}', '{{ $produit['categorie_id'] ?? '' }}')">Modifier</button>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>
            

        <!-- Pagination -->
        <div class="d-flex justify-content-center">
            {{ $paginatedGroupedProducts->appends(request()->except('page'))->links('pagination::bootstrap-4') }}
        </div>
    </div>

        <!-- Modale pour modifier le produit -->
        @if (!$paginatedGroupedProducts->isEmpty())
        <div class="modal fade" id="ModifProduit" tabindex="-1" role="dialog" aria-labelledby="ModifProduitLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ModifProduitLabel">Modifier le produit</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="editProduitForm" method="POST" action="{{ route('updateproduit') }}">
                        @csrf
                        @method('PUT')
                        <div class="modal-body">
                            <input type="hidden" id="produitId" name="id">
                            <div class="mb-3">
                                <label for="produitCode" class="form-label">Code</label>
                                <input type="number" class="form-control" id="produitCode" name="code_produit" required>
                            </div>
                            <div class="mb-3">
                                <label for="produitNom" class="form-label">Nom du produit</label>
                                <input type="text" class="form-control" id="produitNom" name="nom_produit" required>
                            </div>
                            <div class="mb-3">
                                <label for="produitQuantite" class="form-label">Quantité</label>
                                <input type="number" class="form-control" id="produitQuantite" name="quantite" required>
                            </div>
                            <div class="mb-3">
                                <label for="produitLimite" class="form-label">Limite</label>
                                <input type="number" class="form-control" id="produitLimite" name="limite" required>
                            </div>
                            <div class="mb-3">
                                <label for="produitDescription" class="form-label">Description</label>
                                <textarea class="form-control" id="produitDescription" name="description" rows="3"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="produitCategorie" class="form-label">Catégorie</label>
                                <select class="form-control" id="produitCategorie" name="categorie_id">
                                    @foreach ($categories as $categorie)
                                        <option value="{{ $categorie->id_categorie }}">
                                            {{ $categorie->nom_categorie }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="submit" class="btn btn-primary">Enregistrer</button>
                        </div>
                    </form>
                    <div class="modal-footer">
                     <!-- Bouton pour supprimer le produit -->
                    <form id="deleteProduitForm" method="POST" action="{{ route('deleteproduit') }}">
                        @csrf
                        @method('DELETE')
                        <input type="hidden" id="deleteProduitId" name="id">
                        <button type="button" class="btn btn-danger" onclick="submitDeleteForm()">Supprimer</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        @endif

<script src="{{ asset('produitJS/ModifierProduit.js') }}"></script>
@endsection