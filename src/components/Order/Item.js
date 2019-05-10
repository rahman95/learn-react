import React, { Component } from "react";
import { formatPrice } from "../../helpers";

export default class Item extends Component {

  handleUpdate = (e) => {
    const key = this.props.fish.id;
    const quantity = e.currentTarget.value;

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