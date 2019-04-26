import React from 'react';
import { render } from 'react-dom';
import Router from './components/Router';
import dotenv from "dotenv";
import './css/style.css';

dotenv.config();

render(<Router />, document.querySelector('#main'))