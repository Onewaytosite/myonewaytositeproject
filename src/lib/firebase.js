import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const seedDatabase = async () => {
  const itPlants = [
    { 
      id: 'it_01', 
      common_name: 'ต้นฝรั่ง', 
      scientific_name: 'Psidium guajava L.', 
      family_name: 'MYRTACEAE',
      characteristics: 'ไม้ยืนต้นขนาดเล็ก เปลือกต้นเรียบสีน้ำตาลอ่อน หลุดลอกเป็นแผ่น กิ่งอ่อนเป็นสี่เหลี่ยม',
      propagation: 'เพาะเมล็ด, ตอนกิ่ง, ปักชำ',
      images: ["https://images.unsplash.com/photo-1534346505307-8e6d9b93081e?q=80&w=1000"], 
      description: 'ไม้ผลเศรษฐกิจที่มีวิตามินซีสูง พบทั่วไปในสวนพฤกษศาสตร์ IT' 
    },
    { 
      id: 'it_02', 
      common_name: 'ต้นมะม่วง', 
      scientific_name: 'Mangifera Indica', 
      family_name: 'ANACARDIACEAE',
      characteristics: 'ไม้ยืนต้นให้ร่มเงาขนาดใหญ่ ใบเดี่ยวเรียงสลับ รูปหอก ดอกออกเป็นช่อที่ปลายกิ่ง',
      propagation: 'การทาบกิ่ง, การเสียบยอด',
      images: ["https://images.unsplash.com/photo-1553134831-99ef0288b859?q=80&w=1000"], 
      description: 'ไม้ยืนต้นให้ร่มเงาขนาดใหญ่ ประจำพื้นที่สีเขียวแผนก IT' 
    },
    { 
      id: 'it_05', 
      common_name: 'ต้นกระบองเพชร', 
      scientific_name: 'Cactaceae', 
      family_name: 'CACTACEAE',
      characteristics: 'พืชอวบน้ำ ลำต้นมีหนามเพื่อลดการคายน้ำ มีกลไกเก็บกักน้ำในเนื้อเยื่อได้ดี',
      propagation: 'การแยกหน่อ, เพาะเมล็ด',
      images: ["https://images.unsplash.com/photo-1520302630591-fd1c66ed8181?q=80&w=1000"], 
      description: 'พืชอวบน้ำทนแล้ง ใช้ศึกษาระบบการกักเก็บน้ำของพืช' 
    },
    { 
      id: 'it_06', 
      common_name: 'ต้นตะเคียน', 
      scientific_name: 'Hopea odorata', 
      family_name: 'DIPTEROCARPACEAE',
      characteristics: 'ไม้เนื้อแข็งขนาดใหญ่ เรือนยอดเป็นพุ่มทึบ เปลือกหนาสีน้ำตาลดำแตกเป็นสะเก็ด',
      propagation: 'การเพาะเมล็ด',
      images: ["https://plus.unsplash.com/premium_photo-1675827393103-6258066b0257?q=80&w=1000"], 
      description: 'ไม้เนื้อแข็งมีค่า เป็นไม้ป่าดิบแล้งที่ช่วยรักษาความชุ่มชื้น' 
    },
    { 
      id: 'it_07', 
      common_name: 'ต้นกล้วย', 
      scientific_name: 'Musa sapientum', 
      family_name: 'MUSACEAE',
      characteristics: 'พืชล้มลุกขนาดใหญ่ ลำต้นเทียมเกิดจากกาบใบหุ้มซ้อนกัน ใบสีเขียวขนาดใหญ่',
      propagation: 'การแยกหน่อ',
      images: ["https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=1000"], 
      description: 'พืชล้มลุกใช้ศึกษาโครงสร้างลำต้นเทียมและการขยายพันธุ์' 
    },
    { 
      id: 'it_10', 
      common_name: 'ต้นยางนา', 
      scientific_name: 'Dipterocarpus alatus', 
      family_name: 'DIPTEROCARPACEAE',
      characteristics: 'ไม้ยืนต้นสูงสง่า ลำต้นเปลาตรง เปลือกสีเทาปนขาว ผลมีปีกยาว 2 ปีก',
      propagation: 'การเพาะเมล็ด',
      images: ["https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1000"], 
      description: 'ไม้ยืนต้นสูงสง่า สัญลักษณ์ของระบบนิเวศป่าที่สมบูรณ์' 
    },
    { 
      id: 'it_11', 
      common_name: 'ต้นมะฮอกกานี', 
      scientific_name: 'Swietenia macrophylla', 
      family_name: 'MELIACEAE',
      characteristics: 'ไม้ต้นขนาดใหญ่ ผลแข็งแตกเป็นพู เมล็ดมีปีก เนื้อไม้สีน้ำตาลแดงสวยงาม',
      propagation: 'การเพาะเมล็ด',
      images: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000"], 
      description: 'ไม้ป่าปลูกเพื่อส่งเสริมทัศนียภาพและดูดซับคาร์บอน' 
    },
    { 
      id: 'it_13', 
      common_name: 'ต้นกระทิง', 
      scientific_name: 'Calophyllum inophyllum', 
      family_name: 'CALOPHYLLACEAE',
      characteristics: 'ไม้ต้นไม่ผลัดใบ ใบหนาสีเขียวเข้มมันวาว ดอกมีสีขาวกลิ่นหอม ผลกลมแข็ง',
      propagation: 'การเพาะเมล็ด, ตอนกิ่ง',
      images: ["https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1000"], 
      description: 'ไม้พุ่มขนาดใหญ่ที่มีดอกหอมนวล ทนทานต่อสภาพอากาศ' 
    }
  ];

  try {
    for (const plant of itPlants) {
      await setDoc(doc(db, "plants", plant.id), plant);
    }
    alert("✅ อัปเดตข้อมูลพฤกษศาสตร์ครบ 8 ต้นเรียบร้อย!");
  } catch (error) {
    alert("❌ Error: " + error.message);
  }
};