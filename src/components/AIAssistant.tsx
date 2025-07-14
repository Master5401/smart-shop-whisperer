import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Mic, MicOff, Sparkles, MessageCircle, ShoppingCart, ScanLine, CreditCard } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your Amazon Go store assistant. I can help you find items, check your cart, understand our scan-and-go system, and answer questions about payment and exit procedures.",
      timestamp: new Date(),
      suggestions: [
        "How does scanning work?",
        "Check my cart status",
        "How do I pay for items?",
        "Can I exit the store?"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { cart, inventory, getUnpaidItems } = useCart();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      let aiResponse = "";
      let suggestions: string[] = [];
      const unpaidItems = getUnpaidItems();
      
      if (userMessage.toLowerCase().includes("cart") || userMessage.toLowerCase().includes("items")) {
        if (cart.length === 0) {
          aiResponse = "Your cart is currently empty. Start by scanning items or browsing our available products in the 'Scan Items' tab!";
          suggestions = ["How to scan items?", "Show available products", "What's in stock?"];
        } else {
          aiResponse = `You have ${cart.length} items in your cart. ${unpaidItems.length > 0 ? `${unpaidItems.length} items need payment before you can exit the store.` : 'All items are paid for!'}`;
          suggestions = ["Show cart details", "How to pay?", "Can I exit now?"];
        }
      } else if (userMessage.toLowerCase().includes("scan") || userMessage.toLowerCase().includes("barcode")) {
        aiResponse = "To scan items, go to the 'Scan Items' tab. You can either scan a barcode with your camera or manually enter the barcode number. Each item will be automatically added to your cart.";
        suggestions = ["What barcodes are available?", "Can I add multiple items?", "How to remove items?"];
      } else if (userMessage.toLowerCase().includes("pay") || userMessage.toLowerCase().includes("payment")) {
        if (unpaidItems.length === 0) {
          aiResponse = "All your items are already paid for! You can exit the store safely.";
          suggestions = ["Check exit status", "How does exit work?", "Can I add more items?"];
        } else {
          aiResponse = `You have ${unpaidItems.length} unpaid items totaling $${unpaidItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}. Go to 'My Cart' tab to complete payment.`;
          suggestions = ["Go to cart", "What payment methods?", "How long does payment take?"];
        }
      } else if (userMessage.toLowerCase().includes("exit") || userMessage.toLowerCase().includes("leave")) {
        if (unpaidItems.length === 0) {
          aiResponse = "You're all set to exit! All items in your cart have been paid for. Go to the 'Store Exit' tab and you'll see the green approval to leave.";
          suggestions = ["Check exit status", "How does detection work?", "What if I change my mind?"];
        } else {
          aiResponse = `You cannot exit yet - you have ${unpaidItems.length} unpaid items. Our sensors will detect unpaid items and prevent you from leaving. Please pay for all items first.`;
          suggestions = ["Go to payment", "How does detection work?", "What happens if I try to leave?"];
        }
      } else if (userMessage.toLowerCase().includes("price") || userMessage.toLowerCase().includes("cost")) {
        aiResponse = "I can help you check prices! Our available items range from $2.99 to $6.49. You can see all prices in the 'Scan Items' section, or ask me about specific items.";
        suggestions = ["Show cheapest items", "Show most expensive", "Compare item prices"];
      } else if (userMessage.toLowerCase().includes("how") && userMessage.toLowerCase().includes("work")) {
        aiResponse = "Here's how our store works: 1) Scan items to add them to your cart 2) Pay for items in the 'My Cart' tab 3) Exit validation in 'Store Exit' tab ensures all items are paid for. It's that simple!";
        suggestions = ["Start scanning", "What if I make a mistake?", "Is it really that easy?"];
      } else {
        aiResponse = "I'm here to help with your Amazon Go store experience! Ask me about scanning items, checking your cart, making payments, or the exit process.";
        suggestions = ["How to scan items?", "Check my cart", "How to pay?", "Can I exit now?"];
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        suggestions
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    
    simulateAIResponse(inputValue);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // In a real app, you'd implement voice recognition here
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating AI Assistant Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          variant="ai"
          size="lg"
          className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-glow animate-pulse-ai z-50"
        >
          <Bot className="w-8 h-8" />
        </Button>
      )}

      {/* AI Assistant Panel */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-glow border-ai-border z-50 flex flex-col bg-gradient-ai">
          <CardHeader className="pb-3 border-b border-ai-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Bot className="w-6 h-6 text-ai-foreground" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse-ai"></div>
                </div>
                <div>
                  <CardTitle className="text-lg text-ai-foreground">Store Assistant</CardTitle>
                  <p className="text-xs text-ai-foreground/80">Amazon Go Experience</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsOpen(false)}
                className="text-ai-foreground hover:bg-ai-foreground/10"
              >
                ×
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 pt-2">
              <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                <ScanLine className="w-3 h-3 mr-1" />
                Scan Help
              </Badge>
              <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                <ShoppingCart className="w-3 h-3 mr-1" />
                Cart Status
              </Badge>
              <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                <CreditCard className="w-3 h-3 mr-1" />
                Payment
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden p-0">
            {/* Messages */}
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg animate-slide-in ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-background text-foreground border border-border shadow-sm'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      
                      {/* AI Suggestions */}
                      {message.type === 'ai' && message.suggestions && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs px-2 py-1 bg-accent text-accent-foreground rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-background border border-border rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span className="text-xs text-muted-foreground">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-ai-border p-4 space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about scanning, cart, or payments..."
                    className="flex-1"
                  />
                  <Button
                    onClick={toggleVoice}
                    variant={isListening ? "default" : "outline"}
                    size="sm"
                    className="px-3"
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    variant="default"
                    size="sm"
                    className="px-3"
                    disabled={!inputValue.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="w-3 h-3" />
                  <span>Amazon Go Assistant • Scan, shop, pay & go</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AIAssistant;