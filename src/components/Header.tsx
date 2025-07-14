import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User, Menu, Bot, Heart } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">ShopSmart AI</h1>
                <p className="text-xs text-muted-foreground">Your Intelligent Shopping Assistant</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search products or ask AI anything..." 
                className="pl-10 pr-12 bg-muted/50 border-border focus:bg-background transition-colors"
              />
              <Button 
                variant="ai" 
                size="sm" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-3"
              >
                <Bot className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Heart className="w-4 h-4" />
              <span className="ml-2">Wishlist</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="w-4 h-4" />
              <span className="ml-2 hidden sm:inline">Cart</span>
              <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 text-xs bg-primary text-primary-foreground">
                3
              </Badge>
            </Button>

            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
              <span className="ml-2 hidden sm:inline">Account</span>
            </Button>

            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search products or ask AI..." 
              className="pl-10 bg-muted/50 border-border"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;