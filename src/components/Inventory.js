import React, { Component } from 'react';
import AddForm from './Inventory/AddForm';
import EditForm from './Inventory/EditForm';

class Inventory extends Component {
    renderInventory = () => {
      if (! this.props.inventory.length) {
        return null;
      }

      return this.props.inventory.map((fish) => {
        return <EditForm
            key={fish.id}
            item={fish}
            updateInventory={this.props.updateInventory}
            deleteFromIntventory={this.props.deleteFromIntventory}
          ></EditForm>
      });
    }

    render() {
        return (
          <div className="inventory">
            <h2>Inventory</h2>
            <AddForm addToInventory={this.props.addToInventory} />
            <button onClick={this.props.loadSampleInventory}>Load Sample Data</button>
            <hr></hr>

            { this.renderInventory() }

          </div>
        );
    }
}

export default Inventory;