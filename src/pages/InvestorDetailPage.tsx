
import { useState, useEffect } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { useParams, useNavigate } from "react-router-dom";
import { Bell, ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockInvestors = [
  {
    id: "1",
    name: "Sarah Johnson",
    investorType: "Angel Investor",
    preferredIndustries: ["Healthcare", "Biotech"],
    companyRole: "Founder and CMO at BioVentures",
    about: "Passionate, Hustler",
    sectors: ["Healthcare", "Biotech", "MedTech"],
    investmentRange: "$50K - $250K",
    activity: [
      { week: "1st Week", amount: 75000 },
      { week: "2nd Week", amount: 25000 },
      { week: "3rd Week", amount: 60000 },
      { week: "4th Week", amount: 45000 }
    ]
  },
  {
    id: "2",
    name: "Michael Chen",
    investorType: "VC",
    preferredIndustries: ["Fintech", "SaaS"],
    companyRole: "Partner at TechFund Capital",
    about: "Analytical, Strategic",
    sectors: ["Fintech", "SaaS", "Enterprise Software"],
    investmentRange: "$250K - $2M",
    activity: [
      { week: "1st Week", amount: 120000 },
      { week: "2nd Week", amount: 80000 },
      { week: "3rd Week", amount: 150000 },
      { week: "4th Week", amount: 100000 }
    ]
  },
  {
    id: "3",
    name: "David Park",
    investorType: "Family Office",
    preferredIndustries: ["E-commerce", "D2C"],
    companyRole: "Director at Park Family Investments",
    about: "Patient, Long-term",
    sectors: ["E-commerce", "D2C", "Retail Tech"],
    investmentRange: "$100K - $1M",
    activity: [
      { week: "1st Week", amount: 90000 },
      { week: "2nd Week", amount: 60000 },
      { week: "3rd Week", amount: 110000 },
      { week: "4th Week", amount: 85000 }
    ]
  },
  {
    id: "4",
    name: "Priya Patel",
    investorType: "Angel Investor",
    preferredIndustries: ["AI", "ML"],
    companyRole: "Former CTO at TechGiant",
    about: "Technical, Hands-on",
    sectors: ["AI", "ML", "Data Analytics"],
    investmentRange: "$25K - $150K",
    activity: [
      { week: "1st Week", amount: 45000 },
      { week: "2nd Week", amount: 30000 },
      { week: "3rd Week", amount: 55000 },
      { week: "4th Week", amount: 40000 }
    ]
  }
];

const InvestorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [investor, setInvestor] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("weekly");
  const [username, setUsername] = useState("");
  
  useEffect(() => {
    // Find the investor by ID
    const found = mockInvestors.find(i => i.id === id);
    if (found) {
      setInvestor(found);
    } else {
      // If not found, use the first one as a fallback
      setInvestor(mockInvestors[0]);
    }
    
    // Get current user info
    const currentUserData = localStorage.getItem("currentUser");
    if (currentUserData) {
      const currentUser = JSON.parse(currentUserData);
      if (currentUser.name) {
        setUsername(currentUser.name);
      }
    }
  }, [id]);
  
  if (!investor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="p-4 bg-peerbridge-500 text-white flex items-center">
        <Button variant="ghost" size="icon" className="text-white mr-2" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="font-bold text-xl">{investor.name}</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white" onClick={() => navigate("/insights")}>
            <Lightbulb size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <Bell size={20} />
          </Button>
          <Avatar className="h-8 w-8 border-2 border-white cursor-pointer" onClick={() => navigate("/profile")}>
            <AvatarImage src="/lovable-uploads/f665d69e-32d3-433b-adad-5161bb41ac5d.jpg" alt={username} />
            <AvatarFallback>{username.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 space-y-6">
        <div className="space-y-2">
          <p className="text-sm text-gray-600 font-medium">{investor.companyRole}</p>
          
          <div className="mt-4">
            <h3 className="font-medium">About:</h3>
            <p className="text-sm text-gray-700">{investor.about}</p>
          </div>
          
          <div className="mt-4">
            <h3 className="font-medium">Investment Focus:</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {investor.sectors.map((sector: string) => (
                <span 
                  key={sector} 
                  className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
                >
                  {sector}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="font-medium">Investment Range:</h3>
            <p className="text-sm text-gray-700">{investor.investmentRange}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-2">Activity</h3>
          <Card className="bg-white p-4 rounded-lg shadow-sm">
            <div className="bg-peerbridge-500 h-32 w-full rounded-lg"></div>
          </Card>
        </div>
        
        <div className="space-y-2 mt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 w-full bg-blue-50">
              <TabsTrigger value="daily" className="text-xs">Daily</TabsTrigger>
              <TabsTrigger value="weekly" className="text-xs">Weekly</TabsTrigger>
              <TabsTrigger value="monthly" className="text-xs">Monthly</TabsTrigger>
              <TabsTrigger value="yearly" className="text-xs">Year</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Investment Activity</h3>
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
                  {investor.activity.map((item) => (
                    <div key={item.week} className="flex flex-col items-center gap-1">
                      <div className="flex items-end gap-1">
                        <div 
                          className="w-5 bg-blue-500 rounded-t" 
                          style={{ height: `${(item.amount / 150000) * 100}px` }}
                        ></div>
                        <div 
                          className="w-5 bg-peerbridge-500 rounded-t" 
                          style={{ height: `${(item.amount * 0.8 / 150000) * 100}px` }}
                        ></div>
                      </div>
                      <span className="text-xs">{item.week}</span>
                    </div>
                  ))}
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
              
              <div className="mt-2 flex justify-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-xs">Invested</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-peerbridge-500 rounded"></div>
                  <span className="text-xs">Returns</span>
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

export default InvestorDetailPage;
