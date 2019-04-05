import React, { Component } from 'react';
import FishForm from './Inventory/Form';

class Inventory extends Component {
    render() {
        return (
          <div className="inventory">
            <h2>Inventory</h2>
                <FishForm addToInventory={this.props.addToInventory} />
          </div>
        );
    }
}

export default Inventory;