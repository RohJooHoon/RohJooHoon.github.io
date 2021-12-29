import React, {useEffect, useState} from "react";
import axios from "axios";

function MainList(props) {
    let listGap = 10; // 요청개수
    let [list, listSet] = useState([]);

    useEffect(() => {
        if (!list.length) {
            getList();
        }
    }, []);

    function mainThumbnailListDraw() {
        let listJsx = list.map(function (value, index) {
            return (
                <li className="mainThumbnailItem" key={index} onClick={getList}>
                    <div className="mainThumbnailItemImg" style={{backgroundImage: `url(${value.vimeo_files ? JSON.parse(value.vimeo_files).preview.url : value.image_url})`}}></div>
                    {/*<div className="mainThumbnailItemTitle">{value.product_name}</div>*/}
                </li>
            );
        })
        return listJsx;
    }

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

    return (
        <ul className="mainThumbnailList">
            {mainThumbnailListDraw()}
        </ul>
    );
}

export default MainList;
