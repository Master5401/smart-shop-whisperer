import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, Mic, MicOff, Sparkles, MessageCircle, ShoppingCart, ArrowLeftRight, Star } from "lucide-react";

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
      content: "Hi! I'm your AI shopping assistant. I can help you with product questions, comparisons, and recommendations. What would you like to know about this smartphone?",
      timestamp: new Date(),
      suggestions: [
        "Is this good for photography?",
        "Compare with iPhone 15",
        "What do customers say about battery life?",
        "Is this suitable for gaming?"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

      if (userMessage.toLowerCase().includes("photography") || userMessage.toLowerCase().includes("camera")) {
        aiResponse = "This smartphone excels in photography with its Pro Triple Camera System! It features a 48MP main camera with advanced Night mode, 4K video recording, and AI-enhanced image processing. Based on 1,200+ customer reviews, 89% rate the camera quality as 'excellent' for both photos and videos.";
        suggestions = ["Show me camera samples", "Compare camera with Galaxy S24", "What about low-light performance?"];
      } else if (userMessage.toLowerCase().includes("battery")) {
        aiResponse = "The battery life is impressive! With typical usage, you'll get a full day (14-16 hours) of use. The 4,000mAh battery supports fast charging (0-80% in 45 minutes) and wireless charging. Customer reviews consistently mention battery longevity as a strong point.";
        suggestions = ["How fast does it charge?", "Wireless charging options?", "Battery vs competitors"];
      } else if (userMessage.toLowerCase().includes("gaming")) {
        aiResponse = "Perfect for gaming! The A17 Pro chip delivers console-quality graphics with smooth 120Hz display. It handles all current games at max settings without thermal throttling. Gamers particularly love the responsive touch controls and excellent audio quality.";
        suggestions = ["Show gaming benchmarks", "What games run best?", "Compare gaming performance"];
      } else if (userMessage.toLowerCase().includes("compare") || userMessage.toLowerCase().includes("iphone")) {
        aiResponse = "Great question! Compared to the iPhone 15, this device offers similar performance at $300 less. Key differences: slightly larger screen (6.7\" vs 6.1\"), comparable camera quality, and longer battery life. The iPhone has better iOS ecosystem integration, while this offers more customization options.";
        suggestions = ["Show detailed comparison", "What about software updates?", "Which has better resale value?"];
      } else {
        aiResponse = "I'd be happy to help! This smartphone offers excellent value with flagship features at a competitive price. It's particularly strong in camera quality, battery life, and performance. What specific aspect would you like to know more about?";
        suggestions = ["Tell me about the display", "How's the build quality?", "Compare with similar phones", "Customer satisfaction"];
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
                  <CardTitle className="text-lg text-ai-foreground">AI Shopping Assistant</CardTitle>
                  <p className="text-xs text-ai-foreground/80">Powered by Smart AI</p>
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
                <MessageCircle className="w-3 h-3 mr-1" />
                Ask Questions
              </Badge>
              <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                <ArrowLeftRight className="w-3 h-3 mr-1" />
                Compare
              </Badge>
              <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                <Star className="w-3 h-3 mr-1" />
                Reviews
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
                    placeholder="Ask about this product..."
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
                  <span>Powered by advanced AI • Voice & text supported</span>
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