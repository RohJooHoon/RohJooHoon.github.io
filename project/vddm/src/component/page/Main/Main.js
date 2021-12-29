import React, {useEffect, useState} from "react";
import axios from "axios";
import 'css/main.css';
import MainListItem from "component/page/Main/MainListItem";

function Main(props) {
    let listGap = 10; // 요청개수
    let [list, listSet] = useState([]);

    // 리스트 데이터 조회
    function getList() {
        axios.get(`https://devapi.kiwisnap.net/vddm/product/list?start=${list.length}&length=${listGap}`,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        }).then(result => {
            listSet([...list, ...result.data]);
        });
    }

    useEffect(() => {
        console.log("list : ", list);
    }, [list]);

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

        if (!list.length) {
            getList();
        }
    }, []);
    return (
        <div className="mainInner">
            <ul className="mainThumbnailList">
                {list.map(function (value, index) {
                    return <MainListItem value={value} key={list.length + index} onClick={getList}></MainListItem>
                })}
            </ul>
        </div>
    );
}

export default Main;
