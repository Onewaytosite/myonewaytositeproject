import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjZgFySfx_s1fkiTlwyCRK9ZWp2bmRbCU",
  authDomain: "greencode-it.firebaseapp.com",
  projectId: "greencode-it",
  storageBucket: "greencode-it.firebasestorage.app",
  messagingSenderId: "1125199811",
  appId: "1:1125199811:web:9d995fc8c8a51cbeaf9776",
  measurementId: "G-M39775W439"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const seedDatabase = async () => {
  const itPlants = [
    { id: 'it_01', common_name: 'ต้นฝรั่ง', scientific_name: 'Psidium guajava L.', images: ["/workpic1.jfif"], location_name: 'สวนพฤกษศาสตร์ it', description: 'ไม้ผลเศรษฐกิจที่มีวิตามินซีสูง พบทั่วไปในสวนพฤกษศาสตร์ it' },
    { id: 'it_02', common_name: 'ต้นมะม่วง', scientific_name: 'Mangifera Indica', images: ["/workpic2.jfif"], location_name: 'สวนพฤกษศาสตร์ it', description: 'ไม้ยืนต้นให้ร่มเงาขนาดใหญ่ ประจำพื้นที่สีเขียวแผนก it' },
    { id: 'it_05', common_name: 'ต้นกระบองเพชร', scientific_name: 'Cactaceae', images: ["/workpic5.jfif"], location_name: 'สวนพฤกษศาสตร์ it', description: 'พืชอวบน้ำทนแล้ง ใช้ศึกษาระบบการกักเก็บน้ำของพืช' },
    { id: 'it_06', common_name: 'ต้นตะเคียน', scientific_name: 'Hopea odorata', images: ["/workpic6.jpg"], location_name: 'สวนพฤกษศาสตร์ it', description: 'ไม้เนื้อแข็งมีค่า เป็นไม้ป่าดิบแล้งที่ช่วยรักษาความชุ่มชื้น' },
    { id: 'it_07', common_name: 'ต้นกล้วย', scientific_name: 'Musa sapientum', images: ["/workpic7.jpg"], location_name: 'สวนพฤกษศาสตร์ it', description: 'พืชล้มลุกใช้ศึกษาโครงสร้างลำต้นเทียมและการขยายพันธุ์' },
    { id: 'it_10', common_name: 'ต้นยางนา', scientific_name: 'Dipterocarpus alatus', images: ["/workpic10.jpg"], location_name: 'สวนพฤกษศาสตร์ it', description: 'ไม้ยืนต้นสูงสง่า สัญลักษณ์ของระบบนิเวศป่าที่สมบูรณ์' },
    { id: 'it_11', common_name: 'ต้นมะฮอกกานี', scientific_name: 'Swietenia macrophylla', images: ["/workpic11.jpg"], location_name: 'สวนพฤกษศาสตร์ it', description: 'ไม้ป่าปลูกเพื่อส่งเสริมทัศนียภาพและดูดซับคาร์บอน' },
    { id: 'it_13', common_name: 'ต้นกระทิง', scientific_name: 'Calophyllum inophyllum', images: ["/workpic13.jpg"], location_name: 'สวนพฤกษศาสตร์ it', description: 'ไม้พุ่มขนาดใหญ่ที่มีดอกหอมนวล ทนทานต่อสภาพอากาศ' }
  ];

  try {
    for (const plant of itPlants) {
      await setDoc(doc(db, "plants", plant.id), plant);
    }
    alert("✅ อัปเดตข้อมูลสวน it (8 ชนิด) เข้า Cloud เรียบร้อย!");
  } catch (error) {
    alert("❌ Error: " + error.message);
  }
};