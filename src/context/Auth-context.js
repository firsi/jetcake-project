import React, { useState, createContext, useEffect, useContext } from 'react';
import app from '../base';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        app.auth().onAuthStateChanged(setCurrentUser)
    },[]);

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useCurrentUserValue = () => useContext(AuthContext);