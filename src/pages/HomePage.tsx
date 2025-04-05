
import { useState, useEffect } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { Bell, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCard, PitchAnalyticsCard } from "@/components/dashboard/stats-card";
import { InvestorCard } from "@/components/dashboard/investor-card";
import { CheckCircle } from "lucide-react";
import { InvestorPreview } from "@/types";

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

  useEffect(() => {
    const hour = new Date().getHours();
    
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
    
    // Set user as authenticated for demo purposes
    localStorage.setItem("isAuthenticated", "true");
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="p-4 bg-peerbridge-500 text-white">
        <div className="flex justify-between items-center">
          <div className="text-left">
            <h1 className="font-bold text-xl">Hi, Welcome Back</h1>
            <p className="text-sm opacity-90">{greeting}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <MessageCircle size={20} />
            </Button>
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
            <InvestorCard investor={mockInvestors[0]} />
            <InvestorCard investor={mockInvestors[1]} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-peerbridge-500" />
            <h2 className="font-medium">Suggested Investors</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InvestorCard investor={mockInvestors[2]} />
            <InvestorCard investor={mockInvestors[3]} />
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
