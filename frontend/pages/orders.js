import React from 'react';
import PromptSignin from '../components/PromptSignin';
import Orders from '../components/Orders';

const OrdersPage = () => (
  <PromptSignin>
    {() => (
      <div>
        <h2>Orders</h2>
        <Orders />
      </div>
    )}
  </PromptSignin>
);

export default OrdersPage;
