import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export default function ProfileSetupForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // บันทึกข้อมูล
    localStorage.setItem('user_profile_info', JSON.stringify(formData));
    // ดีดไปหน้าแรกทันที
    window.location.href = '/Home';
  };

  return (
    <Card className="max-w-md mx-auto shadow-xl">
      <CardHeader className="bg-indigo-600 text-white text-center">
        <CardTitle>เข้าสู่ระบบ</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            placeholder="ชื่อ-นามสกุล" 
            required 
            onChange={(e) => setFormData({...formData, full_name: e.target.value})} 
          />
          <Input 
            type="email" 
            placeholder="อีเมล" 
            required 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
          <Button type="submit" className="w-full bg-indigo-600 text-white py-6">
            <LogIn className="mr-2" /> เข้าสู่ระบบ
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}