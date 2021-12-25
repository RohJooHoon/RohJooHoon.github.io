import React from "react";
import Header from 'component/layout/Header';
import {Link} from "react-router-dom";
import 'css/login.css';

function Login() {
    return (
        <>
            <Header headerValue={{left: 'backWhite', back: '/'}}></Header>
            <div className="bodyInner is_noneHeader is_noneFooter login is_dim">
                <div className="loginInner" style={{maxHeight: 'calc(400px + 55px * 2)'}}>
                    <div className="loginTop">
                        <h1 className="loginTitle">
                            <span>L</span><span>O</span><span>G</span><span>I</span><span>N</span>
                        </h1>
                    </div>
                    <div className="loginBottom">
                        <form className="loginForm" style={{margin: '92px 0'}}>
                            <div className="loginInputWrap">
                                <div className="loginInputBox">
                                    <input className="loginInput" placeholder="이메일을 입력하세요" />
                                </div>
                                <div className="loginInputBox" style={{marginTop: '22px'}}>
                                    <input className="loginInput" placeholder="비밀번호를 입력하세요" />
                                </div>
                            </div>
                        </form>
                        <Link className="ghostButton is_white" to="/main">로그인</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
