import React, {useEffect, useState} from "react";
import 'css/myMenu.css';

function MyMenu(props) {
    useEffect(() => {
        props.layoutSet({
            header: {
                title: '내 정보',
            },
            footer: {
                onType: 'myMenu'
            },
        });
    }, []);
    return (
        <div className="myMenu">
            <div className="myMenuTop">

            </div>
            <div className="myMenuBottom">myMenu</div>
        </div>
    );
}

export default MyMenu;
