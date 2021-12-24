import React, { useState } from "react";

function List(props) {
    let [list, listSet] = useState([
        {
            name: "신촌 닭발 맛집",
            date: "2월 18일 발행",
            like: 0
        },
        {
            name: "강남 고기 맛집",
            date: "2월 17일 발행",
            like: 0
        },
        {
            name: "종로 곱창 맛집",
            date: "2월 19일 발행",
            like: 0
        },
    ]);

    function listFunc(type, index) {
        let newList = [...list];
        if (type == "changeTitle") {
            newList[index].name = '제목을 입력하세요';
        } else if (type == "likeUp") {
            newList[index].like = newList[index].like  + 1;
        } else if (type == "sorting") {
            newList.sort(function (a, b) {
                if(a.name > b.name) return 1;
                if(a.name === b.name) return 0;
                if(a.name < b.name) return -1;
            });
        }
        listSet(newList);
    }

    return (
        <ul className="list">
            <button onClick={()=>{listFunc("sorting")}}>리스트 소팅</button>
            {list.map(function (value, index) {
                return (
                    <li className="listItem" key={index}>
                        <button onClick={()=>{listFunc("changeTitle", index)}}>제목 변경</button>
                        <div className="listTitle">{value.name}<button onClick={() => {listFunc("likeUp", index)}}> 👍</button><span>{value.like}</span></div>
                        <div className="listDate">{value.date}</div>
                    </li>
                )
            })}
        </ul>
    );
}

export default List;
