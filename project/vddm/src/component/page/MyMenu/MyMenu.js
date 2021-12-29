import React, {useEffect, useState} from "react";
import 'css/myMenu.css';

function MyMenu(props) {
    useEffect(() => {
        props.layoutSet({
            header: {
                title: '내 정보',
            },
            body: {
                class: 'myMenu'
            },
            footer: {
                onType: 'myMenu'
            },
        });
    }, []);
    return (
        <div className="myMenuInner">
            <div className="my">myMenu</div>
        </div>
    );
}

export default MyMenu;
