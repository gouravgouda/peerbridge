
import { AuthForm } from "@/components/auth/auth-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        const user = JSON.parse(currentUser);
        if (user.role === "investor") {
          navigate("/investor-home");
        } else {
          navigate("/home");
        }
      } else {
        navigate("/home");
      }
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-peerbridge-50 to-peerbridge-100 px-4 py-8">
      <AuthForm type="login" />
    </div>
  );
};

export default LoginPage;
