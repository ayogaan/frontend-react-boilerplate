// ButtonLink.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ButtonLink = ({ to, type, size, children, onclick, isSelected, imgOnHover, imgIdle, dropDownData }) => {
  const classes = ` py-2 ${getSizeClass(size)} ${getTypeClass(type, isSelected)} ` ;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  if(to !== null && to !== undefined && type !== 'navbar-dropdown'){
    return (
      <Link to={to} className={classes} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
        {type === 'navbar' &&  <div className={`w-[8px] rounded-r-lg relative h-full bg-green-900 transition duration-200 ease-in-out ${isHovered || isSelected ? '': 'hidden'}`}></div>}  { imgOnHover &&  <img className='w-8 pl-3' src= {isHovered || isSelected ? imgOnHover : imgIdle } alt="" /> } {children}
      </Link>
    );
  
  }else if (type === "navbar-dropdown") {
    return (  
      <div to={to} className={classes} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
        <div className='flex mb-3'>
        <div className={`w-[8px] rounded-r-lg relative h-full bg-green-900 transition duration-200 ease-in-out ${isHovered || isSelected ? '': 'hidden'}`}></div> 
        { imgOnHover &&  <img className='w-8 pl-3' src= {isHovered || isSelected ? imgOnHover : imgIdle } alt="" /> } {children} </div>
        <ul className={`text-gray-600 ml-5 px-3 transition duration-500 ease-in-out ${isHovered || isSelected ? '': 'hidden'}`}>
          {
          dropDownData.map(item=>(
            <li className=''>
              <Link className='hover:text-green-900' to={item.to}>{item.name}</Link>
            </li>
            ))
          }

        </ul>
        </div>
      );
  }else{
    return (
      <button onClick={onclick} className={classes}>
        {children}
      </button>
    )
  }

};

const getSizeClass = (size) => {
  switch (size) {
    case 'sm':
      return 'text-sm';
    case 'md':
      return 'text-base';
    case 'lg':
      return 'text-lg';
    default:
      return 'text-base';
  }
};

const getTypeClass = (type, isSelected) => {
  switch (type) {
    case 'primary':
      return 'px-4 bg-green-900 text-white';
    case 'secondary':
      return 'px-4 bg-gray-300 text-gray-700';
    case 'success':
      return 'px-4 bg-green-500 text-white';
    case 'danger':
      return 'px-4 bg-red-500 text-white';
    case 'navbar':
        var style =  !isSelected ? 'bg-white hover:text-green-900 text-gray-600' : " text-green-900";
        return style+' transition duration-200 ease-in-out flex justify-start items-center gap-1 '
    case 'navbar-dropdown':
        var style =  !isSelected ? 'bg-white hover:text-green-900 text-gray-600' : " text-green-900";
        return style+' transition duration-200 ease-in-out flex flex-col justify-start items-start gap-1 '
    default:
      return 'px-4 bg-blue-500 text-white';
  }
};

export default ButtonLink;
