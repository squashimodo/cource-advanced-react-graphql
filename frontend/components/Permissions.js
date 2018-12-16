import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ErrorMessage from './ErrorMessage';
import Table from './styles/Table';
import SickButton from './styles/SickButton';
import PropTypes from 'prop-types';

const ALL_PERMISSIONS = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE',
];

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = () => {
  return (
    <Query query={ALL_USERS_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading</p>;

        return (
          console.log(data.users) || (
            <div>
              <ErrorMessage error={error} />
              <div>
                <h2>Handle permissions</h2>
                <Table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      {ALL_PERMISSIONS.map(p => (
                        <th key={p}>{p}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.users.map(user => (
                      <User key={user.id} user={user} />
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          )
        );
      }}
    </Query>
  );
};

const UPDATE_PERSMISSIONS_MUTATION = gql`
  mutation UPDATE_PERSMISSIONS_MUTATION(
    $permissions: [Permission]
    $userId: ID!
  ) {
    updatePermissions(userId: $userId, permissions: $permissions) {
      name
      id
      permissions
      email
    }
  }
`;

class User extends Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      permissions: PropTypes.array,
      id: PropTypes.string,
    }).isRequired,
  };

  state = {
    permissions: this.props.user.permissions,
  };

  togglePermission(e) {
    const checkbox = e.target;
    const updatedPermissions = checkbox.checked
      ? [...this.state.permissions, checkbox.name]
      : [...this.state.permissions].filter(p => p !== checkbox.name);

    this.setState({
      permissions: updatedPermissions,
      isDirty: true,
    });
  }

  render() {
    const { user } = this.props;
    return (
      <Mutation
        mutation={UPDATE_PERSMISSIONS_MUTATION}
        variables={{
          userId: user.id,
          permissions: this.state.permissions,
        }}
        refetchQueries={[{ query: ALL_USERS_QUERY }]}>
        {(updatePermissions, { loading, error, called }) => {
          /**
           * TODO: Add popups when error
           */

          return (
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {ALL_PERMISSIONS.map(permission => (
                <td key={permission}>
                  <label htmlFor={`${user.id}-permission-${permission}`}>
                    <input
                      id={`${user.id}-permission-${permission}`}
                      type="checkbox"
                      name={permission}
                      checked={this.state.permissions.includes(permission)}
                      onChange={this.togglePermission.bind(this)}
                    />
                  </label>
                </td>
              ))}
              <td>
                <SickButton
                  onClick={async () => {
                    await updatePermissions();
                    this.setState({
                      isDirty: false,
                    });
                  }}
                  disabled={loading || !this.state.isDirty}>
                  Updat{loading ? 'ing' : 'e'}
                </SickButton>
              </td>
            </tr>
          );
        }}
      </Mutation>
    );
  }
}

export default Permissions;
