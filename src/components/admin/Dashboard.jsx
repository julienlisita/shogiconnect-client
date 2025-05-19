import "./Dashboard.css";
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { useProfileContext } from "../../contexts/ProfileContext.jsx";
import { useUserContext } from "../../contexts/UserContext.jsx";

const Dashboard = () => {

    const { user, userError } = useAuthContext();
    const { adminActivities, siteStats, profileLoading, profileError } = useProfileContext();
    const { adminStats, adminStatsLoading, adminError } = useUserContext();

    if (!user  || profileLoading || adminStatsLoading) return <p>Loading...</p>;
    if (userError) return <p>Error loading users: {userError}</p>;
    if (profileError) return <p>Error loading profile: {profileError}</p>;
    if (adminError) return <p>Error loading users: {adminError}</p>;

    const stat = adminStats?.find(stat => stat.AdminId === user.id) || {};

    const formatActivityMessage = (activity) => {
        switch (activity.activity_type) {
            case "DELETE_USER":
                return `Vous avez supprimé l'utilisateur "${activity.related_name}"`;
            case "DELETE_TOPIC":
                return `Vous avez supprimé le topic "${activity.related_name}"`;
            case "DELETE_COMMENT":
                return `Vous avez supprimé le commentaire de ${activity.related_name}`;
            case "DELETE_SCHEDULED_GAME":
                return `Vous avez supprimé un rendez-vous de partie de ${activity.related_name}`;
          default:
            return `Action inconnue`;
        }
      };

    const adminActivitiesSortedByDate =
    Array.isArray(adminActivities) ? [...adminActivities].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

    return (
            <div className="dashboard-container">
                <div className="dashboard">
                    <h1>Dashboard Administrateur</h1>
                    <div className="dashboard-content">
                        <div className="dashboard-content-leftBlock">
                            <div className="dashboard-content-leftBlock-stats1">
                                <h2>Statistiques du site</h2>
                                <p>{`Membres créés: ${siteStats?.totalUsers || 0}`}</p>
                                <p>{`Membres actifs:${siteStats?.activeUsers || 0}`}</p>
                                <p>{`Topics créés: ${siteStats?.totalTopics || 0}`}</p>
                                <p>{`Topics actifs: ${siteStats?.activeTopics || 0}`}</p>
                                <p>{`Commentaires postés: ${siteStats?.totalComments || 0}`}</p>
                                <p>{`Commentaires actif: ${siteStats?.activeComments || 0}`}</p>
                                <p>{`Rendez-vous de partie créés: ${siteStats?.totalScheduledGames || 0}`}</p>
                                <p>{`Rendez-vous de partie actifs: ${siteStats?.activeScheduledGames || 0}`}</p>
                            </div>
                            <div className="dashboard-content-leftBlock-stats2">
                                <h2>Statistiques de gestion</h2>
                                <p>{`Comptes supprimés: ${stat?.usersDeleted || 0}`}</p>
                                <p>{`Topics supprimés: ${stat?.topicsDeleted || 0}`}</p>
                                <p>{`Commentaires supprimés: ${stat?.commentsDeleted || 0}`}</p>
                                <p>{`Rendez-vous de partie supprimés: ${stat?.scheduledGamesDeleted || 0}`}</p> 
                            </div>
                        </div>
                        <div className="dashboard-content-rightBlock">
                            <h2>Activité de gestion</h2>
                            <div className="dashboard-content-rightBlock-activityContainer">
                            {adminActivitiesSortedByDate.length === 0 ? (
                                <p>Aucune activité</p>
                            ) : (
                                <div>
                                {adminActivitiesSortedByDate.map((activity) => (
                                    <p key={activity.id}>
                                    {`${formatActivityMessage(activity)} le ${new Date(activity.createdAt).toLocaleDateString(
                                        'fr-FR'
                                    )} à ${new Date(activity.createdAt).toLocaleTimeString('fr-FR')}`}
                                    </p>
                                ))}
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
    );
};

export default Dashboard;