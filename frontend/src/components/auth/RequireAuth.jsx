// src/components/RequireAuth.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RequireAuth = ({ children }) => {
  const auth = useAuth();
  console.log('ログインユーザー情報',auth);
  if (!auth.user) {
    // 認証されていなければログインページへリダイレクト
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default RequireAuth;