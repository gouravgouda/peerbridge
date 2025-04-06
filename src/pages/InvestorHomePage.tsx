
import { useState, useEffect } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { Bell, MessageCircle, Lightbulb, BarChart4, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EntrepreneurCard } from "@/components/dashboard/entrepreneur-card";
import { useNavigate } from "react-router-dom";

interface EntrepreneurPreview {
  id: string;
  name: string;
  companyName: string;
  industry: string;
  location?: string;
}

const mockEntrepreneurs: EntrepreneurPreview[] = [
  {
    id: "1",
    name: "Alex Rivera",
    companyName: "TechFusion",
    industry: "Fintech",
    location: "San Francisco"
  },
  {
    id: "2",
    name: "Lisa Wong",
    companyName: "MediHealth",
    industry: "Healthcare",
    location: "Boston"
  },
  {
    id: "3",
    name: "Raj Mehta",
    companyName: "AIMinds",
    industry: "AI/ML",
    location: "Bangalore"
  },
  {
    id: "4",
    name: "Sofia Garcia",
    companyName: "EcoShop",
    industry: "E-commerce",
    location: "Madrid"
  }
];

const InvestorHomePage = () => {
  const [greeting, setGreeting] = useState("Good day");
  const [username, setUsername] = useState("Investor");
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
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-full text-white">
              <BarChart4 size={24} />
            </div>
            <div>
              <h2 className="font-semibold text-blue-800">Investor Insights</h2>
              <p className="text-sm text-blue-600">Stay updated with market trends</p>
            </div>
          </CardContent>
        </Card>
      
        <div className="space-y-2">
          <h2 className="font-medium flex items-center gap-2">
            <span className="p-1 rounded-full bg-peerbridge-200">
              <CheckCircle size={18} className="text-peerbridge-500" />
            </span>
            Updates
          </h2>
          <Card className="bg-peerbridge-50 border-peerbridge-100">
            <CardContent className="p-4">
              <h3 className="font-medium">Trending Startups</h3>
              <div className="grid grid-cols-2 gap-4 mt-3">
                {mockEntrepreneurs.slice(0, 2).map(entrepreneur => (
                  <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <h2 className="font-medium flex items-center gap-2">
            <span className="p-1 rounded-full bg-peerbridge-200">
              <CheckCircle size={18} className="text-peerbridge-500" />
            </span>
            Featured
          </h2>
          <Card className="bg-peerbridge-50 border-peerbridge-100">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {mockEntrepreneurs.slice(2, 4).map(entrepreneur => (
                  <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <h2 className="font-medium">Notable Investments</h2>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">April Expenses</h3>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="h-8 w-8 rounded-full">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11ZM6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      <path d="M8.35355 8.35355C8.54882 8.15829 8.54882 7.84171 8.35355 7.64645L7.20711 6.5L8.35355 5.35355C8.54882 5.15829 8.54882 4.84171 8.35355 4.64645C8.15829 4.45118 7.84171 4.45118 7.64645 4.64645L6.5 5.79289L5.35355 4.64645C5.15829 4.45118 4.84171 4.45118 4.64645 4.64645C4.45118 4.84171 4.45118 5.15829 4.64645 5.35355L5.79289 6.5L4.64645 7.64645C4.45118 7.84171 4.45118 8.15829 4.64645 8.35355C4.84171 8.54882 5.15829 8.54882 5.35355 8.35355L6.5 7.20711L7.64645 8.35355C7.84171 8.54882 8.15829 8.54882 8.35355 8.35355Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </Button>
                  <Button size="icon" variant="outline" className="h-8 w-8 rounded-full">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM4 3H2.5C2.22386 3 2 3.22386 2 3.5V5H13V3.5C13 3.22386 12.7761 3 12.5 3H11V3.5C11 3.77614 10.7761 4 10.5 4C10.2239 4 10 3.77614 10 3.5V3H5V3.5C5 3.77614 4.77614 4 4.5 4C4.22386 4 4 3.77614 4 3.5V3ZM13 6H2V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 h-36 relative">
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-32">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-6 bg-blue-500 rounded-t" style={{ height: '60px' }}></div>
                    <span className="text-xs">1st Week</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-6 bg-peerbridge-500 rounded-t" style={{ height: '80px' }}></div>
                    <span className="text-xs">2nd Week</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-6 bg-blue-500 rounded-t" style={{ height: '100px' }}></div>
                    <span className="text-xs">3rd Week</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-6 bg-peerbridge-500 rounded-t" style={{ height: '70px' }}></div>
                    <span className="text-xs">4th Week</span>
                  </div>
                </div>
                
                <div className="absolute left-0 right-0 flex flex-col justify-between h-32 pointer-events-none">
                  <div className="border-b border-dashed border-gray-300 relative">
                    <span className="absolute -top-2 -left-5 text-xs text-gray-500">15k</span>
                  </div>
                  <div className="border-b border-dashed border-gray-300 relative">
                    <span className="absolute -top-2 -left-5 text-xs text-gray-500">10k</span>
                  </div>
                  <div className="border-b border-dashed border-gray-300 relative">
                    <span className="absolute -top-2 -left-5 text-xs text-gray-500">5k</span>
                  </div>
                  <div className="border-b border-dashed border-gray-300 relative">
                    <span className="absolute -top-2 -left-5 text-xs text-gray-500">1k</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
};

export default InvestorHomePage;
