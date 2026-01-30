import React from 'react'; // ห้ามลืมบรรทัดนี้!
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { pagesConfig } from './pages.config'
import { Route, Routes } from 'react-router-dom'; 
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { Loader2 } from "lucide-react";

const { Pages = {}, Layout, mainPage } = pagesConfig || {};

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth() || {};

  if (isLoadingPublicSettings || isLoadingAuth) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-emerald-600" /></div>;
  }

  if (authError) {
    if (authError.type === 'user_not_registered') return <UserNotRegisteredError />;
    if (authError.type === 'auth_required') {
      setTimeout(() => navigateToLogin?.(), 0);
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPage || "Home"}>
          {mainPage && Pages[mainPage] ? React.createElement(Pages[mainPage]) : <div>กำลังโหลด...</div>}
        </LayoutWrapper>
      } />
      {Object.entries(Pages).map(([path, PageComponent]) => (
        <Route key={path} path={path.replace(/^\//, '')} element={
          <LayoutWrapper currentPageName={path}><PageComponent /></LayoutWrapper>
        } />
      ))}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <AuthenticatedApp />
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}