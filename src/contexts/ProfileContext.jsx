import React, { createContext, useContext } from "react";
import useProfile from "../hooks/useProfile";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const {profile, userActivities, adminActivities, siteStats,  loading, error, updateProfile, deleteProfile, updateAvatar} = useProfile();

    return (
        <ProfileContext.Provider value={{profile, userActivities, adminActivities, siteStats, loading, error, updateProfile, deleteProfile, updateAvatar}}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfileContext = () => useContext(ProfileContext);