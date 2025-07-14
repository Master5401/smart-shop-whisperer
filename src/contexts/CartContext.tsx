import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface GroceryItem {
  id: string;
  name: string;
  price: number;
  barcode: string;
  category: string;
  image: string;
  inStock: boolean;
}

export interface CartItem extends GroceryItem {
  quantity: number;
  isPaid: boolean;
}

interface CartContextType {
  cart: CartItem[];
  inventory: GroceryItem[];
  addToCart: (item: GroceryItem) => void;
  removeFromCart: (barcode: string) => void;
  updateQuantity: (barcode: string, quantity: number) => void;
  payForItems: (barcodes: string[]) => void;
  getTotalPrice: () => number;
  getUnpaidItems: () => CartItem[];
  canExitStore: () => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialInventory: GroceryItem[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    price: 2.99,
    barcode: '1234567890123',
    category: 'Fruits',
    image: '/api/placeholder/200/200',
    inStock: true
  },
  {
    id: '2',
    name: 'Whole Milk',
    price: 3.49,
    barcode: '2345678901234',
    category: 'Dairy',
    image: '/api/placeholder/200/200',
    inStock: true
  },
  {
    id: '3',
    name: 'Sourdough Bread',
    price: 4.99,
    barcode: '3456789012345',
    category: 'Bakery',
    image: '/api/placeholder/200/200',
    inStock: true
  },
  {
    id: '4',
    name: 'Free Range Eggs',
    price: 5.99,
    barcode: '4567890123456',
    category: 'Dairy',
    image: '/api/placeholder/200/200',
    inStock: true
  },
  {
    id: '5',
    name: 'Organic Spinach',
    price: 3.99,
    barcode: '5678901234567',
    category: 'Vegetables',
    image: '/api/placeholder/200/200',
    inStock: true
  },
  {
    id: '6',
    name: 'Greek Yogurt',
    price: 6.49,
    barcode: '6789012345678',
    category: 'Dairy',
    image: '/api/placeholder/200/200',
    inStock: true
  }
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [inventory, setInventory] = useState<GroceryItem[]>(initialInventory);

  const addToCart = (item: GroceryItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.barcode === item.barcode);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.barcode === item.barcode
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1, isPaid: false }];
    });
  };

  const removeFromCart = (barcode: string) => {
    setCart(prevCart => prevCart.filter(item => item.barcode !== barcode));
  };

  const updateQuantity = (barcode: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(barcode);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.barcode === barcode ? { ...item, quantity } : item
      )
    );
  };

  const payForItems = (barcodes: string[]) => {
    setCart(prevCart =>
      prevCart.map(item =>
        barcodes.includes(item.barcode) ? { ...item, isPaid: true } : item
      )
    );
    
    // Remove paid items from inventory database
    setInventory(prevInventory =>
      prevInventory.map(item =>
        barcodes.includes(item.barcode) ? { ...item, inStock: false } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getUnpaidItems = () => {
    return cart.filter(item => !item.isPaid);
  };

  const canExitStore = () => {
    return cart.every(item => item.isPaid);
  };

  return (
    <CartContext.Provider value={{
      cart,
      inventory,
      addToCart,
      removeFromCart,
      updateQuantity,
      payForItems,
      getTotalPrice,
      getUnpaidItems,
      canExitStore
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}