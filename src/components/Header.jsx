import "./Header.css"
import { Link } from "react-router-dom";
import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { HiUserAdd } from "react-icons/hi";



const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                    <li><Link className="header-nav1-menu-link" to="/forum">Forum</Link></li>
                    <li><Link className="header-nav1-menu-link" to="/members">Membres</Link></li>
                    <li><Link className="header-nav1-menu-link" to="/available-games">Jouer</Link></li>
                </ul>
            </nav>

            <nav className="header-nav2">
                <ul className="header-nav2-login">
                    <li><Link className="header-nav2-login-link" to="/login">Connexion</Link></li>
                    <li><Link className="header-nav2-login-link" to="/register">Inscription</Link></li>
                </ul>
                <div className="header-nav2-icons">
                    <FaSignInAlt  className="icon" />
                    <HiUserAdd className="icon" />
                </div>
            </nav>

            </header>
        </div>
    );
};
export default Header;