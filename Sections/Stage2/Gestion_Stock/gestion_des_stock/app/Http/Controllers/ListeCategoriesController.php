<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categorie;
use App\Models\Lieu;

class ListeCategoriesController extends Controller
{
    /**
     * Affiche la liste des catégories avec pagination et options de tri/recherche.
     */
    
    public function voircategorie(Request $request)
    {
        // Récupérer les catégories paginées avec leur lieu associé
        $query = Categorie::whereIn('id_categorie', function($query) {
            $query->selectRaw('MIN(id_categorie)')
                  ->from('categories')
                  ->groupBy('nom_categorie');
        });
     
        // Filtrage par recherche
        if ($request->has('search') && $request->search != '') {
            $query->where('nom_categorie', 'LIKE', '%' . $request->search . '%');
        }
     
        // Tri par colonne
        if ($request->has('sort_by') && $request->has('order')) {
            $query->orderBy($request->sort_by, $request->order);
        } else {
            $query->orderBy('nom_categorie', 'asc'); // Tri par défaut
        }
     
        // Paginer les catégories
        $paginatedCategories = $query->paginate($request->get('per_page', 6));
     
        // Grouper les catégories manuellement après pagination
        $groupedCategories = collect($paginatedCategories->items())->groupBy('nom_categorie')->map(function ($group) {
            $description = $group->first()->description; // Description de la première catégorie
            $lieux = $group->pluck('lieu')->filter(); // Récupérer les lieux associés
            return [
                'id_categorie' => $group->first()->id_categorie,
                'nom_categorie' => $group->first()->nom_categorie,
                'description' => $description,
                'lieux' => $lieux,
            ];
        });
     
        // Convertir les catégories regroupées en une collection paginée
        $paginatedGroupedCategories = new \Illuminate\Pagination\LengthAwarePaginator(
            $groupedCategories->values(),
            $paginatedCategories->total(),
            $paginatedCategories->perPage(),
            $paginatedCategories->currentPage(),
            ['path' => $paginatedCategories->path()]
        );
     
         return view('Categories.voircategorieView', compact('paginatedGroupedCategories'));
     }
     


    /**
     * Affiche le formulaire pour ajouter une nouvelle catégorie.
     */
    public function AjouterCategorie()
    {
        $lieux = Lieu::all();
        return view('Categories.ajoutercategorieView', compact('lieux'));
    }

    /**
     * Enregistre une nouvelle catégorie.
     */
    public function AjoutCategoriePost(Request $request)
    {
        $validated = $request->validate([
            'nom_categorie' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Verifie si le nom de la categorie existe deja
        if (Categorie::where('nom_categorie', $validated['nom_categorie'])->exists()) {
            return redirect()->route('AjouterCategorie')->with('error', 'La catégorie existe deja.');
        }

        // Obtenir le lieu par défaut si id_lieu n'est pas fourni
        $lieuParDefaut  = $request->input('id_lieu', Lieu::first()->id_lieu);

        if (!$lieuParDefaut) {
            return redirect()->route('voircategorieView')->with('error', 'Aucun lieu par défaut défini.');
        }

        Categorie::create([
            'nom_categorie' => $validated['nom_categorie'],
            'description' => $validated['description'],
            'id_lieu' => $lieuParDefaut ,
        ]);

        return redirect()->route('voircategorieView')->with('success', 'Catégorie ajoutée avec succès.');
    }


    /**
     * Met à jour une catégorie existante.
     */
    public function updateCategorie(Request $request, $id)
    {
        $validated = $request->validate([
            'nom_categorie' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $categorie = Categorie::findOrFail($id);

        $categorie->update([
            'nom_categorie' => $validated['nom_categorie'],
            'description' => $validated['description'],
        ]);

        return redirect()->route('voircategorieView')->with('success', 'Catégorie mise à jour avec succès.');
    }

    /**
     * Supprime une catégorie.
     */
    public function deleteCategorie($id)
    {
        $categorie = Categorie::findOrFail($id);
        $categorie->delete();

        return redirect()->route('voircategorieView')->with('success', 'Catégorie supprimée avec succès.');
    }
}