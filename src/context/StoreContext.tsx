'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CartItem,
  CSABox,
  Product,
  FulfillmentPreference,
  Subscription,
  Order,
  SubscriptionCadence
} from '../types/store';
import {
  CSA_BOXES,
  PRODUCTS,
  ELIGIBLE_ZIP_CODES,
  PICKUP_LOCATIONS
} from '../data/mockData';

interface StoreContextType {
  // Products & Boxes
  csaBoxes: CSABox[];
  products: Product[];
  updateProductStock: (productId: string, inStock: boolean, stockCount: number) => void;
  addNewProduct: (product: Product) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'cartId'>) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartTotal: number;
  cartSubtotal: number;
  cartItemCount: number;
  deliveryFee: number;
  isFreeDeliveryQualified: boolean;

  // Fulfillment
  fulfillment: FulfillmentPreference;
  updateFulfillment: (pref: Partial<FulfillmentPreference>) => void;
  validateZip: (zip: string) => boolean;

  // Subscriptions
  subscriptions: Subscription[];
  updateSubscriptionStatus: (id: string, status: 'active' | 'paused' | 'skipped_next') => void;
  updateSubscriptionCadence: (id: string, cadence: 'weekly' | 'bi-weekly') => void;
  isSubscriptionPortalOpen: boolean;
  setIsSubscriptionPortalOpen: (open: boolean) => void;

  // Orders & Checkout
  orders: Order[];
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  createOrder: (orderData: {
    customer: { name: string; email: string; phone: string; address?: string; instructions?: string };
  }) => Order;

  // Admin
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  // Customizer Drawer for CSA Box
  customizingBox: CSABox | null;
  setCustomizingBox: (box: CSABox | null) => void;

  // Toast
  toast: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [csaBoxes] = useState<CSABox[]>(CSA_BOXES);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSubscriptionPortalOpen, setIsSubscriptionPortalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [customizingBox, setCustomizingBox] = useState<CSABox | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Fulfillment defaults
  const [fulfillment, setFulfillment] = useState<FulfillmentPreference>({
    type: 'delivery',
    zipCode: '10001',
    isEligible: true,
    pickupLocationId: PICKUP_LOCATIONS[0].id,
    scheduledDay: 'Friday',
    timeSlot: 'Morning (8:00 AM – 12:00 PM)'
  });

  // Seed sample subscription for demo purposes
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: 'sub-active-1',
      boxId: 'city-family-box',
      boxTitle: 'City Harvest Family Box',
      frequency: 'weekly',
      status: 'active',
      nextHarvestDate: 'Friday, Nov 14',
      pricePerCycle: 40.8, // 15% discount off $48
      items: [
        'Assorted Gourmet Microgreens (Pea & Broccoli)',
        'Hydroponic Artisan Salad Mix',
        'Heirloom Vine Cherry Tomatoes',
        'Blue Oyster Farm Mushrooms',
        'Rainbow Swiss Chard'
      ],
      addOns: ['Rooftop Wildflower Raw Honey (+$11.50)'],
      deliveryMethod: 'delivery',
      addressOrHub: '742 Evergreen Terrace, Apt 4B (Zip: 10001)'
    }
  ]);

  const [orders, setOrders] = useState<Order[]>([]);

  // Show Toast
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  const validateZip = (zip: string) => {
    const clean = zip.trim();
    return ELIGIBLE_ZIP_CODES.includes(clean);
  };

  const updateFulfillment = (pref: Partial<FulfillmentPreference>) => {
    setFulfillment((prev) => {
      const updated = { ...prev, ...pref };
      if (pref.zipCode !== undefined) {
        updated.isEligible = validateZip(pref.zipCode);
      }
      return updated;
    });
  };

  const addToCart = (item: Omit<CartItem, 'cartId'>) => {
    const cartId = `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setCart((prev) => [...prev, { ...item, cartId }]);
    setIsCartOpen(true);
    showToast(`Added "${item.title}" to harvest basket`);
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  // Calculate cart pricing
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isFreeDeliveryQualified = cartSubtotal >= 40 || fulfillment.type === 'pickup';
  const deliveryFee = cart.length === 0 || isFreeDeliveryQualified ? 0 : 5.99;
  const cartTotal = cartSubtotal + deliveryFee;

  // Subscriptions management
  const updateSubscriptionStatus = (id: string, status: 'active' | 'paused' | 'skipped_next') => {
    setSubscriptions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status } : sub))
    );
    const messages = {
      active: 'Subscription resumed! Your next harvest is scheduled.',
      paused: 'Subscription paused. No charges or deliveries will occur.',
      skipped_next: 'Next upcoming harvest skipped. Will resume following cycle.'
    };
    showToast(messages[status]);
  };

  const updateSubscriptionCadence = (id: string, cadence: 'weekly' | 'bi-weekly') => {
    setSubscriptions((prev) =>
      prev.map((sub) => {
        if (sub.id === id) {
          const discount = cadence === 'weekly' ? 0.85 : 0.9;
          const box = CSA_BOXES.find((b) => b.id === sub.boxId);
          const base = box ? box.basePrice : 40;
          return {
            ...sub,
            frequency: cadence,
            pricePerCycle: parseFloat((base * discount).toFixed(2))
          };
        }
        return sub;
      })
    );
    showToast(`Delivery frequency updated to ${cadence}!`);
  };

  // Create Order
  const createOrder = (orderData: {
    customer: { name: string; email: string; phone: string; address?: string; instructions?: string };
  }): Order => {
    const hasSub = cart.some((i) => i.type === 'csa' && i.frequency && i.frequency !== 'one-time');

    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: [...cart],
      subtotal: parseFloat(cartSubtotal.toFixed(2)),
      discount: 0,
      deliveryFee,
      total: parseFloat(cartTotal.toFixed(2)),
      fulfillment: { ...fulfillment },
      customer: orderData.customer,
      hasSubscription: hasSub
    };

    setOrders((prev) => [newOrder, ...prev]);

    // If order contains a recurring subscription, automatically register it in subscriptions portal!
    cart.forEach((item) => {
      if (item.type === 'csa' && item.frequency && item.frequency !== 'one-time') {
        const newSub: Subscription = {
          id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
          boxId: item.productId,
          boxTitle: item.title,
          frequency: item.frequency,
          status: 'active',
          nextHarvestDate: `${fulfillment.scheduledDay}, Next Cycle`,
          pricePerCycle: item.price,
          items: item.customizedItems || [],
          addOns: (item.addOns || []).map((a) => `${a.name} (+${a.price.toFixed(2)})`),
          deliveryMethod: fulfillment.type,
          addressOrHub:
            fulfillment.type === 'delivery'
              ? `${orderData.customer.address} (Zip: ${fulfillment.zipCode})`
              : (PICKUP_LOCATIONS.find((p) => p.id === fulfillment.pickupLocationId)?.name || 'Downtown Hub')
        };
        setSubscriptions((prevSubs) => [newSub, ...prevSubs]);
      }
    });

    clearCart();
    return newOrder;
  };

  // Product Admin actions
  const updateProductStock = (productId: string, inStock: boolean, stockCount: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock, stockCount } : p))
    );
    showToast(`Inventory updated for product`);
  };

  const addNewProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
    showToast(`Added new crop "${product.name}" to farm market!`);
  };

  return (
    <StoreContext.Provider
      value={{
        csaBoxes,
        products,
        updateProductStock,
        addNewProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        cartSubtotal,
        cartItemCount,
        deliveryFee,
        isFreeDeliveryQualified,
        fulfillment,
        updateFulfillment,
        validateZip,
        subscriptions,
        updateSubscriptionStatus,
        updateSubscriptionCadence,
        isSubscriptionPortalOpen,
        setIsSubscriptionPortalOpen,
        orders,
        isCheckoutOpen,
        setIsCheckoutOpen,
        createOrder,
        isAdminOpen,
        setIsAdminOpen,
        customizingBox,
        setCustomizingBox,
        toast,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

