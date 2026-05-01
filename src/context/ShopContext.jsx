import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const ShopContext = createContext();

export function useShop() {
  return useContext(ShopContext);
}

export function ShopProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('thrft_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('thrft_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('thrft_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('thrft_cart', JSON.stringify(cart));
    localStorage.setItem('thrft_wishlist', JSON.stringify(wishlist));
    localStorage.setItem('thrft_orders', JSON.stringify(orders));
  }, [cart, wishlist, orders]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === product.selectedSize);
      if (existing) return prev; 
      
      const availableSizes = product.available_size || product.availableSize || [];
      const sizeToAdd = product.selectedSize || (Array.isArray(availableSizes) ? availableSizes[0] : availableSizes);
      
      return [...prev, { ...product, selectedSize: sizeToAdd, cartItemId: `${product.id}-${sizeToAdd}`, quantity: 1 }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + amount;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => (item.cartItemId || item.id) !== id));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      if (prev.find(item => item.id === product.id)) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  };
  
  const placeOrder = async (address, paymentId = "COD") => {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const total = subtotal + (subtotal > 0 ? 99 : 0);
    
    const newOrder = {
      id: "ORD-" + Math.floor(Math.random() * 1000000),
      total,
      status: paymentId === "COD" ? "Processing" : "Paid",
      address,
      user_id: user ? user.id : null,
      payment_id: paymentId
    };
    
    // Optimistic UI update
    const fullLocalOrder = { ...newOrder, items: [...cart], date: new Date().toISOString() };
    setOrders(prev => [fullLocalOrder, ...prev]);
    const cartCopy = [...cart];
    clearCart();

    // Async backend writes
    try {
      const { error: orderError } = await supabase.from('orders').insert([newOrder]);
      if (orderError) throw orderError;

      const orderItemsToInsert = cartCopy.map(item => ({
        order_id: newOrder.id,
        product_id: item.id,
        selected_size: item.selectedSize,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItemsToInsert);
      if (itemsError) throw itemsError;

    } catch (err) {
      console.error("Failed to sync order to backend:", err);
      // In a real app we would revert the optimistic update here or show an error
    }

    return newOrder.id;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <ShopContext.Provider value={{ user, cart, wishlist, orders, addToCart, updateQuantity, removeFromCart, toggleWishlist, placeOrder, logout }}>
      {children}
    </ShopContext.Provider>
  );
}
