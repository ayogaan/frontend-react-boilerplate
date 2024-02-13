
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Navbar from './components/navbar';
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
//import UserDashboard from './pages/userDashboard';

//import RolesSetting from './pages/Roles/RolesSetting';
import Hero from './components/hero';
import Kanban from './pages/Kanban/Kanban';
import LCA from './pages/lca';
import HumanProcess from './pages/humanProcess';
import CreateHumanProcess from './pages/humanProcess/CreateHumanProcess';
import EditHumanProcess from './pages/humanProcess/EditHumanProcess';
import WoodProcess from './pages/woodProcess';
import CreateWoodProcess from './pages/woodProcess/CreateWoodProcess';
import EditWoodProcess from './pages/woodProcess/EditWoodProcess';
import ElectricProcess from './pages/electricProcess';
import CreateElectricProcess from './pages/electricProcess/CreateElectricProcess';
import EditElectricProcess from './pages/electricProcess/EditElectricProcess';
import CreateLCA from './pages/LCAs/CreateWoodProcess';
import LoginChallenge from './pages/auth/loginChallenge';
function App() {
  const location = useLocation();
  const pathname = location.pathname 
  return (
      <>
        {(pathname === '/login' || pathname === '/register' || pathname === '/wait-validation' || pathname === '/landing') ? <></> : <Navbar/>}
      <Routes className>
          <Route path="/" element={<LCA />} />
          <Route path="/lca" element={<LCA />} />
          <Route path="/lca/tambah" element={<CreateLCA />} />

          <Route path="/login" element={<LoginChallenge />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/landing" element={<Hero />} />
          <Route path="/settings/human-process" element={<HumanProcess />} />
          <Route path="/settings/human-process/tambah" element={<CreateHumanProcess />} />
          <Route path="/settings/human-process/:id" element={<EditHumanProcess />} />
          <Route path="/settings/wood-process" element={<WoodProcess />} />
          <Route path="/settings/wood-process/tambah" element={<CreateWoodProcess />} />
          <Route path="/settings/wood-process/:id" element={<EditWoodProcess />} />
          <Route path="/settings/electric-process" element={<ElectricProcess />} />
          <Route path="/settings/electric-process/tambah" element={<CreateElectricProcess />} />
          <Route path="/settings/electric-process/:id" element={<EditElectricProcess />} />

          

          

      </Routes>
      </>

  );
}

export default App;
