import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { ThemeProvider } from "@material-tailwind/react";
import { store } from './Redux/store.js'
import { Provider } from 'react-redux'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
