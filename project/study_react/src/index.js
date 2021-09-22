import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import App_c from './App_c';

mongodb+srv://joohoon:<password>@cluster0.abygv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority0p

ReactDOM.render(
    <React.StrictMode>
        <App/>
        <App_c/>
    </React.StrictMode>,
    document.getElementById('root')
);