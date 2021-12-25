import React from "react";
import {Route} from 'react-router-dom';
import 'css/layout.css';
import 'css/common.css';
import Index from 'component/page/Index';
import Login from 'component/page/Login';
import SignUp from 'component/page/SignUp';
import Main from 'component/page/Main';
import Profile from "./component/page/Profile";
import MyMenu from "./component/page/MyMenu";

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
            <Route exact path="/main">
                <Main></Main>
            </Route>
            <Route exact path="/profile">
                <Profile></Profile>
            </Route>
            <Route exact path="/mymenu">
                <MyMenu></MyMenu>
            </Route>
        </>
    );
}

export default App;
