import React, { useState } from "react";
import LoginInput from "./InputField";
import LoginButton from "./loginBtn";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignInForm() {
    // laravelのcontrollerにトークンと一緒にログインフォームのデータを送信。
    const handleLogin = async (e) => {
        // デフォルト動作をなくす(プリティチェックの表示が出ないようにするため)
        e.preventDefault()
    }
}

    

export default SignInForm;