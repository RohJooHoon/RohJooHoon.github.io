import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import '../style.css';
import SHA256 from "js/SHA256";
import {useDispatch} from "react-redux";
import script from "js/common";

function SignUp() {
    //아이디 비밀번호 확인
    const [idValue, setIdValue] = useState('');
    const [pwdValue, setPwdValue] = useState('');
    const [rePwdValue, setRePwdValue] = useState('');
    //휴대전화 인증
    const [phoneNumber, setPhoneNumber] = useState('');
    const [numberCheck, setNumberCheck] = useState('');
    const [telSuccess, setTelSuccess] = useState(false);
    //체크박스
    const [termsAgreeAll, setTermsAgreeAll] = useState(false);
    const [termsAgree1, setTermsAgree1] = useState(false);
    const [termsAgree2, setTermsAgree2] = useState(false);
    const [termsAgree3, setTermsAgree3] = useState(false);
    const [marketingAgree, setIsMarketingAgree] = useState("N");

    const dispatch = useDispatch();
    const history = useHistory();

    const emailRegex =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const passwordRegex = /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/;

    //SHA256 암호화.
    let pwdSecret;
    let rePwdSecret;

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
       // props.logIn();
    }, []);

    //아이디 비밀번호 체크
    const changeIdValue = (e) => {
        if(e.target.value !== '') {
            setIdValue(e.target.value)
        } else {
            setIdValue('')
        }
    }

    const changePwdValue = (e) => {
        if(e.target.value !== '') {
            setPwdValue(e.target.value)
        } else {
            setPwdValue('')
        }
    }

    const changeRePwdValue = (e) => {
        if(e.target.value !== '') {
            setRePwdValue(e.target.value)
        } else {
            setRePwdValue('')
        }
    }
    //휴대폰 인증번호 체크
    const changePhoneNumber = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
        if(e.target.value.length > 10) {
            setPhoneNumber(e.target.value);
        } else {
            setPhoneNumber(null);
        }
    };

    const changeSuccessMessage = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
        if (e.target.value.length > 5) {
            setNumberCheck(e.target.value)
        } else {
            setNumberCheck(null);
        }
    };

    const postMessage = (e) => {
        e.preventDefault();
        script.callAxios('post', {
            url: `/member/certification/send`,
            headers: {
                "Content-type": "application/json",
            },
            data: JSON.stringify({
                phoneNumber: phoneNumber,
            }),
            result: (result) => {
                console.log("post 성공::", result);
                alert("인증번호 전송 완료!");
            },
            err: (err) => {
                console.log("loginData/get err : ", err)
                if (err.response.status === 1005) {
                    console.log("인증번호 발송 에러 1500::", err.response);
                    alert("이미 등록된 휴대폰 번호입니다");
                } else if (err.response.status === 400) {
                    alert("1분뒤에 다시 시도 해 주세요!");
                    console.log("인증번호 발송 에러 400::", err.response);
                } else if (err.response.data.error === true) {
                    console.log("인증번호 발송 에러 true::", err.response);
                    alert("전화번호를 확인 해 주세요!");
                }
            }
        });
    };

    //인증번호 확인
    const submitMessage = (e) => {
        e.preventDefault();
        script.callAxios('post', {
            url: `/member/certification/verify`,
            data: {
                params: {
                    phoneNumber: phoneNumber,
                    inputCertificationNumber: numberCheck,
                },
            },
            result: (result) => {
                console.log(result);
                if (result.data.certification === false) {
                    console.log("인증번호 확인 에러::", result);
                    alert("인증번호를 확인해주세요!");
                    setTelSuccess(false);
                } else {
                    console.log("인증번호 확인 ::", result);
                    alert("인증되었습니다!");
                    setTelSuccess(true);
                }
            },
            err: (err) => {
                console.log("loginData/get err : ", err)
            }
        });
    };

    //체크박스
    const changeCheckBox = (e) => {
        setTermsAgreeAll(!termsAgreeAll === true);
        if (termsAgreeAll === true) {
            setTermsAgree1(false);
            setTermsAgree2(false);
            setTermsAgree3(false);
            setIsMarketingAgree("N");
        } else if (termsAgreeAll === false) {
            setTermsAgree1(true);
            setTermsAgree2(true);
            setTermsAgree3(true);
            setIsMarketingAgree("Y");
        }
    };

    const changeIsAgree1 = (e) => {
        setTermsAgree1(!termsAgree1 === true);
        if (termsAgree1 === true) {
            setTermsAgreeAll(false)
        }
    };

    const changeIsAgree2 = (e) => {
        setTermsAgree2(!termsAgree2 === true);
        if (termsAgree2 === true) {
            setTermsAgreeAll(false)
        }
    };

    const changeIsAgree3 = (e) => {
        setTermsAgree3(!termsAgree3 === true);
        if (termsAgree3 === true) {
            setTermsAgreeAll(false)
        }
    };

    //회원가입 유효성 검사
    const submitUserInfos = (e) => {
        const emailCurrent = idValue;
        const passwordCurrent = pwdValue;
        pwdSecret = SHA256(pwdValue);
        rePwdSecret = SHA256(rePwdValue);

        if (!emailRegex.test(emailCurrent)) {
            alert("아이디를 이메일 형식으로 입력 해 주세요!");
        } else if (!passwordRegex.test(passwordCurrent)) {
            alert("비밀번호를 영문,특수문자,숫자 포함 6자 이상 입력 해 주세요!");
        } else if (pwdSecret !== rePwdSecret) {
            alert("비밀번호를 확인 해 주세요!");
        } else if (!numberCheck) {
            alert("전화번호를 입력 해 주세요!");
        } else if (!telSuccess) {
            alert("휴대폰 인증을 확인 해 주세요!");
        } else if (termsAgree1 === false || termsAgree2 === false) {
            alert("필수동의를 확인 해 주세요!");
        } else {
            const formData = new FormData();
            formData.append("mem_id", idValue);
            formData.append("password", rePwdSecret);
            formData.append("country_cd", "+82");
            formData.append("phone", phoneNumber);
            formData.append("marketing_agree", marketingAgree);
            formData.append("homepage_name", "");
            formData.append("mem_type", "NORMAL");

            script.callAxios('post', {
                url: `/member/join`,
                data: formData,
                result: (result) => {
                    console.log("******회원가입 성공******", result);
                    if (!result.data.error_code) {
                        alert("회원가입 성공");
                        history.push('/login');
                    } else if (result.data.error_code === 1005) {
                        alert("이미 사용중인 아이디 입니다");
                        console.log("******회원가입 에러******", result.data);
                    }
                },
                err: (err) => {
                    console.log("******회원가입 실패******", err.response);
                    alert("회원가입 실패");
                }
            });
        }
    };

    return (
        <div className="login">
            <div className="loginBody">
                <h1 className="loginTitle">
                    <span>회</span><span>원</span><span>가</span><span>입</span>
                </h1>
                <form className="loginForm" style={{margin: '40px 0 30px'}}>
                    <div className="loginInputWrap">
                        <strong className="loginInputTitle">아이디</strong>
                        <div className="loginInputBox">
                            <input className="loginInput" placeholder="이메일을 입력하세요" onChange={changeIdValue}/>
                        </div>
                    </div>
                    <div className="loginInputWrap">
                        <strong className="loginInputTitle">비밀번호<span className="loginInputTitleTip">(특수문자포함, 6자리)</span></strong>
                        <div className="loginInputBox">
                            <input className="loginInput" type="password" placeholder="비밀번호를 입력하세요" onChange={changePwdValue}/>
                        </div>
                        <div className="loginInputBox">
                            <input className={`loginInput${(pwdValue !== rePwdValue && rePwdValue) ? ' is_error' : ''}`} type="password" placeholder="비밀번호를 입력하세요" onChange={changeRePwdValue}/>
                        </div>
                        <p className="is_error_text" style={{color: (pwdValue !== rePwdValue && rePwdValue) ? '#FF4D00' : 'transparent'}}>입력한 비밀번호가 다릅니다.</p>
                    </div>
                    <div className="loginInputWrap">
                        <strong className="loginInputTitle">휴대폰 인증</strong>
                        <div className="loginInputBox">
                            <input className="loginInput" placeholder="+82" style={{flex: 'none', width: '54px'}} disabled/>
                            <input className="loginInput" placeholder="010-1234-1234" onChange={changePhoneNumber} maxLength='11'/>
                            <button className={"button is_middle" + (phoneNumber ? ' is_on' : ' is_off')} type="button" disabled={ !phoneNumber ? true : false } onClick={(e)=> postMessage(e)}>발송</button>
                        </div>
                        <div className="loginInputBox">
                            <input className="loginInput" placeholder="인증번호" onChange={changeSuccessMessage} maxLength='6'/>
                            <button className={"button is_middle" + (!phoneNumber ? ' is_none' : ' is_on' )} type="button" disabled={ (!numberCheck || !phoneNumber) ? true : false } onClick={(e)=> submitMessage(e)}>확인</button>
                        </div>
                    </div>
                        <ul className="termsAgreeWrap">
                            <li className="termsAgreeAll">
                                <input className="listCkBoxstyle" type="checkbox" id="termsAllagree" onClick={(e) => changeCheckBox(e)} />
                                    <label className={"listlabelAllAgree" + (termsAgreeAll ? ' is_on' : '')} htmlFor="termsAllagree">키위스냅의 약관에 모두 동의합니다.</label>
                            </li>
                            <li className="termsAgreeEach" style={{paddingLeft: "1px"}}>
                                <input className="listCkBoxstyle" type="checkbox" id="agree1"  onClick={(e) => changeIsAgree1(e)}/>
                                <label className={"termsEachAgree" + (termsAgree1 ? ' is_on' : '')} htmlFor="agree1">이용 약관 동의(필수)</label>
                                <Link className="termsView" to="#" target="_blank">보기</Link>
                            </li>
                            <li className="termsAgreeEach" style={{paddingLeft: "1px"}}>
                                <input className="listCkBoxstyle" type="checkbox" id="agree2"  onClick={(e) => changeIsAgree2(e)} />
                                <label className={"termsEachAgree" + (termsAgree2 ? ' is_on' : '')} htmlFor="agree2">개인정보 취급방침 동의(필수)</label>
                                <Link className="termsView" to="#" target="_blank">보기</Link>
                            </li>
                            <li className="termsAgreeEach" style={{paddingLeft: "1px"}}>
                                <input className="listCkBoxstyle" type="checkbox" id="agree3" onClick={(e) => changeIsAgree3(e)} />
                                <label className={"termsEachAgree" + (termsAgree3 ? ' is_on' : '')} htmlFor="agree3">마케팅 정보 수신 동의(선택)</label>
                            </li>
                        </ul>
                </form>
                <button className="ghostButton is_white" onClick={(e) => submitUserInfos(e)}>로그인</button>
            </div>
        </div>
    );
}

export default SignUp;