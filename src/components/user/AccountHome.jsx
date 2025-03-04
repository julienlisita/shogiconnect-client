import "./AccountHome.css";
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { useProfileContext } from "../../contexts/ProfileContext.jsx";
import { useUserContext } from "../../contexts/UserContext.jsx";

const AccountHome = () => {
  const { user, userError } = useAuthContext();
  const { profile, userActivities, profileLoading, profileError } = useProfileContext();
  const { userStats, userStatsLoading, userStatsError } = useUserContext();

  if (!user  || profileLoading || userStatsLoading) return <p>Loading...</p>;
  if (userError) return <p>Error loading users: {userError}</p>;
  if (profileError) return <p>Error loading profile: {profileError}</p>;
  if (userStatsError) return <p>Error loading users: {usersError}</p>;

  const stat = userStats?.find((stat) => stat.UserId == user.id);
  const nbrGames = stat?.wins + stat?.losses + stat?.draws;

  const activitiesSortedByDate =
    Array.isArray(userActivities) ? [...userActivities].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];


  // Affichage avec vérifications supplémentaires pour éviter les erreurs sur des données undefined
  return (
    <div className="accountHome-container">
      <div className="accountHome">
        <h1>Dashboard membre</h1>
        <div className="accountHome-content">
          <div className="accountHome-content-leftBlock">
            <div className="accountHome-content-leftBlock-infos">
              <h2>Infos personnelles</h2>
              {/* Vérification si profile.createdAt existe avant de l'utiliser */}
              <p>
                {profile?.createdAt
                  ? `Inscrit depuis le ${new Date(profile.createdAt).toLocaleDateString('fr-FR')}`
                  : "Date d'inscription inconnue"}
              </p>
              <p>{profile?.country ? `Pays: ${profile.country}` : "Pays inconnu"}</p>
              <div className="accountHome-content-leftBlock-infos-biographyContainer">
                <p>{profile?.biography || "Biographie inconnue"}</p>
              </div>
            </div>
            <div className="accountHome-content-leftBlock-stats">
              <h2>Statistiques joueur</h2>
              <p>{`Parties jouées: ${nbrGames || 0}`}</p>
              <p>{`Victoires: ${stat?.wins || 0}`}</p>
              <p>{`Défaites: ${stat?.losses || 0}`}</p>
              <p>{`Nulles: ${stat?.draws || 0}`}</p>
            </div>
          </div>
          <div className="accountHome-content-rightBlock">
            <h2>Activité</h2>
            <div className="accountHome-content-rightBlock-activityContainer">
              {activitiesSortedByDate.length === 0 ? (
                <p>Aucune activité</p>
              ) : (
                <div>
                  {activitiesSortedByDate.map((activity) => (
                    <p key={activity.id}>
                      {`${activity.description} le ${new Date(activity.createdAt).toLocaleDateString(
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

export default AccountHome;