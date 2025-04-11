<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lieu;
use App\Models\Produit;
use App\Models\Categorie;

class ListeProduitsController extends Controller
{
    // Fonction pour afficher le tableau de bord principal
    public function AjouterProduit()
    {
        // Récupérer les catégories uniques par nom (première occurrence)
        $categories = Categorie::whereIn('id_categorie', function($query) {
            $query->selectRaw('MIN(id_categorie)')
                  ->from('categories')
                  ->groupBy('nom_categorie');
        })->get();

        $lieux = Lieu::all(); // Récupérer tout les lieux
        return view('produits.ajouterproduitView', compact('lieux', 'categories')); // Passer les catégories à la vue
    }
    public function voirstock(Request $request)
    {
        // Sélectionner les produits uniques par nom avec leur première occurrence
        $query = Produit::whereIn('id_produit', function($query) {
            $query->selectRaw('MIN(id_produit)')
                ->from('produits')
                ->groupBy('nom_produit');
        })->with(['categorie.lieu']);
    
        // Filtrage par recherche
        if ($request->has('search') && $request->search != '') {
            $query->where('nom_produit', 'LIKE', '%' . $request->search . '%');
        }
    
        // Tri par colonne
        if ($request->has('sort_by') && $request->has('order')) {
            $query->orderBy($request->sort_by, $request->order);
        } else {
            $query->orderBy('nom_produit', 'asc');
        }
    
        // Pagination
        $paginatedProducts = $query->paginate($request->get('per_page', 6));
    
        // Récupérer TOUS les produits du même nom pour les quantités par lieu
        $allProducts = Produit::with('categorie.lieu')
            ->whereIn('nom_produit', $paginatedProducts->pluck('nom_produit'))
            ->get();
    
        // Grouper et consolider les quantités
        $groupedProducts = $allProducts->groupBy('nom_produit')->map(function ($group) {
            $lieux = $group->mapToGroups(function ($item) {
                return [$item->categorie->lieu->nom_lieu => $item->quantite];
            })->map(function ($quantities) {
                return $quantities->sum();
            });
    
            return [
                'id_produit' => $group->first()->id_produit,
                'code_produit' => $group->first()->code_produit,
                'nom_produit' => $group->first()->nom_produit,
                'nom_categorie' => $group->first()->categorie->nom_categorie ?? 'N/A',
                'description' => $group->first()->description,
                'lieux' => $lieux,
                'quantite' => $lieux->sum(),
                'limite' => $group->first()->limite
            ];
        });
    
        // Créer une pagination personnalisée
        $paginatedGroupedProducts = new \Illuminate\Pagination\LengthAwarePaginator(
            $groupedProducts->values(),
            $paginatedProducts->total(),
            $paginatedProducts->perPage(),
            $paginatedProducts->currentPage(),
            ['path' => $paginatedProducts->path()]
        );
    
        $categories = Categorie::all();
        return view('Produits.voirstockView', compact('paginatedGroupedProducts', 'categories'));
    }


    public function AjoutProduitPost(Request $request)
    {
        // Validation des champs
        $request->validate([
            'code_produit' => 'required|unique:produits,code_produit,' . $request->id . ',id_produit', // Validation unique pour mise à jour
            'nom_produit' => 'required',
            'quantite' => 'required|integer|min:1',
            'limite' => 'nullable|integer|min:0', // Peut être null mais pas négatif',
            'description' => 'nullable',
            'categorie_id' => 'required|exists:categories,id_categorie', // Vérifie que le categorie existe
        ]);

        $limite = $request->filled('limite') ? (int) $request->limite : 0;

        // Créer un nouveau produit avec les données du formulaire
        Produit::create([
            'nom_produit' => $request->nom_produit,
            'quantite' => $request->quantite,
            'limite' => $limite,
            'description' => $request->description,
            'categorie_id' => $request->categorie_id,
            'code_produit' => $request->code_produit. '-' . Lieu::where('default_lieu', true)->value('nom_lieu'),
    ]);

        return redirect('/Ajoutproduits')->with('success', 'Produit ajouté avec succès');
    }

    public function updateproduit(Request $request)
    {
        // Validation des données
        $request->validate([
            'id' => 'required|exists:produits,id_produit',
            'code_produit' => 'required|string|max:255',
            'nom_produit' => 'required|string|max:255',
            'description' => 'nullable|string',
            'quantite' => 'required|integer',
            'limite' => 'nullable|integer|min:0',
            'categorie_id' => 'required|exists:categories,id_categorie', // Nouvelle catégorie
        ]);
    
        // Obtenir le lieu par défaut
        $lieuParDefaut = Lieu::where('default_lieu', true)->first();
    
        if (!$lieuParDefaut) {
            return redirect()->back()->with('error', 'Aucun lieu par défaut défini.');
        }
    
        // Récupérer le produit d'origine
        $produitOrigine = Produit::findOrFail($request->id);
        $codePrincipal = explode('-', $produitOrigine->code_produit)[0];
    
        // Récupérer tous les produits ayant ce même code principal (dans tous les lieux)
        $produits = Produit::where('code_produit', 'LIKE', $codePrincipal . '-%')->get();
    
        if ($produits->isEmpty()) {
            return redirect()->back()->with('error', 'Produit introuvable.');
        }
    
        // ✅ **Mise à jour des informations produit (nom, description)**
        foreach ($produits as $produit) {
            $lieu = $produit->categorie->lieu; // Récupérer le lieu actuel du produit
    
            // Vérifier si la nouvelle catégorie existe déjà dans ce lieu
            $nouvelleCategorie = Categorie::where('nom_categorie', Categorie::find($request->categorie_id)->nom_categorie)
                ->where('id_lieu', $lieu->id_lieu)
                ->first();
    
            if (!$nouvelleCategorie) {
                // Créer une nouvelle catégorie si elle n'existe pas
                $nouvelleCategorie = Categorie::create([
                    'nom_categorie' => Categorie::find($request->categorie_id)->nom_categorie,
                    'description' => Categorie::find($request->categorie_id)->description,
                    'id_lieu' => $lieu->id_lieu,
                ]);
            }
    
            // Mettre à jour le produit
            $produit->update([
                'nom_produit' => $request->nom_produit,
                'description' => $request->description,
                'categorie_id' => $nouvelleCategorie->id_categorie, // ✅ Associer la catégorie spécifique au lieu
            ]);
        }
    
        // ✅ **Mettre à jour uniquement la quantité du produit dans le lieu par défaut**
        $produitLieuParDefaut = $produits->firstWhere(function ($produit) use ($lieuParDefaut) {
            return $produit->categorie->id_lieu == $lieuParDefaut->id_lieu;
        });
    
        if ($produitLieuParDefaut) {
            $produitLieuParDefaut->update([
                'quantite' => $request->quantite,
                'limite' => $request->limite
            ]);
        }
    
        // ✅ **Mise à jour du code produit après toutes les modifications**
        foreach ($produits as $produit) {
            $lieuNom = explode('-', $produit->code_produit)[1] ?? ''; // Récupérer le nom du lieu existant
            $produit->update([
                'code_produit' => $request->code_produit . '-' . $lieuNom, // Appliquer le nouveau code
            ]);
        }
    
        return redirect()->back()->with('success', 'Produit mis à jour avec succès.');
    }    


    public function deleteproduit(Request $request)
    {
        try {
            // Validation de la requête
            $request->validate([
                'id' => 'required|exists:produits,id_produit', // Assurez-vous d'utiliser la bonne colonne
            ]);
    
            // Recherche du produit
            $produit = Produit::where('id_produit', $request->id)->firstOrFail();
    
            // Suppression du produit
            $produit->delete();
    
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
?>