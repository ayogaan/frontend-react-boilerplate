import React, { useEffect, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import AxiosInstance from '../Helpers/AxiosInstance';
import ButtonLink from './button';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = window.location.pathname;
  const pathParts = pathname.split('/');
  const firstPart = pathParts.length > 1 ? pathParts[1] : '';
  const openSideBar = () =>{
      const mobileMenu = document.getElementById("mobile-menu");
      mobileMenu.classList.toggle("hidden");
    }

    const userSettingHandler = () =>{
      const userSetting = document.getElementById("user-setting");
      userSetting.classList.toggle("hidden");
    }

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    useEffect(() => {
      fetchMe();
      console.log(user)
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    
    const fetchMe = () => {
      AxiosInstance.get('me').then(response=> {
        console.log(response.data);
        setUser(response.data.data)
      }).catch(err=> {
        if(err.response.status == '401'){
          navigate('/login');
        }
        
      })
    }


    const logoutHandler = () => {
      AxiosInstance.post("logout").then().catch().finally(()=>{
        navigate('login')
      })
    }
  
  return (
    <>
    <nav className="w-10/12 right-0 h-16 flex justify-between items-center bg-white shadow-lg px-8 fixed font-manrope">
      <div className='flex gap-5'>
      <div className='p-5 md:p-0 flex flex-col'>
        {user?.company?.company_name}
        <div className='flex gap-1 justify-center items-center'>
          {firstPart}
        </div>
      </div>

      </div>
      <div className='flex gap-1'>
        <img src="https://images.unsplash.com/photo-1483389127117-b6a2102724ae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='rounded-full border-2 w-8 h-8 border-orange-200' />
        <button onClick={userSettingHandler} >{user?.name}</button>

        <div className='absolute bg-white border shadow p-3 top-20 right-8 rounded hidden' id='user-setting'>
          <ul>
            <li className='w-full flex items-center gap-5 px-3 py-2 hover:bg-blue-400 text-sm'> <img className='w-[20px]' src="https://img.icons8.com/ios/50/settings--v1.png" alt="" /> <Link to="/" >Settings</Link></li>
            <li className='w-full flex items-center gap-5 px-3 py-2 hover:bg-blue-400 text-sm'> <img className='w-[20px]' src="https://img.icons8.com/ios/50/re-enter-pincode.png" alt="" /> <Link to="/" >Reset Password</Link></li>
            <li className='w-full flex items-center gap-5 px-3 py-2 hover:bg-blue-400 text-sm'> <img className='w-[20px]' src="https://img.icons8.com/ios/50/exit--v1.png" alt="" /> <button onClick={logoutHandler} >Logout</button></li>
          </ul>
        </div>
      </div>
    </nav>

    {/* sidebar */}
    <div id ="mobile-menu" className="flex flex-col justify-start border shadow md:w-2/12 w-1/2 min-h-screen  text-gray-800 h-screen bg-white md:flex fixed">
      <div className='flex gap-5 justify-center items-center h-16 border'>
      <img className='w-8 h-8' src="https://img.icons8.com/external-jumpicon-line-ayub-irawan/32/000000/external-_25-climate-change-jumpicon-(line)-jumpicon-line-ayub-irawan.png" alt="external-_25-climate-change-jumpicon-(line)-jumpicon-line-ayub-irawan"/>
        Kalkulator LCA
      </div>
      <ul className='flex flex-col  w-full gap-2 my-5'>
      
        <ButtonLink 
            to="/" 
            imgOnHover="https://img.icons8.com/ios-filled/50/014900/dashboard.png"
            imgIdle="https://img.icons8.com/ios-filled/50/b1b1b1/dashboard.png"
            isSelected={firstPart === ''}
            type="navbar">
              Beranda
        </ButtonLink>

        <ButtonLink
            to="/lca"
            imgOnHover="https://img.icons8.com/ios/100/014900/abacus.png"
            imgIdle="https://img.icons8.com/ios/100/b1b1b1/abacus.png"
            isSelected={firstPart === 'lca'}
            type="navbar">
              Kalkulator LCA
        </ButtonLink>

        <ButtonLink
            to="/attendance/history"
            imgOnHover="https://img.icons8.com/ios/100/014900/delivery-settings.png"
            imgIdle="https://img.icons8.com/ios/100/b1b1b1/delivery-settings.png"
            isSelected={firstPart === 'settings'}
            type="navbar-dropdown"
            dropDownData={[{name:"proses manusia",to:"/settings/human-process"},{name:"proses pencucian",to:"/settings/electric-process"},{name: "proses perebusan", to:"/settings/wood-process"}]}
            >
              Pengaturan Produksi
        </ButtonLink>

      </ul>
      
    </div>
    
    </>
  );
}

export default Navbar;
