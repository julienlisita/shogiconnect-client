import { Link } from "react-router-dom";
import "./Button.css"

const Button = ({
  children,
  to,
  href,
  onClick,
  type = "button",
  target,
  rel,
  className = "",

}) => {
  const classes = `button ${className}`;

  if (to) {
    // Lien interne avec React Router
    return (
      <div className={classes}>
        <Link className="button-link" to={to}>
          {children}
        </Link>
      </div>
    );
  }

  if (href) {
    // Lien externe
    return (
      <div className={classes}>
        <a
          className="button-link"
          href={href}
          target={target || "_blank"}
          rel={rel || "noopener noreferrer"}
        >
          {children}
        </a>
      </div>
    );
  }

  // Bouton classique
  return (
    <button type={type} onClick={onClick}>
        {children}
    </button>
  );
};

export default Button;