// Header.jsx

import "./Header.css"
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { HiUserAdd, HiUser } from "react-icons/hi";
import LoginModal from './LoginModal';
import SignupModal from './SignUpModal';
import useAuth from "../../hooks/useAuth";

const Header = () => {

    const { isAuthenticated, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openSignupModal = () => setIsSignupOpen(true);
    const closeSignupModal = () => setIsSignupOpen(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div>
            <header className = "header">
            {/* Menu burger */}
            <div className={`burger-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav className="header-nav1">
                <ul className={`header-nav1-menu ${isMenuOpen ? 'open' : ''}`}>
                    <li><Link className="header-nav1-menu-link" to="/">Accueil</Link></li>
                    <li><Link className="header-nav1-menu-link" to="/Rules">Règles</Link></li>
                    <li><Link className="header-nav1-menu-link" to="/history">Histoire</Link></li>
                    <li><Link className="header-nav1-menu-link" to="/clubs">Clubs</Link></li>
                    <li><Link className="header-nav1-menu-link" to="/forum/categories">Forum</Link></li>
                    <li><Link className="header-nav1-menu-link" to="/users">Membres</Link></li>
                    <li><Link className="header-nav1-menu-link" to="/available-games">Parties</Link></li>
                </ul>
            </nav>

            <nav className="header-nav2">
                    {isAuthenticated ? (
                             <ul className="header-nav2-login">
                                <li onClick={logout} className="btn-login">Déconnexion</li>
                                <li><Link to="/user/home" className="btn-login">Mon compte</Link></li>
                            </ul>
                        ) : (
                            <ul className="header-nav2-login">
                                <li onClick={openModal} className="btn-login">Connexion</li>
                                <li onClick={openSignupModal} className="btn-login">Inscription</li>
                            </ul>
                        )}
              
                {isAuthenticated ? (
                            <ul className="header-nav2-icons">
                                 <li onClick={logout} className="icon"><FaSignOutAlt /></li>
                                 <li> <Link to="/compte" className="icon"><HiUser /></Link></li>
                            </ul>
                        ) : (
                            <ul className="header-nav2-icons">
                                <FaSignInAlt className="icon" onClick={openModal} />
                                <HiUserAdd className="icon" onClick={openSignupModal} />
                            </ul>
                        )}
            </nav>
            <LoginModal isOpen={isModalOpen} onClose={closeModal} />
            <SignupModal isOpen={isSignupOpen} onClose={closeSignupModal} />
            </header>
        </div>
    );
};
export default Header;