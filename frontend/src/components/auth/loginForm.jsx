import React, { useState } from "react";
import LoginInput from "./InputField";
import LoginButton from "./loginBtn";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // laravelのcontrollerにトークンと一緒にログインフォームのデータを送信。
    const handleLogin = async (e) => {

        // デフォルト動作をなくす(プリティチェックの表示が出ないようにするため)
        e.preventDefault()

        // csrfトークンを取得
        try {
            await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
                // クロスオリジンでの通信を許可 (laravel<--->react)
                withCredentials: true
            })

            // ログイン情報を送信
            await axios.post("http://localhost:8000/login", { email, password }, {
                // クロスオリジンでの通信を許可 (laravel<--->react)
                withCredentials: true
            })
            .then(Response => {
                // responseにデータエラーメッセージがなければhomeに遷移
                if(!Response.data.msg){
                    
                    navigate('/Home')
                }else{
                    setError(Response.data.msg);
                }
            })

        } catch (error) {
            setError('エラーが発生しました。');
        }
    }

    return (
        <>
            <form onSubmit={handleLogin} action="/">
                <p>{error}</p>
                <LoginInput type="email" name="email" label="email" placeholder="email"
                    value={email} onChange={(e) => setEmail(e.target.value)} />

                <LoginInput type="password" name="password" label="password" placeholder="password"
                    value={password} onChange={(e) => setPassword(e.target.value)} />

                <LoginButton type="submit" content="login" />

            </form>
        </>
    )
}

export default LoginForm;