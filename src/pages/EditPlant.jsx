// src/pages/EditPlant.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, Upload, MapPin, ArrowLeft } from "lucide-react";
import { getPlantById, updatePlant } from '@/data/plant-storage';

export default function EditPlant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    scienceName: '',
    location: '',
    description: '',
    care: '',
    image: ''
  });

  useEffect(() => {
    const plantToEdit = getPlantById(id);
    if (plantToEdit) {
      setFormData(plantToEdit);
    } else {
      alert("ไม่พบข้อมูลต้นไม้ที่จะแก้ไข");
      navigate('/Home');
    }
  }, [id, navigate]);

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
      updatePlant(formData); // ส่ง id ไปด้วย
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
      alert(`อัปเดตข้อมูล ${formData.name} เรียบร้อยแล้ว`);
      navigate(`/PlantDetail/${id}`); // กลับไปหน้า Detail ของต้นไม้ต้นนั้น
    } catch (error) {
      console.error("Failed to update plant:", error);
      alert("เกิดข้อผิดพลาดในการอัปเดตข้อมูลต้นไม้");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto border-0 shadow-2xl rounded-[2.5rem] overflow-hidden bg-white mt-10">
      <CardHeader className="bg-orange-600 text-white p-8 relative">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 p-2 bg-white/20 backdrop-blur rounded-full shadow-lg"
        >
          <ArrowLeft size={24} className="text-white" />
        </button>
        <CardTitle className="text-2xl font-bold text-center mt-4">แก้ไขข้อมูลต้นไม้</CardTitle>
        <p className="text-orange-100 text-center text-sm mt-2">อัปเดตข้อมูลของ {formData.name}</p>
      </CardHeader>
      
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ... ส่วน Input เหมือน AddPlant.jsx ... */}
          {/* ชื่อต้นไม้ (ไทย) */}
          <div className="space-y-2">
            <Label htmlFor="name">ชื่อต้นไม้ (ภาษาไทย)</Label>
            <Input 
              id="name"
              placeholder="เช่น ต้นฝรั่ง"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="rounded-xl border-slate-200"
            />
          </div>

          {/* ชื่อวิทยาศาสตร์ */}
          <div className="space-y-2">
            <Label htmlFor="scienceName">ชื่อวิทยาศาสตร์</Label>
            <Input 
              id="scienceName"
              placeholder="เช่น Psidium guajava L."
              required
              value={formData.scienceName}
              onChange={(e) => setFormData({...formData, scienceName: e.target.value})}
              className="rounded-xl border-slate-200"
            />
          </div>

          {/* พิกัด / สถานที่ */}
          <div className="space-y-2">
            <Label htmlFor="location">พิกัด/สถานที่ปลูก</Label>
            <div className="relative flex items-center">
              <MapPin className="absolute left-3 text-slate-400" size={18} />
              <Input 
                id="location"
                placeholder="เช่น หลังอาคาร 60 ปี (IT GARDEN)"
                required
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="rounded-xl border-slate-200 pl-10"
              />
            </div>
          </div>

          {/* รายละเอียด/สรรพคุณ */}
          <div className="space-y-2">
            <Label htmlFor="description">รายละเอียด/สรรพคุณ</Label>
            <Textarea 
              id="description"
              placeholder="เช่น เป็นไม้ผลให้วิตามินซีสูง..."
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="rounded-xl border-slate-200 min-h-[100px]"
            />
          </div>

          {/* การดูแลรักษา */}
          <div className="space-y-2">
            <Label htmlFor="care">การดูแลรักษา</Label>
            <Textarea 
              id="care"
              placeholder="เช่น ชอบแดดจัด รดน้ำวันละ 1 ครั้ง..."
              required
              value={formData.care}
              onChange={(e) => setFormData({...formData, care: e.target.value})}
              className="rounded-xl border-slate-200 min-h-[80px]"
            />
          </div>

          {/* รูปภาพต้นไม้ */}
          <div className="space-y-2">
            <Label htmlFor="image-upload">อัปโหลดรูปภาพต้นไม้</Label>
            <Input 
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="rounded-xl border-slate-200 file:text-orange-600 file:font-semibold"
            />
            {formData.image && (
              <div className="mt-4 flex flex-col items-center">
                <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded-xl shadow-md" />
                <p className="text-sm text-slate-500 mt-2">รูปภาพที่เลือก</p>
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 rounded-2xl transition-all mt-6"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />}
            บันทึกการแก้ไข
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}