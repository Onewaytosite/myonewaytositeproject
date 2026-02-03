import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        {/* เลิกเช็คเงื่อนไขชั่วคราว ให้มันเข้าหน้า Home ได้เลยเพื่อดูว่าจอหายขาวไหม */}
        <Route path="/" element={<Home />} /> 
        <Route path="/Home" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;