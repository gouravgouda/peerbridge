
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Logo } from "@/components/logo";

interface AuthFormProps {
  type: "login" | "signup";
}

export function AuthForm({ type }: AuthFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === "signup" && password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (type === "login") {
      // Retrieve user data if exists
      const userData = localStorage.getItem("userData");
      if (userData) {
        const user = JSON.parse(userData);
        if (user.email === email) {
          // Set as authenticated and store current user
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("currentUser", JSON.stringify(user));
          
          navigate("/home");
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in.",
          });
          return;
        }
      }
      
      // If no match, create a mock user for demo
      const mockUser = {
        name: "John Doe",
        email: email,
        role: "entrepreneur",
        phone: "+1 234-567-8901"
      };
      
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", JSON.stringify(mockUser));
      
      navigate("/home");
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } else {
      // For signup, save the user data
      const newUser = {
        name: name,
        email: email,
        phone: "",
        role: "" // Will be set during role selection
      };
      
      localStorage.setItem("userData", JSON.stringify(newUser));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      
      // After signup, navigate to user type selection
      navigate("/select-role");
      toast({
        title: "Account created!",
        description: "Please select your role to continue.",
      });
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto px-8">
      <div className="flex flex-col items-center space-y-2 mb-8">
        <Logo />
      </div>
      
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">
          {type === "login" ? "Welcome Back" : "Create Account"}
        </h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {type === "signup" && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name"
              type="text" 
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-muted"
              required
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email"
            type="email" 
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-muted"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input 
              id="password"
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-muted pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        {type === "signup" && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input 
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-muted pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        )}
        
        {type === "login" && (
          <div className="text-center">
            <Link to="/forgot-password" className="text-sm text-peerbridge-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
        )}
        
        <Button type="submit" className="w-full bg-peerbridge-500 hover:bg-peerbridge-600">
          {type === "login" ? "Log In" : "Sign Up"}
        </Button>
        
        {type === "login" ? (
          <div className="text-center text-sm">
            Don't have an account? <Link to="/signup" className="text-peerbridge-500 hover:underline">Sign Up</Link>
          </div>
        ) : (
          <div className="text-center text-sm">
            Already have an account? <Link to="/login" className="text-peerbridge-500 hover:underline">Log In</Link>
          </div>
        )}
      </form>
    </div>
  );
}
