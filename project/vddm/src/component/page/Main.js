import React from "react";
import 'css/main.css';
import Header from "../layout/Header";
import Footer from "../layout/Footer";

function Main() {
    return (
        <>
            <Header headerValue={{left: 'logo'}}></Header>
            <div className="body">
                <div className="bodyInner main">
                    main
                    <ul className="mainThumbnailList">
                        <li className="mainThumbnailItem"></li>
                        <li className="mainThumbnailItem"></li>
                        <li className="mainThumbnailItem"></li>
                        <li className="mainThumbnailItem"></li>
                        <li className="mainThumbnailItem"></li>
                        <li className="mainThumbnailItem"></li>
                        <li className="mainThumbnailItem"></li>
                    </ul>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}

export default Main;
