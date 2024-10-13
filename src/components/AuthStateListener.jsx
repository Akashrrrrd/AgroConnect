// AuthStateListener.jsx
import React, { useEffect, useState } from 'react';
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const AuthStateListener = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        console.log("User is signed in:", currentUser);
      } else {
        console.log("No user is signed in");
        navigate("/signin"); // Redirect to sign-in page if no user is signed in
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [navigate]);

  return <>{children}</>;
};

export default AuthStateListener;
