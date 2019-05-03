import React, { Component } from "react";
import { formatPrice } from "../../helpers";

export default class Item extends Component {
  render() {
    const { quantity, fish } = this.props;

    if(! fish) {
      return null;
    }

    const { name, price, status } = fish;
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
        {quantity} lbs {name}
        {formatPrice(total)}
      </li>
    );
  }
}
