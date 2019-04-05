import React, { Component } from 'react'
import _ from "lodash";
import Fish from './Menu/Fish';

class Menu extends Component {
  render() {
    const items = [];
    _.forEach(this.props.inventory, (item, key) => {
      items.push(<Fish key={key} data={item}/>);
    });

    return (
      <ul className="fishes">
        {items}
      </ul>
    );
  }
}

export default Menu;
