import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from './Nav';

const Header: React.FC = () => (
  <header
    id="header"
    className="bg-secondary flex justify-center lg:justify-between items-center px-4 py-2 overflow-auto"
  >
    <NavLink to="/home" className="shrink-0">
      <img
        src="/images/Logo_Noir.png"
        width={120}
        height={100}
        alt="Noir logo"
        className="object-contain"
      />
    </NavLink>

    <div className="hidden lg:block">
      <Nav />
    </div>
  </header>
);

export default Header;
