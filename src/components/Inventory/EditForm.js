import React, { Component } from 'react';

class EditForm extends Component {
  handleInput = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    const fish = {
      ...this.props.item,
      [name]: value,
    }
    this.props.updateInventory(fish);
  }

  render() {
    const { name, price, status, desc, image } = this.props.item;

    return (
      <div className="fish-edit">
        <input type="text" name="name" value={name} placeholder="Name" onChange={this.handleInput} />
        <input type="number" min="0" name="price" value={price} placeholder="Price" onChange={this.handleInput} />
        <select name="status" value={status} onChange={this.handleInput}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" value={desc} placeholder="Desc" onChange={this.handleInput} />
        <input type="text" name="image" value={image} placeholder="Image" onChange={this.handleInput} />
      </div>
    );
  }
}

export default EditForm;