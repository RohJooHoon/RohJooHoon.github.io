import React, { useState } from "react";
import {Link, Route, Switch} from 'react-router-dom';
import 'css/layout.css';
import 'css/common.css';
import Index from 'component/page/Index';
import Login from 'component/page/Login';
import SignUp from 'component/page/SignUp';

function App() {
    return (
        <>
            <Route exact path="/">
                <Index></Index>
            </Route>
            <Route exact path="/login">
                <Login></Login>
            </Route>
            <Route exact path="/signup">
                <SignUp></SignUp>
            </Route>
        </>
    );
}

export default App;
