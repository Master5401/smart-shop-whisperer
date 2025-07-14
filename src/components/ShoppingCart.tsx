import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Minus, Plus, CreditCard, ShoppingCart as CartIcon } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const ShoppingCart = () => {
  const { cart, removeFromCart, updateQuantity, payForItems, getTotalPrice, getUnpaidItems } = useCart();
  const { toast } = useToast();

  const unpaidItems = getUnpaidItems();
  const totalPrice = getTotalPrice();
  const unpaidTotal = unpaidItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handlePayment = () => {
    if (unpaidItems.length === 0) {
      toast({
        title: "No Items to Pay",
        description: "All items in your cart are already paid for",
        variant: "destructive"
      });
      return;
    }

    const barcodes = unpaidItems.map(item => item.barcode);
    payForItems(barcodes);
    
    toast({
      title: "Payment Successful",
      description: `Paid $${unpaidTotal.toFixed(2)} for ${unpaidItems.length} item(s)`,
    });
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="text-center p-12">
          <CartIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground">Start scanning items to add them to your cart</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CartIcon className="h-6 w-6" />
            Shopping Cart ({cart.length} items)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cart.map((item) => (
            <div key={item.barcode} className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                <CartIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.category}</p>
                <p className="text-sm text-muted-foreground">Barcode: {item.barcode}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.barcode, item.quantity - 1)}
                  disabled={item.isPaid}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.barcode, item.quantity + 1)}
                  disabled={item.isPaid}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <div className="text-right">
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                <Badge variant={item.isPaid ? "default" : "secondary"}>
                  {item.isPaid ? "Paid" : "Unpaid"}
                </Badge>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => removeFromCart(item.barcode)}
                disabled={item.isPaid}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-lg">
            <span>Total Cart Value:</span>
            <span className="font-semibold">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg text-primary">
            <span>Amount to Pay:</span>
            <span className="font-bold">${unpaidTotal.toFixed(2)}</span>
          </div>
          
          <Button 
            onClick={handlePayment}
            disabled={unpaidItems.length === 0}
            className="w-full bg-gradient-primary"
            size="lg"
          >
            <CreditCard className="h-5 w-5 mr-2" />
            Pay ${unpaidTotal.toFixed(2)}
          </Button>
          
          <p className="text-sm text-muted-foreground text-center">
            {unpaidItems.length > 0 
              ? `${unpaidItems.length} item(s) need payment before you can exit the store`
              : "All items are paid for. You can exit the store safely!"
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShoppingCart;