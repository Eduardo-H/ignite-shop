import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

import { ImageContainer, ProductContainer, ProductDetails } from '@/styles/pages/product';
import { useRouter } from 'next/router';

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: string;
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Loading...</p>
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={420} height={480} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button>
          Buy now
        </button>
      </ProductDetails>
    </ProductContainer>
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
  const productId = params.id;

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
        price: price.unit_amount && new Intl.NumberFormat('us', {
          style: 'currency',
          currency: 'USD'
        }).format(price.unit_amount / 100)
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }
}