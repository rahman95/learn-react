import React, { Component } from "react";
import PropTypes from 'prop-types';
import { formatPrice } from "../../helpers";

class Item extends Component {
  static propTypes = {
    fish: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
    quantity: PropTypes.number.isRequired,
    updateOrder: PropTypes.func.isRequired,
    removeFromOrder: PropTypes.func.isRequired
  };

  handleUpdate = (e) => {
    const key = this.props.fish.id;
    let quantity = e.currentTarget.value;

    if (quantity < 1) {
      quantity = 1;
    }

    if(quantity < 1 || quantity > 99) {
      return;
    }

    this.props.updateOrder(key, quantity)
  }

  render() {
    const { quantity, fish } = this.props;

    if(! fish) {
      return null;
    }

    const { id, name, price, status } = fish;
    const isAvailable = status === "available";
    const total = (quantity * price);

    if(! isAvailable) {
      return (
        <li>
          Sorry {name ? name : 'fish'} is no longer available!
        </li>
      );
    }

    return (
      <li>
        <span>
          <span className="count">
            <input type="number" min="1" max="99" value={quantity} onChange={this.handleUpdate} />
          </span>
          lbs {name}
          <button onClick={() => this.props.removeFromOrder(id)}>
            &times;
          </button>
        </span>
        <span className="price">
          {formatPrice(total)}
        </span>
      </li>
    );
  }
}

export default Item;