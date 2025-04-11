<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ListeProduitsController;
use App\Http\Controllers\ListeLieuController;
use App\Http\Controllers\ListeCategoriesController;
use App\Http\Controllers\LogController;

// Route vers la page d'accueil (décommentée si nécessaire)
// Route::get('/', function () {
//     return view('welcome');  // Affiche la vue 'welcome'
// })->name('home');

// Route pour afficher la page d'administration
Route::get('/admin', function () {
    return view('admin');
})->name('admin');

// Route pour afficher le formulaire de connexion
Route::get('/login', [LoginController::class, 'login'])->name('login');

// Route pour traiter le formulaire de connexion (POST)
Route::post('/login', [LoginController::class, 'loginPost'])->name('login.post');

// Commandes pour dashboard
Route::get('/DashBoardView', [DashboardController::class, 'dashboard'])->name('dashboardView');
Route::post('/moveproduit', [DashBoardController::class, 'moveProduit'])->name('moveproduit');
Route::delete('/deleteproduit', [DashBoardController::class, 'deleteproduit'])->name('deleteproduit');

//Commandes pour lieu
Route::get('/Ajoutlieux', [ListeLieuController::class, 'AjouterLieu'])->name('ajouterlieuView');
Route::get('/Voirlieux', [ListeLieuController::class, 'VoirLieu'])->name('voirlieuView');
Route::post('/Ajoutlieux', [ListeLieuController::class, 'AjoutLieuPost'])->name('AjoutLieu.post');
Route::put('/updatelieu', [ListeLieuController::class, 'updateLieu'])->name('updatelieu');
Route::delete('/deletelieu', [ListeLieuController::class, 'deletelieu'])->name('deletelieu');


// Commandes pour produits
Route::get('/Ajoutproduits', [ListeProduitsController::class, 'AjouterProduit'])->name('ajouterproduitView');
Route::get('/VoirStock', [ListeProduitsController::class, 'voirstock'])->name('voirstockView');
Route::post('/Ajoutproduits', [ListeProduitsController::class, 'AjoutProduitPost'])->name('AjoutProduit.post');
Route::put('/updateproduit', [ListeProduitsController::class, 'updateproduit'])->name('updateproduit');
Route::delete('/deleteproduit', [ListeProduitsController::class, 'deleteproduit'])->name('deleteproduit');


// Commandes pour categories
Route::get('/Ajoutcategories', [ListeCategoriesController::class, 'AjouterCategorie'])->name('ajoutercategorieView');
Route::get('/voircategorie', [ListeCategoriesController::class, 'voircategorie'])->name('voircategorieView');
Route::post('/Ajoutcategories', [ListeCategoriesController::class, 'AjoutCategoriePost'])->name('AjoutCategorie.post');
Route::put('/updatecategorie/{id}', [ListeCategoriesController::class, 'updateCategorie'])->name('updatecategorie');
Route::delete('/deletecategorie/{id}', [ListeCategoriesController::class, 'deleteCategorie'])->name('deletecategorie');


// Route pour logs
Route::get('/historique-complet', function() {
    $historiqueComplet = LogController::afficherLogs(1000); // Charge jusqu'à 1000 logs
    return view('Logs.LogCompleteView', compact('historiqueComplet'));
})->name('historique.complet');


// Route pour la déconnexion
Route::get('/logout', [LoginController::class, 'logout'])->name('logout');
?>