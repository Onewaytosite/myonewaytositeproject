import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { ArrowLeft, Droplets, Sun, MapPin, BookOpen, Thermometer } from "lucide-react";

// ข้อมูลรายละเอียด (สามารถดึงมารวมกันหรือแยกไฟล์ได้)
const PLANT_DETAILS = {
  "it_01": {
    name: 'ต้นฝรั่ง',
    scientific: 'Psidium guajava L.',
    desc: 'เป็นไม้ผลที่ให้วิตามินซีสูงมาก ช่วยต้านอนุมูลอิสระ และบำรุงเหงือกและฟัน มีถิ่นกำเนิดในอเมริกากลางและหมู่เกาะอินดีสตะวันตก',
    care: 'ชอบแสงแดดจัด ควรได้รับแสงแดดเต็มวัน รดน้ำพอชุ่มวันละ 1 ครั้งในช่วงเช้าหรือเย็น',
    stats: { water: "วันละครั้ง", sun: "แดดจัด", air: "ถ่ายเท" },
    image: "/workpic1.jfif"
  },
  "it_02": {
    name: 'ต้นมะม่วง',
    scientific: 'Mangifera Indica',
    desc: 'ไม้ยืนต้นยอดนิยม ผลทานได้ทั้งดิบและสุก ช่วยบำรุงสายตาและระบบขับถ่าย เป็นไม้ผลเศรษฐกิจที่สำคัญของไทย',
    care: 'ทนแล้งได้ดี เมื่อต้นโตเต็มที่รดน้ำ 2-3 วันครั้ง ชอบดินร่วนปนทรายที่ระบายน้ำได้ดี',
    stats: { water: "2-3 วันครั้ง", sun: "แดดจัด", air: "กลางแจ้ง" },
    image: "/workpic2.jfif"
  }
};

export default function PlantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const plant = PLANT_DETAILS[id];

  if (!plant) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-slate-800">ขออภัย ไม่พบข้อมูลต้นไม้ ID นี้</h2>
        <button onClick={() => navigate('/Home')} className="mt-4 text-indigo-600 font-bold">กลับหน้าหลัก</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="relative h-[40vh] w-full">
        <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <button onClick={() => navigate(-1)} className="absolute top-12 left-6 p-3 bg-white/90 backdrop-blur rounded-2xl shadow-lg active:scale-95 transition-all">
          <ArrowLeft size={20} className="text-slate-800" />
        </button>
      </div>

      <div className="px-6 -mt-16 relative z-10">
        <div className="bg-white rounded-[3rem] p-8 shadow-2xl border border-slate-50">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-black text-slate-900 leading-tight">{plant.name}</h1>
              <p className="text-indigo-600 italic font-semibold text-sm">{plant.scientific}</p>
            </div>
            <span className="bg-indigo-50 text-indigo-600 text-[10px] px-3 py-1 rounded-full font-bold">ID: {id}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-xs mb-8 bg-slate-50 w-fit px-4 py-2 rounded-full font-medium">
            <MapPin size={14} className="text-indigo-500" /> หลังอาคาร 60ปี (IT GARDEN)
          </div>

          <div className="grid grid-cols-3 gap-3 mb-8">
            <StatBox icon={<Droplets className="text-blue-500" />} label="รดน้ำ" value={plant.stats.water} color="bg-blue-50" />
            <StatBox icon={<Sun className="text-orange-500" />} label="แดด" value={plant.stats.sun} color="bg-orange-50" />
            <StatBox icon={<Thermometer className="text-emerald-500" />} label="อากาศ" value={plant.stats.air} color="bg-emerald-50" />
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                <div className="w-1.5 h-5 bg-indigo-600 rounded-full" /> ข้อมูลทั่วไป
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">{plant.desc}</p>
            </section>
            <section>
              <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                <div className="w-1.5 h-5 bg-emerald-500 rounded-full" /> การดูแลรักษา
              </h3>
              <div className="bg-slate-50 p-5 rounded-[2rem] border border-dashed border-slate-200">
                <p className="text-slate-600 text-sm italic">{plant.care}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ icon, label, value, color }) {
  return (
    <div className={`${color} p-4 rounded-[2rem] flex flex-col items-center text-center`}>
      <div className="mb-1">{icon}</div>
      <span className="text-[9px] text-slate-400 font-bold uppercase">{label}</span>
      <span className="text-[10px] text-slate-800 font-bold">{value}</span>
    </div>
  );
}