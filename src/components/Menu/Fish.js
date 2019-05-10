import React, { Component } from 'react'
import { formatPrice } from '../../helpers';

export default class Fish extends Component {
  render() {
    if(! this.props.data) {
      return null;
    }

    const { id, name, desc, price, status, image} = this.props.data;
    const isAvailable = (status === 'available');

    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={() => this.props.addToOrder(id)}>
          {isAvailable ? "Add To Cart" : "Sold Out!"}
        </button>
      </li>
    );
  }
}
