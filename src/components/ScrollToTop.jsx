import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Remonter en haut de la page
  }, [pathname]); // S'exécute à chaque changement de route

  return null; // Ce composant n'affiche rien
}

export default ScrollToTop;