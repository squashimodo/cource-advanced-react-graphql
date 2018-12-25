import React, { Component } from 'react';
import CreateItem from '../components/CreateItem';
import PromptSignin from '../components/PromptSignin';

class Sell extends Component {
  render() {
    return (
      <div>
        <PromptSignin>
          {() => (
            <div>
              <h2>Sell</h2>
              <CreateItem />
            </div>
          )}
        </PromptSignin>
      </div>
    );
  }
}

export default Sell;
