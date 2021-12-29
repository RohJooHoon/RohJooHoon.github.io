import React, {useState} from "react";
import {Route} from 'react-router-dom';
import 'css/layout.css';
import 'css/common.css';
import Header from "component/layout/Header";
import Footer from "component/layout/Footer";
import Index from 'component/page/Index/Index';
import Login from 'component/page/Login/Login';
import SignUp from 'component/page/SignUp/SignUp';
import Main from 'component/page/Main/Main';
import Product from "component/page/Product/Product";
import Company from "component/page/Company/Company";
import Profile from "component/page/Profile/Profile";
import MyMenu from "component/page/MyMenu/MyMenu";
import axios from "axios";
import SHA256 from "./js/SHA256";

function App() {
    let [layout, layoutSet] = useState({});
    let [list, listSet] = useState([]); // 상품리스트

    // 상품리스트 데이터 조회
    function getList() {
        axios.get(`https://devapi.kiwisnap.net/vddm/product/list?start=${list.length}&length=20`,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        }).then(result => {
            listSet([...list, ...result.data]);
        }).catch(err => {
            console.log("getList err : ", err);
        });
    }

    // 테스트용 강제로그인
    function logIn() {
        axios.get('https://devapi.kiwisnap.net/member/login', {
            params: { mem_id: 'denma1', password: SHA256('111111') },
        }).then(response => {
            console.log(response);
            if (!response.data.error_msg) {
                localStorage.setItem('token', response.data.token);
                console.log(response.data.token);
            } else alert('아이디와 비밀번호를 다시 확인해 주세요');
        });
    }

    return (
        <>
            <Header layout={layout}></Header>
            <div className="body">
                <div className={"bodyInner " + (layout.body ? layout.body.class : '')}>
                    <div className="bodyContainer">
                        <Route exact path="/">
                            <Index layoutSet={layoutSet}></Index>
                        </Route>
                        <Route exact path="/login">
                            <Login layoutSet={layoutSet} logIn={logIn}></Login>
                        </Route>
                        <Route exact path="/signup">
                            <SignUp layoutSet={layoutSet} logIn={logIn}></SignUp>
                        </Route>
                        <Route exact path="/main">
                            <Main layoutSet={layoutSet} list={list} getList={getList}></Main>
                        </Route>
                        <Route exact path="/main/product/:id">
                            <Product layoutSet={layoutSet}></Product>
                        </Route>
                        <Route exact path="/company">
                            <Company layoutSet={layoutSet}></Company>
                        </Route>
                        <Route exact path="/company/profile">
                            <Profile layoutSet={layoutSet}></Profile>
                        </Route>
                        <Route exact path="/mymenu">
                            <MyMenu layoutSet={layoutSet}></MyMenu>
                        </Route>
                    </div>
                </div>
            </div>
            <Footer layout={layout}></Footer>
        </>
    );
}

export default App;
