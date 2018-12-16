import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION{
    signout
  }
`;

const Logout = props => {
  return (
    <div>
      <Mutation mutation={SIGNOUT_MUTATION}>
        {(signout) => {
          return props.children({...props, signout: signout});
        }}
      </Mutation>
    </div>
  );
};

export default Logout;