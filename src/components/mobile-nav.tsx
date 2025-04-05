
import { Home, Search, ArrowLeftRight, Layers, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function MobileNav() {
  const location = useLocation();
  
  const navItems = [
    {
      name: "Home",
      href: "/home",
      icon: Home,
    },
    {
      name: "Search",
      href: "/search",
      icon: Search,
    },
    {
      name: "Connect",
      href: "/connect",
      icon: ArrowLeftRight,
    },
    {
      name: "Community",
      href: "/community",
      icon: Layers,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary p-2 border-t z-50">
      <nav className="flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center p-2 rounded-full ${
                isActive ? "text-peerbridge-500 bg-peerbridge-50" : "text-muted-foreground"
              }`}
            >
              <Icon 
                size={20} 
                className={isActive ? "text-peerbridge-500" : "text-muted-foreground"}
              />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
