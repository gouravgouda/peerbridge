
import { useState } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { useNavigate } from "react-router-dom";
import { Bell, ArrowLeft, Star, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface InsightItem {
  id: string;
  type: "notification" | "update" | "funding";
  title: string;
  date: string;
  time: string;
  icon: any;
}

const mockInsights: { today: InsightItem[], yesterday: InsightItem[] } = {
  today: [
    {
      id: "1",
      type: "notification",
      title: "Over 12 Indian startups are eyeing an IPO in 2025, including goals and logistics, edtech and agritech",
      date: "April 25",
      time: "17:00",
      icon: Bell
    },
    {
      id: "2",
      type: "update",
      title: "SaaS and Fintech remain the top funded sectors followed by climate tech and deep tech",
      date: "April 25",
      time: "17:00",
      icon: Star
    }
  ],
  yesterday: [
    {
      id: "3",
      type: "funding",
      title: "Singapore's state owned fund, temasek, acquired nearly a 10% stake in Haldirams",
      date: "April 25",
      time: "17:00",
      icon: DollarSign
    }
  ]
};

const InsightsPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  
  // Get username from localStorage
  useState(() => {
    const currentUserData = localStorage.getItem("currentUser");
    if (currentUserData) {
      const currentUser = JSON.parse(currentUserData);
      if (currentUser.name) {
        setUsername(currentUser.name);
      }
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="p-4 bg-peerbridge-500 text-white flex items-center">
        <Button variant="ghost" size="icon" className="text-white mr-2" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="font-bold text-xl">Insight Impulse</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white">
            <Bell size={20} />
          </Button>
          <Avatar className="h-8 w-8 border-2 border-white cursor-pointer" onClick={() => navigate("/profile")}>
            <AvatarImage src="/lovable-uploads/f665d69e-32d3-433b-adad-5161bb41ac5d.jpg" alt={username} />
            <AvatarFallback>{username ? username.charAt(0) : 'U'}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 space-y-6">
        <div>
          <h2 className="font-medium text-gray-700 mb-3">Today</h2>
          <div className="space-y-4">
            {mockInsights.today.map(insight => (
              <div key={insight.id} className="flex gap-3 border-b border-gray-200 pb-4">
                <div className={`p-2 rounded-full ${
                  insight.type === 'notification' ? 'bg-blue-100' : 
                  insight.type === 'update' ? 'bg-peerbridge-100' : 'bg-yellow-100'
                }`}>
                  <insight.icon size={20} className={
                    insight.type === 'notification' ? 'text-blue-500' : 
                    insight.type === 'update' ? 'text-peerbridge-500' : 'text-yellow-500'
                  } />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{insight.title}</p>
                  <div className="flex justify-end text-xs text-gray-500 mt-1">
                    <span>{insight.time} - {insight.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="font-medium text-gray-700 mb-3">Yesterday</h2>
          <div className="space-y-4">
            {mockInsights.yesterday.map(insight => (
              <div key={insight.id} className="flex gap-3 border-b border-gray-200 pb-4">
                <div className={`p-2 rounded-full ${
                  insight.type === 'notification' ? 'bg-blue-100' : 
                  insight.type === 'update' ? 'bg-peerbridge-100' : 'bg-yellow-100'
                }`}>
                  <insight.icon size={20} className={
                    insight.type === 'notification' ? 'text-blue-500' : 
                    insight.type === 'update' ? 'text-peerbridge-500' : 'text-yellow-500'
                  } />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{insight.title}</p>
                  <div className="flex justify-end text-xs text-gray-500 mt-1">
                    <span>{insight.time} - {insight.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
};

export default InsightsPage;
