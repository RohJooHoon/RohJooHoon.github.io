import React, {useState} from "react";
import listData from 'js/listData';
import List from 'component/List';
import Modal from 'component/Modal';

function Body() {
    let [list, listSet] = useState(listData);

    function listFunc(type, index) {
        let newList = [...list];
        if (type == "changeTitle") {
            newList[index].name = '제목을 입력하세요';
        } else if (type == "likeUp") {
            newList[index].like = newList[index].like + 1;
        } else if (type == "sorting") {
            newList.sort(function (a, b) {
                if (a.name > b.name) return 1;
                if (a.name === b.name) return 0;
                if (a.name < b.name) return -1;
            });
        } else if (type == "add") {
            let nowTitle = inputValue;
            inputValueSet('');
            newList.push({
                name: nowTitle,
                date: "2월 20일 발행",
                like: 0
            })
        }
        listSet(newList);
    }

    let [inputValue, inputValueSet] = useState('');
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
                <div>
                    <button onClick={() => {
                        listFunc("sorting")
                    }}>리스트 소팅
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        modalChange()
                    }}>모달 전환
                    </button>
                </div>
                <div><input onInput={(e) => {
                    inputValueSet(e.target.value)
                }} value={inputValue}/>
                    <button onClick={() => {
                        listFunc("add")
                    }}>발행
                    </button>
                </div>
                <List list={list} listFunc={listFunc} nowClickIndexChange={nowClickIndexChange}></List>
                {modalUse ? <Modal list={list} nowClickIndex={nowClickIndex}></Modal> : ''}
            </div>
        </div>
    );
}

export default Body;
