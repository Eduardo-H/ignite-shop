import { styled } from '@/styles';

export const Button = styled('button', {
  backgroundColor: '$rocketseat',
  border: 0,
  borderRadius: 6,
  padding: '10px 20px',
  cursor: 'pointer',
  transition: 'filter 0.2s',

  span: {
    color: 'White',
    fontWeight: 'bold'
  },

  '&:hover': {
    filter: 'brightness(0.9)'
  }
});

export default function Home() {
  return (
    <>
      <h1>Hello Next.js</h1>
      <Button>
        <span>Send e-mail</span>
      </Button>
    </>
  );
}
