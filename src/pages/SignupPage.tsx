
import { AuthForm } from "@/components/auth/auth-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      navigate("/home");
      return;
    }
    
    // Check if role was selected
    const selectedRole = localStorage.getItem("selectedRole");
    if (!selectedRole) {
      // If no role is selected, redirect to role selection
      navigate("/select-role");
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-peerbridge-50 to-peerbridge-100 px-4 py-8">
      <AuthForm type="signup" />
    </div>
  );
};

export default SignupPage;
