import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ArrowLeft, Info } from 'lucide-react';

export default function PlantDetail() {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlant = async () => {
      const docRef = doc(db, "plants", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setPlant(docSnap.data());
    };
    fetchPlant();
  }, [id]);

  if (!plant) return <div className="p-10 text-emerald-600 font-bold">กำลังดาวน์โหลดข้อมูล...</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-80">
        <img src={plant.images[0]} className="w-full h-full object-cover" />
        <button onClick={() => navigate(-1)} className="absolute top-6 left-6 p-2 bg-black/20 backdrop-blur-md rounded-full text-white"><ArrowLeft /></button>
      </div>

      <div className="p-8 -mt-8 bg-white rounded-t-[2.5rem] relative">
        <h1 className="text-3xl font-black text-slate-800">{plant.common_name}</h1>
        <p className="text-emerald-600 italic mb-6">{plant.scientific_name}</p>

        <div className="space-y-4">
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
            <h4 className="font-bold text-emerald-800 flex items-center gap-2 mb-2"><Info size={16}/> ข้อมูลพฤกษศาสตร์</h4>
            <p className="text-sm text-slate-600"><b>วงศ์:</b> {plant.family_name}</p>
            <p className="text-sm text-slate-600 mt-1"><b>ลักษณะ:</b> {plant.characteristics}</p>
            <p className="text-sm text-slate-600 mt-1"><b>การขยายพันธุ์:</b> {plant.propagation}</p>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">{plant.description}</p>
        </div>
      </div>
    </div>
  );
}