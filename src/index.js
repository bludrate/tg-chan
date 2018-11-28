import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import getStore from './store';

document.body.classList.add('js-active');

ReactDOM.hydrate(
  <App router={BrowserRouter} store={getStore()}/>,
  document.getElementById('root'));
