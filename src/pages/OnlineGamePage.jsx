import { useParams } from 'react-router-dom';

const OnlineGamePage = () => {
  const { gameId } = useParams();

  return (
    <div>
      <h1>Jeu en ligne {gameId}</h1>
      {/* Contenu du jeu en ligne */}
    </div>
  );
};

export default OnlineGamePage;