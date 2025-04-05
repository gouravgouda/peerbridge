
import { MobileNav } from "@/components/mobile-nav";
import { Bell, Layers, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockPosts = [
  {
    id: "1",
    author: {
      name: "Vastal Agarwal",
      role: "Entrepreneur",
      image: "/lovable-uploads/958dbc90-1382-49fb-9af7-8548e3970a17.png"
    },
    title: "Looking for co-founder with technical background",
    content: "I'm building a healthcare startup and looking for a technical co-founder with experience in mobile development. Anyone interested or can recommend someone?",
    likes: 24,
    comments: 8,
    time: "2h ago",
    tags: ["Co-founder", "Healthcare", "Mobile"]
  },
  {
    id: "2",
    author: {
      name: "Sarah Johnson",
      role: "Angel Investor",
      image: undefined
    },
    title: "Hosting a pitch event next month",
    content: "I'll be hosting a pitch event for early-stage startups in the fintech space next month. DM me if you're interested in presenting.",
    likes: 56,
    comments: 18,
    time: "5h ago",
    tags: ["Event", "Fintech", "Pitch"]
  },
  {
    id: "3",
    author: {
      name: "Michael Chen",
      role: "VC",
      image: undefined
    },
    title: "Market research report on SaaS trends",
    content: "Just published our latest market research report on SaaS trends for 2023. Some really interesting insights on vertical SaaS growth. Check it out at the link below.",
    likes: 42,
    comments: 6,
    time: "1d ago",
    tags: ["Research", "SaaS", "Market Trends"]
  }
];

const mockEvents = [
  {
    id: "1",
    title: "Startup Weekend",
    date: "April 15-17, 2023",
    location: "San Francisco, CA",
    attendees: 120,
    tags: ["Hackathon", "Networking"]
  },
  {
    id: "2",
    title: "Venture Capital Summit",
    date: "May 5, 2023",
    location: "New York, NY",
    attendees: 250,
    tags: ["Funding", "Networking"]
  }
];

const CommunityPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="p-4 bg-peerbridge-500 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Layers className="mr-2" size={20} />
            <h1 className="font-bold text-xl">Community</h1>
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
        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="feed" className="flex-1">Feed</TabsTrigger>
            <TabsTrigger value="events" className="flex-1">Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="feed">
            <div className="space-y-6">
              {mockPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar>
                        <AvatarImage src={post.author.image} />
                        <AvatarFallback className="bg-peerbridge-100 text-peerbridge-800">
                          {post.author.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{post.author.name}</h3>
                          <span className="text-xs text-muted-foreground">• {post.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{post.author.role}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="font-semibold mb-2">{post.title}</h2>
                      <p className="text-sm text-muted-foreground mb-3">{post.content}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{post.likes} likes</span>
                        <span>{post.comments} comments</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="events">
            <div className="space-y-4">
              {mockEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-peerbridge-100 text-peerbridge-800 h-14 w-14 flex items-center justify-center rounded-md">
                        <span className="font-bold">{event.date.split(" ")[0].split("-")[1]}</span>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{event.date} • {event.location}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-2">
                          {event.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{event.attendees} attending</span>
                          <Button 
                            size="sm" 
                            className="bg-peerbridge-500 hover:bg-peerbridge-600"
                          >
                            RSVP
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
};

export default CommunityPage;
