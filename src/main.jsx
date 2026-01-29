
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createHashRouter, RouterProvider } from 'react-router-dom';

// ตั้งค่า Router แบบ Hash สำหรับ Mobile
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  // ถ้าคุณมีหน้าอื่น เช่น /login ให้เพิ่มตรงนี้
  // { path: "/login", element: <Login /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);