import React from 'react';
import NextLink from 'next/link';
import { withRouter } from 'next/router';
import { Children } from 'react';
const Link = ({ router, children, ...props}) => {
  return (
    <NextLink {...props}>
      {
        React.cloneElement(Children.only(children), {
          className: router.pathname === props.href ? 'active' : null
        })
      }
    </NextLink>
  );
};

export default withRouter(Link);