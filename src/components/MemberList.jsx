import "./MemberList.css"
import { useState } from "react";
import { Link } from "react-router-dom";

import image from "../assets/images/user.png"
import Pagination from "./Pagination";

import users from './users.json';
import stats from './stats.json';
  

const MemberList = () => {


    const [sortOption, setSortOption] = useState('username');

    const getStatByUserId = (user_id) => stats.find(stat => stat.user_id == user_id);

    const sortedMembers = users.sort((a, b) => {
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
    const membersPerPage = 21; 
  
    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = sortedMembers.slice(indexOfFirstMember, indexOfLastMember);


    const statusClass = (member) => {
        return member.isOnline ? "memberCard-info-status-online" : "memberCard-info-status-offline";
    }

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };


    return (
        <div>
            <section className="bannerMemberList banner">
            </section>
            <section className="members main-content">
                <h1 className="main-content-title">Membres de ShogiConnect</h1>
                <h2>Liste des membres</h2>
                <form className="members-displaySelection">
                    <label htmlFor="sortBy"></label>
                    <select className = "orderSelect" id="sortBy" value={sortOption} name="sortBy" onChange={handleSortChange}>
                        <option value="username">Par pseudo</option>
                        <option value="score">Par score</option>
                        <option value="country">Par pays</option>
                        <option value="onlineStatus">Par statut</option>
                    </select>
                </form>
                <div className="members-list">
                    {!currentMembers ? <p>En cours de chargement</p> :
                    currentMembers.map(member => (
                      <Link key = {member.id} to={`/users/${member.id}`}>
                        <div className="memberCard">
                          <div className="memberCard-avatar">
                              <img src={image} alt="" />
                          </div>
                          <div className="memberCard-info">
                              <p className="memberCard-info-username">{member.username}</p>
                              <p className="memberCard-info-country">{member.country}</p>
                              <p className={statusClass(member)}>
                              {member.isOnline ? "Online" : "Offline"}
                              </p>
                              <p>Score: {getStatByUserId(member.id).score}</p>
                          </div>
                        </div>
                      </Link>))}
                </div>
                <Pagination membersPerPage={membersPerPage} totalMembers={users.length} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </section>
        </div>
    );
};

export default MemberList;