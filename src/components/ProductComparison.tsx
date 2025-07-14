import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Check, X, Zap, Camera, Battery, Cpu } from "lucide-react";
import phoneImage from "@/assets/phone-product.jpg";
import headphonesImage from "@/assets/headphones-product.jpg";
import laptopImage from "@/assets/laptop-product.jpg";

const ProductComparison = () => {
  const products = [
    {
      id: 1,
      name: "ProMax Smartphone X1",
      price: 899,
      originalPrice: 1199,
      image: phoneImage,
      rating: 4.8,
      reviews: 2847,
      highlight: "Current Product",
      specs: {
        display: "6.7\" Super Retina",
        processor: "A17 Pro",
        storage: "256GB",
        camera: "48MP Triple",
        battery: "4000mAh",
        weight: "201g"
      },
      pros: ["Excellent camera", "Long battery life", "Fast processor"],
      cons: ["Expensive", "No headphone jack"]
    },
    {
      id: 2,
      name: "Galaxy Pro S24",
      price: 999,
      originalPrice: 1299,
      image: phoneImage,
      rating: 4.7,
      reviews: 1834,
      highlight: "Popular Alternative",
      specs: {
        display: "6.8\" Dynamic AMOLED",
        processor: "Snapdragon 8 Gen 3",
        storage: "256GB",
        camera: "50MP Triple",
        battery: "4200mAh",
        weight: "196g"
      },
      pros: ["Larger screen", "S Pen support", "Great display"],
      cons: ["Higher price", "Heavier"]
    },
    {
      id: 3,
      name: "iPhone 15 Pro",
      price: 1199,
      originalPrice: 1199,
      image: phoneImage,
      rating: 4.9,
      reviews: 3421,
      highlight: "Premium Option",
      specs: {
        display: "6.1\" Super Retina",
        processor: "A17 Pro",
        storage: "256GB",
        camera: "48MP Triple",
        battery: "3700mAh",
        weight: "187g"
      },
      pros: ["iOS ecosystem", "Premium build", "Great resale value"],
      cons: ["Most expensive", "Smaller battery"]
    }
  ];

  const getComparisonIcon = (spec: string) => {
    switch (spec) {
      case 'processor': return <Cpu className="w-4 h-4" />;
      case 'camera': return <Camera className="w-4 h-4" />;
      case 'battery': return <Battery className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Smart Product Comparison</h2>
        <p className="text-muted-foreground">Compare similar products side by side to make the best decision</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card 
            key={product.id} 
            className={`relative transition-all duration-300 hover:shadow-glow ${
              index === 0 ? 'ring-2 ring-primary shadow-ai' : 'hover:shadow-elegant'
            }`}
          >
            {/* Highlight Badge */}
            {product.highlight && (
              <Badge 
                className={`absolute -top-3 left-4 z-10 ${
                  index === 0 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {product.highlight}
              </Badge>
            )}

            <CardHeader className="pb-4">
              <div className="relative overflow-hidden rounded-lg bg-gradient-hero">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.originalPrice > product.price && (
                  <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
                    Save ${product.originalPrice - product.price}
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Key Specs */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Key Specifications</h4>
                <div className="space-y-2">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {getComparisonIcon(key)}
                        <span className="capitalize text-muted-foreground">{key}:</span>
                      </div>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Pros & Cons</h4>
                <div className="space-y-2">
                  {product.pros.slice(0, 2).map((pro, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-green-600">
                      <Check className="w-4 h-4" />
                      <span>{pro}</span>
                    </div>
                  ))}
                  {product.cons.slice(0, 2).map((con, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-red-500">
                      <X className="w-4 h-4" />
                      <span>{con}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button 
                  variant={index === 0 ? "hero" : "outline"} 
                  size="sm" 
                  className="flex-1"
                >
                  {index === 0 ? "Selected" : "Compare"}
                </Button>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Recommendation */}
      <Card className="mt-8 bg-gradient-ai border-ai-border">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-ai-foreground/10">
              <Zap className="w-6 h-6 text-ai-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-ai-foreground mb-2">AI Recommendation</h3>
              <p className="text-ai-foreground/80 mb-4">
                Based on your browsing behavior and similar customer preferences, the <strong>ProMax Smartphone X1</strong> offers 
                the best value for your needs. It provides flagship performance at $300 less than competitors, with excellent 
                camera quality and battery life that matches your usage patterns.
              </p>
              <div className="flex gap-3">
                <Button variant="hero" size="sm">
                  Choose This Product
                </Button>
                <Button variant="outline" size="sm">
                  Ask AI More Questions
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductComparison;