@extends('admin')
@section('content')
    <div class="text-center bg-light py-5 px-4 w-100">
        <h2 class="text-dark font-weight-bold display-4 mb-4">Voir les catégories</h2>
        <h4 class="text-dark font-weight-bold display-4 mb-4"> {{ $lieux->total() }} catégories</h4>

        <!-- Formulaire de recherche et tri -->
        <form method="GET" action="{{ route('voirlieuView') }}" class="mb-4">
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
                <div class="col-md-3">
                    <label for="sort_by" class="form-label">Trier par :</label>
                    <select name="sort_by" id="sort_by" class="form-control">
                        <option value="nom_lieu" {{ request('sort_by') == 'nom_lieu' ? 'selected' : '' }}>Nom (alphabétique)</option>
                    </select>
                </div>
                <div class="col-md-2">
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

        <!-- Affichage des catégories -->
        <div class="container mt-4">
            <div class="row">
                @foreach ($lieux as $lieu)
                    <div class="col-md-4">
                        <div class="card mb-4 shadow-sm">
                            <div class="card-body">
                                <h5 class="card-title">{{ $lieu->nom_lieu }}</h5>
                                <p class="card-text">Description : {{ $lieu->description }}</p>
                                <button onclick="showDetail('{{ $lieu->id_lieu }}', '{{ $lieu->nom_lieu }}', '{{ $lieu->description }}', '{{ $lieu->default_lieu }}')">Modifier</button>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        <!-- Pagination -->
        <div class="d-flex justify-content-center">
            {{ $lieux->appends(request()->except('page'))->links('pagination::bootstrap-4') }}
        </div>
    </div>

    
    <!-- Modale pour modifier la catégorie -->
    <div class="modal fade" id="ModifLieu" tabindex="-1" role="dialog" aria-labelledby="ModifLieuLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModifLieuLabel">Modifier la Lieu</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form id="editLieuForm" method="POST" action="{{ route('updatelieu') }}">
                    @csrf
                    @method('PUT')
                    <div class="modal-body">
                        <input type="hidden" id="lieuId" name="id">
                        <div class="mb-3">
                            <label for="lieuxName" class="form-label">Nom de la catégorie</label>
                            <input type="text" class="form-control" id="lieuxName" name="nom_lieu" required>
                        </div>
                        <div class="mb-3">
                            <label for="lieuxDescription" class="form-label">Description</label>
                            <textarea class="form-control" id="lieuxDescription" name="description" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                        <button type="submit" class="btn btn-primary">Enregistrer</button>
                    </div>
                </form>
                
                <!-- Bouton pour supprimer le produit sauf si le lieu est le lieu par défaut -->
                <div class="modal-footer">
                    <form id="deleteLieuForm" method="POST" action="{{ route('deletelieu') }}">
                        @csrf
                        @method('DELETE')
                        <input type="hidden" id="deleteLieuId" name="id">
                        <button type="submit" class="btn btn-danger" onclick="submitDeleteForm()">Supprimer</button>
                    </form>
                </div>
                

            </div>
        </div>
    </div>

    <script src="{{ asset('lieuJS/ModifierLieu.js') }}"></script>

@endsection