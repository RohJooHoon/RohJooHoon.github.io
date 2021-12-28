import React from "react";

function MainListItem(props) {
    return (
        <li className="mainThumbnailItem" onClick={props.onClick}>
            <div className="mainThumbnailItemImg" style={{backgroundImage: `url(${props.value.vimeo_files ? JSON.parse(props.value.vimeo_files).preview.url : props.value.image_url})`}}></div>
            <div className="mainThumbnailItemTitle">{props.value.product_name}</div>
        </li>
    );
}

export default MainListItem;
