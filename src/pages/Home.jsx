import React, { useEffect, useState } from 'react';
import { Leaf, Cpu, MapPin, ChevronRight, User } from "lucide-react"; 
import { Link } from "react-router-dom";

const GARDEN_DATA = {
  college_name: "วิทยาลัยเทคนิคสระแก้ว",
  department_name: "เทคโนโลยีสารสนเทศ",
  plants: [
    { id: 'it_01', common_name: 'ต้นฝรั่ง', scientific_name: 'Psidium guajava L.', images: ["/workpic1.jfif"], location_name: 'สวนพฤกษศาสตร์ it' },
    { id: 'it_02', common_name: 'ต้นมะม่วง', scientific_name: 'Mangifera Indica', images: ["/workpic2.jfif"], location_name: 'สวนพฤกษศาสตร์ it' },
    { id: 'it_03', common_name: 'ดอกบัว (บัวหลวง)', scientific_name: 'Nelumbo nucifera', images: ["/workpic3.jpg"], location_name: 'สวนพฤกษศาสตร์ ข้างตึกม่วง' },
    { id: 'it_04', common_name: 'ต้นคริสติน่า', scientific_name: 'Syzygium australe', images: ["/workpic4.jpg"], location_name: 'สวนพฤกษศาสตร์ ข้างตึกม่วง' },
    { id: 'it_05', common_name: 'ต้นกระบองเพชร', scientific_name: 'Cactaceae', images: ["/workpic5.jpg"], location_name: 'สวนพฤกษศาสตร์ it' },
    { id: 'it_06', common_name: 'ต้นตะเคียน', scientific_name: 'Hopea odorata', images: ["/workpic6.jpg"], location_name: 'สวนพฤกษศาสตร์ it' },
    { id: 'it_07', common_name: 'ต้นกล้วย', scientific_name: 'Musa sapientum', images: ["/workpic7.jpg"], location_name: 'สวนพฤกษศาสตร์ it' },
    { id: 'it_08', common_name: 'ต้นหูปลาช่อน', scientific_name: 'Acalypha wilkesiana', images: ["/workpic8.jpg"], location_name: 'สวนพฤกษศาสตร์ ข้างตึกม่วง' },
    { id: 'it_09', common_name: 'ดอกยี่โถ', scientific_name: 'Nerium oleander L.', images: ["/workpic9.jpg"], location_name: 'สวนพฤกษศาสตร์ ข้างตึกม่วง' },
    { id: 'it_10', common_name: 'ต้นยางนา', scientific_name: 'Dipterocarpus alatus', images: ["/workpic10.jpg"], location_name: 'สวนพฤกษศาสตร์ it' },
    { id: 'it_11', common_name: 'ต้นมะฮอกกานี', scientific_name: 'Swietenia macrophylla', images: ["/workpic11.jpg"], location_name: 'สวนพฤกษศาสตร์ it' },
    { id: 'it_12', common_name: 'ต้นลำไย', scientific_name: 'Dimocarpus longan', images: ["/workpic12.jpg"], location_name: 'สวนพฤกษศาสตร์ it' },
    { id: 'it_13', common_name: 'ต้นกระทิง', scientific_name: 'Calophyllum inophyllum', images: ["/workpic13.jpg"], location_name: 'สวนพฤกษศาสตร์ it' }
  ]
};

export default function Home() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // ดึงข้อมูล JSON จาก localStorage ที่บันทึกไว้จากหน้า Profile
    const savedData = localStorage.getItem('user_profile_info');
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-[#1e1b4b] text-white p-10 pt-16 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Cpu size={150} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
             <span className="bg-indigo-500 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Digital Garden</span>
             {userData && (
               <span className="bg-emerald-500 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest flex items-center gap-1">
                 <User size={8} /> {userData.position === 'student' ? 'Student' : 'Staff'}
               </span>
             )}
          </div>
          
          {/* แสดงชื่อผู้ใช้จาก JSON */}
          <h1 className="text-2xl font-bold tracking-tight">
            สวัสดี, <span className="text-indigo-400">{userData?.full_name || 'ผู้เยี่ยมชม'}</span>
          </h1>
          
          <p className="text-indigo-300 text-xs mt-3 flex flex-col font-medium opacity-90">
              <span>{GARDEN_DATA.college_name}</span>
              <span className="opacity-70">แผนกวิชา{GARDEN_DATA.department_name}</span>
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
          <h3 className="text-slate-800 font-bold px-1 mb-2">รายการต้นไม้ทั้งหมด</h3>
          {GARDEN_DATA.plants.map(plant => (
            <Link key={plant.id} to={`/PlantDetail/${plant.id}`}>
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:border-indigo-200 transition-all active:scale-[0.98]">
                <img src={plant.images[0]} className="w-20 h-20 rounded-xl object-cover shadow-inner" alt={plant.common_name} />
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 leading-tight">{plant.common_name}</h4>
                  <p className="text-[11px] text-slate-400 italic mb-2 leading-none">{plant.scientific_name}</p>
                  <p className="text-[11px] text-indigo-600 font-bold flex items-center gap-1">
                    <MapPin size={10} /> {plant.location_name}
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