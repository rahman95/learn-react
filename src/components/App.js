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
        state: "inventory",
        asArray: true,
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

    updateInventory = (fish) => {
      const inventory = [ ...this.state.inventory ];
      const index = _.findIndex(inventory, { id: fish.id });

      inventory[index] = fish;

      this.setState({ inventory });
    };

    deleteFromIntventory = (fish) => {
      const inventory = [...this.state.inventory];
      const index = _.findIndex(inventory, { id: fish.id });

      inventory[index] = null;

      this.setState({ inventory });
    }

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

    updateOrder = (key, quantity) => {
      const order = { ...this.state.order }
      order[key] = quantity;

      this.setState({ order });
    }

    removeFromOrder = (key) => {
      const order = { ...this.state.order }
      delete order[key]

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
            <Order
              inventory={this.state.inventory}
              order={this.state.order}
              updateOrder={this.updateOrder}
              removeFromOrder={this.removeFromOrder}
            />
            <Inventory
              storeId={this.props.match.params.storeId}
              inventory={this.state.inventory}
              addToInventory={this.addToInventory}
              updateInventory={this.updateInventory}
              deleteFromIntventory={this.deleteFromIntventory}
              loadSampleInventory={this.loadSampleInventory}
            />
          </div>
        );
    }
}

export default App;