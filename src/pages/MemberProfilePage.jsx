import { useParams } from 'react-router-dom';

const MemberProfilePage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Profil du membre {id}</h1>
      {/* Contenu du profil du membre */}
    </div>
  );
};

export default MemberProfilePage;