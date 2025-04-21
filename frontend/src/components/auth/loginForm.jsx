import React, { useState } from "react";
import LoginInput from "./InputField";
import FormButton from "./FormBtn";
import { PostRequest } from "../../utils/postComponent";
import { useNavigate } from "react-router-dom";

function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // laravelのcontrollerにトークンと一緒にログインフォームのデータを送信。
    const handleLogin = async (e) => {

        // デフォルト動作をなくす(プリティチェックの表示が出ないようにするため)
        e.preventDefault();

        try {
            // ログイン情報を送信
            const response = await PostRequest('login', { email, password });
            console.log(response);

            if (response.data.user) {
                console.log("ログイン成功:", response.data.user);
                navigate('/');
            } else if (response.data.msg) {
                console.log("ログイン失敗:", response.data.msg);
                setError(response.data.msg);
            } else if (response.data.errors) {
                console.log("バリデーションエラー:", response.data.errors.password[0]);
                setError(response.data.errors.password[0]);
            } else {
                console.log("不明なレスポンス:", response.data);
            }


        } catch (err) {
            if (err.response?.data?.errors) {
                setError(err.response.data.errors);
            } else {
                setError("サーバーエラーが発生しました。");
            }
        }
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <p>{error}</p>
                <InputField type="email" name="email" label="email" placeholder="email"
                    value={email} onChange={(e) => setEmail(e.target.value)} />

                <InputField type="password" name="password" label="password" placeholder="password"
                    value={password} onChange={(e) => setPassword(e.target.value)} />

                <FormButton type="submit" content="login" />
            </form>

            <form action="/signin" method="get">
                <FormButton type="submit" content="新規登録" />
            </form>
        </>
    )
}

export default LoginForm;