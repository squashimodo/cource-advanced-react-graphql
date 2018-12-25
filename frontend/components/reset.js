import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import Input from './Input';
import { CURRENT_USER_QUERY } from './User';

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $password: String!
    $confirmPassword: String!
    $resetToken: String!
  ) {
    resetPassword(
      password: $password
      confirmPassword: $confirmPassword
      resetToken: $resetToken
    ) {
      id
      email
      name
    }
  }
`;

class Reset extends Component {
  state = {
    password: '',
    passwordConfirm: '',
    done: false,
  };

  changeProp = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { resetToken, onReset } = this.props;
    const { done } = this.state;
    return (
      <Mutation
        mutation={RESET_PASSWORD_MUTATION}
        variables={{
          ...this.state,
          resetToken,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(resetPassword, { error, loading }) => (
          <Form
            method="POST"
            onSubmit={async e => {
              e.preventDefault();
              await resetPassword();
              this.setState({
                password: '',
                confirmPassword: '',
              });

              onReset();
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Reset password</h2>
              <Error error={error} />
              <Input
                disabled={done}
                id="resetpw"
                title="Password"
                propName="password"
                placeholder="Password"
                type="password"
                onChange={this.changeProp}
              />
              <Input
                disabled={done}
                id="resetpwconfirm"
                title="Confirm Password"
                propName="confirmPassword"
                placeholder="Repeat password"
                type="password"
                onChange={this.changeProp}
              />
              <input disabled={done} type="submit" value="Reset password" />
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Reset;
