
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  progress?: number;
  icon?: React.ReactNode;
}

export function StatsCard({ title, value, subtitle, progress, icon }: StatsCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle className="text-md font-medium flex justify-between items-center">
          {title}
          {icon}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        {progress !== undefined && (
          <Progress value={progress} className="h-2 mt-2" />
        )}
      </CardContent>
    </Card>
  );
}

export function PitchAnalyticsCard() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle className="text-md font-medium">Pitch Analytics</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 p-4 pt-0">
        <div className="flex items-center justify-center flex-col">
          <div className="relative mb-1">
            <div className="w-16 h-16 rounded-full border-4 border-peerbridge-200 flex items-center justify-center">
              <Eye className="h-6 w-6 text-peerbridge-500" />
            </div>
            <div className="absolute top-0 right-0 left-0 bottom-0">
              <svg width="64" height="64" viewBox="0 0 64 64" className="rotate-[-90deg]">
                <circle
                  cx="32"
                  cy="32"
                  r="30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-peerbridge-500"
                  strokeDasharray={188.5}
                  strokeDashoffset={188.5 - (188.5 * 30) / 100}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <p className="text-sm font-medium mt-2">Views This Week/Month</p>
        </div>
        <div className="flex flex-col justify-center">
          <div className="mb-2">
            <p className="text-sm font-medium">Pitch Deck Downloads</p>
            <div className="w-full h-1 bg-muted mt-1">
              <div className="h-full bg-peerbridge-500" style={{ width: "45%" }}></div>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Investor Profile Clicks</p>
            <div className="w-full h-1 bg-muted mt-1">
              <div className="h-full bg-peerbridge-500" style={{ width: "65%" }}></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
