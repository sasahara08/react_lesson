<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use Illuminate\Container\Attributes\Auth;
use App\Http\Controllers\AuthController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    // Log::debug('テストログ出力');
    return $request->user();
});

//ログイン処理
Route::post('/login', [AuthController::class,'login']);

//ログアウト処理
Route::post('/logout', [AuthController::class,'logout']);

//新規登録処理
Route::post('/signin', [AuthController::class,'signin']);
