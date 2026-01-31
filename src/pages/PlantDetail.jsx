import React from 'react';
import { ArrowLeft, MapPin, Info, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const PLANTS_DATA = [
  {
    id: 'it_01',
    common_name: 'ต้นล่ำซำ',
    scientific_name: 'Diospyros buxifolia',
    location: 'ลานหน้าทางเข้าอาคารแผนก IT',
    images: ["https://images.unsplash.com/photo-1599023344186-061614243573?w=800"],
    description: 'เป็นไม้ยืนต้นที่ไม่ผลัดใบ ใบมีสีเขียวเข้มเป็นมันเงา นิยมปลูกเพื่อให้ร่มเงาและเสริมฮวงจุ้ยด้านความมั่งคั่งตามชื่อต้นไม้ เหมาะกับพื้นที่พักผ่อนหน้าแผนก'
  },
  {
    id: 'it_02',
    common_name: 'ไทรเกาหลี',
    scientific_name: 'Ficus annulata',
    location: 'กำแพงต้นไม้ฝั่งโรงจอดรถ IT',
    images: ["https://images.unsplash.com/photo-1584444262846-e2716db1294b?w=800"],
    description: 'ไม้พุ่มทรงสูง ลำต้นตั้งตรง ใบเรียงตัวหนาแน่น นิยมนำมาทำเป็นกำแพงต้นไม้เพื่อดักจับฝุ่นและพรางสายตา เพิ่มความเป็นส่วนตัวให้กับพื้นที่แผนก'
  }
];

export default function PlantDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const plantId = urlParams.get('id');
  const plant = PLANTS_DATA.find(p => p.id === plantId);

  if (!plant) return <div className="p-20 text-center font-bold text-slate-400">404 | ไม่พบข้อมูลพืช</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* 1. ส่วนปุ่มย้อนกลับ */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 pt-10 flex items-center">
        <Link to={createPageUrl("Home")}>
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-slate-200 hover:bg-white transition-colors">
            <ArrowLeft className="text-slate-900 w-5 h-5" />
          </button>
        </Link>
      </div>

      {/* 2. ส่วนรูปภาพ */}
      <img src={plant.images[0]} alt={plant.common_name} className="w-full aspect-[4/5] object-cover shadow-2xl" />
      
      {/* 3. ส่วนเนื้อหาหลัก */}
      <div className="relative -mt-12 bg-white rounded-t-[3rem] p-8 shadow-2xl border-t border-slate-100 min-h-[50vh]">
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
        
        <div className="mb-8">
          <h2 className="text-4xl font-black text-slate-900 mb-2 leading-tight">{plant.common_name}</h2>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm italic">
            <Globe size={14} />
            <span>{plant.scientific_name}</span>
          </div>
        </div>

        <div className="grid gap-6">
          {/* ส่วนตำแหน่ง */}
          <div className="flex gap-4 items-start">
            <div className="bg-indigo-50 p-3 rounded-2xl">
              <MapPin className="text-indigo-600 h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ตำแหน่งในแผนก IT</p>
              <p className="text-slate-700 font-bold">{plant.location}</p>
            </div>
          </div>

          {/* ส่วนรายละเอียด */}
          <div className="flex gap-4 items-start border-t border-slate-50 pt-6">
            <div className="bg-amber-50 p-3 rounded-2xl">
              <Info className="text-amber-600 h-6 w-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">ข้อมูลทางพฤกษศาสตร์</p>
              <p className="text-slate-600 leading-relaxed font-medium text-sm">
                {plant.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}