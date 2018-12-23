import PropTypes from 'prop-types';

/* eslint-disable  import/prefer-default-export */
export const ItemPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
});
