
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserRound, Building2 } from "lucide-react";
import { UserRole } from "@/types";

export function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRole === "entrepreneur") {
      navigate("/onboarding/entrepreneur");
    } else if (selectedRole === "investor") {
      navigate("/onboarding/investor");
    }
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">You are...</h1>
        <p className="text-muted-foreground mt-2">
          Select your role to personalize your experience
        </p>
      </div>

      <div className="grid gap-4">
        <Card
          className={`cursor-pointer border-2 transition-all ${
            selectedRole === "entrepreneur"
              ? "border-peerbridge-500 bg-peerbridge-50"
              : "hover:border-peerbridge-300"
          }`}
          onClick={() => setSelectedRole("entrepreneur")}
        >
          <CardContent className="flex items-center gap-4 p-4">
            <div
              className={`rounded-full p-2 ${
                selectedRole === "entrepreneur"
                  ? "bg-peerbridge-500 text-white"
                  : "bg-muted"
              }`}
            >
              <Building2 size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-medium">Entrepreneur</h3>
              <p className="text-sm text-muted-foreground">
                I'm looking for investment and connections
              </p>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer border-2 transition-all ${
            selectedRole === "investor"
              ? "border-peerbridge-500 bg-peerbridge-50"
              : "hover:border-peerbridge-300"
          }`}
          onClick={() => setSelectedRole("investor")}
        >
          <CardContent className="flex items-center gap-4 p-4">
            <div
              className={`rounded-full p-2 ${
                selectedRole === "investor"
                  ? "bg-peerbridge-500 text-white"
                  : "bg-muted"
              }`}
            >
              <UserRound size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-medium">Investor</h3>
              <p className="text-sm text-muted-foreground">
                I'm looking to invest in promising startups
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button
        className="w-full mt-6 bg-peerbridge-500 hover:bg-peerbridge-600"
        disabled={!selectedRole}
        onClick={handleContinue}
      >
        Continue
      </Button>
    </div>
  );
}
