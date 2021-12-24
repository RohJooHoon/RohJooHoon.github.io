import React, { useState } from "react";
import './css/layout.css';
import './css/common.css';

function App() {
    let [list, listSet] = useState([
        {
            name: "강남 고기 맛집",
            date: "2월 17일 발행",
            like: 0
        },
        {
            name: "신촌 닭발 맛집",
            date: "2월 18일 발행",
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
        }
        listSet(newList);
    }
    return (
        <>
            <header className='header'>
                <div className='headerInner'>
                    <div className='headerLeft'>
                        <a className='headerLogo' href='#'></a>
                    </div>
                    <div className='headerTitle'>{list[0].name}</div>
                    <div className='headerRight'>

                    </div>
                </div>
            </header>
            <div className="body">
                <div className="bodyInner">
                    <ul className="list">
                        <li className="listItem" key="0">
                            <button onClick={()=>{listFunc("changeTitle", 0)}}>제목 변경</button>
                            <div className="listTitle">{list[0].name}<button onClick={() => {listFunc("likeUp", 0)}}> 👍</button><span>{list[0].like}</span></div>
                            <div className="listDate">{list[0].date}</div>
                        </li>
                        <li className="listItem" key="1">
                            <button onClick={()=>{listFunc("changeTitle", 1)}}>제목 변경</button>
                            <div className="listTitle">{list[1].name}<button onClick={() => {listFunc("likeUp", 1)}}> 👍</button><span>{list[1].like}</span></div>
                            <div className="listDate">{list[1].date}</div>
                        </li>
                        <li className="listItem" key="2">
                            <button onClick={()=>{listFunc("changeTitle", 2)}}>제목 변경</button>
                            <div className="listTitle">{list[2].name}<button onClick={() => {listFunc("likeUp", 2)}}> 👍</button><span>{list[2].like}</span></div>
                            <div className="listDate">{list[2].date}</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer">
                sdfdsf
            </div>
        </>
    );
}

export default App;
