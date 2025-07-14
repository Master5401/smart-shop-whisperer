import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle, 
  XCircle, 
  DoorOpen, 
  AlertTriangle, 
  ShieldCheck,
  Receipt
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const StoreExit = () => {
  const { cart, canExitStore, getUnpaidItems } = useCart();
  const { toast } = useToast();
  const unpaidItems = getUnpaidItems();
  const canExit = canExitStore();

  const handleExitAttempt = () => {
    if (canExit) {
      toast({
        title: "Exit Approved",
        description: "Thank you for shopping with us! Have a great day!",
      });
    } else {
      toast({
        title: "Exit Denied",
        description: `You have ${unpaidItems.length} unpaid item(s). Please complete payment before exiting.`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Exit Status */}
      <Card className={`mb-6 ${canExit ? 'border-green-500' : 'border-destructive'}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {canExit ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-destructive" />
            )}
            Store Exit Validation
          </CardTitle>
        </CardHeader>
        <CardContent>
          {canExit ? (
            <Alert className="border-green-500 bg-green-50">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Exit Approved:</strong> All items in your cart have been paid for. 
                You may proceed to exit the store.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Exit Denied:</strong> You have {unpaidItems.length} unpaid item(s) in your cart. 
                Please complete payment before attempting to exit.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Cart Summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Cart Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cart.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No items in cart
            </p>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.barcode} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    <Badge variant={item.isPaid ? "default" : "destructive"}>
                      {item.isPaid ? "Paid" : "Unpaid"}
                    </Badge>
                  </div>
                </div>
              ))}
              
              <div className="border-t pt-3 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-bold">
                    ${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Paid items:</span>
                  <span className="text-green-600">
                    {cart.filter(item => item.isPaid).length} of {cart.length}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Exit Button */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <DoorOpen className={`h-16 w-16 mx-auto ${canExit ? 'text-green-500' : 'text-muted-foreground'}`} />
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {canExit ? "Ready to Exit" : "Payment Required"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {canExit 
                  ? "All items have been paid for. You may exit the store."
                  : "Please pay for all items before exiting the store."
                }
              </p>
            </div>
            
            <Button
              onClick={handleExitAttempt}
              size="lg"
              className={`w-full ${canExit ? 'bg-gradient-primary' : 'bg-destructive hover:bg-destructive/90'}`}
            >
              <DoorOpen className="h-5 w-5 mr-2" />
              {canExit ? "Exit Store" : "Attempt Exit"}
            </Button>
            
            {!canExit && (
              <p className="text-sm text-muted-foreground">
                Go to "My Cart" tab to complete payment for unpaid items
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreExit;