import Rebase from 're-base';
import {initializeApp} from 'firebase';

const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL
});

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};

export default base;