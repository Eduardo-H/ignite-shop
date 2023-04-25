import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useContext, useState } from 'react';
import Head from 'next/head';
import { CartContext } from '@/contexts/CartContext';

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    formatedPrice: string;
    defaultPriceId: string;
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  const { addItemToCart } = useContext(CartContext);

  async function handleByProduct() {
    addItemToCart({
      productId: product.id,
      description: product.description,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: 1,
      defaultPriceId: product.defaultPriceId
    });

    window.location.href = '/';

    // try {
    //   setIsCreatingCheckoutSession(true);

    //   const response = await axios.post('/api/checkout', {
    //     priceId: product.defaultPriceId
    //   });

    //   const { checkoutUrl } = response.data;

    //   window.location.href = checkoutUrl;
    // } catch (error) {
    //   setIsCreatingCheckoutSession(false);

    //   alert('Error trying to redirect to checkout');
    // }
  }

  if (isFallback) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>Ignite Shop | {product.name}</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={420} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.formatedPrice}</span>

          <p>{product.description}</p>

          <button onClick={handleByProduct} disabled={isCreatingCheckoutSession}>
            Buy now
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: '' } }
    ],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  // Telling TypeScript that the parameter 'params' is not undefined
  // by using the '!' sign
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.images[0],
        price: price.unit_amount && price.unit_amount / 100,
        formatedPrice: price.unit_amount && new Intl.NumberFormat('us', {
          style: 'currency',
          currency: 'USD'
        }).format(price.unit_amount / 100),
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }
}