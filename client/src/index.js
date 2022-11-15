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


axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';

const persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PersistGate persistor={persistor}>
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
  </PersistGate>
);
