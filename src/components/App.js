import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';


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

    render() {
        return (
          <div className="catch-of-the-day">
            <div className="menu">
              <Header tagline="Fresh Seafood Market" />
            </div>
            <Order />
            <Inventory addToInventory={this.addToInventory} />
          </div>
        );
    }
}

export default App;