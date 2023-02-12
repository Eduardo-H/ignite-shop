import { useRouter } from 'next/router';

export default function Product() {
  const { query } = useRouter();

  return (
    <h1>Product ID: {query.id}</h1>
  );
}