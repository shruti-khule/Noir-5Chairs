import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CgMenu, CgClose } from 'react-icons/cg';

const Nav: React.FC = () => {
  const [open, setOpen] = useState(false);

  const scrollToProducts = () => {
    document.getElementById('productList')?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav className="relative">
      {/* -------- desktop -------- */}
      <ul className="hidden lg:flex gap-12 items-center uppercase font-medium tracking-wide">
        <li>
          <NavLink to="/home" className="px-2 hover:text-accent-yellow transition-colors">
            Home
          </NavLink>
        </li>
        <li>
          <button onClick={scrollToProducts} className="px-2 hover:text-accent-yellow transition-colors">
            Sunglasses
          </button>
        </li>
      </ul>

      {/* -------- mobile burger -------- */}
      <button
        aria-label="Toggle navigation"
        onClick={() => setOpen(!open)}
        className="text-4xl text-primary-blue lg:hidden"
      >
        {open ? <CgClose /> : <CgMenu />}
      </button>

      {/* -------- mobile drawer -------- */}
      {open && (
        <ul className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-10
                       bg-white uppercase font-medium text-4xl">
          <li>
            <NavLink to="/home" onClick={() => setOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <button onClick={scrollToProducts}>Sunglasses</button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
