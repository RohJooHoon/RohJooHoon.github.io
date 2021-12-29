import React, {useEffect} from "react";
import {Link} from 'react-router-dom';
import 'css/login.css';

function Index(props) {
    useEffect(() => {
        props.layoutSet({
            body: {
                class: 'loginBg is_noneHeader is_noneFooter'
            },
        });
    }, []);
    return (
        <div className="login" style={{maxHeight: 'calc(477px + 55px * 2)'}}>
            <div className="loginTop">
                <h2 className="loginSubTitle">
                    모두에게 열린 공간
                </h2>
                <h1 className="loginTitle">
                    <span>V</span><span>D</span><span>D</span><span>M</span>
                </h1>
            </div>
            <div className="loginBottom">
                <Link className="ghostButton is_white" to="/login">로그인</Link>
                <Link className="loginTextButton" to="/signup">회원이 아니십니까?</Link>
            </div>
        </div>
    );
}

export default Index;
