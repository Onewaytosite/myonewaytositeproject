import React, { useState, useEffect } from 'react';
import { Home, User } from "lucide-react"; // เอา Plus ออกแล้ว
import { useNavigate } from 'react-router-dom'; 
import { base44 } from "@/api/base44Client";

export default function Layout({ children, currentPageName }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const auth = await base44.auth.isAuthenticated();
        setIsAuthenticated(auth);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // แก้ตรงนี้: เอา "เพิ่มพืช" ออกไปแล้ว เหลือแค่ 2 เมนู
  const navItems = [
    { label: 'หน้าหลัก', icon: Home, path: '/Home', page: 'Home' },
    { label: 'โปรไฟล์', icon: User, path: '/Profile', page: 'Profile' }
  ];

  const handleNavClick = (path, page) => {
    // แก้ Logic ตรงนี้ให้เช็คเฉพาะ Profile เพราะ AddPlant ไม่มีแล้ว
    if (page === 'Profile' && !isAuthenticated) {
       base44.auth.redirectToLogin(window.location.origin + path);
       return;
    }
    navigate(path);
  };

  const shouldShowNav = !['PlantDetail', 'EditPlant'].includes(currentPageName);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ส่วนหัวสำหรับ Mobile */}
      <div className="fixed top-0 left-0 right-0 h-11 bg-indigo-900 z-50" /> {/* เปลี่ยนสีเป็นโทนน้ำเงินให้เข้ากับ SKTC Garden */}
      
      {/* เนื้อหาหลัก */}
      <div className={`flex-1 pt-11 ${shouldShowNav ? 'pb-20' : ''}`}>
        {children}
      </div>

      {/* แถบเมนูด้านล่าง */}
      {shouldShowNav && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-around h-16">
            {navItems.map((item) => {
              const isActive = currentPageName === item.page;
              const Icon = item.icon;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.path, item.page)}
                  className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all ${
                    isActive ? 'text-indigo-600' : 'text-gray-400 active:scale-95'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}