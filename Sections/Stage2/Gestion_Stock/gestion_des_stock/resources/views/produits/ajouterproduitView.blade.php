@extends('admin')
@section('content')
    <div class="text-center bg-light py-5 px-4 w-100">
        <h2 class="text-dark font-weight-bold display-4 mb-4">Ajouter un produit</h2>
        <form method="POST" action="{{ route('AjoutProduit.post') }}">
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

            @if (session()->has('success'))
                <div class="alert alert-success">
                    {{ session('success') }} <!-- Affiche le message d'erreur stocké dans la session -->
                </div>
            @endif

            <div class="row mb-3 justify-content-center">
                <div class="col-md-5">
                    <label for="Code_produitP" class="form-label text-start w-100">Code :</label>
                    <input type="number" name="code_produit" id="Code_produitP" class="form-control" required>
                </div>
                <div class="col-md-5">
                    <label for="NomP" class="form-label text-start w-100">Nom :</label>
                    <input type="text" name="nom_produit" id="NomP" class="form-control" required>
                </div>
                <div class="col-md-5">
                    <label for="QuantiteP" class="form-label text-start w-100">Quantité :</label>
                    <input type="number" name="quantite" id="QuantiteP" class="form-control" required>
                </div>
                <div class="col-md-5">
                    <label for="Limite" class="form-label text-start w-100">Limite :</label>
                    <input type="number" name="limite" id="Limite" class="form-control">
                </div>
                <div class="col-md-10">
                    <label for="DescriptionP" class="form-label text-start w-100">Description (optionnel) :</label>
                    <input type="text" name="description" id="DescriptionP" class="form-control">
                </div>
            </div>

            <!-- Champ de sélection pour la catégorie -->
            <div class="row mb-3 justify-content-center">
                <div class="col-md-5">
                    <label for="CategorieP" class="form-label text-start w-100">Categorie :</label>
                    <select name="categorie_id" id="CategorieP" class="form-control" required>
                        <option value="">Sélectionnez un categorie</option>
                        @foreach($categories as $categorie)
                            <option value="{{ $categorie->id_categorie }}">{{ $categorie->nom_categorie }}</option>
                        @endforeach
                    </select>
                </div>
            </div>            

            <div class="d-flex justify-content-center">
                <input type="submit" name="ajoutproduit" value="Ajouter Produit" class="btn btn-primary">
            </div>
        </form>
    </div>
@endsection