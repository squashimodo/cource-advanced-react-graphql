import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Head from 'next/head';
import format from 'date-fns/format';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      items {
        id
        title
        description
        price
        quantity
        image
      }
      total
      user {
        id
      }
      createdAt
      updatedAt
      charge
    }
  }
`;

const Order = ({ data: { order, loading, error } }) => {
  if (error) return <Error error={error} />;
  if (loading) return <p>Loading...</p>;
  return (
    <OrderStyles>
      <Head>
        <title>Things - Order {order.id}</title>
      </Head>
      <p>
        <span>Order ID: </span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Charge: </span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Date: </span>
        <span>{format(order.createdAt, 'MMMM D, YYYY, h:mm A')}</span>
      </p>
      <p>
        <span>Total: </span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Item Count: </span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map(item => (
          <div className="order-item" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div className="item-details">
              <h2>{item.title}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
};

export default graphql(SINGLE_ORDER_QUERY, {
  options: ({ id }) => ({
    variables: {
      id,
    },
  }),
})(Order);
