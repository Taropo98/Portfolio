<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Lieu;
use App\Models\Categorie;
use App\Models\Produit;

class DashBoardController extends Controller
{
    public function dashboard()
    {
        // Charger les relations pour affichage dans la vue
        $lieux = Lieu::with('categories')->get();
        $categories = Categorie::with('lieu')->get();
        $produits = Produit::with('categorie.lieu')->get();

        // Obtenir le lieu par défaut
        $lieuParDefaut = Lieu::where('default_lieu', true)->first();

        
        if ($lieuParDefaut) {

            // Suppression des catégories vides (sauf lieu par défaut)
            $categoriesSupprimees = Categorie::whereDoesntHave('produits')
                ->where('id_lieu', '!=', $lieuParDefaut->id_lieu)
                ->get();
            foreach ($categoriesSupprimees as $categorie) {
                LogController::ajouterLog("Suppression de la catégorie '{$categorie->nom_categorie}' dans '{$categorie->lieu->nom_lieu}' car elle est vide.");
                $categorie->delete();
            }
            // Vérifier si la quantité ne pas au-dessous de la limte pour chaque produit dans le lieu par défaut
            // Si la quantité est insuffisante, message d'erreur pour rappel ou il y aura le nom du produit, sa quantite, sa limite et la quantité à commander pour arrive à cette limite

            // Vérification des produits sous leur limite dans le lieu par défaut
            $produitsEnAlerte = [];
            $produitsSousLimite = Produit::whereHas('categorie.lieu', function ($query) use ($lieuParDefaut) {
                    $query->where('id_lieu', $lieuParDefaut->id_lieu);
                })
                ->whereColumn('quantite', '<', 'limite')
                ->get();

            foreach ($produitsSousLimite as $produit) {
                $quantiteManquante = max(0, $produit->limite - $produit->quantite);
                $produitsEnAlerte[] = [
                    'nom' => $produit->nom_produit,
                    'quantite' => $produit->quantite,
                    'limite' => $produit->limite,
                    'a_commander' => $quantiteManquante
                ];
                LogController::ajouterLog("Alerte : '{$produit->nom_produit}' est en-dessous de la limite ({$produit->quantite} / {$produit->limite}). Quantité à commander : {$quantiteManquante}");
            }
        }

        // Charger les logs pour affichage dans le dashboard
        $historique = LogController::afficherLogs(5);

        $variables = ['lieux', 'categories', 'produits', 'historique'];

        if (!empty($produitsEnAlerte)) {
            $variables[] = 'produitsEnAlerte';
        }
        
        return view('dashboard.dashboardView', compact(...$variables));
    }

    public function moveProduit(Request $request)
    {
        try {
            // Validation des données d'entrée
            $validated = $request->validate([
                'produit_id' => 'required|integer|exists:produits,id_produit',
                'lieu_id' => 'required|integer|exists:lieux,id_lieu',
                'quantite' => 'required|integer|min:1',
                
            ]);

            // Récupérer le produit
            $produit = Produit::findOrFail($validated['produit_id']);

            // Vérifier si la quantité demandée est disponible
            if ($produit->quantite < $validated['quantite']) {
                return response()->json(['error' => 'Quantité insuffisante pour le déplacement.'], 400);
            }

            // Réduire la quantité du produit dans le lieu d'origine
            $produit->quantite -= $validated['quantite'];
            $produit->save();

            // Étape 1 : Trouver ou créer une nouvelle catégorie dans le lieu cible
            $nouvelleCategorie = Categorie::firstOrCreate(
                [
                    'nom_categorie' => $produit->categorie->nom_categorie,
                    'id_lieu' => $validated['lieu_id'], // Associer au lieu cible
                ],
                [
                    'description' => $produit->categorie->description,
                ]
            );

            // Étape 2 : Construire le nouveau code produit
            $lieuDestination = Lieu::find($validated['lieu_id']);
            $nouveauCodeProduit = explode('-', $produit->code_produit)[0] . '-' . $lieuDestination->nom_lieu;

            // Étape 3 : Rechercher un produit existant dans la catégorie cible
            $produitDestination = Produit::where('code_produit', $nouveauCodeProduit)
                ->where('categorie_id', $nouvelleCategorie->id_categorie)
                ->first();

            if ($produitDestination) {
                // Le produit existe déjà, augmenter simplement la quantité
                $produitDestination->quantite += $validated['quantite'];
                $produitDestination->save();
            } else {
                // Créer un nouveau produit dans la catégorie cible
                Produit::create([
                    'nom_produit' => $produit->nom_produit,
                    'description' => $produit->description,
                    'code_produit' => $nouveauCodeProduit,
                    'quantite' => $validated['quantite'],
                    'limite' => $produit->limite,
                    'categorie_id' => $nouvelleCategorie->id_categorie,
                ]);
            }

            // Étape 4 : Vérifier si la catégorie et le produit d'origine doivent être supprimés

            // Obtenir le lieu par défaut
            $lieuParDefaut = Lieu::where('default_lieu', true)->first();

            if (!$lieuParDefaut) {
                return redirect()->back()->with('error', 'Aucun lieu par défaut défini.');
            }

            // Vérifier si le produit d'origine doit être supprimé (sauf si il appartient au lieu par défaut)
            if ($produit->categorie && $produit->categorie->id_lieu != $lieuParDefaut->id_lieu) {
                $produit->delete();
            }

            // Vérifier si la catégorie d'origine doit aussi etre supprimée (sauf si elle appartient au lieu par défaut)
            $produitsRestants = Produit::where('categorie_id', $produit->categorie_id)->count();
            if ($produitsRestants == 0 && $produit->categorie && $produit->categorie->id_lieu != $lieuParDefaut->id_lieu) {
                $produit->categorie->delete();
            }

            // Enregistrer l'action via LogController
            LogController::ajouterLog("Déplacement du produit '{$produit->nom_produit}' vers '{$lieuDestination->nom_lieu}' (Quantité: {$validated['quantite']})");

            return response()->json(['message' => 'Produit déplacé avec succès']);
        } catch (\Exception $e) {
            Log::error('Erreur moveProduit : ' . $e->getMessage());
            LogController::ajouterLog("Erreur lors du déplacement d'un produit : " . $e->getMessage());
            
            return response()->json(['error' => 'Erreur interne du serveur. Consultez les logs pour plus de détails.'], 500);
        }
    }

    public function deleteproduit(Request $request)
    {
        try {
            // Validation de la requête
            $request->validate([
                'id' => 'required|exists:produits,id_produit',
                'quantite' => 'required|integer|min:1',
            ]);
    
            // Recherche du produit
            $produit = Produit::where('id_produit', $request->id)->firstOrFail();
    
            // Suppression du produit avec la quantite choisi
            $produit->quantite -= $request->quantite;
            $produit->save();

            if($produit->quantite <= 0) {
                $produit->delete();
            }
    
            // Redirection avec un message de succès
            return redirect()->back()->with('success', 'Produit supprimé avec succès.');
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Produit non trouvé
            return redirect()->back()->with('error', 'Produit introuvable.');
        } catch (\Exception $e) {
            // Autre erreur
            return redirect()->back()->with('error', 'Une erreur est survenue lors de la suppression : ' . $e->getMessage());
        }
    }
}