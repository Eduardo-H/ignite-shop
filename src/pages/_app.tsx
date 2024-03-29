import type { AppProps } from 'next/app';

import { CartProvider } from '@/contexts/CartContext';
import { globalStyles } from '@/styles/global';
import { Container } from '@/styles/pages/app';
import { Header } from '@/components/Header';
import { CartCheckout } from '@/components/CartCheckout';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Container>
        
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  );
}
