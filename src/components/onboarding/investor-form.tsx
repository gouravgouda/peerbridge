
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export function InvestorForm() {
  const [fullName, setFullName] = useState("");
  const [fundName, setFundName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [investmentStage, setInvestmentStage] = useState("");
  const [preferredIndustry, setPreferredIndustry] = useState("");
  const [investmentType, setInvestmentType] = useState("");
  const [startupCount, setStartupCount] = useState("");
  const [investorType, setInvestorType] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save data
    const investorData = {
      fullName,
      funds: [fundName].filter(Boolean),
      socials: {
        email,
        linkedin,
      },
      investmentStages: [investmentStage].filter(Boolean),
      preferredIndustries: [preferredIndustry].filter(Boolean),
      investmentType,
      investmentsCount: startupCount,
      investorType,
    };
    
    console.log("Investor data:", investorData);
    
    // Navigate to home
    toast({
      title: "Profile completed!",
      description: "Your investor profile has been set up.",
    });
    navigate("/home");
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">Investor's Profile</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your name"
            className="bg-muted"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="fundName">Fund(s) Name (If Any)</Label>
          <Input
            id="fundName"
            value={fundName}
            onChange={(e) => setFundName(e.target.value)}
            placeholder="1."
            className="bg-muted"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Socials</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="bg-muted mb-2"
          />
          <Input
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="LinkedIn"
            className="bg-muted"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="investmentStage">What Stages Do You Invest</Label>
          <Select value={investmentStage} onValueChange={setInvestmentStage}>
            <SelectTrigger className="bg-muted">
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="seed">Seed</SelectItem>
              <SelectItem value="pre-seed">Pre-Seed</SelectItem>
              <SelectItem value="series-a">Series A</SelectItem>
              <SelectItem value="series-b">Series B</SelectItem>
              <SelectItem value="series-c">Series C+</SelectItem>
              <SelectItem value="growth">Growth</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="preferredIndustry">Preferred Industries</Label>
          <Select value={preferredIndustry} onValueChange={setPreferredIndustry}>
            <SelectTrigger className="bg-muted">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="fintech">Fintech</SelectItem>
              <SelectItem value="edtech">Edtech</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="saas">SaaS</SelectItem>
              <SelectItem value="ai">AI/ML</SelectItem>
              <SelectItem value="cleantech">Cleantech</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="investmentType">Investment Type</Label>
          <Select value={investmentType} onValueChange={setInvestmentType}>
            <SelectTrigger className="bg-muted">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="equity">Equity</SelectItem>
              <SelectItem value="debt">Debt</SelectItem>
              <SelectItem value="convertible-note">Convertible Note</SelectItem>
              <SelectItem value="safe">SAFE</SelectItem>
              <SelectItem value="revenue-sharing">Revenue Sharing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="startupCount">Number Of Startups Invested</Label>
          <Input
            id="startupCount"
            value={startupCount}
            onChange={(e) => setStartupCount(e.target.value)}
            placeholder="Count"
            className="bg-muted"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="investorType">Are You An Angel Investor/VC/Family Office</Label>
          <Select value={investorType} onValueChange={setInvestorType}>
            <SelectTrigger className="bg-muted">
              <SelectValue placeholder="Select investor type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="angel">Angel Investor</SelectItem>
              <SelectItem value="vc">Venture Capital</SelectItem>
              <SelectItem value="family-office">Family Office</SelectItem>
              <SelectItem value="corporate">Corporate Investor</SelectItem>
              <SelectItem value="accelerator">Accelerator/Incubator</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button type="submit" className="w-full bg-peerbridge-500 hover:bg-peerbridge-600 mt-6">
          Let's Go
        </Button>
      </form>
    </div>
  );
}
