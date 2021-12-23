import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import mybase from "./mybase";
import './styles.css'
console.log(mybase);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
