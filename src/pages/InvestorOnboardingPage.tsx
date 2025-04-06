
import { InvestorForm } from "@/components/onboarding/investor-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InvestorOnboardingPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      navigate("/login");
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-peerbridge-50 to-peerbridge-100 px-4 py-8">
      <InvestorForm />
    </div>
  );
};

export default InvestorOnboardingPage;
