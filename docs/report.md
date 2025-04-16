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