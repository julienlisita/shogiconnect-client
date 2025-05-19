import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="main-content-title">404</h1>
      <h2>Page non trouvée</h2>
      <p>Oups. La page que vous cherchez n'existe pas</p>
      <div className="button">
        <Link to="/" className="button-link">
            Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;