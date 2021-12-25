import React, { useState } from "react";
import {Link, Route, Switch} from 'react-router-dom';
import 'css/login.css';
function Index() {
    return (
        <div className="body">
            <div className="bodyInner is_noneHeader login">
                <div className="loginInner" style={{maxHeight: 'calc(477px + 55px * 2)'}}>
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
            </div>
        </div>
    );
}

export default Index;
