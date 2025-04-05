
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/logo";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Reset link sent",
      description: "Please check your email for a password reset link.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-peerbridge-50 to-peerbridge-100 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="p-0 mb-4" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="flex flex-col items-center space-y-2">
            <Logo />
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Forgot Password</h1>
          <p className="text-muted-foreground mt-2">
            Enter your email to receive a password reset link
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-muted"
              required
            />
            
            <Button 
              type="submit" 
              className="w-full bg-peerbridge-500 hover:bg-peerbridge-600"
            >
              Send Reset Link
            </Button>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <div className="p-3 bg-green-50 text-green-800 rounded-md">
              A password reset link has been sent to your email.
            </div>
            
            <Button 
              onClick={() => navigate("/login")} 
              className="w-full bg-peerbridge-500 hover:bg-peerbridge-600"
            >
              Back to Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
