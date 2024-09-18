import "./Header.css"
import { Link } from "react-router-dom";
import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { HiUserAdd } from "react-icons/hi";
import LoginModal from './LoginModal';
import SignupModal from './SignUpModal';



const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [isSignupOpen, setIsSignupOpen] = useState(false);

    const openSignupModal = () => setIsSignupOpen(true);

    const closeSignupModal = () => setIsSignupOpen(false);


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
                <ul className="header-nav2-login">
                    <li><button onClick={openModal} className="btn-login">Connexion</button></li>
                    <li><button onClick={openSignupModal} className="btn-login">Inscription</button></li>
                </ul>
                <div className="header-nav2-icons">
                    <FaSignInAlt  className="icon" />
                    <HiUserAdd className="icon" />
                </div>
            </nav>
            <LoginModal isOpen={isModalOpen} onClose={closeModal} />
            <SignupModal isOpen={isSignupOpen} onClose={closeSignupModal} />
            </header>
        </div>
    );
};
export default Header;