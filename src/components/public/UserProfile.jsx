import "./UserProfile.css"
import { useParams } from 'react-router-dom';
import { useState,useEffect } from "react";
import image from "../../assets/images/user.png"
import activities from './../../assets/data/activities.json'

const UserProfile = () => {

    const { user_id } = useParams();

    const [userStats, setUserStats] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const getUserById = (user_id) => users.find(user => user.id == user_id);

    const getStatByUserId = (user_id) => userStats.find(stat => stat.UserId == user_id);

    const user = getUserById(user_id);

    const stat = getStatByUserId(user_id);

    const statusClass = (user) => {
        return user.isOnline ? "userCard-info-status-online" : "userCard-info-status-offline";
    }
    
    let nbrGames;
    if (!user || !stat) return <p>Utilisateur ou statistiques non trouvés.</p>;
    {
        nbrGames = stat.wins +stat.losses + stat.draws
    }
    

    return (
        <div>
             <section className="bannerProfile banner">
             </section>
             <section className = "main-content">
                <h1 className = "main-content-title">Profil joueur</h1>
                <div className="profile">
                    <div className = "profile-leftBlock"> 
                        <h2>Infos</h2>
                        <div className = "profile-leftBlock-infos">
                            <div className="profile-leftBlock-infos-avatar">
                                <img src={image} alt="" />
                            </div>
                            <p className="profile-leftBlock-infos-username">{user.username}</p>
                            <p className={statusClass(user)}>
                            {user.isOnline ? "Online" : "Offline"}</p>
                            <p>{user.country}</p>
                            <p>{`Membre depuis le ${new Date(user.createdAt).toLocaleDateString('fr-FR')}`}</p>

                        </div>
                        <h2>Statistiques</h2>
                        <div className = "profile-leftBlock-stats">
                            <p>{`Partie jouées: ${nbrGames}`}</p>
                            <p>{`Victoires: ${stat.wins}`}</p>
                            <p>{`Défaites: ${stat.losses}`}</p>
                            <p>{`Nulles: ${stat.draws}`}</p>
                        </div>
                    </div>
                    <div className = "profile-rightBlock">
                        <h2>Biographie</h2>
                        <div className = "profile-rightBlock-biography">
                            <p>{user.biography}</p>
                        </div>
                        <h2>Activité</h2>
                        <div className = "profile-rightBlock-activity">
                            <div className = "profile-rightBlock-activity-list">
                                <table className = "profile-rightBlock-activity-list-table">
                                    <thead>
                                        <tr>
                                            <th>Type d'activité</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activities.map((activity) => (
                                        <tr key={activity.id}>
                                            <td>{activity.activity_type}</td>
                                            <td>{`le ${new Date(activity.created_at).toLocaleDateString('fr-FR')} à ${new Date(activity.created_at).toLocaleTimeString()}`}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
             </section>
        </div>
    );
};

export default UserProfile;