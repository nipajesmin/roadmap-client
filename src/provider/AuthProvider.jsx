import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.init';

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

        // Function to create a new user
    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

        const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

        const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

        const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser , updatedData)

    }

        useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); 
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const userInfo ={

        user,
        loading,
        createNewUser,
        setUser,
        signInUser,
        signOutUser,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={userInfo} >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;