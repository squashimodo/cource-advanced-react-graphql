import { graphql } from 'react-apollo';
import React from 'react';
import { CURRENT_USER_QUERY } from './User';
import Signin from './Signin';

const PromptSignin = ({ children, data: { me }, loading }) => {
  if (loading) return <p>Loading..</p>;
  if (!me) {
    return (
      <>
        <p>You have to be logged in to access this page</p>
        <Signin />
      </>
    );
  }
  return children();
};

export default graphql(CURRENT_USER_QUERY)(PromptSignin);
