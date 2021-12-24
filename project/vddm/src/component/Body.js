import React, { useState } from "react";
import List from 'component/List';
import Modal from 'component/Modal';

function Body() {
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
                <button onClick={()=>{modalChange()}}>모달 전환</button>
                <List></List>
                {modalSwitch()}
                {modalUse ? <Modal></Modal> : ''}
            </div>
        </div>
    );
}

export default Body;
