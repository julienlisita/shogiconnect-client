// src/routes/AppRoutes.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import HomePage from '../pages/public/HomePage';
import ShogiRulesPage from '../pages/public/ShogiRulesPage';
import ShogiHistoryPage from '../pages/public/ShogiHistoryPage';
import ClubListPage from '../pages/public/ClubListPage';
import UserListPage from '../pages/public/UserListPage';
import UserProfilePage from '../pages/public/UserProfilePage';
import ForumCategoriesPage from '../pages/public/ForumCategoriesPage';
import ForumTopicsPage from '../pages/public/ForumTopicsPage';
import ForumCommentsPage from '../pages/public/ForumCommentsPage';

import AvailableGameListPage from '../pages/user/AvailableGameListPage';
import OnlineGamePage from '../pages/user/OnlineGamePage';
import AccountHomePage from '../pages/user/AccountHomePage';
import ProfileManagementPage from '../pages/user/ProfileManagementPage';
import ScheduledGameListPage from '../pages/user/ScheduledGameListPage';
import GameHistoryPage from '../pages/user/GameHistoryPage';

import DashboardPage from '../pages/admin/DashboardPage';
import ManageUsersPage from '../pages/admin/ManageUsersPage';
import ManageTopicsPage from '../pages/admin/ManageTopicsPage';
import ManageCommentsPage from '../pages/admin/ManageCommentsPage';
import ManageGamesPage from '../pages/admin/ManageGamesPage';

const ROLE_USER = 1
const ROLE_ADMIN = 2

const AppRoutes = () => {
    return (
        <Routes>
            {/* Routes publiques*/}

            {/* Page d'accueil */}
            <Route path="/" element={<HomePage />} />
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
            <Route path="/forum/categories" element={<ForumCategoriesPage/>} />    
            {/* Topics d'une catégorie */}          
            <Route path="/forum/category/:category_id" element={<ForumTopicsPage/>} />    
            {/* Commentaires d'un topic */}         
            <Route path="/forum/category/:category_id/topic/:topic_id" element={<ForumCommentsPage/>} />

            {/* Routes spécifiques aux membres connectés */}

            {/* Liste des parties disponibles*/}          
            <Route path="/available-games" element={<ProtectedRoute allowedRoles={[ROLE_USER,ROLE_ADMIN]}><AvailableGameListPage/></ProtectedRoute>} />
            {/* Jeu en ligne */}         
            <Route path="/games/:game_id" element={<ProtectedRoute allowedRoles={[ROLE_USER,ROLE_ADMIN]}><OnlineGamePage/></ProtectedRoute>} />
            {/* Page d'accueil du compte utilisateurs */}
            <Route path="user/home" element={<ProtectedRoute allowedRoles={[ROLE_USER,ROLE_ADMIN]}><AccountHomePage/></ProtectedRoute>} />
            {/* Modifier le profil de l'utilisateur connecté */}
            <Route path="user/profile-Management" element={<ProtectedRoute allowedRoles={[ROLE_USER,ROLE_ADMIN]}><ProfileManagementPage/></ProtectedRoute> } />
            {/* Page de gestion des parties programmées */}
            <Route path="user/scheduled-games" element={<ProtectedRoute allowedRoles={[ROLE_USER,ROLE_ADMIN]}><ScheduledGameListPage/> </ProtectedRoute>} />
            {/* Page de l'historique des parties */}
            <Route path="user/game-history" element={<ProtectedRoute allowedRoles={[ROLE_USER,ROLE_ADMIN]}><GameHistoryPage/> </ProtectedRoute>} />

            {/* Routes spécifique au administrateurs connectés */}

            {/* Page de gestion des utilisateurs (admin) */}
            <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={[ROLE_ADMIN]}><DashboardPage /></ProtectedRoute>} />
            {/* Page de gestion des utilisateurs (admin) */}
            <Route path="/admin/manage-users" element={<ProtectedRoute allowedRoles={[ROLE_ADMIN]}><ManageUsersPage /></ProtectedRoute>} />
            {/* Page de gestion des topics (admin) */}
            <Route path="/admin/manage-topics" element={<ProtectedRoute allowedRoles={[ROLE_ADMIN]}><ManageTopicsPage /></ProtectedRoute>} />
            {/* Page de gestion des commentaires (admin) */}
            <Route path="/admin/manage-comments/:topic_id" element={<ProtectedRoute allowedRoles={[ROLE_ADMIN]}><ManageCommentsPage /></ProtectedRoute>} />
            {/* Page de gestion des parties (admin) */}
            <Route path="/admin/manage-games" element={<ProtectedRoute allowedRoles={[ROLE_ADMIN]}><ManageGamesPage /></ProtectedRoute>} />

        </Routes>
     );
};

export default AppRoutes;