@extends('admin')
@section('content')
    <div class="text-center bg-light py-5 px-4 w-100">
        <h2 class="text-dark font-weight-bold display-4 mb-4">Voir les categories</h2>
        <h4 class="text-dark font-weight-bold display-4 mb-4"> {{ $paginatedGroupedCategories->total() }} categories</h4>
    
        <!-- Formulaire de recherche et tri -->
        <form method="GET" action="{{ route('voircategorieView') }}" class="mb-4">
            @csrf 
            
            @if ($errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <div class="row justify-content-center">
                <div class="col-md-4">
                    <label for="search" class="form-label">Rechercher :</label>
                    <input type="text" name="search" id="search" class="form-control" value="{{ request('search') }}" placeholder="Nom">
                </div>
                <div class="col-md-2">
                    <label for="sort_by" class="form-label">Trier par :</label>
                    <select name="sort_by" id="sort_by" class="form-control">
                        <option value="nom_categorie" {{ request('sort_by') == 'nom_categorie' ? 'selected' : '' }}>Nom (alphabétique)</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="order" class="form-label">Ordre :</label>
                    <select name="order" id="order" class="form-control">
                        <option value="asc" {{ request('order') == 'asc' ? 'selected' : '' }}>Croissant</option>
                        <option value="desc" {{ request('order') == 'desc' ? 'selected' : '' }}>Décroissant</option>
                    </select>
                </div>

                <div class="col-md-1">
                    <label for="per_page" class="form-label">Produits par page :</label>
                    <select name="per_page" id="per_page" class="form-control">
                        <option value="6" {{ request('per_page') == 6 ? 'selected' : '' }}>6</option>
                        <option value="12" {{ request('per_page') == 12 ? 'selected' : '' }}>12</option>
                        <option value="24" {{ request('per_page') == 24 ? 'selected' : '' }}>24</option>
                        <option value="48" {{ request('per_page') == 48 ? 'selected' : '' }}>48</option>
                    </select>
                </div>

                <div class="col-md-2 d-flex align-items-end">
                    <button type="submit" class="btn btn-primary">Appliquer</button>
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
    
<!-- Affichage des categorie -->
<div class="container mt-4">
    <div class="row">
        @foreach ($paginatedGroupedCategories as $categorie)
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">{{ $categorie['nom_categorie'] }}</h5>
                        <p class="card-text">Description : {{ $categorie['description'] }}</p>
                        <button class="btn btn-primary" onclick="showDetail('{{ $categorie['id_categorie'] }}', '{{ $categorie['nom_categorie'] }}', '{{ $categorie['description'] }}', '{{ implode(', ', $categorie['lieux']->pluck('id_lieu')->toArray()) }}')">Détails</button>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>

            <!-- Pagination -->
        <div class="d-flex justify-content-center">
            {{ $paginatedGroupedCategories->appends(request()->except('page'))->links('pagination::bootstrap-4') }}
        </div>
    </div>
    
        
<!-- Modale pour modifier la catégorie -->
<div class="modal fade" id="ModifCategorie" tabindex="-1" role="dialog" aria-labelledby="ModifCategorieLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ModifCategorieLabel">Modifier la catégorie</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="editCategorieForm" method="POST" action="">
                @csrf
                @method('PUT')
                <div class="modal-body">
                    <input type="hidden" id="categorieId" name="id">
                    <div class="mb-3">
                        <label for="categorieNom" class="form-label">Nom de la catégorie</label>
                        <input type="text" class="form-control" id="categorieNom" name="nom_categorie" required>
                    </div>
                    <div class="mb-3">
                        <label for="categorieDescription" class="form-label">Description</label>
                        <textarea class="form-control" id="categorieDescription" name="description" rows="3"></textarea>
                    </div>
                    <div id="lieuxContainer" class="mb-3"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                    <button type="submit" class="btn btn-primary">Enregistrer</button>
                </div>
            </form>
            <div class="modal-footer">
            <form id="deleteCategorieForm" method="POST" action="">
                @csrf
                @method('DELETE')
                <input type="hidden" id="deleteCategorieId" name="id">
                <button type="button" class="btn btn-danger" onclick="submitDeleteForm()">Supprimer la catégorie</button>
            </form>
            </div>
        </div>
    </div>
</div>



    <script src="{{ asset('categorieJS/ModifierCategorie.js') }}"></script>
        
@endsection