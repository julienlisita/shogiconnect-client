// src/public/UserList.jsx

import "./UserList.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext.jsx";
import image from "../../assets/images/user.png"
import Pagination from "./../common/Pagination";
import PageTitle from "../common/PageTitle.jsx";

const UserList = () => {

    const { users, userStats, usersLoading, usersError } = useUserContext();
    const [sortOption, setSortOption] = useState('username');
    const [currentPage, setCurrentPage] = useState(1);

    if (usersLoading) return <p>Loading...</p>;
    if (usersError) return <p>Error loading users: {usersError}</p>;

    // Fonctions utilitaires

    const getStatByUserId = (user_id) => userStats ? userStats.find(stat => stat.UserId == user_id) : null;

    const getAvatar = (user) => user && user.avatar ? `http://localhost:3000/uploads/${user.avatar}` : image;
    

    const sortedUsers = users.sort((a, b) => {
        if (sortOption === 'score') {
            const aStat = getStatByUserId(a.id);
            const bStat = getStatByUserId(b.id);
            return (bStat?.score || 0) - (aStat?.score || 0); // Tri par score décroissant
        } else if (sortOption === 'username') {
            return a.username.localeCompare(b.username); // Tri alphabétique
        } else if (sortOption === 'country') {
            return a.country.localeCompare(b.country); // Tri par pays
        } else if (sortOption === 'onlineStatus') {
            return b.isOnline - a.isOnline; // Tri par statut en ligne
        }
        return 0;
    });

    const usersPerPage = 21; 
  
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

    const statusClass = (users) => {
        return users.isOnline ? "userCard-info-status-online" : "userCard-info-status-offline";
    }

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    return (
        <div>
            <section className="bannerUserList banner">
            </section>
            <section className="users main-content">
                <PageTitle>Membres de ShogiConnect</PageTitle>
                <h2>Liste des membres</h2>
                <form className="users-displaySelection">
                    <label htmlFor="sortBy"></label>
                    <select className = "orderSelect" id="sortBy" value={sortOption} name="sortBy" onChange={handleSortChange}>
                        <option value="username">Par pseudo</option>
                        <option value="score">Par score</option>
                        <option value="country">Par pays</option>
                        <option value="onlineStatus">Par statut</option>
                    </select>
                </form>
                <div className="users-list">
                    {currentUsers.length  === 0 ? 
                    <p>Aucun membres</p> :
                    currentUsers.map(user => {
                        const userStat = getStatByUserId(user.id);

                        return (
                      <Link key = {user.id} to={`/users/${user.id}`}>
                        <div className="userCard">
                          <div className="userCard-avatar">
                              <img src={getAvatar(user)} alt="" />
                          </div>
                          <div className="userCard-info">
                              <p className="userCard-info-username">{user.username}</p>
                              <p className="userCard-info-country">{user.country}</p>
                              <p className={statusClass(user)}>
                              {user.isOnline ? "Online" : "Offline"}
                              </p>
                              <p>Score: {userStat ? userStat.score : "Non disponible"}</p>
                          </div>
                        </div>
                      </Link>)}
                    )}
                </div>
                <Pagination usersPerPage={usersPerPage} totalUsers={users.length} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </section>
        </div>
    );
};

export default UserList;