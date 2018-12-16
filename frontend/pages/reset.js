import React, { Component } from 'react';
import Reset from '../components/reset';
import { withRouter } from 'next/router';

class ResetPage extends Component {
  onReset = () => {
    this.props.router.push('/');
  };
  render() {
    const { router, ...props } = this.props;
    if (!props.query.resetToken) {
      router.replace('/');
    }
    return (
      <div>
        <p>Reset your password {props.query.resetToken}</p>
        <Reset onReset={this.onReset} resetToken={props.query.resetToken} />
      </div>
    );
  }
}

export default withRouter(ResetPage);
