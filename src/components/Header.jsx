import "./Header.css"

const Header = () => {

    return (
        <div>
            <header className = "header">
                <nav className="header-nav1">
                    <ul className="header-nav1-menu">
                        <li>Accueil</li>
                        <li>Le Shogi</li>
                        <li>Communauté</li>
                        <li>Jouer</li>
                    </ul>
                </nav>
                <nav className="header-nav2">
                    <ul className="header-nav2-login">
                        <li>Connexion</li>
                        <li>Inscription</li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default Header;