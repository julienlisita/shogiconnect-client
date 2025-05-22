import image from "./../../assets/images/user.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useUserContext } from "../../contexts/UserContext.jsx";
import { useProfileContext } from "../../contexts/ProfileContext.jsx";
import "./Sidebar.css";

const Sidebar = ({ menuItems }) => {
    const { user } = useAuthContext();
    const {profile, profileLoading, profileError} = useProfileContext();
    const {usersLoading, usersError } = useUserContext();
    const [isOpen, setIsOpen] = useState(false);

    if (usersLoading || profileLoading) return <p>Loading...</p>;
    if (profileError) return <p>Error profile users: {profileError}</p>;
    if (usersError) return <p>Error loading users: {usersError}</p>;

    const toggleSidebar = () => setIsOpen(!isOpen);

    const username = user.username;
    
    const avatar = profile && profile.avatar
    ? profile.avatar.startsWith("http") 
        ? profile.avatar 
        : `http://localhost:3000/uploads/${profile.avatar}`
    : image;

    return (
        <div className="principal">
            <div className="sidebarContainer">
                <div className={`burger-menu ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}>
                    <div></div><div></div><div></div>
                </div>
                <div className={`sidebar ${isOpen ? 'open' : 'sidebar-hidden'}`}>
                    <p className="sidebar-welcome">{`Bienvenue ${username}`}</p>
                    <div className="sidebar-avatar">
                        <img src={avatar} alt="Avatar" />
                    </div>
                    <ul className="sidebar-menu">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link className="sidebar-menu-link" to={item.link}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                    <p>Suppression du compte</p>
                    <p>Retour à l'accueil</p>
                </div>
            </div>
            <div className="container-fake"></div>
        </div>
    );
};

export default Sidebar;