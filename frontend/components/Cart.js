import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';
import { CURRENT_USER_QUERY } from './User';
import CartItem from './CartItem';
import calcTotalPrice from '../lib/calcTotalPrice';
import formatMoney from '../lib/formatMoney';

export const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

export const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;
const Cart = ({ cart, userName, open, toggleCart, ...props }) => {
  if (!cart || !userName) return <></>;
  return (
    <CartStyles open={open}>
      <header>
        <CloseButton onClick={toggleCart} title="close">
          &times;
        </CloseButton>
        <Supreme>{userName}'s cart</Supreme>
        <p>You have {cart.length} items in your cart.</p>
      </header>
      <ul>
        {cart.map(cartItem => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(cart))}</p>
      </footer>
    </CartStyles>
  );
};

Cart.propTypes = {
  open: PropTypes.bool,
  toggleCart: PropTypes.func,
  userName: PropTypes.string.isRequired,
};

Cart.defaultProps = {
  open: true,
  toggleCart() {},
};

export default compose(
  graphql(LOCAL_STATE_QUERY, {
    props: ({ data: { error, cartOpen } }) => ({
      error,
      open: cartOpen,
    }),
  }),
  graphql(TOGGLE_CART_MUTATION, {
    name: 'toggleCart',
  }),
  graphql(CURRENT_USER_QUERY, {
    props: ({ data }) => ({
      userName: data.me ? data.me.name : '',
      cart: data.me ? data.me.cart : [],
    }),
  })
)(Cart);
