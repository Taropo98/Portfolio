<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1>Connexion</h1>

            <!-- Afficher les erreurs de validation s'il y en a -->
            @if ($errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li> <!-- Affiche chaque erreur comme un élément de liste -->
                        @endforeach
                    </ul>
                </div>
            @endif

            <!-- Afficher les messages de session personnalisés s'il y a une erreur -->
            @if (session()->has('error'))
                <div class="alert alert-danger">
                    {{ session('error') }} <!-- Affiche le message d'erreur stocké dans la session -->
                </div>
            @endif

            <!-- Formulaire de connexion -->
            <form method="POST" action="{{ route('login.post') }}">
                @csrf <!-- Protection contre les attaques CSRF (Cross-Site Request Forgery), une sécurité intégrée dans Laravel -->

                <!-- Champ pour le nom de l'utilisateur -->
                <div class="mb-3">
                    <label for="NomR" class="form-label">Nom :</label>
                    <input type="text" name="login_admin" id="NomR" class="form-control" required>
                </div>

                <!-- Champ pour le mot de passe -->
                <div class="mb-3">
                    <label for="MDPR" class="form-label">Password :</label>
                    <input type="password" name="password" id="MDPR" class="form-control" required>
                </div>

                <!-- Bouton de soumission du formulaire -->
                <input type="submit" name="Connexion" value="Connexion" class="btn btn-primary">
            </form>
        </div>
    </div>
</div>

</body>
</html>