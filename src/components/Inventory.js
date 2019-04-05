import React, { Component } from 'react';
import FishForm from './Inventory/Form';

class Inventory extends Component {
    render() {
        return (
          <div className="inventory">
            <h2>Inventory</h2>
                <FishForm addToInventory={this.props.addToInventory} />

                <button onClick={this.props.loadSampleInventory}>Load Sample Data</button>
          </div>
        );
    }
}

export default Inventory;