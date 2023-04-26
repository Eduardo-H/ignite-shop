import { styled } from '..';

export const Container = styled('div', {
  width: '35rem',
  height: '100vh',
  transition: 'transform 0.4s',

  variants: {
    style: {
      visible: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        padding: '3rem',

        position: 'fixed',
        top: 0,
        right: 0,
        backgroundColor: '$gray800',
        zIndex: 100
      },
      notVisible: {
        display: 'none'
      }
    }
  }
});

export const Header = styled('header', {
  display: 'flex',
  justifyContent: 'flex-end'
});

export const CloseButton = styled('button', {
  border: 0,
  backgroundColor: 'transparent',
  borderRadius: 8,
  color: '$gray300',
  cursor: 'pointer',
  transition: 'filter 0.2s',

  '&:hover': {
    filter: 'brightness(0.8)'
  }
});

export const EmptyCartText = styled('p', {
  display: 'block',
  textAlign: 'center',
  color: '$gray300'
});

export const ItemsList = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  flex: 1
});

export const ItemContainer = styled('li', {
  display: 'flex',
  gap: '1.5rem'
});

export const ItemImage = styled('div', {
  width: '100px',
  height: '100px',
  background: 'linear-gradient(180deg, #FEFEFF 0%, #7465D4 100%)',
  borderRadius: 8
});

export const ItemInfo = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  'span': {
    fontSize: '1.25rem',
    color: '$gray100',
    marginBottom: '0.5rem'
  },

  'strong': {
    fontSize: '1.25rem',
    color: '$white',
  },

  'button': {
    marginTop: 'auto',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '$green500',
    border: 0,
    background: 'transparent',
    cursor: 'pointer',
    transition: 'color 0.2s',

    '&:hover': {
      color: '$green300'
    }
  }
});

export const Footer = styled('footer', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  'div > div': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    color: '$white',

    marginTop: '0.5rem',
  },
  
  'div:first-child': {
    'span:first-child': {
      fontSize: '1rem'
    },

    'span:last-child': {
      fontSize: '1.125rem'
    }
  },

  'div:last-child': {
    fontWeight: 'bold',

    'span:first-child': {
      fontSize: '1.125rem'
    },

    'span:last-child': {
      fontSize: '1.5rem'
    }
  },

  'button': {
    marginTop: '4.5rem',
    padding: '1.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '$white',
    border: 0,
    borderRadius: 8,
    background: '$green500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',

    '&:hover': {
      background: '$green300'
    },

    '&:disabled': {
      cursor: 'not-allowed'
    }
  }
});