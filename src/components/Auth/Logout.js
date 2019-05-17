import React, { Component } from 'react';
import PropTypes from 'prop-types'

export default class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="py-1">
        <button onClick={() => this.props.logout()}>Log Out!</button>
      </div>
    );
  }
}
