import { useContext, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Stripe from 'stripe';

import { stripe } from '@/lib/stripe';
import { CartContext } from '@/contexts/CartContext';

import logoImg from '../assets/logo.svg';

import { Header, ImageContainer, ImagesList, SuccessContainer } from '@/styles/pages/success';

interface Product extends Stripe.Product {
  id: string;
  imageUrl: string;
  quantity: number;
}

interface SuccessProps {
  customerName: string;
  products: Product[];
}

export default function Success({ customerName, products }: SuccessProps) {
  const { clearCart } = useContext(CartContext);

  const totalItemsCount = products.reduce((acc, product) => acc + product.quantity, 0);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <>
      <Head>
        <title>Ignite Shop | Success</title>

        <meta name="robots" content="noindex" />
      </Head>

      <Header>
        <Link href="/">
          <Image src={logoImg} alt="Logo Ignite Shop" />
        </Link>
      </Header>

      <SuccessContainer>
        <h1>Purchase complete</h1>

        <ImagesList>
          {products.map(product => (
            <ImageContainer key={product.id}>
              <Image src={product.imageUrl} width={100} height={90} alt="" />
            </ImageContainer>
          ))}
        </ImagesList>

        <p>
          Thanks <strong>{ customerName }</strong>, your purchase <br /> 
          of <strong>{ totalItemsCount } {totalItemsCount > 1 ? 't-shirts' : 't-shirt'}</strong> will be posted as soon as possible.
        </p>

        <Link href="/">
          Go back to catalog
        </Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id);  

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  const customerName = session.customer_details?.name;
  const products = session.line_items?.data.map(lineItem => {
    const product = lineItem.price?.product as Stripe.Product;

    return {
      id: lineItem.id,
      imageUrl: product.images[0],
      quantity: lineItem.quantity
    } as Product;
  });

  return {
    props: {
      customerName,
      products: products
    }
  }
}