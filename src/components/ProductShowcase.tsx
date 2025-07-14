import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart, Share2, ShoppingCart, Zap } from "lucide-react";
import phoneImage from "@/assets/phone-product.jpg";

const ProductShowcase = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: "ProMax Smartphone X1",
    price: 899,
    originalPrice: 1199,
    rating: 4.8,
    reviews: 2847,
    images: [phoneImage, phoneImage, phoneImage],
    specs: {
      display: "6.7\" Super Retina XDR",
      processor: "A17 Pro Chip",
      storage: "256GB",
      camera: "Pro Triple Camera System"
    },
    colors: ["Midnight Black", "Silver", "Blue", "Gold"],
    availability: "In Stock - Ships Today"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-hero shadow-elegant">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
            />
            <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
              25% OFF
            </Badge>
          </div>
          
          <div className="flex gap-3">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index 
                    ? 'border-primary shadow-ai' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <img src={image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  {product.rating} ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-primary">${product.price}</span>
            <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
            <Badge variant="secondary" className="text-green-600">Save $300</Badge>
          </div>

          {/* Key Specs */}
          <Card className="bg-gradient-hero border-border/50">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Display</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.specs.display}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Processor</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.specs.processor}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Storage</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.specs.storage}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Camera</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.specs.camera}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Color Selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Color</h3>
            <div className="flex gap-3">
              {product.colors.map((color, index) => (
                <button
                  key={color}
                  className={`px-4 py-2 rounded-lg border transition-all text-sm ${
                    index === 0 
                      ? 'border-primary bg-accent text-accent-foreground' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-muted transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-green-600 font-medium">{product.availability}</span>
            </div>

            <div className="flex gap-3">
              <Button variant="cart" size="lg" className="flex-1">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;