import React from 'react';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import styled from 'styled-components';
import User from '../components/User';
const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;
const SignupPage = props => {
  return (
    <Columns>
      <User>
        {({data: {me}}) => (
          !me ? <React.Fragment><Signup /><Signin /></React.Fragment> : null 
        )}
      </User>
    </Columns>
  );
};

export default SignupPage;