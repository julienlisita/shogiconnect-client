import { useParams } from 'react-router-dom';

const ForumCommentsPage = () => {
  const { category, topic } = useParams();

  return (
    <div>
      <h1>Commentaires du topic {topic} dans la catégorie {category}</h1>
      {/* Contenu des commentaires du topic */}
    </div>
  );
};

export default ForumCommentsPage;