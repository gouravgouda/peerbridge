
import { useState, useEffect } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { useParams, useNavigate } from "react-router-dom";
import { Bell, ArrowLeft, Lightbulb, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

// Define types for the financial data
interface FinancialData {
  revenue: number[];
  expenses: number[];
  months: string[];
}

const mockEntrepreneurs = [
  {
    id: "1",
    name: "Alex Rivera",
    companyName: "TechFusion",
    industry: "Fintech",
    location: "San Francisco",
    fundingStage: "Seed",
    fundingGoal: "$500,000",
    teamSize: "5-10",
    foundedYear: "2021",
    description: "TechFusion is revolutionizing how people interact with financial institutions by providing a seamless digital experience that combines traditional banking with modern technology.",
    financialData: {
      revenue: [30000, 32000, 35000, 40000, 42000, 45000],
      expenses: [25000, 26000, 26500, 27000, 28000, 30000],
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    }
  },
  {
    id: "2",
    name: "Lisa Wong",
    companyName: "MediHealth",
    industry: "Healthcare",
    location: "Boston",
    fundingStage: "Series A",
    fundingGoal: "$2,000,000",
    teamSize: "11-20",
    foundedYear: "2020",
    description: "MediHealth is developing an AI-powered platform that helps healthcare providers deliver more personalized and effective care to patients while reducing administrative burden.",
    financialData: {
      revenue: [120000, 125000, 130000, 135000, 140000, 150000],
      expenses: [100000, 102000, 105000, 107000, 110000, 112000],
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    }
  }
];

const EntrepreneurDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [entrepreneur, setEntrepreneur] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("weekly");
  const [username, setUsername] = useState("");
  const [hasRequested, setHasRequested] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Find the entrepreneur by ID
    const found = mockEntrepreneurs.find(e => e.id === id);
    if (found) {
      setEntrepreneur(found);
    } else {
      // If not found, use the first one as a fallback
      setEntrepreneur(mockEntrepreneurs[0]);
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
  
  const handleReachOut = () => {
    setHasRequested(true);
    
    // Store connection request in localStorage
    const connectionRequests = JSON.parse(localStorage.getItem('connectionRequests') || '[]');
    connectionRequests.push({
      id: entrepreneur.id,
      type: 'entrepreneur',
      name: entrepreneur.name,
      entity: entrepreneur.companyName,
      status: 'pending',
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('connectionRequests', JSON.stringify(connectionRequests));
    
    toast({
      title: "Request Sent",
      description: `Your connection request to ${entrepreneur.name} has been sent.`,
    });
  };
  
  if (!entrepreneur) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="p-4 bg-peerbridge-500 text-white flex items-center">
        <Button variant="ghost" size="icon" className="text-white mr-2" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="font-bold text-xl">{entrepreneur.companyName}</h1>
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
          <h2 className="text-lg font-bold mb-1">{entrepreneur.companyName}</h2>
          <p className="text-sm text-gray-600 font-medium">Founder: {entrepreneur.name}</p>
          <p className="text-sm text-gray-600">Location: {entrepreneur.location}</p>
          <p className="text-sm text-gray-600">Industry: {entrepreneur.industry}</p>
          <p className="text-sm text-gray-600">Funding Stage: {entrepreneur.fundingStage}</p>
          <p className="text-sm text-gray-600">Funding Goal: {entrepreneur.fundingGoal}</p>
          <p className="text-sm text-gray-600">Team Size: {entrepreneur.teamSize}</p>
          <p className="text-sm text-gray-600">Founded: {entrepreneur.foundedYear}</p>
          
          <div className="mt-4">
            <h3 className="font-medium">Description:</h3>
            <p className="text-sm text-gray-700">{entrepreneur.description}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-2">Financial Performance</h3>
          <Card className="bg-white p-4 rounded-lg shadow-sm">
            <CardContent className="p-0">
              <div className="h-60 w-full relative">
                <div className="absolute bottom-8 left-0 right-0 flex items-end justify-between h-40 px-2">
                  {entrepreneur.financialData.months.map((month, index) => (
                    <div key={month} className="flex flex-col items-center gap-1 w-1/6">
                      <div className="flex items-end gap-1">
                        <div 
                          className="w-5 bg-blue-500 rounded-t" 
                          style={{ height: `${(entrepreneur.financialData.revenue[index] / 150000) * 120}px` }}
                        ></div>
                        <div 
                          className="w-5 bg-peerbridge-500 rounded-t" 
                          style={{ height: `${(entrepreneur.financialData.expenses[index] / 150000) * 120}px` }}
                        ></div>
                      </div>
                      <span className="text-xs mt-1">{month}</span>
                    </div>
                  ))}
                </div>
                
                <div className="absolute left-0 right-0 flex flex-col justify-between h-40 pointer-events-none">
                  <div className="border-b border-dashed border-gray-300 relative">
                    <span className="absolute -top-2 -left-5 text-xs text-gray-500">150K</span>
                  </div>
                  <div className="border-b border-dashed border-gray-300 relative">
                    <span className="absolute -top-2 -left-5 text-xs text-gray-500">100K</span>
                  </div>
                  <div className="border-b border-dashed border-gray-300 relative">
                    <span className="absolute -top-2 -left-5 text-xs text-gray-500">50K</span>
                  </div>
                  <div className="border-b border-dashed border-gray-300 relative">
                    <span className="absolute -top-2 -left-5 text-xs text-gray-500">0</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-2 flex justify-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-xs">Revenue</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-peerbridge-500 rounded"></div>
                  <span className="text-xs">Expenses</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {!hasRequested ? (
          <Button 
            className="w-full bg-peerbridge-500 hover:bg-peerbridge-600 text-white mt-6"
            onClick={handleReachOut}
          >
            <Send className="h-4 w-4 mr-2" /> Reach Out
          </Button>
        ) : (
          <Button 
            className="w-full bg-gray-300 text-gray-700 mt-6"
            disabled
          >
            Request Sent
          </Button>
        )}
      </main>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
};

export default EntrepreneurDetailPage;
