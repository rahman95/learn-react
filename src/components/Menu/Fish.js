import React, { Component } from 'react'
import PropTypes from "prop-types";
import { formatPrice } from '../../helpers';

class Fish extends Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
    addToOrder: PropTypes.func.isRequired,
  };

  render() {
    if(! this.props.data) {
      return null;
    }

    const { id, name, desc, price, status, image } = this.props.data;
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

export default Fish;