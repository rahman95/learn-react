import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from "firebase";
import Login from './Auth/Login';
import AddForm from './Inventory/AddForm';
import EditForm from './Inventory/EditForm';
import base, { firebaseApp } from '../base';
import Logout from './Auth/Logout';

class Inventory extends Component {
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
    updateInventory: PropTypes.func.isRequired,
    deleteFromIntventory: PropTypes.func.isRequired,
    addToInventory: PropTypes.func.isRequired,
    loadSampleInventory: PropTypes.func.isRequired
  };

  state = {
    provider: null,
    uid: null,
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authenticate = provider => {
    this.setState({
      provider: provider
    });

    if (provider === 'Guest') {
      return;
    }

    const authProvider = new firebase.auth.GithubAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  authHandler = async authData => {
    const store = await base.fetch(this.props.storeId, { context: this });

    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }

    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };

  logout = async () => {
    await firebase.auth().signOut();

    this.setState({
      uid: null
    });

    await this.cleanUp();
  };

  cleanUp = async () => {
    if (this.isGuest()) {
      await base.post(`${this.props.storeId}`, {
        data: null
      });

      this.setState({
        provider: null
      });
    }
  }

  isLoggedIn = () => {
    return this.isGuest() || !!this.state.uid;
  };

  isOwner = () => {
    return this.isGuest() || (this.isLoggedIn() && this.state.uid === this.state.owner);
  };

  isGuest = () => {
    return this.state.provider === 'Guest';
  }

  renderInventory = () => {
    if (!this.props.inventory.length) {
      return null;
    }

    return this.props.inventory.map(fish => {
      return (
        <EditForm
          key={fish.id}
          item={fish}
          updateInventory={this.props.updateInventory}
          deleteFromIntventory={this.props.deleteFromIntventory}
        />
      );
    });
  };

  render() {
    const logoutButton = <Logout logout={this.isGuest() ? this.cleanUp : this.logout} />

    if (! this.isLoggedIn()) {
      return <Login authenticate={this.authenticate} />;
    }

    if (! this.isOwner()) {
      return (
        <div>
          <p>You cannot manage this store</p>
          {logoutButton}
        </div>
      );
    }

    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logoutButton}
        <AddForm addToInventory={this.props.addToInventory} />
        <button onClick={this.props.loadSampleInventory}>
          Load Sample Data
        </button>
        <hr />

        {this.renderInventory()}
      </div>
    );
  }
}

export default Inventory;