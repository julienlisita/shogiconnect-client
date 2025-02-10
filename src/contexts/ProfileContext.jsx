import React, { createContext, useContext } from "react";
import useProfile from "../hooks/useProfile";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const profile = useProfile();

    return (
        <ProfileContext.Provider value={profile}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfileContext = () => useContext(ProfileContext);