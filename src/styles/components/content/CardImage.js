import Placeholder from 'assets/images/image-placeholder.png';

const height = 360;

export default {
  cardImage: {
    height,
  },
  placeholder: {
    background: {
      image: `url(${Placeholder})`,
      repeat: 'no-repeat',
      size: 'contain',
    },
    display: 'block',
    height,
  },
};
