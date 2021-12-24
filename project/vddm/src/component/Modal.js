import React, { useState } from "react";

function Modal(props) {
    let list = props.list;
    let nowClickIndex = props.nowClickIndex;
    return (
        <div className="modal">
            <h2>제목 : {list[nowClickIndex].name}</h2>
            <p>날짜 : {list[nowClickIndex].date}</p>
            <p>좋아요 : {list[nowClickIndex].like}</p>
        </div>
    );
}

export default Modal;
