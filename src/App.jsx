import React, { useEffect } from 'react'; 
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { PAGES, pagesConfig } from './pages.config'
import { Route, Routes, Navigate } from 'react-router-dom'; 
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
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
  const { 
    isLoadingAuth, 
    isLoadingPublicSettings, 
    authError, 
    isAuthenticated, // ดึงสถานะยืนยันตัวตนมาใช้
    user 
  } = useAuth() || {};

  // 1. จัดการเรื่อง Loading
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  // 2. ปรับ logic การเช็คสิทธิ์ (แก้จุดนี้เพื่อให้ Login แล้วอยู่ยาว)
  // ถ้ามี User หรือยืนยันตัวตนผ่านแล้ว ให้ข้ามหน้าสมัครสมาชิกไปเลย
  if (authError && !user) {
    if (authError.type === 'user_not_registered') return <UserNotRegisteredError />;
    if (authError.type === 'auth_required') {
       // แทนที่จะดีดไป Login ทันที ให้ลองปล่อยผ่านไปหน้า Routes ก่อน 
       // หรือจะให้เรียกหน้า Login เฉพาะตอนที่ไม่มี data จริงๆ
       console.log("Authentication required, but proceeding to app shell...");
    }
  }

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