import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { ArrowLeft, Droplets, Sun, MapPin, Thermometer } from "lucide-react";

const PLANT_DETAILS = {
  "it_01": { name: 'ต้นฝรั่ง', scientific: 'Psidium guajava L.', desc: 'วิตามินซีสูง ช่วยบำรุงเหงือกและฟัน', care: 'ชอบแดดจัด รดน้ำวันละ 1 ครั้ง', stats: { water: "วันละครั้ง", sun: "แดดจัด", air: "ถ่ายเท" }, image: "/workpic1.jfif", location: 'สวนพฤกษศาสตร์ it' },
  "it_02": { name: 'ต้นมะม่วง', scientific: 'Mangifera Indica', desc: 'บำรุงสายตาและระบบขับถ่าย', care: 'ทนแล้งได้ดี รดน้ำ 2-3 วันครั้ง', stats: { water: "2-3 วันครั้ง", sun: "แดดจัด", air: "กลางแจ้ง" }, image: "/workpic2.jfif", location: 'สวนพฤกษศาสตร์ it' },
  "it_03": { name: 'ดอกบัว (บัวหลวง)', scientific: 'Nelumbo nucifera', desc: 'สัญลักษณ์แห่งความบริสุทธิ์', care: 'ปลูกในน้ำที่มีโคลน ชอบแดดจัด', stats: { water: "น้ำแช่ตลอด", sun: "แดดจัด", air: "กลางแจ้ง" }, image: "/workpic3.jpg", location: 'ข้างตึกม่วง' },
  "it_04": { name: 'ต้นคริสติน่า', scientific: 'Syzygium australe', desc: 'ใบอ่อนสีแดงสดใส นิยมทำรั้ว', care: 'ชอบแดด รดน้ำสม่ำเสมอ', stats: { water: "วันละครั้ง", sun: "แดดจัด", air: "ถ่ายเท" }, image: "/workpic4.jpg", location: 'ข้างตึก' },
  "it_05": { name: 'ต้นกระบองเพชร', scientific: 'Cactaceae', desc: 'พืชอวบน้ำ ทนทานต่อความแห้งแล้ง', care: 'รดน้ำเมื่อดินแห้งสนิท', stats: { water: "สัปดาห์ละครั้ง", sun: "แดดจัด", air: "แห้ง" }, image: "/workpic5.jpg", location: 'ข้างตึก' },
  "it_06": { name: 'ต้นตะเคียน', scientific: 'Hopea odorata', desc: 'ไม้ยืนต้นขนาดใหญ่ เนื้อไม้แข็งแรง', care: 'ต้องการน้ำมากในช่วงปีแรก', stats: { water: "วันละครั้ง", sun: "แดดจัด", air: "กลางแจ้ง" }, image: "/workpic6.jpg", location: 'สวนพฤกษศาสตร์ it' },
  "it_07": { name: 'ต้นกล้วย', scientific: 'Musa sapientum', desc: 'พืชสารพัดประโยชน์', care: 'ชอบดินชุ่มชื้นและแดดจัด', stats: { water: "วันละครั้ง", sun: "แดดจัด", air: "ชุ่มชื้น" }, image: "/workpic7.jpg", location: 'แปลงเกษตร' },
  "it_08": { name: 'ต้นหูปลาช่อน', scientific: 'Acalypha wilkesiana', desc: 'ไม้ประดับใบมีลวดลายสวยงาม', care: 'เลี้ยงง่าย แดดรำไร', stats: { water: "วันละครั้ง", sun: "แดดรำไร", air: "ถ่ายเท" }, image: "/workpic8.jpg", location: 'ข้างตึกม่วง' },
  "it_09": { name: 'ดอกยี่โถ', scientific: 'Nerium oleander L.', desc: 'ดอกสวยตลอดปี แต่ทุกส่วนมีพิษ', care: 'ทนแล้งได้ดีมาก', stats: { water: "2-3 วันครั้ง", sun: "แดดจัด", air: "กลางแจ้ง" }, image: "/workpic9.jpg", location: 'ข้างตึกม่วง' },
  "it_10": { name: 'ต้นยางนา', scientific: 'Dipterocarpus alatus', desc: 'ไม้หวงห้าม ให้ร่มเงาและน้ำมันยาง', care: 'ต้องการพื้นที่กว้าง', stats: { water: "วันละครั้ง", sun: "แดดจัด", air: "กลางแจ้ง" }, image: "/workpic10.jpg", location: 'สวนพฤกษศาสตร์' },
  "it_11": { name: 'ต้นมะฮอกกานี', scientific: 'Swietenia macrophylla', desc: 'ไม้ป่าโตเร็ว เนื้อไม้สีสวย', care: 'รดน้ำสม่ำเสมอ', stats: { water: "วันละครั้ง", sun: "แดดจัด", air: "กลางแจ้ง" }, image: "/workpic11.jpg", location: 'สวนพฤกษศาสตร์ it' },
  "it_12": { name: 'ต้นลำไย', scientific: 'Dimocarpus longan', desc: 'ไม้ผลเศรษฐกิจ รสชาติหวานฉ่ำ', care: 'ใส่ปุ๋ยบำรุงในช่วงติดผล', stats: { water: "วันละครั้ง", sun: "แดดจัด", air: "ถ่ายเท" }, image: "/workpic12.jpg", location: 'สวนพฤกษศาสตร์ it' },
  "it_13": { name: 'ต้นกระทิง', scientific: 'Calophyllum inophyllum', desc: 'ใบหนามันเงา ดอกหอม สวยงาม', care: 'ทนลมแรง ชอบดินระบายน้ำดี', stats: { water: "วันละครั้ง", sun: "แดดจัด", air: "กลางแจ้ง" }, image: "/workpic13.jpg", location: 'สวนพฤกษศาสตร์ it' }
};

export default function PlantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const plant = PLANT_DETAILS[id];

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!plant) return <div className="p-10 text-center">ไม่พบข้อมูล</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative h-[35vh]">
        <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
        <button onClick={() => navigate(-1)} className="absolute top-10 left-6 p-3 bg-white/90 rounded-2xl shadow-lg">
          <ArrowLeft size={20} />
        </button>
      </div>
      <div className="px-6 -mt-10 relative">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-50">
          <h1 className="text-2xl font-black text-slate-900">{plant.name}</h1>
          <p className="text-indigo-600 italic text-xs mb-4">{plant.scientific}</p>
          <div className="flex items-center gap-2 text-slate-400 text-[10px] mb-6 bg-slate-50 px-3 py-2 rounded-full w-fit">
            <MapPin size={12} className="text-indigo-500" /> {plant.location}
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <StatItem icon={<Droplets size={16} className="text-blue-500"/>} label={plant.stats.water} />
            <StatItem icon={<Sun size={16} className="text-orange-500"/>} label={plant.stats.sun} />
            <StatItem icon={<Thermometer size={16} className="text-emerald-500"/>} label={plant.stats.air} />
          </div>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">{plant.desc}</p>
          <div className="bg-indigo-50 p-4 rounded-2xl">
            <h4 className="text-indigo-900 font-bold text-sm mb-1">การดูแลรักษา</h4>
            <p className="text-indigo-700 text-xs italic">{plant.care}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ icon, label }) {
  return (
    <div className="bg-slate-50 p-3 rounded-2xl text-center">
      <div className="flex justify-center mb-1">{icon}</div>
      <p className="text-[10px] font-bold text-slate-700">{label}</p>
    </div>
  );
}