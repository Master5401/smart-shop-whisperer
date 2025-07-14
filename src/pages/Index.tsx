import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import GroceryScanner from "@/components/GroceryScanner";
import ShoppingCart from "@/components/ShoppingCart";
import StoreExit from "@/components/StoreExit";
import AIAssistant from "@/components/AIAssistant";
import { CartProvider } from "@/contexts/CartContext";

const Index = () => {
  const [activeTab, setActiveTab] = useState("scan");

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        
        <main>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto mb-8">
                <TabsTrigger value="scan" className="text-sm">Scan Items</TabsTrigger>
                <TabsTrigger value="cart" className="text-sm">My Cart</TabsTrigger>
                <TabsTrigger value="exit" className="text-sm">Store Exit</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="scan" className="mt-0">
              <GroceryScanner />
            </TabsContent>
            
            <TabsContent value="cart" className="mt-0">
              <ShoppingCart />
            </TabsContent>

            <TabsContent value="exit" className="mt-0">
              <StoreExit />
            </TabsContent>
          </Tabs>
        </main>

        {/* AI Assistant - Always Available */}
        <AIAssistant />
      </div>
    </CartProvider>
  );
};

export default Index;
