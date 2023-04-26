import { styled } from '..';

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100'
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4
  },

  a: {
    marginTop: '5rem',
    display: 'block',
    textDecoration: 'none',
    fontSize: '$lg',
    fontWeight: 'bold',
    color: '$green500',

    '&:hover': {
      color: '$green300'
    }
  }
});

export const Header = styled('header', {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto'
});

export const ImagesList = styled('div', {
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '3rem'
})

export const ImageContainer = styled('div', {
  width: 130,
  maxWidth: 130,
  height: 130,
  background: 'linear-gradient(180deg, #FEFEFF 0%, #7465D4 100%)',
  borderRadius: '50%',
  padding: '0.25rem',
  marginTop: '4rem',
  boxShadow: '0px 0px 60px 0px rgba(0, 0, 0, 0.80)',
  marginLeft: '-3rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  }
});