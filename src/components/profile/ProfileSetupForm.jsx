import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Save } from "lucide-react";

export default function ProfileSetupForm({ onComplete }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    id_card_number: '',
    student_teacher_id: '',
    position: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // --- เริ่มการ Mock บันทึกข้อมูล ---
      console.log("Mocking saving data:", formData);
      
      // เก็บข้อมูลไว้ใน localStorage ชั่วคราวเพื่อให้หน้า Profile ดึงไปใช้ต่อได้
      localStorage.setItem('mock_user_data', JSON.stringify({
        ...formData,
        email: "student@sktc.ac.th", // สมมติอีเมล
        avatar_url: ""
      }));

      // จำลองว่าเน็ตช้า 1 วินาที
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert("บันทึกข้อมูลจำลองสำเร็จ!");
      if (onComplete) await onComplete();
      // --- จบการ Mock ---
    } catch (error) {
      console.error("Update failed:", error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto border-0 shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
      <CardHeader className="bg-indigo-600 text-white p-8">
        <CardTitle className="text-2xl font-bold text-center">ตั้งค่าโปรไฟล์ (Mock Mode)</CardTitle>
        <p className="text-indigo-100 text-center text-sm mt-2">กรุณากรอกข้อมูลเพื่อเริ่มต้นใช้งาน</p>
      </CardHeader>
      
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="full_name">ชื่อ-นามสกุล</Label>
            <Input 
              id="full_name"
              placeholder="นายใจดี มีสุข"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              className="rounded-xl border-slate-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">สถานะ</Label>
            <Select onValueChange={(val) => setFormData({...formData, position: val})}>
              <SelectTrigger className="rounded-xl border-slate-200">
                <SelectValue placeholder="เลือกสถานะ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">นักศึกษา</SelectItem>
                <SelectItem value="teacher">อาจารย์ / บุคลากร</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="id_card_number">เลขบัตรประชาชน (13 หลัก)</Label>
            <Input 
              id="id_card_number"
              maxLength={13}
              placeholder="110xxxxxxxxxx"
              required
              value={formData.id_card_number}
              onChange={(e) => setFormData({...formData, id_card_number: e.target.value})}
              className="rounded-xl border-slate-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="student_id">รหัสประจำตัว / เบอร์โทรศัพท์</Label>
            <Input 
              id="student_id"
              placeholder="รหัสนักศึกษา หรือ เบอร์โทร"
              required
              value={formData.student_teacher_id}
              onChange={(e) => setFormData({...formData, student_teacher_id: e.target.value})}
              className="rounded-xl border-slate-200"
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-2xl transition-all"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />}
            บันทึกข้อมูล (Mock)
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}