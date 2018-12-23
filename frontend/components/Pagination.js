import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import Head from 'next/head';
import PropTypes from 'prop-types';
import PaginationStyles from './styles/PaginationStyles';

const ITEMS_CONNECTION_QUERY = gql`
  query ITEMS_CONNECTION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;
const Pagination = ({ page }) => (
  <Query query={ITEMS_CONNECTION_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading..</p>;
      if (error) return <p>Error..</p>;
      const totalCount = data.itemsConnection.aggregate.count;
      const pages = Math.ceil(totalCount / 8);

      return (
        <PaginationStyles>
          <Head>
            <title>
              Buy stuff - Page {page} of {pages}
            </title>
          </Head>
          <Link
            prefetch
            href={{
              path: '/items',
              query: {
                page: page - 1,
              },
            }}
          >
            <a className="prev" aria-disabled={page <= 1}>
              Previous page
            </a>
          </Link>
          <p>
            Page {page} of {pages}
          </p>
          <Link
            prefetch
            href={{
              path: '/items',
              query: {
                page: page + 1,
              },
            }}
          >
            <a className="next" aria-disabled={page === pages}>
              Next page
            </a>
          </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);

Pagination.propTypes = {
  page: PropTypes.number,
};

Pagination.defaultProps = {
  page: 1,
};

export default Pagination;
