import React from 'react';
import PropTypes from 'prop-types';
import PromptSignin from '../components/PromptSignin';
import Order from '../components/Order';

const OrderPage = ({ query }) => {
  return (
    <PromptSignin>
      <h2>Order {query.id}</h2>
      <Order id={query.id} />
    </PromptSignin>
  );
};

export default OrderPage;
