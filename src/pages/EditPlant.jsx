import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
// ลบ Textarea ออกแล้วเพราะในฟอร์มด้านล่างไม่ได้เรียกใช้
import { Loader2, Save, MapPin, ArrowLeft } from "lucide-react";

const GARDEN_DATA = {
  plants: [
    {
      id: 'it_01',
      common_name: 'ต้นฝรั่ง',
      scientific_name: 'Psidium guajava L.',
      images: ["/workpic1.jfif"],
      description: 'วิตามินซีสูง ช่วยบำรุงเหงือกและฟัน',
      care: 'รดน้ำวันละครั้ง ชอบแดด'
    },
    {
      id: 'it_02',
      common_name: 'ต้นมะม่วง',
      scientific_name: 'Mangifera Indica',
      images: ["/workpic2.jfif"],
      description: 'บำรุงสายตาและระบบขับถ่าย',
      care: 'รดน้ำสม่ำเสมอ'
    }
  ]
};

export default function EditPlant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    scienceName: '',
    location: 'IT GARDEN',
    description: '',
    care: '',
    image: ''
  });

  useEffect(() => {
    const plantToEdit = GARDEN_DATA.plants.find(p => p.id === id);
    if (plantToEdit) {
      setFormData({
        name: plantToEdit.common_name,
        scienceName: plantToEdit.scientific_name,
        location: 'IT GARDEN',
        description: plantToEdit.description || '',
        care: plantToEdit.care || '',
        image: plantToEdit.images[0]
      });
    }
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      alert(`บันทึกข้อมูล ${formData.name} เรียบร้อยแล้ว`);
      navigate(`/PlantDetail/${id}`);
    } catch (err) { // เปลี่ยนจาก error เป็น err หรือถ้าไม่ใช้ให้เอาออก
      console.error("Update failed:", err);
      alert("เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <Card className="max-w-xl mx-auto border-0 shadow-2xl rounded-[2.5rem] overflow-hidden bg-white mt-10">
        <CardHeader className="bg-orange-600 text-white p-8 relative">
          <button onClick={() => navigate(-1)} className="absolute top-6 left-6 p-2 bg-white/20 backdrop-blur rounded-full">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <CardTitle className="text-2xl font-bold text-center mt-4">แก้ไขข้อมูลต้นไม้</CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">ชื่อต้นไม้</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">พิกัด</Label>
              <div className="relative flex items-center">
                <MapPin className="absolute left-3 text-slate-400" size={18} />
                <Input id="location" className="pl-10" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image-upload">เปลี่ยนรูปภาพ</Label>
              <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} />
              {formData.image && (
                <div className="mt-4 flex justify-center">
                  <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded-xl border" />
                </div>
              )}
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-orange-600 hover:bg-orange-700 h-14 rounded-2xl">
              {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />}
              บันทึกการแก้ไข
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}