// App.js
import './App.css';
import Login from './page/Login';
import Home from './page/Home';
import Signin from './page/Signin';
import RequireAuth from './components/auth/RequireAuth';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* 認証不要なルート */}
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
            {/* 認証が必要なルート */}
            <Route path="/" element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
