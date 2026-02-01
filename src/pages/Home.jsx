import React from 'react';
import { Leaf, Cpu, MapPin, ChevronRight } from "lucide-react"; 
import { Link } from "react-router-dom";

const GARDEN_DATA = {
  college_name: "วิทยาลัยเทคนิคสระแก้ว",
  department_name: "เทคโนโลยีสารสนเทศ",
  zone: "สวนพฤกษศาสตร์ (IT GARDEN)",
  plants: [
    {
      id: 'it_01',
      common_name: 'ต้นฝรั่ง',
      scientific_name: 'Psidium guajava L.',
      images: ["/workpic1.jfif"],
      short_desc: 'วิตามินซีสูง ช่วยบำรุงเหงือกและฟัน'
    },
    {
      id: 'it_02',
      common_name: 'ต้นมะม่วง',
      scientific_name: 'Mangifera Indica',
      images: ["/workpic2.jfif"],
      short_desc: 'บำรุงสายตาและระบบขับถ่าย'
    }
  ]
}; 

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-[#1e1b4b] text-white p-10 pt-16 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Cpu size={150} />
        </div>
        <div className="relative z-10">
          <span className="bg-indigo-500 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Digital Garden</span>
          <h1 className="text-3xl font-bold tracking-tight mt-2">SKTC Garden</h1>
          <p className="text-indigo-300 text-sm mt-2 flex flex-col font-medium">
             <span>{GARDEN_DATA.college_name}</span>
             <span className="text-xs opacity-80">แผนกวิชา{GARDEN_DATA.department_name}</span>
          </p>
        </div>
      </div>

      <div className="p-5 max-w-md mx-auto -mt-8">
        {/* Stats Card */}
        <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-indigo-50 flex items-center justify-between mb-8">
          <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Plants Catalog</p>
            <p className="text-4xl font-black text-indigo-950">{GARDEN_DATA.plants.length} <span className="text-lg font-normal text-slate-400">ชนิด</span></p>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl">
            <Leaf className="h-7 w-7 text-white" />
          </div>
        </div>

        {/* Plant List */}
        <div className="space-y-4">
          {GARDEN_DATA.plants.map(plant => (
            <Link key={plant.id} to={`/PlantDetail/${plant.id}`}>
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:border-indigo-200 transition-all active:scale-[0.98]">
                <img src={plant.images[0]} className="w-20 h-20 rounded-xl object-cover shadow-inner" alt={plant.common_name} />
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 leading-tight">{plant.common_name}</h4>
                  <p className="text-[11px] text-slate-400 italic mb-2 leading-none">{plant.scientific_name}</p>
                  <p className="text-[11px] text-indigo-600 font-bold flex items-center gap-1">
                    <MapPin size={10} /> {GARDEN_DATA.zone}
                  </p>
                </div>
                <div className="bg-slate-50 p-2 rounded-full">
                  <ChevronRight className="text-slate-300 h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}