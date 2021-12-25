import React, { useState } from "react";
import 'css/login.css';
import Header from "../layout/Header";
import {Link} from "react-router-dom";

function SignUp() {
    let [headerValue, headerValueSet] = useState({
        left: 'backWhite',
    });
    return (
        <>
            <Header headerValue={headerValue}></Header>
            <div className="bodyInner is_noneHeader login is_dim">
                <div className="loginInner">
                    <div className="loginBody">
                        <h1 className="loginTitle">
                            <span>회</span><span>원</span><span>가</span><span>입</span>
                        </h1>
                        <form className="loginForm" style={{margin: '40px 0 30px'}}>

                        </form>
                        <Link className="ghostButton is_white" to="/main">로그인</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
