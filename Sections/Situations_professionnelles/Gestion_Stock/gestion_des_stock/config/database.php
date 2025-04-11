<?php
/* database.php */

use Illuminate\Support\Str;

return [

    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    |
    | Ici, on spécifie quelle connexion à la base de données sera utilisée par 
    | défaut pour les opérations de la base de données. Si aucune autre connexion
    | n'est explicitement mentionnée dans une requête, c'est cette connexion qui
    | sera utilisée.
    |
    */

    'default' => env('DB_CONNECTION', 'mysql'),
    // Ici, la connexion par défaut est récupérée depuis le fichier `.env`.
    // Si aucune valeur n'est définie dans `.env`, la connexion 'sqlite' sera utilisée par défaut.

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    |
    | C'est ici que toutes les connexions de base de données possibles sont définies. 
    | Laravel supporte plusieurs types de bases de données comme MySQL, PostgreSQL,
    | SQLite, SQL Server, etc.
    | Pour chaque type de base, un exemple de configuration est donné.
    |
    */

    'connections' => [

        // Configuration pour SQLite, une base de données légère qui fonctionne avec un fichier
        'sqlite' => [
            'driver' => 'sqlite',
            'url' => env('DB_URL'),
            'database' => env('DB_DATABASE', database_path('database.sqlite')),
            'prefix' => '',
            'foreign_key_constraints' => env('DB_FOREIGN_KEYS', true),
        ],

        // Configuration pour MySQL
        'mysql' => [
            'driver' => 'mysql',
            'url' => env('DB_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'laravel'),
            'username' => env('DB_USERNAME', 'root'),  
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => env('DB_CHARSET', 'utf8mb4'), 
            'collation' => env('DB_COLLATION', 'utf8mb4_unicode_ci'),
            'prefix' => '',
            'prefix_indexes' => true, 
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        // Configuration pour MariaDB (un fork de MySQL)
        'mariadb' => [
            // Configuration similaire à MySQL, mais avec le driver MariaDB
            'driver' => 'mariadb',
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'laravel'),
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => env('DB_CHARSET', 'utf8mb4'),
            'collation' => env('DB_COLLATION', 'utf8mb4_unicode_ci'),
            'prefix' => '',
            'strict' => true,
            'engine' => null,
        ],

        // Configuration pour PostgreSQL
        'pgsql' => [
            'driver' => 'pgsql',  // Driver PostgreSQL
            'host' => env('DB_HOST', '127.0.0.1'),  // Hôte pour PostgreSQL
            'port' => env('DB_PORT', '5432'),  // Port PostgreSQL par défaut (5432)
            'database' => env('DB_DATABASE', 'laravel'),  // Nom de la base de données
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => env('DB_CHARSET', 'utf8'),  // Charset pour PostgreSQL
            'prefix' => '',  // Pas de préfixe
            'prefix_indexes' => true,  // Activer les index avec préfixe
            'search_path' => 'public',  // Chemin de recherche pour PostgreSQL
            'sslmode' => 'prefer',  // SSL activé
        ],

        // Configuration pour SQL Server (Microsoft)
        'sqlsrv' => [
            'driver' => 'sqlsrv',  // Driver SQL Server
            'host' => env('DB_HOST', 'localhost'),
            'port' => env('DB_PORT', '1433'),  // Port SQL Server par défaut (1433)
            'database' => env('DB_DATABASE', 'laravel'),
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', ''),
            'charset' => env('DB_CHARSET', 'utf8'),  // Charset UTF-8
            'prefix' => '',  // Pas de préfixe
            'prefix_indexes' => true,  // Activer les index avec préfixe
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Migration Repository Table
    |--------------------------------------------------------------------------
    |
    | Cette table `migrations` stocke les informations sur les migrations qui
    | ont déjà été exécutées. Elle permet à Laravel de savoir quelles migrations
    | ont déjà été appliquées.
    |
    */

    'migrations' => [
        'table' => 'migrations',
        'update_date_on_publish' => true,  // Permet d'actualiser les dates si besoin
    ],

    /*
    |--------------------------------------------------------------------------
    | Redis Databases
    |--------------------------------------------------------------------------
    |
    | Redis est un système de cache avancé basé sur des clés-valeurs. Laravel
    | permet de l'utiliser pour le cache ou d'autres opérations rapides.
    |
    */

    'redis' => [

        'client' => env('REDIS_CLIENT', 'phpredis'),  // Le client Redis (par défaut 'phpredis')

        'options' => [
            'cluster' => env('REDIS_CLUSTER', 'redis'),  // Cluster Redis
            'prefix' => env('REDIS_PREFIX', Str::slug(env('APP_NAME', 'laravel'), '_').'_database_'),
            // Un préfixe pour différencier les clés dans Redis
        ],

        // Connexion par défaut à Redis
        'default' => [
            'url' => env('REDIS_URL'),
            'host' => env('REDIS_HOST', '127.0.0.1'),  // Hôte Redis (localhost)
            'username' => env('REDIS_USERNAME'),  // Nom d'utilisateur Redis
            'password' => env('REDIS_PASSWORD'),  // Mot de passe Redis
            'port' => env('REDIS_PORT', '6379'),  // Port Redis par défaut (6379)
            'database' => env('REDIS_DB', '0'),  // Base de données Redis par défaut (0)
        ],

        // Connexion pour le cache
        'cache' => [
            'url' => env('REDIS_URL'),
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'username' => env('REDIS_USERNAME'),
            'password' => env('REDIS_PASSWORD'),
            'port' => env('REDIS_PORT', '6379'),
            'database' => env('REDIS_CACHE_DB', '1'),  // Base Redis dédiée au cache (1)
        ],

    ],

];

