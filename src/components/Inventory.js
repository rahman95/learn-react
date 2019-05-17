import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddForm from './Inventory/AddForm';
import EditForm from './Inventory/EditForm';

class Inventory extends Component {
  static propTypes = {
    inventory: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
      })
    ).isRequired,
    updateInventory: PropTypes.func.isRequired,
    deleteFromIntventory: PropTypes.func.isRequired,
    addToInventory: PropTypes.func.isRequired,
    loadSampleInventory: PropTypes.func.isRequired
  };

  renderInventory = () => {
    if (!this.props.inventory.length) {
      return null;
    }

    return this.props.inventory.map(fish => {
      return (
        <EditForm
          key={fish.id}
          item={fish}
          updateInventory={this.props.updateInventory}
          deleteFromIntventory={this.props.deleteFromIntventory}
        />
      );
    });
  };

  render() {
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        <AddForm addToInventory={this.props.addToInventory} />
        <button onClick={this.props.loadSampleInventory}>
          Load Sample Data
        </button>
        <hr />

        {this.renderInventory()}
      </div>
    );
  }
}

export default Inventory;