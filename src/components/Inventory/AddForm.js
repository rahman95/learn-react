import React, { Component } from 'react';

class AddForm extends Component {
  //refs
  name = React.createRef();
  price = React.createRef();
  status = React.createRef();
  desc = React.createRef();
  image = React.createRef();

  submit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fish = {
      name: this.name.current.value,
      price: parseFloat(this.price.current.value),
      status: this.status.current.value,
      desc: this.desc.current.value,
      image: this.image.current.value,
    }

    this.props.addToInventory(fish);
    form.reset();
  }

  render() {
    return (
      <form className="fish-edit" onSubmit={ this.submit }>
        <input type="text" name="name" ref={ this.name } placeholder="Name" />
        <input type="number" min="0" name="price" ref={ this.price } placeholder="Price" />
        <select name="status" ref={ this.status }>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" ref={ this.desc } placeholder="Desc" />
        <input type="text" name="image" ref={ this.image } placeholder="Image" />
        <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

export default AddForm;