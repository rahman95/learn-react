import React from 'react';
import { render } from 'react-dom';
import './css/style.css';

//Components
import StorePicker from './components/StorePicker';
import App from './components/App';

render(<App />, document.querySelector('#main'))