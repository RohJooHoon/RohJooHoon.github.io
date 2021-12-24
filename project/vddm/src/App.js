import React, { useState } from "react";
import {Link, Route, Switch} from 'react-router-dom';
import 'css/layout.css';
import 'css/common.css';
import Header from 'component/Header';
import Body from 'component/Body';
import Footer from 'component/Footer';

function App() {
    return (
        <>
            <Route exact path="/">
                <Header></Header>
                <Body></Body>
                <Footer></Footer>
            </Route>
            <Route exact path="/detail">
                <div className="test">디테일페이지에요</div>
            </Route>
            {/*<Route path="/어쩌구" component={Modal}></Route>*/}
        </>
    );
}

export default App;
