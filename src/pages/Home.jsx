import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, RefreshCcw } from "lucide-react";
import { db, seedDatabase } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function Home() {
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "plants"), (snap) => {
      setPlants(snap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-emerald-50 pb-20">
      <header className="flex justify-between items-center p-6">
        <h1 className="text-emerald-800 text-lg font-black tracking-tighter">GREENCODE IT</h1>
        <div className="flex gap-2">
          <button onClick={seedDatabase} className="p-2 text-emerald-600"><RefreshCcw size={20}/></button>
          <button onClick={() => navigate('/profile')} className="p-2 bg-white rounded-full shadow-sm text-emerald-700"><User size={24}/></button>
        </div>
      </header>

      <div className="px-6">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-3.5 text-emerald-300" size={18} />
          <input type="text" placeholder="ค้นหาต้นไม้..." className="w-full bg-white rounded-2xl py-3.5 pl-12 shadow-sm border-none outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {plants.map((plant) => (
            <div key={plant.id} onClick={() => navigate(`/plant/${plant.id}`)} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-emerald-100 active:scale-95 transition-all">
              <img src={plant.images?.[0]} className="w-full h-32 object-cover" alt={plant.common_name} />
              <div className="p-3">
                <h3 className="font-bold text-slate-800 text-sm truncate">{plant.common_name}</h3>
                <p className="text-[10px] italic text-emerald-600 truncate">{plant.scientific_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}