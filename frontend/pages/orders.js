import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PromptSignin from '../components/PromptSignin';
import Orders from '../components/Orders';

class OrdersPage extends PureComponent {
  render() {
    return (
      <PromptSignin>
        {() => (
          <div>
            <h2>Orders</h2>
            <Orders />
          </div>
        )}
      </PromptSignin>
    );
  }
}

OrdersPage.propTypes = {};

export default OrdersPage;
