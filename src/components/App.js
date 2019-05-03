import React, { Component } from 'react';
import _ from 'lodash';
import uniqueSlug from "unique-slug";
import base from '../base';
import Header from './Header';
import Menu from './Menu';
import Order from './Order';
import Inventory from './Inventory';
import sampleData from '../sample-fishes';

class App extends Component {
    state = {
        inventory: [],
        order: {}
    };

    componentDidMount() {
      const key = this.props.match.params.storeId;
      const localOrderState = localStorage.getItem(key)

      if (localOrderState) {
        this.setState({ order: JSON.parse(localOrderState) })
      }

      this.ref = base.syncState(`${key}/inventory`, {
        context: this,
        state: "inventory"
      });
    }

    componentDidUpdate() {
      const key = this.props.match.params.storeId;
      const value = JSON.stringify(this.state.order);
      localStorage.setItem(key, value);
    }

    componentWillUnmount() {
      base.removeBinding(this.ref);
    }

    addToInventory = (fish) => {
        const inventory = [ ...this.state.inventory ];
        inventory.push({ id: uniqueSlug(fish.name), ...fish });

        this.setState({ inventory });
    };

    loadSampleInventory = () => {
        const items = _.toArray(sampleData)
          .map((item) => {
            return { id: uniqueSlug(item.name), ...item };
          });

        this.setState({ inventory: items });
    };

    addToOrder = (key) => {
      const order = { ...this.state.order }
      order[key] = order[key] + 1 || 1

      this.setState({ order });
    }

    render() {
        return (
          <div className="catch-of-the-day">
            <div className="menu">
              <Header tagline="Fresh Seafood Market" />
              <Menu
                inventory={this.state.inventory}
                addToOrder={this.addToOrder}
              />
            </div>
            <Order inventory={this.state.inventory} order={this.state.order} />
            <Inventory
              addToInventory={this.addToInventory}
              loadSampleInventory={this.loadSampleInventory}
            />
          </div>
        );
    }
}

export default App;