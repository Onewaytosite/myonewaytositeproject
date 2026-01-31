import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom'; // เปลี่ยนมาใช้แบบปกติที่รองรับ Routes ภายใน

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ใช้ HashRouter ครอบ App แบบนี้ เพื่อให้ <Routes> ใน App.jsx ทำงานได้ถูกต้อง */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);