import App, { Container } from 'next/app';
import React from 'react';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Expose query to user
    pageProps.query = ctx.query;
    return {
      pageProps,
    };
  }
  render() {
    const { Component, apollo, pageProps } = this.props;
    return (
      <Container>
        <style jsx global>{`
          body {
            padding: 0 0;
            margin: 0;
          }
        `}</style>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
