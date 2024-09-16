import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";

import HomePage from './pages/HomePage';
import ShogiRulesPage from './pages/ShogiRulesPage';
import ShogiHistoryPage from './pages/ShogiHistoryPage';
import ClubListPage from './pages/ClubListPage';
import UserListPage from './pages/UserListPage';
import UserProfilePage from './pages/UserProfilePage';
import ForumCategoriesPage from './pages/ForumCategoriesPage';
import ForumTopicsPage from './pages/ForumTopicsPage';
import ForumCommentsPage from './pages/ForumCommentsPage';
import ScrollToTop from './components/utils/ScrollToTop';

import AvailableGameListPage from './pages/AvailableGameListPage';
import OnlineGamePage from './pages/user/OnlineGamePage';
import AccountHomePage from './pages/user/AccountHomePage';
import EditProfilePage from './pages/user/EditProfilePage';
import ScheduledGameListPage from './pages/user/ScheduledGameListPage';
import GameHistoryPage from './pages/user/GameHistoryPage';

import DashboardPage from './pages/admin/DashboardPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import ManageForumPage from './pages/admin/ManageForumPage';
import ManageGamesPage from './pages/admin/ManageGamesPage';

const App = () => {

  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          {/* Page d'accueil */}
          <Route path="/" element={<HomePage/>} />   

          {/* Page de connexion au compte utilisateur ou administrateur */}
          <Route path="/login" element={<></>} />

          {/* Formulaire d'inscription */}
          <Route path="/register" element={<></>}/>  

          {/* Règles du Shogi */}           
          <Route path="/rules" element={<ShogiRulesPage/>} /> 

          {/* Histoire du Shogi */}        
          <Route path="/history" element={<ShogiHistoryPage/>} />    

          {/* Liste des clubs */}     
          <Route path="/clubs" element={<ClubListPage/>} />   

          {/* Liste des membres */}      
          <Route path="/users" element={<UserListPage/>} />  

          {/* Profil d'un membre */}    
          <Route path="/users/:user_id" element={<UserProfilePage/>} />        

          {/* Catégories du forum */}     
          <Route path="/forum" element={<ForumCategoriesPage/>} />    

           {/* Topics d'une catégorie */}          
          <Route path="/forum/:category_id" element={<ForumTopicsPage/>} />    

          {/* Commentaires d'un topic */}         
          <Route path="/forum/:category_id/:topic_id" element={<ForumCommentsPage/>} />


          {/* Routes spécifiques aux membres connectés */}

          {/* Liste des parties disponibles*/}          
          <Route path="/available-games" element={<AvailableGameListPage/>} />
          
          {/* Jeu en ligne */}         
          <Route path="/games/:game_id" element={<OnlineGamePage/>} />

           {/* Page d'accueil du compte utilisateurs */}
           <Route path="user/home" element={<AccountHomePage/>} />

          {/* Modifier le profil de l'utilisateur connecté */}
          <Route path="user/edit-profile" element={<EditProfilePage/>} />

          {/* Page de gestion des parties programmées */}
          <Route path="user/scheduled-games" element={<ScheduledGameListPage/>} />

          {/* Page de l'historique des parties */}
          <Route path="user/game-history" element={<GameHistoryPage/>} />


          {/* Routes spécifiques aux administrateurs */}

          {/* Page de gestion des utilisateurs (admin) */}
          <Route path="/admin/dashboard" element={<DashboardPage />} />

          {/* Page de gestion des utilisateurs (admin) */}
          <Route path="/admin/manage-users" element={<ManageUsersPage />} />

          {/* Page de gestion du forum (admin) */}
          <Route path="/admin/manage-forum" element={<ManageForumPage />} />

          {/* Page de gestion des parties (admin) */}
          <Route path="/admin/manage-games" element={<ManageGamesPage />} />
        </Routes>
      </BrowserRouter> 
    </>
  )
};

export default App
