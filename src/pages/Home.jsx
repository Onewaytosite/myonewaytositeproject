import React, { useEffect, useState } from 'react';
import { Leaf, Cpu, MapPin, ChevronRight, User, Home as HomeIcon, RefreshCw } from "lucide-react"; 
import { Link, useNavigate } from "react-router-dom";
import { db, seedDatabase } from '../lib/firebase'; 
import { collection, getDocs } from 'firebase/firestore';

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const COLLEGE_INFO = {
    college_name: "วิทยาลัยเทคนิคสระแก้ว",
    department_name: "เทคโนโลยีสารสนเทศ"
  };

  useEffect(() => {
    const savedData = localStorage.getItem('user_profile_info');
    if (savedData) setUserData(JSON.parse(savedData));

    const fetchPlants = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "plants"));
        const plantsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPlants(plantsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <div className="bg-[#1e1b4b] text-white p-10 pt-20 shadow-2xl relative overflow-hidden">
        <Link to="/Profile" className="absolute top-12 right-6 z-50 bg-white/10 p-2.5 rounded-2xl backdrop-blur-md border border-white/20 active:scale-90 transition-all shadow-lg">
          <User size={24} className="text-white" />
        </Link>
        <div className="absolute top-0 right-0 opacity-10"><Cpu size={150} /></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
             <span className="bg-indigo-500 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Digital Garden</span>
             {userData && <span className="bg-emerald-500 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest flex items-center gap-1"><User size={8} /> {userData.position}</span>}
          </div>
          <h1 className="text-2xl font-bold tracking-tight">สวัสดี, <span className="text-indigo-400">{userData?.full_name || 'ผู้เยี่ยมชม'}</span></h1>
          <p className="text-indigo-300 text-xs mt-3 flex flex-col font-medium opacity-90">
              <span>{COLLEGE_INFO.college_name}</span>
              <span className="opacity-70">แผนกวิชา{COLLEGE_INFO.department_name}</span>
          </p>
        </div>
      </div>

      <div className="p-5 max-w-md mx-auto -mt-8">
        <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-indigo-50 flex items-center justify-between mb-8">
          <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Plants Catalog</p>
            <p className="text-4xl font-black text-indigo-950">{plants.length} <span className="text-lg font-normal text-slate-400">ชนิด</span></p>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-lg shadow-indigo-200"><Leaf className="h-7 w-7 text-white" /></div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center px-1 mb-2">
            <h3 className="text-slate-800 font-bold">รายการต้นไม้ทั้งหมด</h3>
            <button onClick={seedDatabase} className="text-[10px] text-slate-400 flex items-center gap-1"><RefreshCw size={10} /> Sync Cloud</button>
          </div>

          {loading ? (
            <div className="text-center py-10 text-slate-400">กำลังโหลด...</div>
          ) : (
            plants.map(plant => (
              <Link key={plant.id} to={`/PlantDetail/${plant.id}`}>
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:border-indigo-200 active:scale-[0.98] transition-all">
                  <img src={plant.images[0]} className="w-20 h-20 rounded-xl object-cover" alt={plant.common_name} />
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 leading-tight">{plant.common_name}</h4>
                    <p className="text-[11px] text-slate-400 italic mb-2">{plant.scientific_name}</p>
                    <p className="text-[11px] text-indigo-600 font-bold flex items-center gap-1"><MapPin size={10} /> {plant.location_name}</p>
                  </div>
                  <ChevronRight className="text-slate-300 h-4 w-4" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      <div className="fixed bottom-8 left-6 z-50">
        <button onClick={() => navigate('/Home')} className="bg-[#1e1b4b] text-white px-6 py-4 rounded-2xl shadow-2xl border-2 border-indigo-400/30 flex items-center gap-3 active:scale-95 transition-all">
          <div className="bg-indigo-50 p-1.5 rounded-lg text-indigo-900"><HomeIcon size={20} /></div>
          <span className="font-bold text-sm tracking-wide">เมนูหลัก</span>
        </button>
      </div>
    </div>
  );
}