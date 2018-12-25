import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PromptSignin from '../components/PromptSignin';
import Orders from '../components/Orders';

class OrderPage extends PureComponent {
  render() {
    return (
      <div>
        <PromptSignin>
          <h2>Orders</h2>
          <Orders />
        </PromptSignin>
      </div>
    );
  }
}

OrderPage.propTypes = {};

export default OrderPage;
