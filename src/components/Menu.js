import React, { Component } from 'react'
import PropTypes from 'prop-types';
import _ from "lodash";
import Fish from './Menu/Fish';

class Menu extends Component {
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
    addToOrder: PropTypes.func.isRequired
  };

  render() {
    const items = [];
    _.forEach(this.props.inventory, (item, key) => {
      items.push(
        <Fish key={key} data={item} addToOrder={this.props.addToOrder} />
      );
    });

    return <ul className="fishes">{items}</ul>;
  }
}

export default Menu;
