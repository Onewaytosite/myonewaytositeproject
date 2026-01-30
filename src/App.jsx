import React from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { pagesConfig } from './pages.config'
import { Route, Routes } from 'react-router-dom'; 
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

const { Pages = {}, Layout, mainPage } = pagesConfig || {};

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const AuthenticatedApp = () => {
  const authContext = useAuth();
  const { isLoadingAuth = false, isLoadingPublicSettings = false, authError = null, navigateToLogin = () => {} } = authContext || {};

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      setTimeout(() => navigateToLogin(), 0);
      return null;
    }
  }

  const pageEntries = (Pages && typeof Pages === 'object') ? Object.entries(Pages) : [];

  return (
    <Routes>
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPage || "home"}>
          {mainPage && Pages[mainPage] ? React.createElement(Pages[mainPage]) : <div>หน้าหลัก</div>}
        </LayoutWrapper>
      } />
      
      {pageEntries.map(([path, PageComponent]) => {
        if (!PageComponent) return null;
        return (
          <Route
            key={path}
            path={path.replace(/^\//, '')} 
            element={
              <LayoutWrapper currentPageName={path}>
                <PageComponent />
              </LayoutWrapper>
            }
          />
        );
      })}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <AuthenticatedApp />
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App  