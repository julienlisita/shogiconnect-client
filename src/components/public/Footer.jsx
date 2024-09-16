import "./Footer.css"

const Footer = () => {

    return (
        <div>
            <footer className = "footer">
                <nav className="footer-nav">
                    <ul>
                        <li>A propos</li>
                        <li>Contact</li>
                        <li>Mentions légales</li>
                        <li>Politique de confidentialité</li>
                        <li>Condition d’utilisation</li>
                    </ul>
                </nav>
                <p className = "footer-copyright">&copy; 2024 ShogiConnect. Tous droits réservés.</p>
            </footer>
        </div>
    );

};

export default Footer;