import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, RefreshCcw, Leaf } from "lucide-react";
import { db, seedDatabase } from '../lib/firebase'; // เช็คว่า import seedDatabase มาแล้ว
import { collection, onSnapshot, query } from 'firebase/firestore';

export default function Home() {
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ใช้ onSnapshot เพื่อให้ข้อมูลอัปเดตแบบ Real-time ทันทีที่กด Sync
    const q = query(collection(db, "plants"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const plantData = [];
      querySnapshot.forEach((doc) => {
        plantData.push({ ...doc.data(), id: doc.id });
      });
      setPlants(plantData);
    });

    return () => unsubscribe();
  }, []);

  const handleSync = async () => {
    await seedDatabase();
    // ข้อมูลจะอัปเดตเองอัตโนมัติจาก onSnapshot ด้านบน
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-indigo-600 p-8 rounded-b-[3rem] shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-2xl font-black italic tracking-tighter">GREEN IT</h1>
          <button 
            onClick={handleSync}
            className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-2xl text-xs backdrop-blur-md border border-white/10 active:scale-95 transition-all"
          >
            <RefreshCcw size={14} /> Sync Cloud
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-3.5 text-indigo-300" size={18} />
          <input 
            type="text" 
            placeholder="ค้นหาต้นไม้ในสวน IT..." 
            className="w-full bg-white/10 border border-white/20 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {plants.map((plant) => (
            <div 
              key={plant.id} 
              onClick={() => navigate(`/plant/${plant.id}`)}
              className="bg-white rounded-[2rem] p-3 shadow-sm border border-slate-100 active:scale-95 transition-all"
            >
              <div className="h-32 rounded-[1.5rem] overflow-hidden mb-3">
                <img 
                  src={plant.images ? plant.images[0] : '/placeholder.jpg'} 
                  className="w-full h-full object-cover" 
                  alt={plant.common_name} 
                />
              </div>
              <h3 className="font-bold text-slate-800 text-sm px-1 truncate">{plant.common_name}</h3>
              <p className="text-[10px] text-slate-400 px-1 mb-2">{plant.location_name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}