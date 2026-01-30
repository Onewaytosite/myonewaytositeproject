import React from 'react';
import { Search, Filter } from "lucide-react";

export default function SearchFilter({ searchTerm, setSearchTerm, selectedDepartment, setSelectedDepartment }) {
  const departments = [
    { value: "all", label: "ทุกแผนก" },
    { value: "automotive", label: "ช่างยนต์" },
    { value: "welding", label: "ช่างเชื่อม" },
    { value: "electrical_power", label: "ช่างไฟฟ้า" },
    { value: "electronics", label: "อิเล็กทรอนิกส์" },
    { value: "computer_technology", label: "เทคนิคคอมฯ" },
    { value: "construction", label: "ก่อสร้าง" },
    { value: "accounting", label: "บัญชี" },
    { value: "marketing", label: "การตลาด" },
    { value: "computer_business", label: "คอมฯ ธุรกิจ" },
    { value: "information_technology", label: "IT" },
    { value: "logistics", label: "โลจิสติกส์" },
    { value: "home_economics", label: "คหกรรม" },
    { value: "fine_arts", label: "วิจิตรศิลป์" },
    { value: "other", label: "อื่นๆ" }
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input 
          type="text"
          placeholder="ค้นหาพืช..."
          value={searchTerm || ''}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none focus:border-emerald-500"
        />
      </div>
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        <select 
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 outline-none focus:border-emerald-500"
        >
          {departments.map(dept => <option key={dept.value} value={dept.value}>{dept.label}</option>)}
        </select>
      </div>
    </div>
  );
}