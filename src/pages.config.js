import AddPlant from './pages/AddPlant';
import EditPlant from './pages/EditPlant';
import Home from './pages/Home';
import PlantDetail from './pages/PlantDetail';
import Profile from './pages/Profile';
import __Layout from './Layout.jsx';

export const PAGES = {
    "AddPlant": AddPlant,
    "EditPlant": EditPlant,
    "Home": Home,
    "PlantDetail": PlantDetail,
    "Profile": Profile,
}

export const pagesConfig = {
    mainPage: "Home",
    // แก้จุดนี้: เปลี่ยนจาก Pages เป็น PAGES (ให้ตรงกับที่ App.jsx เรียกใช้)
    PAGES: PAGES, 
    Layout: __Layout,
};