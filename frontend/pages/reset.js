import React from 'react';
import { withRouter } from 'next/router';
import Reset from '../components/reset';

const ResetPage = ({ router, query, ...props }) => {
  const onReset = () => router.push('/');

  if (!query.resetToken) {
    router.replace('/');
  }

  return (
    <div>
      <p>Reset your password {query.resetToken}</p>
      <Reset onReset={onReset} resetToken={query.resetToken} />
    </div>
  );
};

export default withRouter(ResetPage);
