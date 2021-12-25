import React, { useState } from "react";
import Header from 'component/layout/Header';
import {Link} from "react-router-dom";
import 'css/login.css';

function Login(props) {
    let [headerValue, headerValueSet] = useState({
        left: 'backWhite',
    });
    return (
        <>
            <Header headerValue={headerValue}></Header>
            <div className="bodyInner is_noneHeader login is_dim">
                <div className="loginInner" style={{maxHeight: 'calc(400px + 55px * 2)'}}>
                    <div className="loginTop">
                        <h1 className="loginTitle">
                            <span>L</span><span>O</span><span>G</span><span>I</span><span>N</span>
                        </h1>
                    </div>
                    <div className="loginBottom">
                        <form className="loginForm" style={{margin: '92px 0'}}>

                        </form>
                        <Link className="ghostButton is_white" to="/main">로그인</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
