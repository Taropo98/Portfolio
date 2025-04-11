@extends('admin')
@section('content')
    <div class="text-center bg-light py-5 px-4 w-100">
        <h2 class="text-dark font-weight-bold display-4 mb-4">Ajouter une lieu</h2>
        <form method="POST" action="{{ route('AjoutLieu.post') }}">
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

        @if (session()->has('error'))
            <div class="alert alert-danger">
                {{ session('error') }} <!-- Affiche le message d'erreur stocké dans la session -->
            </div>
        @endif
        
            <div class="row mb-3 justify-content-center">
                <div class="col-md-5">
                    <label for="NomP" class="form-label text-start w-100">Nom de la lieu :</label>
                    <input type="text" name="nom_lieu" id="NomC" class="form-control" required>
                </div>
                <div class="col-md-5">
                    <label for="QuantiteP" class="form-label text-start w-100">Petite description (optionnel):</label>
                    <input type="text" name="description" id="DescriptionC" class="form-control">
                </div>
                <div class="form-check col-md-3">
                    <input class="form-check-input" type="checkbox" name="default_lieu" id="default_lieu">
                    <label class="form-check-label" for="default_lieu">
                        Associer toutes les catégories existantes à ce lieu
                    </label>
                </div>
                
            </div>

            <div class="d-flex justify-content-center">
                <input type="submit" name="ajoutlieu" value="Ajouter Lieu" class="btn btn-primary">
            </div>
        </form>
    </div>
@endsection