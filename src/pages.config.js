import Home from './pages/Home';
import PlantDetail from './pages/PlantDetail';
import Profile from './pages/Profile';
import __Layout from './Layout.jsx';

export const PAGES = {
    "Home": Home,
    "PlantDetail": PlantDetail,
    "Profile": Profile,
}

export const pagesConfig = {
    mainPage: "Home",
    PAGES: PAGES, 
    Layout: __Layout,
};