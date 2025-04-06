
import { useState, useEffect } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { Bell, ArrowLeftRight, Plus, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface Connection {
  id: string;
  name: string;
  role: string;
  status: string;
  lastMessage?: string;
  image?: string;
}

interface ConnectionRequest {
  id: string;
  type: string;
  name: string;
  entity: string;
  status: string;
  timestamp: string;
  message?: string;
}

const ConnectPage = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [requests, setRequests] = useState<ConnectionRequest[]>([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get user info
    const currentUserData = localStorage.getItem("currentUser");
    if (currentUserData) {
      const currentUser = JSON.parse(currentUserData);
      if (currentUser.name) {
        setUsername(currentUser.name);
      }
    }

    // Load saved connections from localStorage
    const savedConnections = localStorage.getItem('myConnections');
    if (savedConnections) {
      setConnections(JSON.parse(savedConnections));
    } else {
      // Default connections if none exist
      const defaultConnections = [
        {
          id: "1",
          name: "Sarah Johnson",
          role: "Angel Investor",
          status: "connected",
          lastMessage: "I'd love to discuss your pitch deck further.",
          image: undefined,
        },
        {
          id: "2",
          name: "Michael Chen",
          role: "VC",
          status: "connected",
          lastMessage: "Let's schedule a call next week to discuss funding.",
          image: undefined,
        }
      ];
      setConnections(defaultConnections);
      localStorage.setItem('myConnections', JSON.stringify(defaultConnections));
    }

    // Load connection requests from localStorage
    const savedRequests = localStorage.getItem('connectionRequests');
    if (savedRequests) {
      // Filter to only pending requests
      const pendingRequests = JSON.parse(savedRequests).filter(
        (req: ConnectionRequest) => req.status === 'pending'
      );
      setRequests(pendingRequests);
    } else {
      // Default requests if none exist
      const defaultRequests = [
        {
          id: "3",
          type: "investor",
          name: "David Park",
          entity: "Family Office",
          status: "pending",
          message: "Interested in your healthcare startup.",
          timestamp: new Date().toISOString(),
        },
        {
          id: "4",
          type: "investor",
          name: "Priya Patel",
          entity: "Angel Investor",
          status: "pending",
          message: "Would like to connect regarding your AI solution.",
          timestamp: new Date().toISOString(),
        }
      ];
      setRequests(defaultRequests);
      localStorage.setItem('connectionRequests', JSON.stringify(defaultRequests));
    }
  }, []);

  const handleAcceptRequest = (request: ConnectionRequest) => {
    // Update the request status
    const updatedRequests = requests.filter(req => req.id !== request.id);
    setRequests(updatedRequests);
    
    // Save updated requests to localStorage
    const allRequests = JSON.parse(localStorage.getItem('connectionRequests') || '[]');
    const updatedAllRequests = allRequests.map((req: ConnectionRequest) => 
      req.id === request.id ? { ...req, status: 'accepted' } : req
    );
    localStorage.setItem('connectionRequests', JSON.stringify(updatedAllRequests));
    
    // Add to connections
    const newConnection: Connection = {
      id: request.id,
      name: request.name,
      role: request.entity,
      status: "connected",
      lastMessage: `Connection accepted on ${new Date().toLocaleDateString()}`,
      image: undefined
    };
    
    const updatedConnections = [...connections, newConnection];
    setConnections(updatedConnections);
    localStorage.setItem('myConnections', JSON.stringify(updatedConnections));
    
    toast({
      title: "Connection Accepted",
      description: `You are now connected with ${request.name}.`
    });
  };

  const handleDeclineRequest = (request: ConnectionRequest) => {
    // Remove the request
    const updatedRequests = requests.filter(req => req.id !== request.id);
    setRequests(updatedRequests);
    
    // Update localStorage
    const allRequests = JSON.parse(localStorage.getItem('connectionRequests') || '[]');
    const updatedAllRequests = allRequests.map((req: ConnectionRequest) => 
      req.id === request.id ? { ...req, status: 'declined' } : req
    );
    localStorage.setItem('connectionRequests', JSON.stringify(updatedAllRequests));
    
    toast({
      title: "Request Declined",
      description: `You declined ${request.name}'s connection request.`
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="p-4 bg-peerbridge-500 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ArrowLeftRight className="mr-2" size={20} />
            <h1 className="font-bold text-xl">Connect</h1>
          </div>
          <div className="flex items-center gap-4">
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
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        <Tabs defaultValue="connections" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="connections" className="flex-1">My Connections</TabsTrigger>
            <TabsTrigger value="requests" className="flex-1">
              Requests
              {requests.length > 0 && (
                <Badge className="ml-2 bg-peerbridge-500">{requests.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="connections">
            <div className="space-y-4">
              {connections.map((connection) => (
                <div 
                  key={connection.id}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-card"
                >
                  <Avatar>
                    <AvatarImage src={connection.image} />
                    <AvatarFallback className="bg-peerbridge-100 text-peerbridge-800">
                      {connection.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium truncate">{connection.name}</h3>
                        <p className="text-xs text-muted-foreground">{connection.role}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">Connected</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-1">{connection.lastMessage}</p>
                  </div>
                </div>
              ))}
              
              {connections.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You don't have any connections yet.</p>
                  <Button className="mt-4 bg-peerbridge-500 hover:bg-peerbridge-600" onClick={() => navigate("/search")}>
                    Find People to Connect
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="requests">
            <div className="space-y-4">
              {requests.map((request) => (
                <div 
                  key={request.id}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-card"
                >
                  <Avatar>
                    <AvatarImage src={undefined} />
                    <AvatarFallback className="bg-peerbridge-100 text-peerbridge-800">
                      {request.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium truncate">{request.name}</h3>
                        <p className="text-xs text-muted-foreground">{request.entity}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">Pending</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {request.message || `Wants to connect with you`}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button 
                        size="sm" 
                        className="w-full bg-peerbridge-500 hover:bg-peerbridge-600"
                        onClick={() => handleAcceptRequest(request)}
                      >
                        Accept
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full border-peerbridge-200"
                        onClick={() => handleDeclineRequest(request)}
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {requests.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You don't have any pending requests.</p>
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

export default ConnectPage;
