import { styled } from '..';

export const Container = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto'
});

export const CartButton = styled('button', {
  border: 0,
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: 8,
  backgroundColor: '$gray800',
  
  variants: {
    style: {
      empty: {
        color: '$gray300',
        'span': {
          display: 'none'
        }
      },
      full: {
        color: '$gray100',
        'span': {
          position: 'absolute',
          display: 'flex',
          color: '$gray100',
          fontSize: '12px',
          fontWeight: 'bold',
          alignItems: 'center',
          justifyContent: 'center',
          width: '1.25rem',
          height: '1.25rem',
          backgroundColor: '$green500',
          border: '2px solid $gray900',
          borderRadius: '50%',
          top: '-5px',
          right: '-5px'
        }
      }
    }
  }
});