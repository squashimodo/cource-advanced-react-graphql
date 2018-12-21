import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import Input from './Input';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(name: $name, email: $email, password: $password) {
      id
    }
  }
`;

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  changeProp = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { error, loading }) => (
          <Form
            method="POST"
            onSubmit={async e => {
              e.preventDefault();
              await signup();
              this.setState({
                name: '',
                email: '',
                password: '',
              });
            }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Signup!</h2>
              <Error error={error} />
              <Input
                title="Name"
                propName="name"
                placeholder="Name"
                value={name}
                onChange={this.changeProp}
              />
              <Input
                title="Email"
                propName="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={this.changeProp}
              />
              <Input
                title="Password"
                propName="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={this.changeProp}
              />
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default Signup;
