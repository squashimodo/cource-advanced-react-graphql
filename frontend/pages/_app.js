import App, { Container } from 'next/app';
import React from 'react';
import Page from '../components/Page';
class MyApp extends App {
  render() {
    const { Component } = this.props;
    return (
      <Container>
        <style jsx global>{`
          body { 
            padding: 0 0;
            margin: 0;
          }
        `}</style>
        <Page>
          <Component />
        </Page>
      </Container>
    );
  }
}

export default MyApp;