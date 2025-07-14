import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import ProductShowcase from "@/components/ProductShowcase";
import ProductComparison from "@/components/ProductComparison";
import AIAssistant from "@/components/AIAssistant";

const Index = () => {
  const [activeTab, setActiveTab] = useState("product");

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="product" className="text-sm">Product Details</TabsTrigger>
              <TabsTrigger value="compare" className="text-sm">Smart Compare</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="product" className="mt-0">
            <ProductShowcase />
          </TabsContent>
          
          <TabsContent value="compare" className="mt-0">
            <ProductComparison />
          </TabsContent>
        </Tabs>
      </main>

      {/* AI Assistant - Always Available */}
      <AIAssistant />
    </div>
  );
};

export default Index;
