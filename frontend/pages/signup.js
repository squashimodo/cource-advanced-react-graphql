import React from 'react';
import styled from 'styled-components';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import RequestReset from '../components/RequestReset';
import User from '../components/User';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;
const SignupPage = props => (
  <Columns>
    <User>
      {({ data: { me } }) =>
          !me ? (
            <React.Fragment>
              <Signup />
              <Signin />
              <RequestReset />
            </React.Fragment>
          ) : null
        }
    </User>
  </Columns>
  );

export default SignupPage;
