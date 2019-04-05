import React from "react";
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  store = React.createRef();

  submit = (e) => {
    e.preventDefault();
    const store = this.store.current.value;

    this.props.history.push(`/store/${ store }`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.submit}>
        <h2>Please Enter a Store</h2>
        <input
          ref={this.store}
          type="text"
          placeholder="Store Name"
          defaultValue={getFunName()}
          required
        />
        <button type="submit">Visit Store →</button>
      </form>
    );
  }
}

export default StorePicker;