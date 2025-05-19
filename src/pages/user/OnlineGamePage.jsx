// src/pages/user/OnlineGamePage.jsx

import PublicLayout from "../../layouts/PublicLayout";
import { useParams } from 'react-router-dom';
import OnlineGame from "../../components/user/OnlineGame";

const OnlineGamePage = () => {
  const { gameId } = useParams();

  return (
    <PublicLayout>
        <OnlineGame/>
    </PublicLayout>
  );
};

export default OnlineGamePage;