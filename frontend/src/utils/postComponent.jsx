import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const PostRequest = async (PostRequestUrl, posuContent) => {
    try {
        // csrfトークンを取得
        await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
            // クロスオリジンでの通信を許可 (laravel<--->react)
            withCredentials: true
        })
        // Cookiesからトークンを取得
        const csrfToken = Cookies.get('XSRF-TOKEN');
        console.log("トークン取得完了", { posuContent });

        // ログイン情報を送信
        const response = await axios.post(`http://localhost:8000/api/${PostRequestUrl}`,
            posuContent, {
            withCredentials: true,
            headers: {
                'X-XSRF-TOKEN': decodeURIComponent(csrfToken)
            }
        });

        console.log("レスポンス内容:", response.data);
        console.log("レスポンス内容:", response.data.user);

        // postで取得したjsonを返す。
        if (response) {
            return response;
        }

    } catch (err) {
        throw err;
    }
}