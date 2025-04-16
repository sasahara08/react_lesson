import logo from './logo.svg';
import './App.css';
import Login from './page/Login';
import Home from './page/Home';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
        <Login />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
