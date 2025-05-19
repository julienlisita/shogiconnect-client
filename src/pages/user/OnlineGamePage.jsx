// src/pages/user/OnlineGamePage.jsx

import PublicLayout from "../../layouts/PublicLayout";
import { useParams } from 'react-router-dom';

const OnlineGamePage = () => {
  const { gameId } = useParams();

  return (
    <PublicLayout>
      <h1>Page en construction</h1>
      <p>contenu dedié à l'interface de jeu en ligne</p>
    </PublicLayout>
  );
};

export default OnlineGamePage;