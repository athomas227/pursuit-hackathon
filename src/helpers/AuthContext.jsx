import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../Components/firebase/firebaseConfig";
import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignOut } from "../Components/firebase/auth";
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password) => {
    try {
      const userCredential = await doCreateUserWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error('Error during sign-up:', error);
      throw error;
    }
  };

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setCurrentUser(result.user);
      console.log('Google sign-in successful');
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await doSignInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await doSignOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    googleSignIn,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
