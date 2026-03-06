<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;

class LogController extends Controller
{
    // Ajouter un log dans le fichier correspondant à la date
    public static function ajouterLog($message)
    {
        $date = now();
        $annee = $date->year;
        $mois = $date->format('m');
        $jour = $date->format('d');

        // Construire le chemin du fichier log (ex: logs/2025/01/19.log)
        $cheminFichier = "logs/{$annee}/{$mois}/{$jour}.log";

        // Ajouter le message dans le fichier
        Storage::append($cheminFichier, "[" . now() . "] " . $message);
    }

    // Lire les logs du jour
    public static function afficherLogs($limite = 5)
    {
        $date = now();
        $annee = $date->year;
        $mois = $date->format('m');
        $jour = $date->format('d');

        $cheminFichier = "logs/{$annee}/{$mois}/{$jour}.log";

        if (!Storage::exists($cheminFichier)) {
            return [];
        }

        $logs = Storage::get($cheminFichier) ? explode("\n", Storage::get($cheminFichier)) : [];

        // Ne garder que les derniers logs selon la limite définie
        return array_slice(array_filter($logs), -$limite);
    }
}