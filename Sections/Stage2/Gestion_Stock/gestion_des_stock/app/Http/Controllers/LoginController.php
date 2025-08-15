<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;

class LoginController extends Controller
{
    // Affiche le formulaire de connexion
    public function login()
    {
        return view('login');
    }

    // Traite les informations de connexion
    public function loginPost(Request $request)
    {
        // Validation des champs
        $request->validate([
            'login_admin' => 'required',
            'password' => 'required',
        ]);

        // Récupère l'utilisateur avec le login fourni
        $admin = Admin::where('login_admin', $request->login_admin)->first();

        // Vérifie si l'utilisateur existe et le mot de passe est correct
        if ($admin && Hash::check($request->password, $admin->password_admin)) {
            // Authentifie l'utilisateur manuellement
            Auth::login($admin);

            // Redirection vers la page d'accueil si la connexion réussit
            return redirect()->intended(route('dashboardView'));
        }

        // Si la connexion échoue
        return redirect(route('login'))->with('error', 'Login ou mot de passe incorrect');
    }

    // Fonction pour déconnecter l'utilisateur
    public function logout()
    {
        Auth::logout();  // Déconnexion de l'utilisateur
        return redirect(route('login'));
    }
}