import { Zap, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const { cart, getUnpaidItems } = useCart();
  const unpaidItems = getUnpaidItems();

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-blue-900">⚡</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-yellow-600 bg-clip-text text-transparent">
                Walmart Blitz
              </h1>
              <p className="text-sm text-muted-foreground">Shop at Lightning Speed</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <ShoppingCart className="h-4 w-4" />
              <span className="font-medium">{cart.length} items</span>
              {unpaidItems.length > 0 && (
                <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs">
                  {unpaidItems.length} unpaid
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;