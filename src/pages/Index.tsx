import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
const Index = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // This simulates checking if the user is already logged in
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [navigate]);
  return <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-peerbridge-50 to-peerbridge-100 p-4">
      <div className="w-full max-w-md flex flex-col items-center justify-center space-y-8">
        <div className="flex flex-col items-center gap-2">
          <div className="mb-4">
            
          </div>
          <Logo />
          <p className="text-muted-foreground text-center mt-2">
            Connecting entrepreneurs with the right investors
          </p>
        </div>

        <div className="w-full space-y-4">
          <Button onClick={() => navigate("/login")} className="w-full bg-peerbridge-500 hover:bg-peerbridge-600" size="lg">
            Log In
          </Button>
          
          <Button onClick={() => navigate("/signup")} variant="outline" className="w-full border-peerbridge-200 hover:bg-peerbridge-50" size="lg">
            Sign Up
          </Button>
          
          <div className="text-center">
            <Button variant="link" className="text-peerbridge-600 hover:text-peerbridge-700" onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default Index;