<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // バリデーション(エラーはjsonで送信)
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'password' => 'required|min:8',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()]);
        }

        // postからログイン情報を取得
        $email = $request->email;
        $password = $request->password;

        // メールアドレスからユーザーを取得
        $user = User::where('email', $email)->first();

        // ログイン処理
        if (!$email && !$password) {
            return response()->json(["msg" => "メールアドレスとパスワードを入力してください"]);
        } elseif (!$user) {
            return response()->json(["msg" => "メールアドレスもしくはパスワードが間違えています"]);
        } elseif (!Hash::check($user->password, $password)) {
            return response()->json(["msg" => "メールアドレスもしくはパスワードが間違えています"]);
        } else {
            // sessionにログイン情報を追加してjsonを渡す
            session(['loginUser' => $user]);
            return response()->json(['user'=> $user]);
        }
    }

    public function signIn(Request $request){

        // バリデーション(エラーはjsonで送信)
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'password' => 'required|min:8|string|regex:/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])[!-~]+$/',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()]);
        }

        // postからユーザー情報を取得
        $name = $request->name;
        $email = $request->email;
        $password = $request->password;

        // データベースにユーザー情報を保存
        User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password)
        ]);
    }
}
