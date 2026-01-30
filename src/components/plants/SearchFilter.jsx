import React from 'react';
import { Search, Filter } from "lucide-react";

// ใช้ HTML Input พื้นฐานไปก่อนเพื่อตัดปัญหาเรื่อง Type ของ UI Components
export default function SearchFilter({ searchTerm, setSearchTerm, selectedDepartment, setSelectedDepartment }) {
  const departments = [
    { value: "all", label: "ทุกแผนก" },
    { value: "automotive", label: "แผนกวิชาช่างยนต์" },
    { value: "welding", label: "แผนกวิชาช่างเชื่อมโลหะ" },
    { value: "electrical_power", label: "แผนกวิชาช่างไฟฟ้ากำลัง" },
    { value: "electronics", label: "แผนกวิชาอิเล็กทรอนิกส์" },
    { value: "computer_technology", label: "แผนกวิชาเทคนิคคอมพิวเตอร์" },
    { value: "construction", label: "แผนกวิชาช่างก่อสร้าง" },
    { value: "accounting", label: "แผนกวิชาการบัญชี" },
    { value: "marketing", label: "แผนกวิชาการตลาด" },
    { value: "computer_business", label: "แผนกวิชาคอมพิวเตอร์ธุรกิจ" },
    { value: "information_technology", label: "แผนกวิชาเทคโนโลยีสารสนเทศ" },
    { value: "logistics", label: "แผนกวิชาการจัดการโลจิสติกส์" },
    { value: "home_economics", label: "แผนกวิชาคหกรรม" },
    { value: "fine_arts", label: "แผนกวิชาวิจิตรศิลป์" },
    { value: "other", label: "อื่นๆ" }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full p-2">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="ค้นหาชื่อพืช..."
          value={searchTerm || ''}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 h-12 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 text-base"
        />
      </div>
      <div className="w-full sm:w-56">
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <select 
            value={selectedDepartment} 
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 appearance-none bg-white focus:outline-none"
          >
            {departments.map((dept) => (
              <option key={dept.value} value={dept.value}>
                {dept.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}