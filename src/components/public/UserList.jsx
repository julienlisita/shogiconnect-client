import "./UserList.css"
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

import image from "../../assets/images/user.png"
import Pagination from "./../common/Pagination";

const UserList = () => {

    const [userStats, setUserStats] = useState([]);
    const [users, setUsers] = useState([]);
    const [sortOption, setSortOption] = useState('username');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userStatsResponse, usersResponse] = await Promise.all([
                    fetch('http://localhost:3000/api/userStats'),
                    fetch('http://localhost:3000/api/users')
                ]);
    
                const userStatsData = await userStatsResponse.json();
                const usersData = await usersResponse.json();
    
                setUserStats(userStatsData.data);
                setUsers(usersData.data);
            } catch (error) {
                setError(error.message);
            } finally {
                 setLoading(false);
            }
        };
    
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


    const getStatByUserId = (user_id) => userStats.find(stat => stat.UserId == user_id);

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
                    {currentUsers.length  === 0 ? <p>Aucun membres</p> :
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
                <Pagination usersPerPage={usersPerPage} totalUsers={users.length} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </section>
        </div>
    );
};

export default UserList;