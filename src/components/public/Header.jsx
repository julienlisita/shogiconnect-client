// Header.jsx

import "./Header.css"
import { useState } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignUpModal';
import { useAuthContext } from "../../contexts/AuthContext";
import NavMenu from "../common/Navmenu";
import UserMenu from "../common/Usermenu";

const Header = () => {

    const { isAuthenticated, logout } = useAuthContext();
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
                <NavMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
                <UserMenu 
                    isAuthenticated={isAuthenticated} 
                    logout={logout} 
                    openLogin={openModal} 
                    openSignup={openSignupModal} 
                />
                <LoginModal isOpen={isModalOpen} onClose={closeModal} />
                <SignupModal isOpen={isSignupOpen} onClose={closeSignupModal} />
            </header>
        </div>
    );
};
export default Header;