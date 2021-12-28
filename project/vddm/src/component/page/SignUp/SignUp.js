import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import 'css/login.css';
import axios from "axios";
import SHA256 from "js/SHA256";

function SignUp(props) {
    useEffect(() => {
        props.layoutSet({
            header: {
                left: 'backWhite',
                back: '/'
            },
            body: {
                class: 'login is_dim'
            },
        });

        // 테스트용 강제로그인
        axios.get('https://devapi.kiwisnap.net/member/login', {
            params: { mem_id: 'denma1', password: SHA256('111111') },
        })
            .then(response => {
                console.log(response);
                if (!response.data.error_msg) {
                    localStorage.setItem('token', response.data.token);
                    console.log(response.data.token);
                } else alert('아이디와 비밀번호를 다시 확인해 주세요');
            });
    }, []);
    return (
        <div className="loginInner">
            <div className="loginBody">
                <h1 className="loginTitle">
                    <span>회</span><span>원</span><span>가</span><span>입</span>
                </h1>
                <form className="loginForm" style={{margin: '40px 0 30px'}}>
                    <div className="loginInputWrap">
                        <strong className="loginInputTitle">아이디</strong>
                        <div className="loginInputBox">
                            <input className="loginInput" placeholder="이메일을 입력하세요"/>
                        </div>
                    </div>
                    <div className="loginInputWrap">
                        <strong className="loginInputTitle">비밀번호<span className="loginInputTitleTip">(특수문자포함, 6자리)</span></strong>
                        <div className="loginInputBox">
                            <input className="loginInput" placeholder="비밀번호를 입력하세요"/>
                        </div>
                        <div className="loginInputBox">
                            <input className="loginInput" placeholder="비밀번호를 입력하세요"/>
                        </div>
                    </div>
                    <div className="loginInputWrap">
                        <strong className="loginInputTitle">휴대폰 인증</strong>
                        <div className="loginInputBox">
                            <input className="loginInput" placeholder="+82" style={{flex: 'none', width: '54px'}}/>
                            <input className="loginInput" placeholder="010-1234-1234"/>
                        </div>
                        <div className="loginInputBox">
                            <input className="loginInput" placeholder="인증번호"/>
                        </div>
                    </div>
                </form>
                <Link className="ghostButton is_white" to="/main">로그인</Link>
            </div>
        </div>
    );
}

export default SignUp;
