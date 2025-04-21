<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Log;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

// //ログイン処理
// Route::post('/login', function () {
//     Log::debug('🔥 login route hit!');
//     return response()->json(['msg' => 'ルート確認OK']);
// });

//新規登録処理
Route::post('/signIn', [AuthController::class,'signIn']);

require __DIR__.'/auth.php';
