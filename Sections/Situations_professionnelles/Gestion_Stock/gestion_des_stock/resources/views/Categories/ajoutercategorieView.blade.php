@extends('admin')
@section('content')
    <div class="text-center bg-light py-5 px-4 w-100">
        <h2 class="text-dark font-weight-bold display-4 mb-4">Ajouter un categorie</h2>
        <form method="POST" action="{{ route('AjoutCategorie.post') }}">
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
                    <label for="NomR" class="form-label text-start w-100">Nom :</label>
                    <input type="text" name="nom_categorie" id="NomR" class="form-control" required>
                </div>
                <div class="col-md-10">
                    <label for="DescriptionR" class="form-label text-start w-100">Description (optionnel) :</label>
                    <input type="text" name="description" id="DescriptionR" class="form-control">
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <input type="submit" name="ajoutcategorie" value="Ajouter Categorie" class="btn btn-primary">
            </div>
        </form>
    </div>
@endsection