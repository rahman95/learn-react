import React, { Fragment } from "react";
import { format } from "util";

class StorePicker extends React.Component {
  render() {
    return (
      <form className="store-selector">
        <h2>Please Enter a Store</h2>
        <input type="text" placeholder="Store Name" />
        <button type="submit">Visit Store →</button>
      </form>
    );
  }
}

export default StorePicker;