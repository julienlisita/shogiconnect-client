import { Link } from "react-router-dom";
import "./NotFound.css";
import PageTitle from "../common/PageTitle";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <PageTitle>404</PageTitle>
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