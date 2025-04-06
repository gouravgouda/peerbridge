
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface EntrepreneurPreviewProps {
  entrepreneur: {
    id: string;
    name: string;
    companyName: string;
    industry: string;
    location?: string;
  };
}

export function EntrepreneurCard({ entrepreneur }: EntrepreneurPreviewProps) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/entrepreneur/${entrepreneur.id}`);
  };

  return (
    <Card 
      className="overflow-hidden border-gray-200 hover:border-peerbridge-300 cursor-pointer transition-all"
      onClick={handleClick}
    >
      <CardContent className="p-3">
        <div className="flex flex-col items-center">
          <Avatar className="h-14 w-14 mb-2">
            <AvatarFallback className="bg-peerbridge-100 text-peerbridge-800">
              {entrepreneur.companyName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <h3 className="font-medium text-center mb-1">{entrepreneur.companyName}</h3>
          
          <div className="w-full flex flex-wrap justify-center gap-1 mt-1">
            <Badge variant="outline" className="bg-peerbridge-50 text-peerbridge-700 text-xs">
              {entrepreneur.industry}
            </Badge>
            
            {entrepreneur.location && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                {entrepreneur.location}
              </Badge>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mt-2">
            Founder: {entrepreneur.name}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
