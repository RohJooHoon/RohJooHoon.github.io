import React, {useEffect, useState} from "react";
import {Route} from "react-router-dom";
import {useSelector} from "react-redux";

// css
import 'component/common/reset.css';
import 'component/common/common.css';
import 'component/layout/layout.css';

// page
import Header from "component/layout/Header";
import Footer from "component/layout/Footer";
import Popup from "component/common/Popup";
import Intro from 'component/page/Intro';
import Login from 'component/page/Intro/Login';
import SignUp from 'component/page/Intro/SignUp';
import Main from 'component/page/Main';
import MainProduct from "component/page/Main/Product";
import Company from "component/page/Company";
import CompanyProfile from "component/page/Company/Profile";
import MyMenu from "component/page/MyMenu";

function App() {
    const store = useSelector((state) => state);

    // 확인용 콘솔
    useEffect(() => {
        console.log("store : ", store);
    }, [store]);

    return (
        <>
            <Header></Header>
            <div className="body">
                <div className={"bodyInner" + (store.layout.body ? ' ' + store.layout.body.class : '')}>
                    <div className="bodyContainer">
                        <Route exact path="/">
                            <Intro></Intro>
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
                        <Route exact path="/main/product/:product_seq">
                            <MainProduct ></MainProduct>
                        </Route>
                        <Route exact path="/company">
                            <Company></Company>
                        </Route>
                        <Route exact path="/company/profile/:wholesale_client_id">
                            <CompanyProfile></CompanyProfile>
                        </Route>
                        <Route exact path="/mymenu">
                            <MyMenu></MyMenu>
                        </Route>
                    </div>
                </div>
            </div>
            <Footer></Footer>
            {(store.popup.body || store.popup.header) && <Popup></Popup>}
        </>
    );
}

export default App;