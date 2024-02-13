import React, { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { BsLightningChargeFill } from "react-icons/bs";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import "../styles/democard.css"; // Import the SCSS file

const password = import.meta.env.VITE_FIREBASE_PASSWORD

const DemoUserCard = () => {
  const navigate = useNavigate();
  const [isCardVisible, setIsCardVisible] = useState(true);

  const handleDemoLogin = async () => {
    try {
      // Replace config with your Firebase configuration
      const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_KEY,
        authDomain: import.meta.env.VITE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_APP_ID,
      };

      const app = initializeApp(firebaseConfig);
      const authObject = getAuth(app);

      await signInWithEmailAndPassword(authObject, "jigargokani100@gmail.com",password );
      toast.success("Admin login successful!");
      navigate("/admin/dashboard"); // Navigate to the admin dashboard after login
    } catch (error) {
      toast.error("Admin login failed");
    }
  };

  const handleToggleCard = () => {
    setIsCardVisible((prev) => !prev);
  };

  return (
    <div className={`demo-user-card ${isCardVisible ? "" : "hidden"}`}>
      <div onClick={handleToggleCard} className="rotation-circle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="20" height="20">
          <circle cx="50" cy="50" r="45" fill="#888888" stroke="#000000" strokeWidth="2" />
          <circle cx="50" cy="50" r="20" fill="#ffffff" />
        </svg>
      </div>
      <div className="card-container">
        <p className="card-title">
          Take a Demo &nbsp; <BsLightningChargeFill size={20} />
        </p>
        <button onClick={handleDemoLogin} className="login-button">
          <FcGoogle className="icon" /> Click here for Admin Demo
        </button>
      </div>
    </div>
  );
};

export default DemoUserCard;
