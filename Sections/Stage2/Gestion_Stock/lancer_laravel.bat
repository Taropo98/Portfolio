@echo off
cd C:\Users\petri\Documents\ECOLE_annee_2\Portfoglio\Portfoglio prof\Portofoglio\Sections\informatique\Gestion_Stock\gestion_des_stock
start cmd /k "php artisan serve"
timeout /t 2 >nul
start http://localhost:8000/DashBoardView