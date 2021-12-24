import React, { useState } from "react";

function ListItem(props) {
    let value = props.value;
    let index = props.index;
    let listFunc = props.listFunc;
    let nowClickIndexChange = props.nowClickIndexChange;
    return (
        <li className="listItem" onClick={()=>{nowClickIndexChange(index)}}>
            <button onClick={()=>{listFunc("changeTitle", index)}}>제목 변경</button>
            <div className="listTitle">{value.name}<button onClick={() => {listFunc("likeUp", index)}}> 👍</button><span>{value.like}</span></div>
            <div className="listDate">{value.date}</div>
        </li>
    );
}

export default ListItem;
