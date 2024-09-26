import "./Header.css"
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { HiUserAdd, HiUser } from "react-icons/hi";
import LoginModal from './LoginModal';
import SignupModal from './SignUpModal';



const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [isSignupOpen, setIsSignupOpen] = useState(false);

    const openSignupModal = () => setIsSignupOpen(true);

    const closeSignupModal = () => setIsSignupOpen(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/users/check', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                });
        
                if (!response.ok) {
                    
                    throw new Error('Erreur lors de la vérification de l\'authentification');
                }
        
                const data = await response.json();
                console.log(data); // Traitez les données de l'API ici
                setIsLoggedIn(data.isLoggedIn);
            } catch (error) {
                console.error('Erreur:', error);
            }
        };
    
        checkAuth();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const handleLogin = () => {
        setIsLoggedIn(true); // Met à jour l'état d'authentification
    };

    const handleLogout = async () => {
        const response = await fetch('http://localhost:3000/api/users/logout', {
          method: 'POST',
          credentials: 'include',
        });
        if (response.ok) {
          setIsLoggedIn(false);
        }
      };

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
                    {isLoggedIn ? (
                             <ul className="header-nav2-login">
                                <li onClick={handleLogout} className="btn-login">Déconnexion</li>
                                <li><Link to="/user/home" className="btn-login">Mon compte</Link></li>
                            </ul>
                        ) : (
                            <ul className="header-nav2-login">
                                <li onClick={openModal} className="btn-login">Connexion</li>
                                <li onClick={openSignupModal} className="btn-login">Inscription</li>
                            </ul>
                        )}
              
                {isLoggedIn ? (
                            <ul className="header-nav2-icons">
                                 <li onClick={handleLogout} className="icon"><FaSignOutAlt /></li>
                                 <li> <Link to="/compte" className="icon"><HiUser /></Link></li>
                            </ul>
                        ) : (
                            <ul className="header-nav2-icons">
                                <FaSignInAlt className="icon" onClick={openModal} />
                                <HiUserAdd className="icon" onClick={openSignupModal} />
                            </ul>
                        )}
            </nav>
            <LoginModal isOpen={isModalOpen} onClose={closeModal}  onLogin={handleLogin} />
            <SignupModal isOpen={isSignupOpen} onClose={closeSignupModal} />
            </header>
        </div>
    );
};
export default Header;