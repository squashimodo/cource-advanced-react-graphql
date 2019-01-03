import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import styled from 'styled-components';
import { formatDistance } from 'date-fns';
import OrderItemStyles from './styles/OrderItemStyles';
import PromptSignin from './PromptSignin';
import Error from './ErrorMessage';
import formatMoney from '../lib/formatMoney';

const ORDERS_QUERY = gql`
  query ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        quantity
        title
        price
        description
        image
      }
    }
  }
`;

const OrdersListStyled = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-column: repeat(auto-fit, minmax(40%, 1fr));
`;

const Orders = ({ data: { loading, error, orders } }) => (
  <PromptSignin>
    {() => {
      if (error) return <Error error={error} />;
      if (loading) return <p>Loading..</p>;

      return (
        <OrdersListStyled>
          {orders.map(order => (
            <OrderItemStyles key={order.id}>
              <Link
                href={{
                  pathname: '/order',
                  query: {
                    id: order.id,
                  },
                }}
              >
                <a>
                  <div className="order-meta">
                    <p>
                      {order.items.reduce((a, b) => a + b.quantity, 0)} items
                    </p>
                    <p>{order.items.length} products</p>
                    <p>{formatDistance(order.createdAt, new Date())} ago</p>
                    <p>{formatMoney(order.total)} total</p>
                  </div>
                  <div className="images">
                    {order.items.map(item => (
                      <img src={item.image} alt={item.title} />
                    ))}
                  </div>
                </a>
              </Link>
            </OrderItemStyles>
          ))}
        </OrdersListStyled>
      );
    }}
  </PromptSignin>
);

Orders.propTypes = {};

export default graphql(ORDERS_QUERY)(Orders);
