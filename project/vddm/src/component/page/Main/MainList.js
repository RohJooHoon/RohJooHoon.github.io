import React from "react";
import {Link} from 'react-router-dom';
function MainList(props) {

    function mainThumbnailListDraw() {
        let listJsx = props.list.map(function (value, index) {
            return (
                <li className="mainThumbnailItem" key={index}>
                    <Link className="mainThumbnailItemImg" to={`/main/product/${value.product_seq}`} style={{backgroundImage: `url(${value.vimeo_files ? JSON.parse(value.vimeo_files).preview.url : value.image_url})`}}>
                        {value.vimeo_files ? <video></video> : ''}
                    </Link>
                </li>
            );
        })
        return listJsx;
    }

    return (
        <ul className="mainThumbnailList">
            {mainThumbnailListDraw()}
        </ul>
    );
}

export default MainList;
