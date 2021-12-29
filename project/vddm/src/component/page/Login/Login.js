import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import SHA256 from 'js/SHA256';
import 'css/login.css';

function Login(props) {
    useEffect(() => {
        props.layoutSet({
            header: {
                left: 'backWhite',
                back: '/'
            },
            body: {
                class: 'loginBg is_dim is_noneHeader is_noneFooter'
            },
        });

        // 테스트용 강제 로그인
        props.logIn();
    }, []);
    return (
        <div className="login" style={{maxHeight: 'calc(400px + 55px * 2)'}}>
            <div className="loginTop">
                <h1 className="loginTitle">
                    <span>L</span><span>O</span><span>G</span><span>I</span><span>N</span>
                </h1>
            </div>
            <div className="loginBottom">
                <form className="loginForm" style={{marginBottom: '92px'}}>
                    <div className="loginInputWrap">
                        <div className="loginInputBox">
                            <input className="loginInput" placeholder="이메일을 입력하세요"/>
                        </div>
                        <div className="loginInputBox" style={{marginTop: '22px'}}>
                            <input className="loginInput" placeholder="비밀번호를 입력하세요"/>
                        </div>
                    </div>
                </form>
                <Link className="ghostButton is_white" to="/main">로그인</Link>
            </div>
        </div>
    );
}

export default Login;
