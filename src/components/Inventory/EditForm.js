import React, { Component } from 'react';
import PropTypes from 'prop-types'

class EditForm extends Component {
  static propTypes = {
    item: PropTypes.shape({
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
    updateInventory: PropTypes.func.isRequired,
    deleteFromIntventory: PropTypes.func.isRequired
  };

  handleInput = e => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    const fish = {
      ...this.props.item,
      [name]: value
    };
    this.props.updateInventory(fish);
  };

  render() {
    const { name, price, status, desc, image } = this.props.item;

    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          onChange={this.handleInput}
        />
        <input
          type="number"
          min="0"
          name="price"
          value={price}
          placeholder="Price"
          onChange={this.handleInput}
        />
        <select name="status" value={status} onChange={this.handleInput}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          value={desc}
          placeholder="Desc"
          onChange={this.handleInput}
        />
        <input
          type="text"
          name="image"
          value={image}
          placeholder="Image"
          onChange={this.handleInput}
        />
        <button
          onClick={() => this.props.deleteFromIntventory(this.props.item)}
        >
          Remove Button
        </button>
      </div>
    );
  }
}

export default EditForm;