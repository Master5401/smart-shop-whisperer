import { Store, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const { cart, getUnpaidItems } = useCart();
  const unpaidItems = getUnpaidItems();

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Store className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Amazon Go Style Store</h1>
              <p className="text-sm text-muted-foreground">Scan, Shop, Pay & Go</p>
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