import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './contexts/AuthContext.jsx';
import DashboardView from './views/DashboardView.jsx';
import AuthView from './views/AuthView.jsx';

const MainApp = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin text-blue-600">
          {/* simple placeholder for loader */}
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.2"/><path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" /></svg>
        </div>
      </div>
    );
  }

  return user ? <DashboardView /> : <AuthView />;
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
