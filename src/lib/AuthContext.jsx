import React, { createContext, useState, useContext, useEffect } from 'react';
// เก็บ import เดิมไว้เผื่อเรียกใช้ แต่เราจะ bypass logic หลัก
import { base44 } from '@/api/base44Client';
import { appParams } from '@/lib/app-params';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // --- จุดสำคัญ: ตั้งค่าเริ่มต้นให้เหมือนคน Login แล้วจริงๆ ---
  const [user, setUser] = useState({
    id: 'user_01',
    name: 'Student Admin',
    email: 'admin@project.com',
    role: 'admin'
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [appPublicSettings, setAppPublicSettings] = useState({ id: appParams.appId });

  // ฟังก์ชันเช็คสถานะ เราทำให้มัน "สำเร็จทันที" (Mock)
  const checkAppState = async () => {
    setIsLoadingPublicSettings(true);
    setIsLoadingAuth(true);
    
    // จำลองการโหลดเล็กน้อยให้ดูเหมือนของจริง
    setTimeout(() => {
      setAuthError(null);
      setIsAuthenticated(true);
      setIsLoadingPublicSettings(false);
      setIsLoadingAuth(false);
    }, 500);
  };

  useEffect(() => {
    checkAppState();
  }, []);

  const logout = (shouldRedirect = true) => {
    console.log("Mock Logout Clicked");
    // ถ้าอยากให้ Logout ได้จริงตอนพรีเซนต์ ก็แค่เปลี่ยน state
    setUser(null);
    setIsAuthenticated(false);
  };

  const navigateToLogin = () => {
    console.log("Mock Redirect to Login");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      logout,
      navigateToLogin,
      checkAppState
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};