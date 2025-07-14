import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Zap, ShoppingCart, Scan, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginProps {
  onLogin: (success: boolean) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  // Sample credentials
  const validCredentials = {
    username: "walmart_user",
    password: "blitz2024"
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (
      credentials.username === validCredentials.username &&
      credentials.password === validCredentials.password
    ) {
      toast({
        title: "Login Successful!",
        description: "Welcome to Walmart Blitz - Shop at lightning speed!",
      });
      onLogin(true);
    } else {
      setError("Invalid username or password. Please try again.");
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const handleDemoLogin = () => {
    setCredentials({
      username: validCredentials.username,
      password: validCredentials.password
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-blue-900">⚡</span>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-yellow-600 bg-clip-text text-transparent mb-2">
            Walmart Blitz
          </h1>
          <p className="text-gray-600 text-lg">Shop at Lightning Speed</p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Scan className="w-4 h-4" />
              <span>Scan</span>
            </div>
            <div className="flex items-center gap-1">
              <ShoppingCart className="w-4 h-4" />
              <span>Shop</span>
            </div>
            <div className="flex items-center gap-1">
              <CreditCard className="w-4 h-4" />
              <span>Pay</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              <span>Go</span>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Welcome Back
            </CardTitle>
            <p className="text-gray-600">Sign in to your Walmart Blitz account</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Demo Credentials Alert */}
            <Alert className="bg-blue-50 border-blue-200">
              <Zap className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Demo Credentials:</strong><br />
                Username: <code className="bg-blue-100 px-1 rounded">walmart_user</code><br />
                Password: <code className="bg-blue-100 px-1 rounded">blitz2024</code>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleDemoLogin}
                  className="ml-2 h-6 text-xs"
                >
                  Auto-fill
                </Button>
              </AlertDescription>
            </Alert>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="h-12 pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-yellow-500 hover:from-blue-700 hover:to-yellow-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Sign In to Blitz
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-500">
              <p>Experience the future of shopping</p>
              <p className="text-xs mt-1">Powered by Walmart Innovation Labs</p>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Scan className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="font-semibold text-sm text-gray-800">Smart Scanning</h3>
            <p className="text-xs text-gray-600">Instant barcode recognition</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Zap className="w-4 h-4 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-sm text-gray-800">Lightning Fast</h3>
            <p className="text-xs text-gray-600">Skip the checkout lines</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;