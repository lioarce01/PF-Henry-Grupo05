import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import axios from 'axios';
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
import { Auth0Provider } from '@auth0/auth0-react';


axios.defaults.baseURL = 'http://localhost:3001';

const persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-gdm-hbgx.us.auth0.com"
    clientId="kJlrIg8muTlVr5nDYz0KEjTZFa7OzRBp"
    redirectUri={window.location.origin}
    audience="https://pf-henry-05.onrender.com"
    scope="openid profile email"
    cacheLocation="localstorage"
  >
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </PersistGate>
  </Auth0Provider>
);
