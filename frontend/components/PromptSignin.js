import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import Signin from './Signin';
import React from 'react';

const PromptSignin = props => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({data: {me}, loading}) => {
        if (loading) return <p>Loading..</p>
        if (!me) {
          return <>
            <p>You have to be logged in to access this page</p>
            <Signin />
          </>
        } else {
          return props.children;
        }
      }}
    </Query>
  );
};

export default PromptSignin;