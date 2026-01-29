
import { createHashRouter, RouterProvider } from 'react-router-dom'; // เปลี่ยนจาก createBrowserRouter

const router = createHashRouter([ // เปลี่ยนตรงนี้
  { path: "/", element: <App /> },
  // ... routes อื่นๆ
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);