import React from 'react';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import RemoveFromCart from './RemoveFromCart';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;
const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.lightgrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 15px;
  }

  h3,
  p {
    margin: 0;
  }
`;
const CartItem = ({
  cartItem: {
    id,
    quantity,
    item: { title, description, price, image },
  },
}) => (
  <CartItemStyles>
    <img src={image} width={100} alt={title} />
    <div className="cart-item-details">
      <h3>{title}</h3>
      <p>
        {formatMoney(quantity * price)} -{' '}
        <em>
          {quantity} &times; {formatMoney(price)} each
        </em>
      </p>
    </div>
    <RemoveFromCart id={id}>
      {removeFromCart => (
        <BigButton onClick={removeFromCart}>&times;</BigButton>
        )}
    </RemoveFromCart>
  </CartItemStyles>
  );

export default CartItem;
