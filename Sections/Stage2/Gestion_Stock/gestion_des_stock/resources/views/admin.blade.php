<!DOCTYPE html>
<html lang="en">
<head>
    <!-- asset = public -> C:\Users\petri\Documents\ECOLE_annee_2\Laravel\VraiLaravel\gestion_des_stock\((public))-->
    <link rel="stylesheet" href="{{ asset('css_admin/style.css') }}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Gestion des stocks</title>
</head>
<body>
    <div class="container-scroller">
        <!-- Navbar -->
        <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <!-- Mettre ici le logo et le nom de l'entreprise -->
            </div>
            <div class="navbar-menu-wrapper d-flex align-items-stretch">
                <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                    <span class="mdi mdi-menu"></span>
                </button>
                <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                    <span class="mdi mdi-menu"></span>
                </button>
            </div>
        </nav>
        <!-- Fin Navbar -->

        <div class="page-body-wrapper">
            <!-- Sidebar -->
            <nav class="sidebar sidebar-offcanvas" id="sidebar">
                <ul class="nav">
                    <li class="nav-item nav-lieux"></li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('dashboardView') }}">
                            <span class="menu-title">Dashboard</span>
                        </a>
                    </li>
                    <!-- lieux -->
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="collapse" href="#lieux-collapse" aria-expanded="false" aria-controls="lieux-collapse">
                            <span class="menu-title">Lieu</span>
                            <i class="menu-arrow"></i>
                        </a>
                        <div class="collapse" id="lieux-collapse">
                            <ul class="nav flex-column sub-menu">
                                <li class="nav-item"> <a class="nav-link" href="{{ route('ajouterlieuView') }}">Ajouter lieu</a></li>
                                <li class="nav-item"> <a class="nav-link" href="{{ route('voirlieuView') }}">Voir les lieux</a></li>
                            </ul>
                        </div>
                    </li>
                    <!-- Fin lieux -->

                    <!-- Categorie -->
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="collapse" href="#employee-collapse" aria-expanded="false" aria-controls="employee-collapse">
                            <span class="menu-title">Categories</span>
                            <i class="menu-arrow"></i>
                        </a>
                        <div class="collapse" id="employee-collapse">
                            <ul class="nav flex-column sub-menu">
                                <li class="nav-item"> <a class="nav-link" href="{{ route('ajoutercategorieView') }}"> Ajouter categorie </a></li>
                                <li class="nav-item"> <a class="nav-link" href="{{ route('voircategorieView') }}"> Voir les categories </a></li>
                            </ul>
                        </div>
                    </li>
                    <!-- Fin Categorie -->

                    <!-- Produit -->
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="collapse" href="#product-collapse" aria-expanded="false" aria-controls="product-collapse">
                            <span class="menu-title">Produits</span>
                            <i class="menu-arrow"></i>
                        </a>
                        <div class="collapse" id="product-collapse">
                            <ul class="nav flex-column sub-menu">
                                <li class="nav-item"> <a class="nav-link" href="{{ route('ajouterproduitView') }}">Ajouter produit</a></li>
                                <li class="nav-item"> <a class="nav-link" href="{{ route('voirstockView') }}">Voir le stock</a></li>
                            </ul>
                        </div>
                    </li>
                    <!-- Fin Produit -->
                </ul>
            </nav>
        
            <!-- Fin Sidebar -->


            <!-- General : Passer le texte en blanc quant la souris passe dessus 
                Modifier commande pour "alerte des que les produit dans le stock à depasse la limite choisi" donc commander d'autre de ce produit
                Produit : faire un regroupement des meme produit et pas un par un + mettre la quantite du produit achete si c'est par carton (alors combien de carton et combien par carton) ou singulier 
                OK --- Liste produits : Afficher tout les produits par ordre de alphabétique avec un bouton de recherche + Choisir d'afficher les produits par catégorie ou par ordre alphabétique ou autre 
                Produit : Mettre un espece de code-barre pour chaque produit pour pouvoir le scanner et faire des recherches par code-barre -->


            <!-- Main Panel -->
            <div class="main-panel">
                <div class="content-wrapper">
                    @yield('content') <!-- Cette section injectera le contenu des vues enfants -->
                </div>
            </div>
            <!-- Fin Main Panel -->
        </div>
        <!-- Fin page-body-wrapper -->
    </div>
    <!-- Fin container-scroller -->

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"></script>
</body>
</html>