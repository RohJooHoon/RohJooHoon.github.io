import React, { useState } from "react";
import List from 'component/List';
import Modal from 'component/Modal';

function Body() {
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

    let [nowClickIndex, nowClickIndexSet] = useState(0);
    function nowClickIndexChange(index) {
        nowClickIndexSet(index);
    }

    let [modalUse, modalUseSet] = useState(false);
    function modalChange() {
        modalUseSet(!modalUse);
    }
    function modalSwitch() {
        if (modalUse) {
            return <Modal></Modal>;
        } else {
            return '';
        }
    }
    return (
        <div className="body">
            <div className="bodyInner">
                <button onClick={()=>{listFunc("sorting")}}>리스트 소팅</button>
                <button onClick={()=>{modalChange()}}>모달 전환</button>
                <List list={list} listFunc={listFunc} nowClickIndexChange={nowClickIndexChange}></List>
                {modalUse ? <Modal list={list} nowClickIndex={nowClickIndex}></Modal> : ''}
            </div>
        </div>
    );
}

export default Body;
