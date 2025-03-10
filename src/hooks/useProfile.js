import { useState, useEffect } from "react";
import profileService from '../services/profileService';
import userActivityService from "../services/userActivityService";
import adminActivityService from "../services/adminActivityService";
import { useAuthContext } from "../contexts/AuthContext";
import siteStatsService from "../services/siteStatsService";

const ROLE_USER = 1
const ROLE_ADMIN = 2

const useProfile = () => {
  const { user, logout, isAuthenticated } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [userActivities, setUserActivities] = useState(null);
  const [adminActivities, setAdminActivities] = useState(null);
  const [siteStats, setSiteStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Récupérer les données du profil de l'utilisateur connécté
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user?.id) {
          console.log("User ID is undefined");
          return;
        }

        const [profileData, userActivitiesData, adminActivitiesData, siteStatsData] = await Promise.all([
          profileService.getProfile().catch(err => {
            console.error("Error fetching profile:", err);
            return null;
          }),
          userActivityService.getUserActivities(user.id).catch(err => {
            console.error("Error fetching user activities:", err);
            return null;
          }),
          user.roleId === ROLE_ADMIN 
            ? adminActivityService.getAdminActivities(user.id).catch(err => {
                console.error("Error fetching admin activities:", err);
                return null;
              })
            : Promise.resolve(null),
          user.roleId === ROLE_ADMIN 
          ? siteStatsService.getSiteStats().catch(err => {
              console.error("Error fetching site stats:", err);
              return null;
            })
          : Promise.resolve(null),
        ]);

        // Mise à jour des données
  
        // Mise à jour du profil
        if (profileData) {
          setProfile(profileData);
        } else {
          setError("Profile data is empty");
        }

        // Mise à jour des activités utilisateur
        if (userActivitiesData) {
          setUserActivities(userActivitiesData);
        } else {
          setError("Activities data is empty");
        }

        // Mise à jour des activités admin (si applicable)
        if (user.roleId === ROLE_ADMIN && adminActivitiesData) {
          setAdminActivities(adminActivitiesData);
        }

        // Mise à jour
        if (user.roleId === ROLE_ADMIN && siteStatsData) {
          setSiteStats(siteStatsData);
        }

      } catch (err) {
        console.log("Error fetching profile:", err);
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && user?.id) {
      fetchProfile();
    }
  }, [ isAuthenticated]);

  // Mettre à jour son propre profil
  const updateProfile = async (updatedData) => {
    try {
      const updatedProfile = await profileService.updateProfile(updatedData);
      setProfile(updatedProfile);
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  // Supprimer son propre profil
  const deleteProfile = async () => {
    try {  
      await profileService.deleteProfile(); 
      logout();
      setProfile(null); 
      setUserActivities(null); 
    } catch (err) {
      console.error("Erreur lors de la suppression du profil:", err);
      setError("Failed to delete profile");
    }
  };

  // Fonction pour mettre à jour l'avatar
  const updateAvatar = async (avatarData) => {
    try {
        const updatedProfile = await profileService.updateAvatar(avatarData); // Mettre à jour l'avatar via le service
        setProfile((prevProfile) => ({
          ...prevProfile,
          avatar: updatedProfile.avatar
        }));
    } catch (err) {
        setError('Erreur lors de la mise à jour de l\'avatar');
        console.error(err);
    }
};

  return { profile, userActivities, adminActivities, siteStats, loading, error, updateProfile, deleteProfile, updateAvatar };
};

export default useProfile;