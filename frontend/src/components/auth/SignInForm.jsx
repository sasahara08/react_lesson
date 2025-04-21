import React, { useState } from "react";
import LoginInput from "./InputField";
import FormButton from "./FormBtn";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PostRequest } from "../../utils/postComponent";

function SignInForm() {

    // フォームのusestateを設定
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [msg, setMsg] = useState("");

    // laravelのcontrollerにトークンと一緒にログインフォームのデータを送信。
    const handleSignin = async (e) => {
        // デフォルト動作をなくす(プリティチェックの表示が出ないようにするため)
        e.preventDefault()
        try {
            // サインイン情報を送信
            const response = await PostRequest('signin', { userName, email, password, confirmPassword });
            if (!response.data.msg && !response.data.errors) {
                console.log("新規登録完了");
                setMsg('新規登録が完了しました。');
            } else if (response.data.errors) {
                setMsg(response.data.errors);
            } else if (response.data.msg) {
                setMsg(response.data.msg);
            }
        } catch (error) {
            setMsg('サーバーエラーが発生しました。');
        }
    }

    // レンダー内容を返す
    return (
        <>
            <form onSubmit={(e) => handleSignin(e)}>

                {typeof msg === 'object'
                    ? Object.values(msg).flat().map((m, index) => <p key={index}>{m}</p>)
                    : <p>{msg}</p>}

                <LoginInput type="userName" name="userName" label="userName" placeholder="userName"
                    value={userName} onChange={(e) => setUserName(e.target.value)} />

                <LoginInput type="email" name="email" label="email" placeholder="email"
                    value={email} onChange={(e) => setEmail(e.target.value)} />

                <LoginInput type="password" name="password" label="password" placeholder="password"
                    value={password} onChange={(e) => setPassword(e.target.value)} />

                <LoginInput type="password" name="confirmPassword" label="confirmPassword" placeholder="confirmPassword"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                <FormButton type="submit" content="登録完了" />
            </form>
        </>
    );
}



export default SignInForm;