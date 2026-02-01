import Home from './pages/Home';
import PlantDetail from './pages/PlantDetail';
import Profile from './pages/Profile';
// เพิ่มการ Import สองหน้านี้เข้าไปด้วยครับ
import AddPlant from './pages/AddPlant'; 
import EditPlant from './pages/EditPlant';
import __Layout from './Layout.jsx';

export const PAGES = {
    "Home": Home,
    "PlantDetail": PlantDetail,
    "Profile": Profile,
    "AddPlant": AddPlant,   // เพิ่มให้ตรงกับ App.jsx
    "EditPlant": EditPlant, // เพิ่มให้ตรงกับ App.jsx
}

export const pagesConfig = {
    mainPage: "Home",
    PAGES: PAGES, 
    Layout: __Layout,
};