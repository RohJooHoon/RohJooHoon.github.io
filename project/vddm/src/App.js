import React, {useState} from "react";
import {Route} from 'react-router-dom';
import 'css/layout.css';
import 'css/common.css';
import Index from 'component/page/Index/Index';
import Login from 'component/page/Login/Login';
import SignUp from 'component/page/SignUp/SignUp';
import Main from 'component/page/Main/Main';
import Profile from "component/page/Profile/Profile";
import MyMenu from "component/page/MyMenu/MyMenu";
import Header from "component/layout/Header";
import Footer from "component/layout/Footer";

function App() {
    let [layout, layoutSet] = useState({});
    return (
        <>
            <Header layout={layout}></Header>
            <div className="body">
                <div className={"bodyInner " + (layout.body ? layout.body.class : '')}>
                    <Route exact path="/">
                        <Index layoutSet={layoutSet}></Index>
                    </Route>
                    <Route exact path="/login">
                        <Login layoutSet={layoutSet}></Login>
                    </Route>
                    <Route exact path="/signup">
                        <SignUp layoutSet={layoutSet}></SignUp>
                    </Route>
                    <Route exact path="/main">
                        <Main layoutSet={layoutSet}></Main>
                    </Route>
                    <Route exact path="/profile">
                        <Profile layoutSet={layoutSet}></Profile>
                    </Route>
                    <Route exact path="/mymenu">
                        <MyMenu layoutSet={layoutSet}></MyMenu>
                    </Route>
                </div>
            </div>
            <Footer layout={layout}></Footer>
        </>
    );
}

export default App;
