import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { ArrowLeft, MapPin, Info, Leaf } from "lucide-react";
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function PlantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  // เลื่อนขึ้นบนสุดเสมอเมื่อเปิดหน้านี้
  useEffect(() => { 
    window.scrollTo(0, 0); 
    
    const fetchPlantDetail = async () => {
      try {
        const docRef = doc(db, "plants", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPlant(docSnap.data());
        } else {
          console.log("ไม่พบข้อมูลต้นไม้ในระบบ Cloud");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlantDetail();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
      <p className="text-slate-400 text-sm">กำลังดึงข้อมูลจาก Cloud...</p>
    </div>
  );

  if (!plant) return (
    <div className="p-10 text-center min-h-screen flex flex-col items-center justify-center">
      <p className="text-slate-400 mb-4">ไม่พบข้อมูลต้นไม้</p>
      <button onClick={() => navigate(-1)} className="text-indigo-600 font-bold">กลับหน้าหลัก</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ส่วนรูปภาพด้านบน */}
      <div className="relative h-[40vh]">
        <img 
          src={plant.images ? plant.images[0] : '/placeholder.jpg'} 
          alt={plant.common_name} 
          className="w-full h-full object-cover" 
        />
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-10 left-6 p-3 bg-white/90 rounded-2xl shadow-lg active:scale-90 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* ส่วนเนื้อหา */}
      <div className="px-6 -mt-10 relative pb-10">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-50">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-2xl font-black text-slate-900 leading-tight">{plant.common_name}</h1>
              <p className="text-indigo-600 italic text-xs mb-4">{plant.scientific_name}</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-600">
              <Leaf size={24} />
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-500 text-[10px] mb-6 bg-slate-50 px-3 py-2 rounded-full w-fit">
            <MapPin size={12} className="text-indigo-500" /> {plant.location_name}
          </div>

          <div className="space-y-6">
            {/* ข้อมูลพฤกษศาสตร์ it */}
            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
              <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3 text-sm">
                <Info size={16} className="text-indigo-500" /> ข้อมูลจากสวนพฤกษศาสตร์ it
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {plant.description || 'ยินดีต้อนรับสู่การเรียนรู้พฤกษศาสตร์ผ่านระบบดิจิทัล'}
              </p>
            </div>

            {/* ป้ายกำกับเพิ่มเติม */}
            <div className="flex gap-2">
              <span className="bg-blue-50 text-blue-600 text-[10px] px-3 py-1.5 rounded-xl font-bold">
                #ระบบสารสนเทศ
              </span>
              <span className="bg-purple-50 text-purple-600 text-[10px] px-3 py-1.5 rounded-xl font-bold">
                #GreenCodeIT
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}   