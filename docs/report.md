# larabel・react(SPA)プロジェクト

### １．バックエンドセットアップ
- larabelインストール
  - ```composer create-project laravel/laravel larabel```
  
- breezeインストール(ログインシステム)
  - ``` composer require laravel/breeze --dev```
  - ``` php artisan breeze:install api ```
  
- .env設定変更(mysql)
  - ```DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=brewshere
    DB_USERNAME=root
    DB_PASSWORD=root
    ```

  - フロントエンドのオリジンを設定(環境変数の追記)
    - ``` SANCTUM_STATEFUL_DOMAINS="localhost:port" ```

- 起動
  - ```php artisan serve
    ```
### ２．フロントエンドセットアップ
- Reactインストール
  - ```npx create-react-app frontend ```
- Reactその他セットインストール
  - ```cd frontend
    npm i @mui/material @emotion/react @emotion/styled @mui/icons-material axios
  - ```
    cd frontend 
    npm start
  - ```
    ルーティング用: npm install react-router-dom
    ```

### ３．reactコード記述

<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'login', 'signIn', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:3000'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
