import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx'
import './index.css'
import {UserProvider} from "./utils/UserContext.jsx";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);