import React from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';
import { graphql } from 'react-apollo';
import NProgress from 'nprogress';
import gql from 'graphql-tag';
import { withRouter } from 'next/router';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}
class TakeMyMoney extends React.Component {
  onToken = async ({ id }) => {
    const { createOrder, router } = this.props;
    NProgress.start();
    const order = await createOrder({
      variables: {
        token: id,
      },
    }).catch(err => {
      alert(err);
    });

    router.push({
      pathname: '/order',
      query: {
        id: order.data.createOrder.id,
      },
    });
  };

  render() {
    console.log(this.props);
    const { children } = this.props;
    return (
      <User>
        {({ data: { me } }) => (
          <StripeCheckout
            name="Webshop"
            description={`Order of ${totalItems(me.cart)}`}
            image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
            token={this.onToken}
            currency="USD"
            email={me.email}
            stripeKey="pk_test_vCk15eQK7TKKeivIMJirzUrF"
            amount={calcTotalPrice(me.cart)}
          >
            {children()}
          </StripeCheckout>
        )}
      </User>
    );
  }
}

const withMutation = graphql(CREATE_ORDER_MUTATION, {
  name: 'createOrder',
  options: props =>
    console.log(props) || {
      refetchQueries: [
        {
          query: CURRENT_USER_QUERY,
        },
      ],
    },
});
export default withRouter(withMutation(TakeMyMoney));
