import React from "react";
import 'css/main.css';
import Header from "../layout/Header";
import Footer from "../layout/Footer";

function MyMenu() {
    return (
        <>
            <Header headerValue={{title: '내 정보'}}></Header>
            <div className="body">
                <div className="bodyInner mymenu">
                    mymenu
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}

export default MyMenu;
