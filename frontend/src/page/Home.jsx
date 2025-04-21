import FromButton from "../components/auth/FormBtn";
import { useAuth } from "../context/AuthContext";

export default function Home() {
    const { logout } = useAuth(); // Contextからlogoutを取得

    const handleLogout = (e) => {
        e.preventDefault();
        logout(); // Contextのlogoutを呼び出し
    };

    return (
        <>
            <h2>ホーム</h2>
            <form onSubmit={()=>handleLogout}>
                <FromButton type="submit" content="logout" />
            </form>
        </>
    );
}