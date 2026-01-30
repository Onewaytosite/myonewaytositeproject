import React, { useState, useEffect } from 'react';
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Leaf, Loader2, TreeDeciduous } from "lucide-react";
import PlantCard from "@/components/plants/PlantCard";
import SearchFilter from "@/components/plants/SearchFilter";
import ProfileSetupForm from "@/components/profile/ProfileSetupForm";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await base44.auth.isAuthenticated();
        setIsAuthenticated(authenticated);
        if (authenticated) {
          const userData = await base44.auth.me();
          // เช็คว่ากรอกข้อมูลพื้นฐานครบหรือยัง
          if (!userData?.id_card_number || !userData?.position) {
            setNeedsSetup(true);
          }
        }
      } catch {
        // แก้ไข: ลบ (e) ออกเพื่อเคลียร์ Error 'e' is defined but never used
        setIsAuthenticated(false);
      }
      setCheckingAuth(false);
    };
    checkAuth();
  }, []);

  const { data: rawPlants, isLoading } = useQuery({
    queryKey: ['plants'],
    queryFn: () => base44.entities.Plant.list('-created_date'),
  });

  const plants = Array.isArray(rawPlants) ? rawPlants : [];

  const filteredPlants = plants.filter(plant => {
    if (!plant) return false;
    const nameMatch = (plant.common_name?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const sciMatch = (plant.scientific_name?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesDept = selectedDepartment === 'all' || plant.department === selectedDepartment;
    return (nameMatch || sciMatch) && matchesDept;
  });

  if (checkingAuth) return (
    <div className="flex h-screen items-center justify-center bg-white">
      <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
    </div>
  );

  if (needsSetup && isAuthenticated) {
    return <ProfileSetupForm onComplete={() => setNeedsSetup(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white p-8 pt-12 text-center shadow-lg">
        <TreeDeciduous className="mx-auto mb-4 h-16 w-16 bg-white/20 p-3 rounded-2xl" />
        <h1 className="text-2xl font-bold">ฐานข้อมูลพันธุ์พืช</h1>
        <p className="text-emerald-100 opacity-90">วิทยาลัยเทคนิคสระแก้ว</p>
      </div>

      <div className="p-4 max-w-md mx-auto">
        <div className="mb-6 flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-emerald-50">
          <div className="bg-emerald-100 p-3 rounded-xl">
            <Leaf className="h-8 w-8 text-emerald-600" />
          </div>
          <div>
            <p className="text-3xl font-black text-emerald-950">{plants.length}</p>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">พืชทั้งหมดในระบบ</p>
          </div>
        </div>

        <SearchFilter 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          selectedDepartment={selectedDepartment} 
          setSelectedDepartment={setSelectedDepartment} 
        />

        {isLoading ? (
          <div className="py-20 text-center">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-emerald-600" />
            <p className="mt-4 text-gray-400 font-medium">กำลังโหลดข้อมูล...</p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4">
            {filteredPlants.length > 0 ? (
              filteredPlants.map(plant => (
                <PlantCard key={plant.id} plant={plant} />
              ))
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center border-2 border-dashed border-gray-100">
                <p className="text-gray-400">ไม่พบข้อมูลพืชที่ค้นหา</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}