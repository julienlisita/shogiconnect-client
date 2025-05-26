import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <div>
            <footer className="footer">
                <nav className="footer-nav">
                    <ul>
                        <li><Link to="/about">À propos</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/legal-notice">Mentions légales</Link></li>
                        <li><Link to="/privacy-policy">Politique de confidentialité</Link></li>
                        <li><Link to="/terms-of-use">Conditions d’utilisation</Link></li>
                    </ul>
                </nav>
                <p className="footer-copyright">
                    &copy; 2025 ShogiConnect. Tous droits réservés.
                </p>
            </footer>
        </div>
    );
};

export default Footer;