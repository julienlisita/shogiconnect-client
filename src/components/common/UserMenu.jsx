// src/components/common/UserMenu.jsx

const ROLE_USER = 1
const ROLE_ADMIN = 2

import { Link } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUserShield } from 'react-icons/fa';
import { HiUserAdd, HiUser } from "react-icons/hi";
import "../common/common.css"

const UserMenu = ({ isAuthenticated, logout, openLogin, openSignup, roleId }) => {
    return (
        <nav className="user-menu">
            {isAuthenticated ? (
                <>
                    <ul className="user-menu-list">
                        <li onClick={logout} className="btn-login">Déconnexion</li>
                        <li><Link to="/user/home" className="btn-login">Mon compte</Link></li>
                        {
                        (roleId === ROLE_ADMIN) && 
                            <li><Link to="/admin/dashboard" className="btn-login">Admin</Link></li>
                        }
                    </ul>
                    <ul className="user-menu-icons">
                        <li onClick={logout} className="icon"><FaSignOutAlt /></li>
                        <li><Link to="/user/home" className="icon"><HiUser /></Link></li>
                        {
                        (roleId === ROLE_ADMIN) && 
                            <li><Link to="/admin/dashboard" className="icon"><FaUserShield /></Link></li>
                        }
                    </ul>
                </>
            ) : (
                <>
                    <ul className="user-menu-list">
                        <li onClick={openLogin} className="btn-login">Connexion</li>
                        <li onClick={openSignup} className="btn-login">Inscription</li>
                    </ul>
                    <ul className="user-menu-icons">
                        <FaSignInAlt className="icon" onClick={openLogin} />
                        <HiUserAdd className="icon" onClick={openSignup} />
                    </ul>
                </>
            )}
        </nav>
    );
};

export default UserMenu;