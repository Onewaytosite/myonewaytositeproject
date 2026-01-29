import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig } from './pages.config'
import { Route, Routes } from 'react-router-dom'; 
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

// ดึงค่าอย่างปลอดภัย ใช้ Default Value เป็น Object เปล่าเสมอ
const { Pages = {}, Layout, mainPage } = pagesConfig || {};
const pageKeys = Pages ? Object.keys(Pages) : [];
const mainPageKey = mainPage ?? (pageKeys.length > 0 ? pageKeys[0] : null);
const MainPage = (mainPageKey && Pages[mainPageKey]) ? Pages[mainPageKey] : () => <div className="p-8 text-center">กำลังโหลดหน้าหลัก...</div>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth() || {};

  // 1. หน้าจอ Loading
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // 2. จัดการ Auth Error
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // ใช้ useEffect ภายใน useAuth หรือเรียกสั้นๆ แบบนี้ แต่ต้องระวัง loop
      setTimeout(() => navigateToLogin?.(), 0);
      return null;
    }
  }

  // 3. Render Routes อย่างปลอดภัย
  return (
    <Routes>
      {/* หน้าแรก */}
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />
      
      {/* วนลูปสร้างหน้าอื่นๆ โดยตรวจสอบว่าเป็น Object จริงไหม */}
      {Pages && typeof Pages === 'object' && Object.entries(Pages).map(([path, PageComponent]) => {
        if (!PageComponent) return null;
        return (
          <Route
            key={path}
            path={path.startsWith('/') ? path.substring(1) : path} 
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
        {/* บรรทัดข้างล่างนี้คือจุดเสี่ยง b.filter มากที่สุด ถ้ายังพังให้ลองใส่คอมเมนต์ปิดไว้ครับ */}
        {typeof NavigationTracker === 'function' && <NavigationTracker />}
        <AuthenticatedApp />
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App