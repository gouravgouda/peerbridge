
export type UserRole = "entrepreneur" | "investor";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  profileImage?: string;
}

export interface Entrepreneur extends User {
  role: "entrepreneur";
  companyName: string;
  companyDescription?: string;
  founder: string;
  financials?: {
    revenue?: string;
    profit?: string;
  };
  fundRaisingHistory?: string;
  stakeHolders?: string[];
  logo?: string;
}

export interface Investor extends User {
  role: "investor";
  funds?: string[];
  socials?: {
    email?: string;
    linkedin?: string;
  };
  investmentStages?: string[];
  preferredIndustries?: string[];
  investmentType?: string;
  investmentsCount?: number;
  investorType?: string;
  notableInvestments?: string[];
}

export interface InvestorPreview {
  id: string;
  name: string;
  image?: string;
  investorType?: string;
  preferredIndustries?: string[];
}
