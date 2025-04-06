
import { useState, useEffect } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { Bell, MessageCircle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCard, PitchAnalyticsCard } from "@/components/dashboard/stats-card";
import { InvestorCard } from "@/components/dashboard/investor-card";
import { CheckCircle } from "lucide-react";
import { InvestorPreview } from "@/types";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockInvestors: InvestorPreview[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    investorType: "Angel Investor",
    preferredIndustries: ["Healthcare", "Biotech"],
  },
  {
    id: "2",
    name: "Michael Chen",
    investorType: "VC",
    preferredIndustries: ["Fintech", "SaaS"],
  },
  {
    id: "3",
    name: "David Park",
    investorType: "Family Office",
    preferredIndustries: ["E-commerce", "D2C"],
  },
  {
    id: "4",
    name: "Priya Patel",
    investorType: "Angel Investor",
    preferredIndustries: ["AI", "ML"],
  }
];

const HomePage = () => {
  const [greeting, setGreeting] = useState("Good day");
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState<"entrepreneur" | "investor" | "">("");
  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();
    
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
    
    // Get user data from localStorage
    const currentUserData = localStorage.getItem("currentUser");
    if (currentUserData) {
      const currentUser = JSON.parse(currentUserData);
      if (currentUser.name) {
        setUsername(currentUser.name.split(' ')[0]); // Just the first name
      }
      if (currentUser.role === "investor") {
        // Redirect to investor home if user is an investor
        navigate("/investor-home");
      } else {
        setUserRole(currentUser.role || "entrepreneur");
      }
    }
    
    // Set user as authenticated for demo purposes
    localStorage.setItem("isAuthenticated", "true");
  }, [navigate]);

  const handleInvestorClick = (id: string) => {
    navigate(`/investor/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="p-4 bg-peerbridge-500 text-white">
        <div className="flex justify-between items-center">
          <div className="text-left">
            <h1 className="font-bold text-xl">Hi {username}, Welcome Back</h1>
            <p className="text-sm opacity-90">{greeting}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white" onClick={() => navigate("/insights")}>
              <Lightbulb size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <MessageCircle size={20} />
            </Button>
            <Avatar className="h-8 w-8 border-2 border-white cursor-pointer" onClick={() => navigate("/profile")}>
              <AvatarImage src="/lovable-uploads/f665d69e-32d3-433b-adad-5161bb41ac5d.jpg" alt={username} />
              <AvatarFallback>{username[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="p-1 rounded-full bg-peerbridge-200">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6.5H21M3 12H21M3 17.5H21" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <h2 className="font-medium">Your Startup Snapshot</h2>
        </div>

        <StatsCard 
          title="Goal" 
          value="30%" 
          progress={30}
        />

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-peerbridge-500" />
            <h2 className="font-medium">Shown Interest</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InvestorCard 
              investor={mockInvestors[0]} 
              onClick={() => handleInvestorClick(mockInvestors[0].id)} 
            />
            <InvestorCard 
              investor={mockInvestors[1]}
              onClick={() => handleInvestorClick(mockInvestors[1].id)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-peerbridge-500" />
            <h2 className="font-medium">Suggested Investors</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InvestorCard 
              investor={mockInvestors[2]}
              onClick={() => handleInvestorClick(mockInvestors[2].id)}
            />
            <InvestorCard 
              investor={mockInvestors[3]}
              onClick={() => handleInvestorClick(mockInvestors[3].id)}
            />
          </div>
        </div>

        <PitchAnalyticsCard />
      </main>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
};

export default HomePage;
