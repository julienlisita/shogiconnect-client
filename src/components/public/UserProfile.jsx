// src/public/UserProfile.jsx

import "./UserProfile.css"
import { useParams } from 'react-router-dom';
import image from "../../assets/images/user.png"
import activities from './../../assets/data/activities.json'
import { useUserContext } from "../../contexts/UserContext.jsx";
import PageTitle from "../common/PageTitle.jsx";

const UserProfile = () => {

    const { user_id } = useParams();
    const { users, userStats, usersLoading, usersError } = useUserContext();

    if (usersLoading) return <p>Loading...</p>;
    if (usersError) return <p>Error loading users: {usersError}</p>;

    // Fonctions utilitaires

    const user = users?.find(user => user.id == user_id);

    const stat = userStats?.find(stat => stat.UserId == user_id);
    
    if (!user || !stat) return <p>Utilisateur ou statistiques non trouvés.</p>;

    const statusClass = user.isOnline ? "userCard-info-status-online" : "userCard-info-status-offline";
    
    const nbrGames = stat ? (stat.wins + stat.losses + stat.draws) : 0;

    const userActivities = activities.filter(activity => activity.userId == user.id);

    const avatar = user && user.avatar ? `http://localhost:3000/uploads/${user.avatar}` : image;
    
    
    return (
        <div>
             <section className="bannerProfile banner">
             </section>
             <section className = "main-content">
                <PageTitle>Profil joueur</PageTitle>
                <div className="profile">
                    <div className = "profile-leftBlock"> 
                        <h2>Infos</h2>
                        <div className = "profile-leftBlock-infos">
                            <div className="profile-leftBlock-infos-avatar">
                                <img src={avatar} alt="" />
                            </div>
                            <p className="profile-leftBlock-infos-username">{user.username}</p>
                            <p className={statusClass}>
                            {user.isOnline ? "Online" : "Offline"}</p>
                            <p>{user.country || "Pays inconnu"}</p>
                            <p>{`Membre depuis le ${new Date(user.createdAt).toLocaleDateString('fr-FR')}`}</p>

                        </div>
                        <h2>Statistiques</h2>
                        <div className = "profile-leftBlock-stats">
                            <p>{`Partie jouées: ${nbrGames}`}</p>
                            <p>{`Victoires: ${stat?.wins || 0}`}</p>
                            <p>{`Défaites: ${stat?.losses || 0}`}</p>
                            <p>{`Nulles: ${stat?.draws || 0}`}</p>
                        </div>
                    </div>
                    <div className = "profile-rightBlock">
                        <h2>Biographie</h2>
                        <div className = "profile-rightBlock-biography">
                            <p>{user.biography || "aucune biographie disponible" }</p>
                        </div>
                        <h2>Activité</h2>
                        <div className = "profile-rightBlock-activity">
                            <div className = "profile-rightBlock-activity-list">
                            {userActivities.length > 0 ? (
                                <table className = "profile-rightBlock-activity-list-table">
                                    <thead>
                                        <tr>
                                            <th>Type d'activité</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userActivities.map((activity) => (
                                        <tr key={activity.id}>
                                            <td>{activity.activity_type}</td>
                                            <td>{`le ${new Date(activity.created_at).toLocaleDateString('fr-FR')} à ${new Date(activity.created_at).toLocaleTimeString()}`}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ): (
                                <p>Aucune activité récente.</p>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
             </section>
        </div>
    );
};

export default UserProfile;