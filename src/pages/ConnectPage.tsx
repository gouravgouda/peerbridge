
import { MobileNav } from "@/components/mobile-nav";
import { Bell, ArrowLeftRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const mockConnections = [
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
  },
];

const mockRequests = [
  {
    id: "3",
    name: "David Park",
    role: "Family Office",
    status: "pending",
    message: "Interested in your healthcare startup.",
    image: undefined,
  },
  {
    id: "4",
    name: "Priya Patel",
    role: "Angel Investor",
    status: "pending",
    message: "Would like to connect regarding your AI solution.",
    image: undefined,
  },
];

const ConnectPage = () => {
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
            <Button variant="ghost" size="icon" className="text-white">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <Plus size={20} />
            </Button>
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
              {mockRequests.length > 0 && (
                <Badge className="ml-2 bg-peerbridge-500">{mockRequests.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="connections">
            <div className="space-y-4">
              {mockConnections.map((connection) => (
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
              
              {mockConnections.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You don't have any connections yet.</p>
                  <Button className="mt-4 bg-peerbridge-500 hover:bg-peerbridge-600">
                    Find People to Connect
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="requests">
            <div className="space-y-4">
              {mockRequests.map((request) => (
                <div 
                  key={request.id}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-card"
                >
                  <Avatar>
                    <AvatarImage src={request.image} />
                    <AvatarFallback className="bg-peerbridge-100 text-peerbridge-800">
                      {request.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium truncate">{request.name}</h3>
                        <p className="text-xs text-muted-foreground">{request.role}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">Pending</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-1">{request.message}</p>
                    <div className="flex gap-2 mt-2">
                      <Button 
                        size="sm" 
                        className="w-full bg-peerbridge-500 hover:bg-peerbridge-600"
                      >
                        Accept
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full border-peerbridge-200"
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {mockRequests.length === 0 && (
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
