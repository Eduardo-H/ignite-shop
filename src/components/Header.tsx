import { useContext } from 'react';
import Image from 'next/image';
import { Handbag } from 'phosphor-react';

import { CartContext } from '@/contexts/CartContext';
import { CartButton, Container } from '@/styles/components/header';

import logoImg from '../assets/logo.svg';

export function Header() {
  const { cartItems } = useContext(CartContext);

  return (
    <Container>
      <Image src={logoImg} alt="Logo Ignite Shop" />

      <CartButton style={cartItems.length > 0 ? 'full' : 'empty'}>
        <Handbag size={20} weight="bold" />
        <span>{cartItems.length}</span>
      </CartButton>
    </Container>
  )
}