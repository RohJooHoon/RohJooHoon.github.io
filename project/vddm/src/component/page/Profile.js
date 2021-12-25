import React from "react";
import 'css/main.css';
import Header from "../layout/Header";
import Footer from "../layout/Footer";

function Profile() {
    return (
        <>
            <Header headerValue={{title: '업체 팔로우'}}></Header>
            <div className="body">
                <div className="bodyInner profile">
                    profile
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}

export default Profile;
