
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { InvestorPreview } from "@/types";
import { useNavigate } from "react-router-dom";

interface InvestorCardProps {
  investor: InvestorPreview;
  onClick?: () => void;
}

export function InvestorCard({ investor, onClick }: InvestorCardProps) {
  const { id, name, image, investorType, preferredIndustries } = investor;
  const navigate = useNavigate();
  
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
    
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/investor/${id}`);
    }
  };

  return (
    <Card 
      className="overflow-hidden h-full cursor-pointer hover:border-peerbridge-300 transition-all"
      onClick={handleClick}
    >
      <CardContent className="p-4 flex flex-col items-center text-center">
        <Avatar className="h-16 w-16 mb-2">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="bg-peerbridge-100 text-peerbridge-800">{initials}</AvatarFallback>
        </Avatar>
        <h3 className="font-medium text-base">{name}</h3>
        {investorType && (
          <Badge variant="outline" className="mt-1 mb-2">
            {investorType}
          </Badge>
        )}
        {preferredIndustries && preferredIndustries.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center">
            {preferredIndustries.map((industry) => (
              <Badge key={industry} variant="secondary" className="text-xs">
                {industry}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
