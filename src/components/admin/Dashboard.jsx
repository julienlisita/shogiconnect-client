import "./Dashboard.css";
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { useProfileContext } from "../../contexts/ProfileContext.jsx";
import { useUserContext } from "../../contexts/UserContext.jsx";

const Dashboard = () => {

    const { user, userError } = useAuthContext();
    const { adminActivities, profileLoading, profileError } = useProfileContext();
    const { adminStats, adminStatsLoading, adminError } = useUserContext();

    if (!user  || profileLoading || adminStatsLoading) return <p>Loading...</p>;
    if (userError) return <p>Error loading users: {userError}</p>;
    if (profileError) return <p>Error loading profile: {profileError}</p>;
    if (adminError) return <p>Error loading users: {adminError}</p>;

    const stat = adminStats?.find((stat) => stat.AdminId == user.id);

    const nbrUsersDeleted = stat ? stat.usersDeleted : 0;
    const nbrTopicsDeleted = stat ? stat.topicsDeleted : 0;
    const nbrCommentsDeleted = stat ? stat.commentsDeleted : 0;
    const nbrScheduledGamesDeleted = stat ? stat.scheduledGamesDeleted : 0;

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
                                <h2>Statistiques membres</h2>
                                <p>{`Membres actifs: `}</p>
                                <p>{`Parties en cours: `}</p>
                                <p>{`Nouveaux membres:`}</p>
                                <p>{`Parties crées: `}</p>
                                <p>{`Topics crées: `}</p>
                                <p>{`Commentaires postés: `}</p>
                            </div>
                            <div className="dashboard-content-leftBlock-stats2">
                                <h2>Statistiques de gestion</h2>
                                <p>{`Comptes supprimés: ${nbrUsersDeleted}`}</p>
                                <p>{`Topics supprimés: ${nbrTopicsDeleted}`}</p>
                                <p>{`Commentaires supprimés: ${nbrCommentsDeleted}`}</p>
                                <p>{`Rendez-vous de partie supprimés: ${nbrScheduledGamesDeleted}`}</p> 
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