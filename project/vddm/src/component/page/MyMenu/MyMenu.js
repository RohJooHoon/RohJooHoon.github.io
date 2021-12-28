import React, {useEffect, useState} from "react";
import 'css/main.css';

function MyMenu(props) {
    useEffect(() => {
        props.layoutSet({
            header: {
                title: '내 정보',
            },
            body: {
                class: 'mymenu'
            },
            footer: {
                onType: 'mymenu'
            },
        });
    }, []);
    return (
        <div className="bodyInner mymenu">
            mymenu
        </div>
    );
}

export default MyMenu;
