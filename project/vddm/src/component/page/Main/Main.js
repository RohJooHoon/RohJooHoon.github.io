import React, {useEffect} from "react";
import 'css/main.css';
import MainList from "component/page/Main/MainList";

function Main(props) {
    useEffect(() => {
        if (!props.list.length) {
            props.getList();
        }
    }, []);

    useEffect(() => {
        // 레이아웃 세팅
        props.layoutSet({
            header: {
                left: 'logo',
            },
            footer: {
                onType: 'main'
            },
        });
    }, []);
    return (
        <div className="main">
            <button onClick={props.getList} style={{position: 'fixed',right: '14px',top: '14px', flex: 'none', zIndex: '100', fontSize: '14px'}}>리스트 요청 테스트 버튼 (스크롤 콜백 방식으로 변경 필요)</button>
            <MainList list={props.list}></MainList>
        </div>
    );
}

export default Main;
