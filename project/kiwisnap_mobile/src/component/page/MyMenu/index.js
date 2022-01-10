import React, {useEffect} from "react";
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import sampleProfileImage from "img/sampleProfileImage.jpg";
import {CheckBoxBtn} from 'component/common';
import script from "js/common";
import './style.css';

function MyMenu() {
    const store = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        // 레이아웃 세팅
        dispatch({type: 'layout/set', payload: {
                header: {
                    title: '내 정보',
                },
                footer: {
                    onType: 'myMenu'
                },
            }
        })

        // 로그인 데이터 확인
        dispatch({type: 'loginData/get'});
    }, []);
    return (
        <div className="myMenu">
            <div className="myMenuTop">
                <div className='myMenuProfile profile'>
                    <button className="profileImg" type="button" style={{backgroundImage: `url(${sampleProfileImage})`}} onClick={() => {
                        dispatch({type: 'popup/set', payload: {
                            class: "is_black",
                            header: {
                                title: {text: "프로필 이미지 추가"},
                                sub: {text: "추가 방법을 선택해주세요"}
                            },
                            body: {
                                list: [
                                    {text: "카메라", func: () => {console.log("test 1")}},
                                    {text: "사진첩", func: () => {console.log("test 2")}},
                                    {text: "취소", func: () => {dispatch({type: 'popup/close'})}},
                                ]
                            }
                        }})
                    }}></button>
                    <div className="profileText">
                        <strong className="profileTitle">{store.loginData.homepage_name}</strong>
                    </div>
                </div>
            </div>
            <div className="myMenuBottom">
                <div className="myMenuControlBox">
                    <div className="myMenuControl">
                        <div className="myMenuControlTitle">신상알림 설정</div>
                        <CheckBoxBtn className="myMenuControlSwitch"></CheckBoxBtn>
                    </div>
                </div>
                <div className="myMenuBar"></div>
                <input type="file" onChange={(e) => {dispatch({type: 'inputFile/setFile', payload: e.target.files[0]})}}/>
                <ul className="myMenuLinkList">
                    <li className="myMenuLinkItem"><button className="myMenuLink" type="button" onClick={() => {console.log("store : ", store); script.s3upload(store.inputFile, 'vddm/')}}>S3 업로드 테스트</button></li>
                    <li className="myMenuLinkItem"><Link className="myMenuLink" to="#">1:1 문의</Link></li>
                    <li className="myMenuLinkItem"><Link className="myMenuLink" to="#">이용약관</Link></li>
                    <li className="myMenuLinkItem"><Link className="myMenuLink" to="#">개인정보처리방침</Link></li>
                    <li className="myMenuLinkItem"><Link className="myMenuLink" to="/">로그아웃</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default MyMenu;
