import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Adressages } from './pages/Adressages';
import { Annuaire } from './pages/Annuaire';
import { Messagerie } from './pages/Messagerie';
import { Gestion } from './pages/Gestion';
import { Profil } from './pages/Profil';
import { Spinner } from './components/ui/Spinner';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adressages"
            element={
              <ProtectedRoute>
                <Adressages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/annuaire"
            element={
              <ProtectedRoute>
                <Annuaire />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messagerie"
            element={
              <ProtectedRoute>
                <Messagerie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/gestion"
            element={
              <ProtectedRoute>
                <Gestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profil"
            element={
              <ProtectedRoute>
                <Profil />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
