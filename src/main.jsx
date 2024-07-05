import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store/reducers.jsx';
import './App.css';

export default store;
export const {dispatch, getState} = store;
if(typeof window !== 'undefined') window.global = window;

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App/>
  </Provider>
)
