<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        Log::debug('/login');

        // バリデーション(エラーはjsonで送信)
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            Log::debug('バリデーションエラー:');
            return response()->json(['errors' => $validator->errors()]);
        }

        $email = $request->email;
        $password = $request->password;

        Log::debug('リクエスト内容', ['email' => $email, 'password' => $password]);

        $user = User::where('email', $email)->first();
        Log::debug('ユーザー検索結果:', ['user' => $user]);

        if (!$email || !$password) {
            Log::debug('ログイン情報の入力が不足しています');
            return response()->json(["msg" => "メールアドレスとパスワードを入力してください"]);
        } elseif (!$user) {
            Log::debug('存在しないユーザーを検索しています');
            return response()->json(["msg" => "メールアドレスもしくはパスワードが間違えています"]);
        } elseif (!Hash::check($password, $user->password)) {
            Log::debug('パスワードが一致しません');
            return response()->json(["msg" => "メールアドレスもしくはパスワードが間違えています"]);
        } else {
            Log::debug('認証成功');
            Auth::login($user);

            Log::debug('レスポンスで返すuser:', $user->toArray());

            return response()->json([
                'user' => $user
            ], 200);
        }
    }

    // ログアウト処理
    public function logout(Request $request)
    {
        Auth::logout();
    }

    // 新規登録処理
    public function signin(Request $request)
    {
        try {
            // バリデーション(エラーはjsonで送信)
            $validator = Validator::make($request->all(), [
                'userName' => 'required|max:255',
                'email' => 'required|email|max:255',
                'password' => 'required|min:8|string|regex:/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])[!-~]+$/',
                'confirmPassword' => 'required|same:password',
            ],[
                'userName.required' => 'ユーザー名を入力ください。',
                'email.required' => 'メールアドレスを入力ください。',
                'password.required' => 'パスワードを入力ください。',
                'confirmPassword.required' => 'パスワード(確認用)を入力ください。',
                'userName.max' => 'ユーザー名は255文字以内で入力ください。',
                'password.regex' => 'パスワードには半角小文字、半角大文字、数字をそれぞれ1文字づつ入力ください。',
                'confirmPassword.same' => 'パスワード(確認用)が入力したパスワードに一致しません。',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()]);
            }

            // postからユーザー情報を取得
            $name = $request->userName;
            $email = $request->email;
            $password = $request->password;

            // データベースにユーザー情報を保存
            // 既にメールアドレスが存在する場合はエラーメッセージをjsonを返すだけ
            if (User::where('email', $request->email)->exists()) {
                return response()->json(['msg' => 'そのメールアドレスは既に登録されています']);
            } else {
                User::create([
                    'name' => $name,
                    'email' => $email,
                    'password' => Hash::make($password)
                ]);
            }
        } catch (Exception $err) {
            Log::error('新規登録エラー', ['error' => $err->getMessage()]);
            return response()->json(['msg' => 'サーバーエラーが発生'], 500);
        }
    }
}
