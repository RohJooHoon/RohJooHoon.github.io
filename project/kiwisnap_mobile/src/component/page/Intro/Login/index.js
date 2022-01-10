import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import '../style.css';
import SHA256 from "js/SHA256";
import {useDispatch} from "react-redux";
import script from "js/common";

function Login() {
    const [idValue, setIdValue] = useState("");
    const [pwdValue, setPwdValue] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    const secret = SHA256(pwdValue);

    useEffect(() => {
        // 레이아웃 세팅
        dispatch({type: 'layout/set', payload: {
                header: {
                    left: 'backWhite',
                    back: '/'
                },
                body: {
                    class: 'loginBg is_dim is_noneHeader is_noneFooter'
                },
            }
        })

        // 테스트용 페이지 진입시 강제 로그인 후 헤더 지정
        //props.logIn();
    }, []);

    const changeIdValue = (e) => {
        setIdValue(e.target.value);
    }

    const changePwdValue = (e) => {
        setPwdValue(e.target.value);
    }

    const loginButton = (e) => {
        e.preventDefault();
        script.callAxios('get', {
            url: `/member/login?mem_id=${idValue}&password=${secret}`,
            result: (result) => {
                if (!result.data.error_msg) {
                    localStorage.setItem('token', result.data.token);
                    history.push('/main');
                } else {
                    alert('아이디와 비밀번호를 다시 확인해 주세요')
                };
            },
            err: (err) => {
                console.log(err.response)
                alert('아이디와 비밀번호를 다시 확인해 주세요')
            }
        });
    }

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
                            <input className="loginInput" placeholder="이메일을 입력하세요" type="text" onChange={changeIdValue} />
                        </div>
                        <div className="loginInputBox" style={{marginTop: '22px'}}>
                            <input className="loginInput" placeholder="비밀번호를 입력하세요" type="password" onChange={changePwdValue}/>
                        </div>
                    </div>
                </form>
                <button className="ghostButton is_white" onClick={loginButton}>로그인</button>
            </div>
        </div>
    );
}

export default Login;