import React from 'react';
import ReactDOM from 'react-dom/client';
import { SSRProvider } from '@salutejs/plasma-web';
import { GlobalStyle } from './GlobalStyle.jsx';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SSRProvider>
    <App/>
    <GlobalStyle/>
  </SSRProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
