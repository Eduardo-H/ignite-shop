import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'phosphor-react';

import { CartContext } from '@/contexts/CartContext';
import { 
  CloseButton, 
  Container, 
  EmptyCartText, 
  Footer, 
  Header, 
  ItemContainer, 
  ItemImage, 
  ItemInfo, 
  ItemsList 
} from '@/styles/components/cartCheckout';
import axios from 'axios';

export function CartCheckout() {
  const { 
    cartItems, 
    isCartCheckoutOpen, 
    closeCartCheckout, 
    removeItemFromCart, 
    checkoutItemsCount,
    checkoutTotalPrice
  } = useContext(CartContext);

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  async function handleCheckout() {
    setIsCreatingCheckoutSession(true);

    try {
      const items = cartItems.map(item => {
        return {
          price: item.defaultPriceId,
          quantity: item.quantity
        }
      });

      const response = await axios.post('/api/checkout', {
        items
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      setIsCreatingCheckoutSession(false);
    }
  }

  return (
    <Container style={isCartCheckoutOpen ? 'visible' : 'notVisible'}>
      <Header>
        <CloseButton onClick={closeCartCheckout}>
          <X size={24} />
        </CloseButton>
      </Header>

      <h3>Cart items</h3>

      <ItemsList>
        {cartItems.length > 0 
          ? (
            cartItems.map((item) => (
              <ItemContainer key={item.productId}>
                <ItemImage>
                  <Image src={item.imageUrl} alt={item.name} width={100} height={100} />
                </ItemImage>
    
                <ItemInfo>
                  <span>{item.name}</span>
                  <strong>{
                    new Intl.NumberFormat('us', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(item.price)}
                  </strong>
    
                  <button onClick={() => removeItemFromCart(item)}>
                    Remover
                  </button>
                </ItemInfo>
              </ItemContainer>
            ))
          ) : (
            <EmptyCartText>Your cart is empty</EmptyCartText>
          )
        }
      </ItemsList>

      <Footer>
        <div>
          <div>
            <span>Quantity</span>
            <span>
              {checkoutItemsCount} items
            </span>
          </div>

          <div>
            <span>Total price</span>
            <span>{
              new Intl.NumberFormat('us', {
                style: 'currency',
                currency: 'USD'
              }).format(checkoutTotalPrice)  
            }</span>
          </div>
        </div>

        <button onClick={handleCheckout} disabled={isCreatingCheckoutSession}>
          Checkout
        </button>
      </Footer>
    </Container>
  );
}