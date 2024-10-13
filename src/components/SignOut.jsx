// SignOut.jsx
import React from 'react';
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      navigate("/"); // Redirect to home or any other page
    } catch (error) {
      console.error("Error during sign-out:", error.message);
    }
  };

  return (
    <button onClick={handleSignOut}>Sign Out</button>
  );
};

export default SignOut;
