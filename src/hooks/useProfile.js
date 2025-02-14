import { useState, useEffect } from "react";
import profileService from '../services/profileService';
import activityService from "../services/activityService";
import { useAuthContext } from "../contexts/AuthContext";

const useProfile = () => {
  const { user, logout, isAuthenticated } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [activities, setActivities] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // récupérer les données du profil de l'utilisateur connécté
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user?.id) {
          console.log("User ID is undefined");
          return;
        }

        const [profileData, activitiesData] = await Promise.all([
          profileService.getProfile(),
          activityService.getActivities(user.id),
        ]);

        if (profileData) {
          setProfile(profileData);
        } else {
          setError("Profile data is empty");
        }

        if (activitiesData) {
          setActivities(activitiesData);
        } else {
          setError("Activities data is empty");
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
      setActivities(null); 
    } catch (err) {
      console.error("Erreur lors de la suppression du profil:", err);
      setError("Failed to delete profile");
    }
  };

  return { profile, activities, loading, error, updateProfile, deleteProfile };
};

export default useProfile;