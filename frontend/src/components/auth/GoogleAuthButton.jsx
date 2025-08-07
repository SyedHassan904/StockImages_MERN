import { useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
};

// Initialize Firebase once
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const GoogleAuthButton = () => {
  const [popupLoading, setPopupLoading] = useState(false);
  const { setUser } = useAuth(); // ✅ Optional, only if using AuthContext

  const handleGoogleLogin = async () => {
    if (popupLoading) return;
    setPopupLoading(true);

    const provider = new GoogleAuthProvider();

    try {
      // Step 1: Google Sign-In
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // Step 2: Send ID token to backend
      const res = await fetch(`${process.env.REACT_APP_URL}/auth/verify-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      });

      const data = await res.json();

      if (res.ok && data.success) {

        localStorage.setItem("token", data.token);

        if (setUser) {
          setUser(data.user);
        }

        toast.success(`Welcome, ${data.user.name}`);
        window.location.href = "/";
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Google login error:", err);
      toast.error("Google login failed");
    } finally {
      setPopupLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={popupLoading}
      className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:border-gray-400 py-2 px-4 rounded-md shadow-sm transition-all disabled:opacity-50"
    >
      <img src="/google-tile.svg" alt="Google logo" className="w-5 h-5" />
      <span className="text-gray-700 text-sm font-medium">
        {popupLoading ? "Signing in..." : "Continue with Google"}
      </span>
    </button>
  );
};

export default GoogleAuthButton;
