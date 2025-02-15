import image from "./../../assets/images/user.png"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import "./Sidebar.css"

const Sidebar = ({ menuItems }) => 
{
    const { user, isAuthenticated } = useAuthContext();
    
    const username = user.username;

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="principal">
            <div className="sidebarContainer">
                {/* Menu burger pour afficher/cacher la sidebar */}
                <div className={`burger-menu ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                {/* Sidebar qui change de classe en fonction de son état */}
                <div className={`sidebar ${isOpen ? 'open' : 'sidebar-hidden'}`}>
                    <p className="sidebar-welcome">{`Bienvenue ${username}`}</p>
                    <div className="sidebar-avatar">
                        <img src={image} alt="" />
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
}

export default Sidebar;