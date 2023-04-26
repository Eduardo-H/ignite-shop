import { useContext } from 'react';
import Image from 'next/image';
import { Handbag } from 'phosphor-react';

import { CartContext } from '@/contexts/CartContext';
import { CartButton, Container } from '@/styles/components/header';

import logoImg from '../assets/logo.svg';
import Link from 'next/link';

export function Header() {
  const { cartItems, openCartCheckout } = useContext(CartContext);

  return (
    <Container>
      <Link href="/">
        <Image src={logoImg} alt="Logo Ignite Shop" />
      </Link>

      <CartButton style={cartItems.length > 0 ? 'full' : 'empty'} onClick={openCartCheckout}>
        <Handbag size={20} weight="bold" />
        <span>{cartItems.length}</span>
      </CartButton>
    </Container>
  )
}