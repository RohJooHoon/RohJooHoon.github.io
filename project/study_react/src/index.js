import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import App_c from './App_c';

ReactDOM.render(
    <React.StrictMode>
        <App/>
        <App_c/>
    </React.StrictMode>,
    document.getElementById('root')
);