import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';

type CartItem = {
  productId: string;
  quantity: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  defaultPriceId: string;
}

interface CartContextData {
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (item: CartItem) => void;
  checkoutItemsCount: number;
  checkoutTotalPrice: number;
  isCartCheckoutOpen: boolean;
  openCartCheckout: () => void;
  closeCartCheckout: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutItemsCount, setCheckoutItemsCount] = useState(0);
  const [checkoutTotalPrice, setCheckoutTotalPrice] = useState(0);
  const [isCartCheckoutOpen, setCartCheckoutOpen] = useState(false);

  const calculateCheckoutValues = useCallback((items: CartItem[]) => {
    setCheckoutItemsCount(items.reduce((acc, item) => acc + item.quantity, 0));
    setCheckoutTotalPrice(items.reduce((acc, item) => acc + item.price, 0));
  }, []);

  const getCartItems = useCallback(() => {
    const cart = localStorage.getItem('ignite_shop:cart');

    if (cart) {
      const parsedCart = JSON.parse(cart);

      setCartItems(parsedCart);
      calculateCheckoutValues(parsedCart)
    }   
  }, [calculateCheckoutValues]);

  function addItemToCart(item: CartItem) {
    setCartItems(state => {
      const cartItemIndex = state.findIndex(cartItem => cartItem.productId === item.productId);

      if (cartItemIndex === -1) {
        const updatedState = [...state, item];

        calculateCheckoutValues(updatedState);
        localStorage.setItem('ignite_shop:cart', JSON.stringify(updatedState));

        return updatedState;
      } else {
        state[cartItemIndex].price += item.price;
        state[cartItemIndex].quantity += item.quantity;
      }

      calculateCheckoutValues(state);
      localStorage.setItem('ignite_shop:cart', JSON.stringify([...state]));

      return state;
    });
  }

  function removeItemFromCart(item: CartItem) {
    setCartItems(state => {
      const cartItemIndex = state.findIndex(cartItem => cartItem.productId === item.productId);

      if (cartItemIndex !== -1) {
        state.splice(cartItemIndex, 1);
        calculateCheckoutValues(state);
        localStorage.setItem('ignite_shop:cart', JSON.stringify([...state]));
      }

      return state;
    });
  }

  // function getCartItems() {
  //   const cart = localStorage.getItem('ignite_shop:cart');

  //   if (cart) {
  //     setCartItems(JSON.parse(cart));

  //     calculateCheckoutValues(cartItems)
  //   }    
  // }

  function openCartCheckout() {
    setCartCheckoutOpen(true);
  }

  function closeCartCheckout() {
    setCartCheckoutOpen(false);
  }

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);
  
  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addItemToCart, 
      removeItemFromCart,
      checkoutItemsCount,
      checkoutTotalPrice,
      isCartCheckoutOpen,
      openCartCheckout,
      closeCartCheckout
    }}>
      { children }
    </CartContext.Provider>
  );
}