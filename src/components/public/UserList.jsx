import "./UserList.css"
import { useState } from "react";
import { Link } from "react-router-dom";

import image from "../../assets/images/user.png"
import Pagination from "./../common/Pagination";

import users from './../../assets/data/users.json';
import stats from './../../assets/data/stats.json';
  

const UserList = () => {


    const [sortOption, setSortOption] = useState('username');

    const getStatByUserId = (user_id) => stats.find(stat => stat.user_id == user_id);

    const sortedUsers = users.sort((a, b) => {
        if (sortOption === 'score') {
            return getStatByUserId(b.id).score - getStatByUserId(a.id).score; // Tri par score décroissant
        } else if (sortOption === 'username') {
            return a.username.localeCompare(b.username); // Tri alphabétique
        } else if (sortOption === 'country') {
            return a.country.localeCompare(b.country); // Tri par pays
        } else if (sortOption === 'onlineStatus') {
            return b.isOnline - a.isOnline; // Tri par statut en ligne
        }
        return 0;
    });

    const [currentPage, setCurrentPage] = useState(1);
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
                <h1 className="main-content-title">Membres de ShogiConnect</h1>
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
                    {!currentUsers ? <p>En cours de chargement</p> :
                    currentUsers.map(user => (
                      <Link key = {user.id} to={`/users/${user.id}`}>
                        <div className="userCard">
                          <div className="userCard-avatar">
                              <img src={image} alt="" />
                          </div>
                          <div className="userCard-info">
                              <p className="userCard-info-username">{user.username}</p>
                              <p className="userCard-info-country">{user.country}</p>
                              <p className={statusClass(user)}>
                              {user.isOnline ? "Online" : "Offline"}
                              </p>
                              <p>Score: {getStatByUserId(user.id).score}</p>
                          </div>
                        </div>
                      </Link>))}
                </div>
                <Pagination userPerPage={usersPerPage} totalUsers={users.length} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </section>
        </div>
    );
};

export default UserList;