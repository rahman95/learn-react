import Rebase from 're-base';
import {initializeApp } from 'firebase';

console.log(process.env);

const firebaseApp = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL
});

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};

export default base;