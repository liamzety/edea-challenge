import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/style/main.scss';
import { MainContextProvider } from "./context/MainContext";

ReactDOM.render(
  <MainContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MainContextProvider>,
  document.getElementById('root')
);

