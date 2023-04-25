import { createContext, ReactNode, useEffect, useState } from 'react';

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
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function addItemToCart(item: CartItem) {
    setCartItems(state => {
      const cartItemIndex = state.findIndex(cartItem => cartItem.productId === item.productId);

      if (cartItemIndex === -1) {
        localStorage.setItem('ignite_shop:cart', JSON.stringify([...state, item]));
        return [...state, item];
      } else {
        state[cartItemIndex].price += item.price;
        state[cartItemIndex].quantity += item.quantity;
      }

      localStorage.setItem('ignite_shop:cart', JSON.stringify([...state]));

      return state;
    });
  }

  function removeItemFromCart(item: CartItem) {
    setCartItems(state => {
      const cartItemIndex = state.findIndex(cartItem => cartItem.productId === item.productId);

      if (cartItemIndex !== -1) {
        if (item.quantity === state[cartItemIndex].quantity) {
          state.splice(cartItemIndex, 1);
        } else {
          state[cartItemIndex].price -= item.price;
          state[cartItemIndex].quantity -= item.quantity;
        }
      }

      localStorage.setItem('ignite_shop:cart', JSON.stringify([...state]));

      return state;
    });
  }

  function getCartItems() {
    const cart = localStorage.getItem('ignite_shop:cart');

    if (cart) {
      setCartItems(JSON.parse(cart));
    }    
  }

  useEffect(() => {
    getCartItems();
  }, []);
  
  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart }}>
      { children }
    </CartContext.Provider>
  );
}