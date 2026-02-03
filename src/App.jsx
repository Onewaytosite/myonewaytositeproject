import React from 'react'; 
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

  // ตรวจสอบว่ามีข้อมูลโปรไฟล์ในเครื่องหรือยัง (ใช้เป็นตัว Login)
  const hasProfile = localStorage.getItem('user_profile_info');

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <Routes>
      {/* 1. หน้าแรกสุด: ถ้าไม่มีโปรไฟล์ ให้ไปหน้า Profile (หน้า Setup) ถ้ามีแล้วไป Home */}
      <Route path="/" element={hasProfile ? <Navigate to="/Home" replace /> : <Navigate to="/Profile" replace />} />

      {/* 2. หน้า Home: ต้องมีโปรไฟล์ถึงเข้าได้ */}
      <Route path="/Home" element={
        hasProfile ? (
          <LayoutWrapper currentPageName="Home"><PAGES.Home /></LayoutWrapper>
        ) : (
          <Navigate to="/Profile" replace />
        )
      } />

      {/* 3. หน้า Profile: เข้าได้ตลอด (เพื่อไปกรอกข้อมูล) */}
      <Route path="/Profile" element={
        <LayoutWrapper currentPageName="Profile"><PAGES.Profile /></LayoutWrapper>
      } />

      {/* 4. หน้าอื่นๆ: ต้องมีโปรไฟล์ทั้งหมด */}
      <Route path="/AddPlant" element={
        hasProfile ? <LayoutWrapper currentPageName="AddPlant"><PAGES.AddPlant /></LayoutWrapper> : <Navigate to="/Profile" replace />
      } />
      
      <Route path="/PlantDetail/:id" element={
        hasProfile ? <LayoutWrapper currentPageName="PlantDetail"><PAGES.PlantDetail /></LayoutWrapper> : <Navigate to="/Profile" replace />
      } />
      
      <Route path="/EditPlant/:id" element={
        hasProfile ? <LayoutWrapper currentPageName="EditPlant"><PAGES.EditPlant /></LayoutWrapper> : <Navigate to="/Profile" replace />
      } />

      <Route path="*" element={<Navigate to={hasProfile ? "/Home" : "/Profile"} replace />} />
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