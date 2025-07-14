import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScanLine, Plus, ShoppingBasket } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const GroceryScanner = () => {
  const [scannedBarcode, setScannedBarcode] = useState("");
  const { inventory, addToCart } = useCart();
  const { toast } = useToast();

  const handleScan = () => {
    if (!scannedBarcode) {
      toast({
        title: "Invalid Scan",
        description: "Please enter or scan a barcode",
        variant: "destructive"
      });
      return;
    }

    const item = inventory.find(item => item.barcode === scannedBarcode && item.inStock);
    
    if (item) {
      addToCart(item);
      toast({
        title: "Item Added",
        description: `${item.name} added to your cart`,
      });
      setScannedBarcode("");
    } else {
      toast({
        title: "Item Not Found",
        description: "This barcode is not in our inventory or item is out of stock",
        variant: "destructive"
      });
    }
  };

  const handleQuickAdd = (item: any) => {
    addToCart(item);
    toast({
      title: "Item Added",
      description: `${item.name} added to your cart`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Scanner Section */}
      <Card className="mb-8 shadow-ai">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <ScanLine className="h-6 w-6 text-primary" />
            Scan Your Items
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 max-w-md mx-auto">
            <Input
              placeholder="Scan or enter barcode..."
              value={scannedBarcode}
              onChange={(e) => setScannedBarcode(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleScan()}
              className="flex-1"
            />
            <Button onClick={handleScan} className="bg-gradient-primary">
              <ScanLine className="h-4 w-4 mr-2" />
              Scan
            </Button>
          </div>
          <p className="text-center text-muted-foreground text-sm">
            Point your camera at a barcode or enter it manually
          </p>
        </CardContent>
      </Card>

      {/* Available Items */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Available Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inventory.filter(item => item.inStock).map((item) => (
            <Card key={item.id} className="hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <ShoppingBasket className="h-16 w-16 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <div className="space-y-2">
                  <Badge variant="secondary">{item.category}</Badge>
                  <p className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Barcode: {item.barcode}</p>
                </div>
                <Button 
                  onClick={() => handleQuickAdd(item)}
                  className="w-full mt-4 bg-gradient-primary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroceryScanner;