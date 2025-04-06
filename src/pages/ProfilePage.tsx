
import { useState, useEffect } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { Bell, ArrowLeft, User, Shield, Settings, HelpCircle, LogOut, Camera, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(false);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState<"entrepreneur" | "investor" | "">("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Load user data from localStorage
    const currentUserData = localStorage.getItem("currentUser");
    if (currentUserData) {
      const currentUser = JSON.parse(currentUserData);
      setUsername(currentUser.name || "");
      setPhone(currentUser.phone || "");
      setEmail(currentUser.email || "");
      setUserId(currentUser.id || "RA2311042010058"); // Default ID if not available
      setUserRole(currentUser.role || "");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    navigate("/");
  };

  const handleUpdateProfile = () => {
    // Save updated profile data to localStorage
    const currentUserData = localStorage.getItem("currentUser");
    if (currentUserData) {
      const currentUser = JSON.parse(currentUserData);
      currentUser.name = username;
      currentUser.phone = phone;
      currentUser.email = email;
      
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      
      // Also update in userData if it exists
      const userData = localStorage.getItem("userData");
      if (userData) {
        const user = JSON.parse(userData);
        if (user.email === currentUser.email) {
          user.name = username;
          user.phone = phone;
          localStorage.setItem("userData", JSON.stringify(user));
        }
      }
    }
    
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully."
    });
  };

  if (isEditing) {
    return <div className="flex flex-col min-h-screen bg-background pb-16">
        {/* Header */}
        <header className="p-4 bg-peerbridge-500 text-white flex items-center">
          <Button variant="ghost" size="icon" className="text-white mr-2" onClick={() => setIsEditing(false)}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="font-bold text-xl">Edit My Profile</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white" onClick={() => navigate("/insights")}>
              <Lightbulb size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <Bell size={20} />
            </Button>
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src="/lovable-uploads/f665d69e-32d3-433b-adad-5161bb41ac5d.jpg" alt={username} />
              <AvatarFallback>{username.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 space-y-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-2">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/lovable-uploads/958dbc90-1382-49fb-9af7-8548e3970a17.png" alt={username} />
                <AvatarFallback>{username.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Button size="icon" className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-peerbridge-500 hover:bg-peerbridge-600">
                <Camera size={12} />
              </Button>
            </div>
            <h2 className="font-medium">{username}</h2>
            <p className="text-xs text-muted-foreground">ID: {userId}</p>
            <p className="text-xs text-muted-foreground capitalize">Role: {userRole}</p>
          </div>

          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Account Settings</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={username} onChange={e => setUsername(e.target.value)} className="bg-muted" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="bg-muted" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-muted" />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Push Notifications</Label>
                <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="darkTheme">Turn Dark Theme</Label>
                <Switch id="darkTheme" checked={darkThemeEnabled} onCheckedChange={setDarkThemeEnabled} />
              </div>
            </div>
          </div>

          <Button onClick={handleUpdateProfile} className="w-full bg-peerbridge-500 hover:bg-peerbridge-600 mt-4">
            Update Profile
          </Button>
        </main>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>;
  }
  
  return <div className="flex flex-col min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="p-4 bg-peerbridge-500 text-white flex items-center">
        <Button variant="ghost" size="icon" className="text-white mr-2" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="font-bold text-xl">Profile</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white" onClick={() => navigate("/insights")}>
            <Lightbulb size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <Bell size={20} />
          </Button>
          <Avatar className="h-8 w-8 border-2 border-white">
            <AvatarImage src="/lovable-uploads/f665d69e-32d3-433b-adad-5161bb41ac5d.jpg" alt={username} />
            <AvatarFallback>{username.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        <div className="flex flex-col items-center mb-8">
          <Avatar className="h-20 w-20 mb-3">
            <AvatarImage alt={username} src="/lovable-uploads/f665d69e-32d3-433b-adad-5161bb41ac5d.jpg" />
            <AvatarFallback>{username.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <h2 className="font-bold text-xl">{username}</h2>
          <p className="text-sm text-muted-foreground">ID: {userId}</p>
          <p className="text-sm text-muted-foreground capitalize">Role: {userRole}</p>
        </div>

        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start text-left p-4 h-auto bg-blue-50" onClick={() => setIsEditing(true)}>
            <div className="mr-3 p-2 bg-blue-500 rounded-full">
              <User className="h-5 w-5 text-white" />
            </div>
            <span>Edit Profile</span>
          </Button>
          
          <Button variant="outline" className="w-full justify-start text-left p-4 h-auto bg-blue-50">
            <div className="mr-3 p-2 bg-blue-500 rounded-full">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span>Security</span>
          </Button>
          
          <Button variant="outline" className="w-full justify-start text-left p-4 h-auto bg-blue-50">
            <div className="mr-3 p-2 bg-blue-500 rounded-full">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <span>Setting</span>
          </Button>
          
          <Button variant="outline" className="w-full justify-start text-left p-4 h-auto bg-blue-50">
            <div className="mr-3 p-2 bg-blue-500 rounded-full">
              <HelpCircle className="h-5 w-5 text-white" />
            </div>
            <span>Help</span>
          </Button>
          
          <Button variant="outline" className="w-full justify-start text-left p-4 h-auto bg-blue-50" onClick={handleLogout}>
            <div className="mr-3 p-2 bg-blue-500 rounded-full">
              <LogOut className="h-5 w-5 text-white" />
            </div>
            <span>Logout</span>
          </Button>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>;
};

export default ProfilePage;
