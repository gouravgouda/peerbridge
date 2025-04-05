
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export function EntrepreneurForm() {
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [founder, setFounder] = useState("");
  const [revenue, setRevenue] = useState("");
  const [profit, setProfit] = useState("");
  const [fundRaisingHistory, setFundRaisingHistory] = useState("");
  const [stakeHolder1, setStakeHolder1] = useState("");
  const [stakeHolder2, setStakeHolder2] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save data
    const entrepreneurData = {
      companyName,
      companyDescription,
      founder,
      financials: {
        revenue,
        profit,
      },
      fundRaisingHistory,
      stakeHolders: [stakeHolder1, stakeHolder2].filter(Boolean),
    };
    
    console.log("Entrepreneur data:", entrepreneurData);
    
    // Navigate to home
    toast({
      title: "Profile completed!",
      description: "Your entrepreneur profile has been set up.",
    });
    navigate("/home");
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">Entrepreneur's Profile</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Your company name"
            className="bg-muted"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="companyDescription">About The Company</Label>
          <Textarea
            id="companyDescription"
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
            placeholder="A brief description of your company"
            className="bg-muted min-h-[100px]"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="socials">Socials</Label>
          <Input
            id="socials"
            placeholder="+ 123 456 789"
            className="bg-muted"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="founder">Founder</Label>
          <Input
            id="founder"
            value={founder}
            onChange={(e) => setFounder(e.target.value)}
            placeholder="Founder name"
            className="bg-muted"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label>Financials</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                placeholder="Revenue"
                className="bg-muted"
              />
            </div>
            <div>
              <Input
                value={profit}
                onChange={(e) => setProfit(e.target.value)}
                placeholder="Profit"
                className="bg-muted"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="fundRaisingHistory">Fund Raising History</Label>
          <Input
            id="fundRaisingHistory"
            value={fundRaisingHistory}
            onChange={(e) => setFundRaisingHistory(e.target.value)}
            placeholder="Previous funding rounds"
            className="bg-muted"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Stake Holders</Label>
          <Input
            value={stakeHolder1}
            onChange={(e) => setStakeHolder1(e.target.value)}
            placeholder="1."
            className="bg-muted mb-2"
          />
          <Input
            value={stakeHolder2}
            onChange={(e) => setStakeHolder2(e.target.value)}
            placeholder="2."
            className="bg-muted"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="logo">Logo</Label>
          <Input
            id="logo"
            type="file"
            className="bg-muted"
          />
        </div>
        
        <Button type="submit" className="w-full bg-peerbridge-500 hover:bg-peerbridge-600 mt-6">
          Let's Go
        </Button>
      </form>
    </div>
  );
}
