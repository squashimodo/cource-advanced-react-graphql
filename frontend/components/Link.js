import React, { Children } from 'react';
import NextLink from 'next/link';
import { withRouter } from 'next/router';

const Link = ({ router, children, ...props }) => (
  <NextLink {...props}>
    {React.cloneElement(Children.only(children), {
      className: router.pathname === props.href ? 'active' : null,
    })}
  </NextLink>
);

export default withRouter(Link);
