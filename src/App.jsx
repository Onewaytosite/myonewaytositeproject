import React from 'react'; 
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { PAGES, pagesConfig } from './pages.config'
import { Route, Routes, Navigate } from 'react-router-dom'; 
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { Loader2 } from "lucide-react";

// ดึง Layout ออกมาใช้งาน
const Layout = pagesConfig?.Layout;

const LayoutWrapper = ({ children, currentPageName }) => {
  // ถ้ามี Layout ให้ครอบ children ไว้ ถ้าไม่มีให้ส่ง children ออกไปเลย
  return Layout ? (
    <Layout currentPageName={currentPageName}>{children}</Layout>
  ) : (
    <>{children}</>
  );
};

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth() || {};

  // 1. จัดการเรื่อง Loading ระหว่างเช็คสิทธิ์
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  // 2. จัดการเรื่อง Error ของ Authentication
  if (authError) {
    if (authError.type === 'user_not_registered') return <UserNotRegisteredError />;
    if (authError.type === 'auth_required') {
      setTimeout(() => navigateToLogin?.(), 0);
      return null;
    }
  }

  return (
    <Routes>
      {/* 3. จัดการ Routing ให้แม่นยำ */}
      {/* เข้าเว็บมาครั้งแรก ให้ดีดไปหน้า Home เสมอ */}
      <Route path="/" element={<Navigate to="/Home" replace />} />
      
      {/* หน้าหลักที่เชื่อมกับแถบเมนูด้านล่าง */}
      <Route path="/Home" element={<LayoutWrapper currentPageName="Home"><PAGES.Home /></LayoutWrapper>} />
      <Route path="/AddPlant" element={<LayoutWrapper currentPageName="AddPlant"><PAGES.AddPlant /></LayoutWrapper>} />
      <Route path="/Profile" element={<LayoutWrapper currentPageName="Profile"><PAGES.Profile /></LayoutWrapper>} />
      
      {/* หน้าเจาะลึกพืช (ซ่อนแถบเมนูอัตโนมัติจากเงื่อนไขใน Layout) */}
      <Route path="/PlantDetail/:id" element={<LayoutWrapper currentPageName="PlantDetail"><PAGES.PlantDetail /></LayoutWrapper>} />
      <Route path="/EditPlant/:id" element={<LayoutWrapper currentPageName="EditPlant"><PAGES.EditPlant /></LayoutWrapper>} />
      
      {/* 4. ป้องกันหน้าขาว 404: ถ้า Path ไม่ตรงกับข้างบน ให้ตีกลับไปหน้า Home */}
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