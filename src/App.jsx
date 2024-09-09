import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import HomePage from './pages/HomePage';
import EditProfilePage from './pages/EditProfilePage';
import ShogiRulesPage from './pages/ShogiRulesPage';
import ShogiHistoryPage from './pages/ShogiHistoryPage';
import ClubListPage from './pages/ClubListPage';
import MemberListPage from './pages/MemberListPage';
import MemberProfilePage from './pages/MemberProfilePage';
import ForumCategoriesPage from './pages/ForumCategoriesPage';
import ForumTopicsPage from './pages/ForumTopicsPage';
import ForumCommentsPage from './pages/ForumCommentsPage';
import GameListPage from './pages/GameListPage';
import OnlineGamePage from './pages/OnlineGamePage';
import ScrollToTop from './components/ScrollToTop';

const App = () => {

  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          {/* Page d'accueil */}
          <Route path="/" element={<HomePage/>} />   

          {/* Formulaire d'inscription */}
          <Route path="/home/register" element={<></>}/>  

          {/* Modifier le profil de l'utilisateur connecté */}
          <Route path="/profile/edit" element={<EditProfilePage/>} />

          {/* Règles du Shogi */}           
          <Route path="/rules" element={<ShogiRulesPage/>} /> 

          {/* Histoire du Shogi */}        
          <Route path="/history" element={<ShogiHistoryPage/>} />    

          {/* Liste des clubs */}     
          <Route path="/clubs" element={<ClubListPage/>} />   

          {/* Liste des membres */}      
          <Route path="/members" element={<MemberListPage/>} />  

          {/* Profil d'un membre */}    
          <Route path="/members/:user_id" element={<MemberProfilePage/>} />        

          {/* Catégories du forum */}     
          <Route path="/forum" element={<ForumCategoriesPage/>} />    

           {/* Topics d'une catégorie */}          
          <Route path="/forum/:category_id" element={<ForumTopicsPage/>} />    

          {/* Commentaires d'un topic */}         
          <Route path="/forum/:category_id/:topic_id" element={<ForumCommentsPage/>} />    

          {/* Liste des parties */}          
          <Route path="/games" element={<GameListPage/>} />     
          
          {/* Jeu en ligne */}         
          <Route path="/game/:game_id" element={<OnlineGamePage/>} />              
        </Routes>
      </BrowserRouter> 
    </>
  )
};

export default App
