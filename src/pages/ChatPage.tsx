
import { useState } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { Bell, Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  content: string;
  sender: "me" | "other";
  timestamp: Date;
}

const ChatPage = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I saw your startup profile and I'm interested in learning more about your solution.",
      sender: "other",
      timestamp: new Date(Date.now() - 86400000) // 1 day ago
    },
    {
      id: "2",
      content: "Hello! Thanks for reaching out. I'd be happy to discuss our solution with you.",
      sender: "me",
      timestamp: new Date(Date.now() - 82800000) // 23 hours ago
    },
    {
      id: "3",
      content: "Great! Could you tell me more about your target market and how you're solving the problem?",
      sender: "other",
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    }
  ]);
  
  const navigate = useNavigate();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: currentMessage,
      sender: "me",
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setCurrentMessage("");
    
    // Simulate reply after 1 second
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "That's interesting! I'd like to discuss this further. Can we schedule a call next week?",
        sender: "other",
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, replyMessage]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="p-4 bg-peerbridge-500 text-white flex items-center sticky top-0 z-10">
        <Button variant="ghost" size="icon" className="text-white mr-2" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </Button>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={undefined} />
            <AvatarFallback className="bg-white text-peerbridge-800">SJ</AvatarFallback>
          </Avatar>
          <div className="text-left">
            <h1 className="font-bold">Sarah Johnson</h1>
            <p className="text-xs opacity-90">Angel Investor • Healthcare</p>
          </div>
        </div>
        <div className="ml-auto">
          <Button variant="ghost" size="icon" className="text-white">
            <Bell size={20} />
          </Button>
        </div>
      </header>

      {/* Chat messages */}
      <main className="flex-1 p-4 overflow-y-auto pb-20">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "me"
                    ? "bg-peerbridge-500 text-white rounded-tr-none"
                    : "bg-muted rounded-tl-none"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === "me" ? "text-peerbridge-100" : "text-muted-foreground"
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Message input */}
      <div className="p-4 border-t bg-background sticky bottom-0">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" className="bg-peerbridge-500 hover:bg-peerbridge-600">
            <Send size={18} />
          </Button>
        </form>
      </div>

      {/* Mobile Navigation */}
      <div className="h-16">
        <MobileNav />
      </div>
    </div>
  );
};

export default ChatPage;
