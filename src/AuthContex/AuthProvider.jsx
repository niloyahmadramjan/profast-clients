import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebaseAuth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user account
  const signUpUserWithEmailPass = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // user login with email and pass
  const loginUserWithEmailPass = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  // user login with google popup
  const GoogleProvider = new GoogleAuthProvider();

  const signInGooglePopup = () => {
    setLoading(true);
    return signInWithPopup(auth, GoogleProvider);
  };
  // user login with gitHub popup
  const gitHubProvider = new GithubAuthProvider();

  const signInGithubPopup = () => {
    setLoading(true);
    return signInWithPopup(auth, gitHubProvider);
  };

  // update user profile
  const updateUserProfile = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });
  };

  // reset password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // user logout
  const signOutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const AuthUser = {
    signUpUserWithEmailPass,
    loginUserWithEmailPass,
    signInGooglePopup,
    signInGithubPopup,
    updateUserProfile,
    resetPassword,
    user,
    setUser,
    loading,
    setLoading,
    signOutUser,
  };

  return <AuthContext value={AuthUser}>{children}</AuthContext>;
};

export default AuthProvider;
