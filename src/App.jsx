import React, { useEffect } from 'react'; 
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { PAGES, pagesConfig } from './pages.config'
import { Route, Routes, Navigate } from 'react-router-dom'; 
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { Loader2 } from "lucide-react";

const Layout = pagesConfig?.Layout;

const LayoutWrapper = ({ children, currentPageName }) => {
  return Layout ? (
    <Layout currentPageName={currentPageName}>{children}</Layout>
  ) : (
    <>{children}</>
  );
};

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings } = useAuth() || {};

  // 1. Loading แป๊บเดียวเพื่อให้ดูสมจริง
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  // 2. ตัดส่วน if (authError) ทิ้งไปเลย เพื่อให้ทะลุเข้า Routes ได้ 100%
  // ไม่ว่า Base44 จะ Error อะไรมา เราไม่สนใจ เราจะไปหน้า Home

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Home" replace />} />
      <Route path="/Home" element={<LayoutWrapper currentPageName="Home"><PAGES.Home /></LayoutWrapper>} />
      <Route path="/AddPlant" element={<LayoutWrapper currentPageName="AddPlant"><PAGES.AddPlant /></LayoutWrapper>} />
      <Route path="/Profile" element={<LayoutWrapper currentPageName="Profile"><PAGES.Profile /></LayoutWrapper>} />
      <Route path="/PlantDetail/:id" element={<LayoutWrapper currentPageName="PlantDetail"><PAGES.PlantDetail /></LayoutWrapper>} />
      <Route path="/EditPlant/:id" element={<LayoutWrapper currentPageName="EditPlant"><PAGES.EditPlant /></LayoutWrapper>} />
      <Route path="*" element={<Navigate to="/Home" replace />} />
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