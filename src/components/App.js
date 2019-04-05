import React, { Component } from 'react';
import _ from 'lodash';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleData from '../sample-fishes';

class App extends Component {
    state = {
        inventory: [],
        order: {}
    };

    addToInventory = (fish) => {
        const inventory = [ ...this.state.inventory ];
        inventory.push(fish);

        this.setState({ inventory });
    };

    loadSampleInventory = () => {
        const items = _.toArray(sampleData);

        this.setState({ inventory: items });
    };

    render() {
        return (
          <div className="catch-of-the-day">
            <div className="menu">
              <Header tagline="Fresh Seafood Market" />
            </div>
            <Order />
            <Inventory
              addToInventory={this.addToInventory}
              loadSampleInventory={this.loadSampleInventory}
            />
          </div>
        );
    }
}

export default App;