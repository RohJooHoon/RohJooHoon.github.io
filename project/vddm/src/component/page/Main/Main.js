import React, {useEffect} from "react";
import 'css/main.css';
import MainList from "component/page/Main/MainList";

function Main(props) {
    useEffect(() => {
        // 레이아웃 세팅
        props.layoutSet({
            header: {
                left: 'logo',
            },
            body: {
                class: 'main'
            },
            footer: {
                onType: 'main'
            },
        });
    }, []);
    return (
        <div className="mainInner">
            <MainList></MainList>
        </div>
    );
}

export default Main;
