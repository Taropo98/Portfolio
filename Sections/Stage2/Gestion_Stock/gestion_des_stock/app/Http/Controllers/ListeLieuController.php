<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lieu;
use App\Models\Categorie;

class ListeLieuController extends Controller
{
    // Fonction pour afficher le tableau de bord principal
    public function AjouterLieu()
    {
        return view('Lieux.ajouterlieuView');
    }

    public function VoirLieu(Request $request)
    {
        $sort_by = $request->input('sort_by', 'nom_lieu'); // Tri par défaut par ordre alphabétique
        $order = $request->input('order', 'asc'); // Ordre par défaut croissant
        $search = $request->input('search'); // Récupérer la valeur du champ de recherche
        $per_page = $request->input('per_page', 6);

        $query = Lieu::query();
    
        // La recherche par nom ou catégorie
        if ($search) {
            $query->where('nom_lieu', 'LIKE', "{$search}%");}

        // Appliquer le tri et la pagination
        $lieux = $query->orderBy($sort_by, $order)->paginate($per_page);

        return view('Lieux.voirlieuView', compact('lieux'));
    }

    public function AjoutLieuPost(Request $request)
    {
        $lieu = new Lieu([
            'nom_lieu' => $request->get('nom_lieu'),
            'description' => $request->get('description')
        ]);

            // Ce lieu deviendra le lieu par défaut
            if ($request->has('default_lieu')) {
                if (Lieu::where('default_lieu', true)->exists()) {
                    // Un seul lieu peut avoir la propriété "default_lieu" en vrai
                    return redirect('/Ajoutlieux')->with('error', 'Un seul lieu peut avoir la propriété "default_lieu" en vrai.');
                }
                Lieu::where('default_lieu', true)->update(['default_lieu' => false]);
                $lieu->default_lieu = true;
            }

        $lieu->save();
        return redirect('/Ajoutlieux')->with('success', 'Lieu ajoutée avec succès');
    }
    
    public function updateLieu(Request $request)
    {
        // Valider les données
        $request->validate([
            'id' => 'required|exists:lieux,id_lieu',
            'nom_lieu' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Trouver le lieu à modifier
        $lieu = Lieu::findOrFail($request->id);

        // Mettre à jour les informations
        $lieu->update([
            'nom_lieu' => $request->nom_lieu,
            'description' => $request->description,
        ]);

        return redirect()->back()->with('success', 'Lieu mise à jour avec succès');
    }
    public function deletelieu(Request $request)
    {
        try {
            // Validation de la requête
            $request->validate([
                'id' => 'required|exists:lieux,id_lieu', // Assurez-vous d'utiliser la bonne colonne
            ]);
    
            // Recherche de la catégorie
            $lieu = Lieu::where('id_lieu', $request->id)->firstOrFail();
    
            // Suppression de la catégorie
            $lieu->delete();
    
            // Redirection avec un message de succès
            return redirect()->back()->with('success', 'Lieu supprimé avec succès.');
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Lieu non trouvé
            return redirect()->back()->with('error', 'Lieu introuvable.');
        } catch (\Exception $e) {
            // Autre erreur
            return redirect()->back()->with('error', 'Une erreur est survenue lors de la suppression : ' . $e->getMessage());
        }
    }    
}
?>