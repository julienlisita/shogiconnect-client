import "./AccountHome.css"
import stats from './../../assets/data/stats.json';
import activities from './../../assets/data/activities.json';


const AccountHome = () => {

   const user = {
        id: 1,
        username: "ShadowNinja",
        country: "France",
        isOnline: true,
        biography: "Je suis un maître de la furtivité, et j'ai toujours un coup d'avance sur mes adversaires. Le Shogi est pour moi une manière de développer mon esprit tactique et de rester en éveil. Depuis des années, j'étudie les stratégies et les mouvements des grands maîtres du Shogi. J'aime aussi analyser chaque partie que je joue, en cherchant constamment à m'améliorer. Pour moi, le Shogi n'est pas seulement un jeu, c'est un art qui reflète l'harmonie entre la patience, la précision et la détermination. Mon objectif est de devenir un joueur reconnu sur la scène internationale.",
        user_role_id: 1,
        created_at: "2024-09-01 09:00:00"
      }

    const getStatByUserId = (user_id) => stats.find(stat => stat.user_id == user_id);

    const getActivityListByUserId = (user_id) => activities.filter(activity => activity.user_id == user_id);

    const myActivities = getActivityListByUserId(user.id);
    const activitiesSortedBydate = myActivities && myActivities.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))

    const stat = getStatByUserId(user.id);
    const nbrGames = stat.wins + stat.losses + stat.draws;

    return (
            <div className="accountHome-container">
                <div className="accountHome">
                    <h1>Dashboard membre</h1>
                    <div className="accountHome-content">
                        <div className="accountHome-content-leftBlock">
                            <div className="accountHome-content-leftBlock-infos">
                                <h2>Infos personnelles</h2>
                                <p>{`Inscrit depuis le ${new Date(user.created_at).toLocaleDateString('fr-FR')}`}</p>
                                <p>{`Pays: ${user.country}`}</p>
                                <div className="accountHome-content-leftBlock-infos-biographyContainer">
                                    <p>{user.biography}</p>
                                </div>
                            </div>
                            <div className="accountHome-content-leftBlock-stats">
                                <h2>Statistiques joueur</h2>
                                <p>{`Parties jouées: ${nbrGames}`}</p>
                                <p>{`Victoires: ${nbrGames}`}</p>
                                <p>{`Défaites jouées: ${nbrGames}`}</p>
                                <p>{`Nulles jouées: ${nbrGames}`}</p>
                            </div>
                        </div>
                        <div className="accountHome-content-rightBlock">
                            <h2>Activité de jeu</h2>
                            <div className="accountHome-content-rightBlock-activityContainer">
                            {
                                !activities ? <p>aucune activité</p> :
                                <div>
                                    {
                                        activitiesSortedBydate.map((activity) => {
                                            return <p key={activity.id}>{`${activity.activity_type} le ${new Date(user.created_at).toLocaleDateString('fr-FR')} à ${new Date(user.created_at).toLocaleTimeString()}`}</p>
                                        })
                                    }
                                </div>
                            } 
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
    );
};

export default AccountHome;