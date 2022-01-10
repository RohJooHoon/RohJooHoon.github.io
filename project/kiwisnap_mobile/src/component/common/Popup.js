import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";

function Popup() {
    const store = useSelector((state) => state);
    const dispatch = useDispatch();
    const modalRef = useRef();

    const modalButton = (e) => {
        const condition = modalRef.current.contains(e.target);
        if (!condition) {
            dispatch({type: 'popup/close'});
        }
    }

    return (
        <div className="dim" onClick={(e) => {modalButton(e)}}>
            <div className={"popup" + (store.popup.class ? ' ' + store.popup.class : '')} ref={modalRef}>
                {store.popup.header &&
                    <div className="popupHeader">
                        {store.popup.header.title &&
                            <strong className="popupHeaderTitle" >{store.popup.header.title.text}</strong>
                        }
                        {store.popup.header.sub &&
                            <div className="popupHeaderSub" >{store.popup.header.sub.text}</div>
                        }
                    </div>
                }
                {store.popup.body &&
                    <div className="popupBody">
                        {store.popup.body.list.map(function (value, index) {
                            return <a className="popupBodyButton" type="button" href={value.href} key={index} onClick={value.func}>{value.text}</a>
                        })}
                    </div>
                }
            </div>
        </div>
    );
}

export default Popup;
