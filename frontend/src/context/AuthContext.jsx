import React, { createContext, useContext, useEffect, useState } from "react";

// context生成
const AuthContext = createContext(undefined);

// provider設定
export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 始めのローディング時にlaravel側からログイン状況を取得
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/user", {
                    withCredentials: true
                });
                setUser(res.data);
            } catch (err) {
                setUser(null); // 未ログイン
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // ログアウト処理
    const logout = async () => {
        await axios.post("http://localhost:8000/logout", {}, {
            withCredentials: true
        });
        setUser(null);
    };

    // AuthContextのProviderにuser情報を代入
    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, setUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// contextコンポーネントの子要素内で、context要素をいつでも呼び出せる
// = useAuth();
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
