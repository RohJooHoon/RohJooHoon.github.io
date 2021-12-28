import React, {useEffect} from "react";
import axios from "axios";
import 'css/main.css';

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

        // 리스트 데이터 조회
        axios.get(`https://devapi.kiwisnap.net/vddm/list?start=0&length=10`,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        }).then(result => {
            console.log("list result : ", result);
        });
    }, []);
    return (
        <div className="mainInner">
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
    );
}

export default Main;
