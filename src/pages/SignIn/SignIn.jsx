import React, { useState } from "react";
import "./SignIn.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import google_icon from "../../assets/google_icon.png";
import facebook_icon from "../../assets/facebook_icon.png";
import breadcrum_img from "../../assets/breadcrum_img.png";
import { auth } from "../../../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const selectedRole = e.target.role.value;

    try {
      if (isLogin) {
        // Sign in existing user
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast.success("Successfully logged in!");
        navigate("/");
      } else {
        // Check password strength
        if (password.length < 6) {
          toast.error("Password should be at least 6 characters long.");
          return;
        }

        // Create a new user and save role
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Save the selected role in Firestore
        await setDoc(doc(db, "users", user.uid), {
          role: selectedRole,
          email: email,
        });

        toast.success("Account created successfully!");
        navigate("/");
      }
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error(
            "Email is already registered. Please use a different email or log in."
          );
          break;
        case "auth/invalid-email":
          toast.error("Invalid email address format.");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password. Please try again.");
          break;
        case "auth/user-not-found":
          toast.error("No user found with this email. Please sign up.");
          break;
        case "auth/weak-password":
          toast.error(
            "Password is too weak. Please choose a stronger password."
          );
          break;
        default:
          toast.error("Authentication error. Please try again.");
          console.error("Error during authentication:", error.message);
      }
    }
  };

  const handleSocialSignIn = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore and has a role
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        // If no role is set, prompt user to select a role
        toast.info("Please select your account type.");
        return;
      }

      toast.success("Successfully logged in!");
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/account-exists-with-different-credential":
          toast.error("Email already exists.");
          break;
        case "auth/popup-blocked":
          toast.error("Login popup was blocked. Please allow popups.");
          break;
        case "auth/popup-closed-by-user":
          toast.info("Login popup was closed.");
          break;
        default:
          toast.error("Social login failed. Please try again.");
          console.error("Error during social sign-in:", error.message);
      }
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="signin-left">
        <img src={breadcrum_img} alt="Vegetables" className="signin-image" />
      </div>
      <div className="signin-right">
        <h2 className="signin-title">{isLogin ? "Log In" : "Sign Up"}</h2>
        <form className="signin-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="signin-input-group">
              <input type="text" placeholder="First Name" name="firstName" />
              <input type="text" placeholder="Last Name" name="lastName" />
            </div>
          )}
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
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
            <img src={google_icon} alt="Google" /> Sign {isLogin ? "In" : "Up"}{" "}
            with Google
          </button>
          <button className="social-button" onClick={handleFacebookSignIn}>
            <img src={facebook_icon} alt="Facebook" /> Sign{" "}
            {isLogin ? "In" : "Up"} with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
