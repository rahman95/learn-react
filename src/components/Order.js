import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition}  from 'react-transition-group';
import _ from 'lodash';
import { formatPrice } from "../helpers";
import Item from "./Order/Item";

class Order extends Component {
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
    order: PropTypes.object,
    removeFromOrder: PropTypes.func.isRequired,
    updateOrder: PropTypes.func.isRequired
  };

  renderItems = () => {
    const items = [];
    const { inventory, order } = this.props;

    _.each(order, (value, key) => {
      const fish = _.find(inventory, { id: key });
      const quantity = Number(value);

      items.push(
        <CSSTransition
          classNames="order"
          key={key}
          timeout={{ enter: 500, exit: 500 }}
        >
          <Item
            key={key}
            fish={fish}
            quantity={quantity}
            removeFromOrder={this.props.removeFromOrder}
            updateOrder={this.props.updateOrder}
          />
        </CSSTransition>
      );
    });

    return items;
  };

  renderTotal = () => {
    const { inventory, order } = this.props;

    return _.reduce(
      order,
      (total, value, key) => {
        const fish = _.find(inventory, { id: key });
        const isAvailable = fish && fish.status === "available";
        const quantity = value;

        if (!isAvailable) {
          return total;
        }
        return total + quantity * fish.price;
      },
      0
    );
  };

  render() {
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">
          <TransitionGroup>{this.renderItems()}</TransitionGroup>
          <li className="total">
            Total: <strong>{formatPrice(this.renderTotal())}</strong>
          </li>
        </ul>
      </div>
    );
  }
}

export default Order;