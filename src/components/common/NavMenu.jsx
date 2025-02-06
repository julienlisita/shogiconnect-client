// src/components/common/NavMenu.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import "../common/common.css"

const NavMenu = ({ isMenuOpen, toggleMenu }) => {

  return (
    <nav className="nav-menu">
      {/* Menu burger */}
        <div className={`burger-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-menu-list ${isMenuOpen ? 'open' : ''}`}>
          <li><Link to="/" className="nav-menu-list-link">Accueil</Link></li>
          <li><Link to="/Rules" className="nav-menu-list-link">Règles</Link></li>
          <li><Link to="/history" className="nav-menu-list-link">Histoire</Link></li>
          <li><Link to="/clubs" className="nav-menu-list-link">Clubs</Link></li>
          <li><Link to="/forum/categories" className="nav-menu-list-link">Forum</Link></li>
          <li><Link to="/users" className="nav-menu-list-link">Membres</Link></li>
          <li><Link to="/available-games" className="nav-menu-list-link">Parties</Link></li>
        </ul>
    </nav>
  );
};
export default NavMenu;