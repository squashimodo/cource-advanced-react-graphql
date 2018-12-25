import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import formatCurrency from '../lib/formatMoney';
import DeleteItem from './DeleteItem';
import AddToCart from './AddToCart';
import PriceTag from './styles/PriceTag';
import Title from './styles/Title';

const StyledItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 450px;

  box-shadow: 1px 5px 12px 2px #0000000d;
  border-radius: 10px;

  font-family: RadnikaNext;

  .item__title {
    position: absolute;
    top: 190px;
    align-self: center;
    background: ${({ theme }) => theme.orangeGradient};
    color: white;
    font-family: RadnikaNext;
    padding: 5px 10px;
    margin-bottom: 30px;
    margin-top: -11px;
    transform: rotate(${() => Math.random() * 10 - 5}deg);
  }

  .item__description {
    text-align: center;
  }

  .item__actions {
    justify-self: flex-end;
    display: flex;
    border-top: 1px solid #e6e6e6;
    > * {
      display: flex;
      justify-content: center;
      flex-grow: 1;
      border-right: 1px solid #e6e6e6;
      &:last-child {
        border-right: none;
      }
    }
  }

  .item__image {
    object-fit: cover;
    height: 200px;
  }
`;

const Item = props => {
  const { item } = props;
  const { id, title, description, price, image } = item;
  return (
    <StyledItem {...item} className="item">
      <img className="item__image" src={image} alt={title} />
      <Title>
        <Link
          href={{
            pathname: '/item',
            query: {
              id,
            },
          }}
        >
          <a>{title}</a>
        </Link>
      </Title>
      <div className="item__description">{description}</div>
      <PriceTag>{formatCurrency(price)}</PriceTag>
      <div className="item__actions">
        <Link
          href={{
            pathname: 'update',
            query: {
              id,
            },
          }}
        >
          <a>Edit ✏️</a>
        </Link>
        <AddToCart item={item}>
          {({ addToCart }) => (
            <button type="button" onClick={addToCart}>
              Add to&nbsp;
              <span role="img" aria-label="Shoppingcart">
                🛒
              </span>
            </button>
          )}
        </AddToCart>

        <Link href="/">
          <a onClick={() => {}}>Add to ❤️</a>
        </Link>
        <DeleteItem id={id}>Remove ☠️</DeleteItem>
      </div>
    </StyledItem>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default Item;
