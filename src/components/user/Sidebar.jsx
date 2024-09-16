import image from "./../../assets/images/user.png"
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css"

const Sidebar = () => 
{
    const user = {
    id: 1,
    username: "ShadowNinja",
    country: "France",
    isOnline: true,
    biography: "Je suis un maître de la furtivité, et j'ai toujours un coup d'avance sur mes adversaires. Le Shogi est pour moi une manière de développer mon esprit tactique et de rester en éveil. Depuis des années, j'étudie les stratégies et les mouvements des grands maîtres du Shogi. J'aime aussi analyser chaque partie que je joue, en cherchant constamment à m'améliorer. Pour moi, le Shogi n'est pas seulement un jeu, c'est un art qui reflète l'harmonie entre la patience, la précision et la détermination. Mon objectif est de devenir un joueur reconnu sur la scène internationale.",
    user_role_id: 1,
    created_at: "2024-09-01 09:00:00"
    }

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
                    <p className="sidebar-welcome">{`Bienvenue ${user.username}`}</p>
                    <div className="sidebar-avatar">
                        <img src={image} alt="" />
                    </div>
                    <ul className="sidebar-menu">
                        <li><Link className="sidebar-menu-link" to="/user/home">Tableau de bord</Link></li>
                        <li><Link className="sidebar-menu-link" to="/edit-profile">Modifier le profil</Link></li>
                        <li><Link className="sidebar-menu-link" to="/scheduled-games">Parties programmées</Link></li>
                        <li><Link className="sidebar-menu-link" to="/game-history">Historique des parties</Link></li>
                        <li><Link className="sidebar-menu-link" to="/">Supprimer compte</Link></li>
                        <li><Link className="sidebar-menu-link" to="/">Retour à l'accueil</Link> </li>
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