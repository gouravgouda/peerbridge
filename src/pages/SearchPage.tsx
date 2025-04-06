
import { useState, useEffect } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { Bell, Search, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvestorCard } from "@/components/dashboard/investor-card";
import { EntrepreneurCard } from "@/components/dashboard/entrepreneur-card";
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
  },
  {
    id: "5",
    name: "James Wilson",
    investorType: "VC",
    preferredIndustries: ["Cleantech", "Sustainability"],
  },
  {
    id: "6",
    name: "Emily Zhang",
    investorType: "Angel Investor",
    preferredIndustries: ["Edtech", "Mobile"],
  },
];

const mockEntrepreneurs = [
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

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get user data from localStorage
    const currentUserData = localStorage.getItem("currentUser");
    if (currentUserData) {
      const currentUser = JSON.parse(currentUserData);
      if (currentUser.name) {
        setUsername(currentUser.name);
      }
    }
  }, []);
  
  // Filter logic for investors
  const filteredInvestors = mockInvestors.filter(investor => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      investor.name.toLowerCase().includes(query) || 
      investor.investorType?.toLowerCase().includes(query) || 
      investor.preferredIndustries?.some(ind => ind.toLowerCase().includes(query))
    );
  });
  
  // Filter logic for entrepreneurs
  const filteredEntrepreneurs = mockEntrepreneurs.filter(entrepreneur => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      entrepreneur.name.toLowerCase().includes(query) || 
      entrepreneur.companyName.toLowerCase().includes(query) ||
      entrepreneur.industry.toLowerCase().includes(query) ||
      (entrepreneur.location && entrepreneur.location.toLowerCase().includes(query))
    );
  });

  const handleInvestorClick = (id: string) => {
    navigate(`/investor/${id}`);
  };

  const handleEntrepreneurClick = (id: string) => {
    navigate(`/entrepreneur/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="p-4 bg-peerbridge-500 text-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-xl">Search</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white" onClick={() => navigate("/insights")}>
              <Lightbulb size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <Bell size={20} />
            </Button>
            <Avatar className="h-8 w-8 border-2 border-white cursor-pointer" onClick={() => navigate("/profile")}>
              <AvatarImage src="/lovable-uploads/f665d69e-32d3-433b-adad-5161bb41ac5d.jpg" alt={username} />
              <AvatarFallback>{username ? username.charAt(0) : 'U'}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search by name, industry, or type"
            className="pl-10 bg-white text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        <Tabs defaultValue="investors" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="investors" className="flex-1">Investors</TabsTrigger>
            <TabsTrigger value="entrepreneurs" className="flex-1">Entrepreneurs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="investors">
            <div className="grid grid-cols-2 gap-4">
              {filteredInvestors.length > 0 ? (
                filteredInvestors.map(investor => (
                  <InvestorCard 
                    key={investor.id} 
                    investor={investor} 
                    onClick={() => handleInvestorClick(investor.id)}
                  />
                ))
              ) : (
                <div className="col-span-2 text-center py-8">
                  <p className="text-muted-foreground">No investors found matching your search.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="entrepreneurs">
            <div className="grid grid-cols-2 gap-4">
              {filteredEntrepreneurs.length > 0 ? (
                filteredEntrepreneurs.map(entrepreneur => (
                  <EntrepreneurCard 
                    key={entrepreneur.id} 
                    entrepreneur={entrepreneur}
                    onClick={() => handleEntrepreneurClick(entrepreneur.id)}
                  />
                ))
              ) : (
                <div className="col-span-2 text-center py-8">
                  <p className="text-muted-foreground">No entrepreneurs found matching your search.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
};

export default SearchPage;
