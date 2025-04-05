
import { BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
      <BarChart3 className="h-8 w-8 text-peerbridge-500" />
      <span className="text-peerbridge-500">PeerBridge</span>
    </Link>
  );
}
