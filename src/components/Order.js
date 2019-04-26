import React, { Component } from 'react';
import _ from 'lodash';
import { formatPrice } from "../helpers";
import Item from "./Order/Item";

class Order extends Component {
    renderItems = () => {
        const items = [];
        const { inventory, order } = this.props;

        _.each(order, (value, key) => {
            const fish = _.find(inventory, {id: key});
            const quantity = value;

            items.push(<Item key={key} fish={fish} quantity={quantity} />)
        })

        return items;
    }

    renderTotal = () => {
        const { inventory, order } = this.props;

        return _.reduce(order, (total, value, key) => {
            const fish = _.find(inventory, { id: key });
            const isAvailable = fish.status === "available";
            const quantity = value;

            if(! isAvailable) {
                return total;
            }
            return total + (quantity * fish.price);
        }, 0);
    }

    render() {
        return (
          <div className="order-wrap">
            <h2>Order</h2>
            <ul className="order">{this.renderItems()}</ul>
            <div className="total">
              Total: <strong>{formatPrice(this.renderTotal())}</strong>
            </div>
          </div>
        );
    }
}

export default Order;