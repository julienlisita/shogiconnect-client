import { useParams } from 'react-router-dom';

const ForumTopicsPage = () => {
  const { category } = useParams();

  return (
    <div>
      <h1>Topics de la catégorie {category}</h1>
      {/* Contenu des topics de la catégorie */}
    </div>
  );
};

export default ForumTopicsPage;