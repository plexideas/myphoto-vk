import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';

import * as serviceWorker from './serviceWorker';

import './index.css';


ReactDOM.render(
  <Provider store={store}>
    <div className="app">
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();