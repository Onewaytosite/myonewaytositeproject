import React, { useState, useEffect } from 'react';
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Leaf, Loader2, TreeDeciduous } from "lucide-react";
import { motion } from "framer-motion";
import PlantCard from "@/components/plants/PlantCard";
import SearchFilter from "@/components/plants/SearchFilter";
import ProfileSetupForm from "@/components/profile/ProfileSetupForm";

export default function Home() {
  const [user, setUser] = useState(null);
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
          setUser(userData);
          if (!userData?.id_card_number || !userData?.position) {
            setNeedsSetup(true);
          }
        }
      } catch (error) {
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

  // แก้จุดตาย: บังคับให้เป็น Array เสมอก่อน filter
  const plants = Array.isArray(rawPlants) ? rawPlants : [];

  const filteredPlants = plants.filter(plant => {
    if (!plant) return false;
    const nameMatch = (plant.common_name?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const sciMatch = (plant.scientific_name?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesSearch = nameMatch || sciMatch;
    const matchesDept = selectedDepartment === 'all' || plant.department === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  if (checkingAuth) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-emerald-600" /></div>;

  if (needsSetup && isAuthenticated) return <ProfileSetupForm onComplete={() => setNeedsSetup(false)} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white p-8 pt-12 text-center">
        <TreeDeciduous className="mx-auto mb-4 h-16 w-16 bg-white/20 p-3 rounded-2xl" />
        <h1 className="text-2xl font-bold">ฐานข้อมูลพันธุ์พืช</h1>
        <p className="text-emerald-100">วิทยาลัยเทคนิคสระแก้ว</p>
      </div>

      <div className="p-4">
        <div className="mb-4 flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm">
          <Leaf className="h-10 w-10 text-emerald-600 bg-emerald-100 p-2 rounded-xl" />
          <div>
            <p className="text-2xl font-bold">{plants.length}</p>
            <p className="text-sm text-gray-500">พืชทั้งหมด</p>
          </div>
        </div>

        <SearchFilter 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          selectedDepartment={selectedDepartment} 
          setSelectedDepartment={setSelectedDepartment} 
        />

        {isLoading ? (
          <div className="py-10 text-center"><Loader2 className="mx-auto animate-spin text-emerald-600" /></div>
        ) : (
          <div className="mt-4 grid gap-3">
            {filteredPlants.map(plant => <PlantCard key={plant.id} plant={plant} />)}
          </div>
        )}
      </div>
    </div>
  );
}