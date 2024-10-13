import React, { useState } from "react";
import "./SignIn.css";
import google_icon from "../../assets/google_icon.png";
import facebook_icon from "../../assets/facebook_icon.png";
import breadcrum_img from "../../assets/breadcrum_img.png";
import { auth } from "../../../firebaseConfig"; // Adjust the path as needed
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../../../firebaseConfig"; // Import Firestore database
import { useNavigate } from "react-router-dom"; // Import for navigation

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate(); // Hook to programmatically navigate

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const selectedRole = e.target.role.value; // Get the role (customer/seller)

    try {
      if (isLogin) {
        // Sign in existing user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in:", userCredential.user);
      } else {
        // Create a new user and save role
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User signed up:", user);

        // Save the selected role in Firestore
        await setDoc(doc(db, "users", user.uid), {
          role: selectedRole,
        });
      }

      // Redirect to home page after successful sign up/login
      navigate("/");
    } catch (error) {
      console.error("Error during authentication:", error.message);
    }
  };

  const handleSocialSignIn = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User signed in with social account:", user);
      // Redirect to home page after successful social login
      navigate("/");
    } catch (error) {
      console.error("Error during social sign-in:", error.message);
    }
  };

  const handleGoogleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    handleSocialSignIn(googleProvider);
  };

  const handleFacebookSignIn = () => {
    const facebookProvider = new FacebookAuthProvider();
    handleSocialSignIn(facebookProvider);
  };

  return (
    <div className="signin-container">
      <div className="signin-left">
        <img src={breadcrum_img} alt="Vegetables" className="signin-image" />
      </div>
      <div className="signin-right">
        <h2 className="signin-title">{isLogin ? "Log In" : "Sign Up"}</h2>
        <form className="signin-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="signin-input-group">
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
            </div>
          )}
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <select name="role" className="panels" required>
            <option value="">Select Panel</option>
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>
          <button type="submit" className="signin-button">
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>
        <p className="signin-footer-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <a href="#" onClick={toggleForm}>
            {isLogin ? "Sign Up" : "Log In"}
          </a>
        </p>
        <div className="signin-divider">
          <span></span> or <span></span>
        </div>
        <div className="signin-social-buttons">
          <button className="social-button" onClick={handleGoogleSignIn}>
            <img src={google_icon} alt="Google" /> Sign {isLogin ? "In" : "Up"} with Google
          </button>
          <button className="social-button" onClick={handleFacebookSignIn}>
            <img src={facebook_icon} alt="Facebook" /> Sign {isLogin ? "In" : "Up"} with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
