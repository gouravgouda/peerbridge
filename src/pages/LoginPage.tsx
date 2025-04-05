
import { AuthForm } from "@/components/auth/auth-form";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-peerbridge-50 to-peerbridge-100 px-4 py-8">
      <AuthForm type="login" />
    </div>
  );
};

export default LoginPage;
