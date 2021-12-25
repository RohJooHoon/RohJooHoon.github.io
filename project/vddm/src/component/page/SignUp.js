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
                            <div className="loginInputWrap">
                                <strong className="loginInputTitle">아이디</strong>
                                <div className="loginInputBox">
                                    <input className="loginInput" placeholder="이메일을 입력하세요" />
                                </div>
                            </div>
                            <div className="loginInputWrap">
                                <strong className="loginInputTitle">비밀번호<span className="loginInputTitleTip">(특수문자포함, 6자리)</span></strong>
                                <div className="loginInputBox">
                                    <input className="loginInput" placeholder="비밀번호를 입력하세요" />
                                </div>
                                <div className="loginInputBox">
                                    <input className="loginInput" placeholder="비밀번호를 입력하세요" />
                                </div>
                            </div>
                            <div className="loginInputWrap">
                                <strong className="loginInputTitle">휴대폰 인증</strong>
                                <div className="loginInputBox">
                                    <input className="loginInput" placeholder="+82" style={{flex: 'none', width: '54px'}}/>
                                    <input className="loginInput" placeholder="010-1234-1234" />
                                </div>
                                <div className="loginInputBox">
                                    <input className="loginInput" placeholder="인증번호" />
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

export default SignUp;
