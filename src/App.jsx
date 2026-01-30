import React from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { PAGES, pagesConfig } from './pages.config' // Import PAGES มาโดยตรง
import { Route, Routes, Navigate } from 'react-router-dom'; 
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { Loader2 } from "lucide-react";

const { Layout } = pagesConfig || {};

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin, isAuthenticated } = useAuth() || {};

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
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
      {/* หน้าหลัก */}
      <Route path="/" element={
        <LayoutWrapper currentPageName="Home">
          <PAGES.Home />
        </LayoutWrapper>
      } />

      {/* หน้าโปรไฟล์ */}
      <Route path="/Profile" element={
        <LayoutWrapper currentPageName="Profile">
          <PAGES.Profile />
        </LayoutWrapper>
      } />

      {/* หน้าเพิ่มพืช */}
      <Route path="/AddPlant" element={
        <LayoutWrapper currentPageName="AddPlant">
          <PAGES.AddPlant />
        </LayoutWrapper>
      } />

      {/* หน้าแก้ไขพืช */}
      <Route path="/EditPlant/:id" element={
        <LayoutWrapper currentPageName="EditPlant">
          <PAGES.EditPlant />
        </LayoutWrapper>
      } />

      {/* หน้ารายละเอียดพืช */}
      <Route path="/PlantDetail/:id" element={
        <LayoutWrapper currentPageName="PlantDetail">
          <PAGES.PlantDetail />
        </LayoutWrapper>
      } />

      {/* จัดการ Path ที่ไม่รู้จัก */}
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
}เ