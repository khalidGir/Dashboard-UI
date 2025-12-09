import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import ChartsGrid from './components/ChartsGrid';
import RecentActivity from './components/RecentActivity';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import { useThemeStore } from './store/useThemeStore';
import { useUIStore } from './store/useUIStore';

// Lazily load page components
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const DataTablePage = lazy(() => import('./pages/DataTablePage'));

// Main dashboard page component
const DashboardPage = () => (
  <>
    <StatsGrid />
    <ChartsGrid />
    <RecentActivity />
  </>
);

// Main layout component
const MainLayout = () => {
  return (
    <div className="flex bg-bg-primary dark:bg-bg-primary min-h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Header />
        <main className="p-6">
          <Suspense fallback={<div className="flex items-center justify-center h-screen w-screen text-2xl text-primary animate-pulse">Loading Application...</div>}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/data-table" element={<DataTablePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="flex items-center justify-center h-screen w-screen text-2xl text-primary animate-pulse">Loading Application...</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
