const CheckBoxBtn = function (props) {
    return (
        <div className={props.className ? props.className + ' checkBoxBtn' : 'checkBoxBtn'}>
            <input className="checkBoxBtnInput" type="checkBox"/>
            <div className="checkBoxBtnBar"></div>
            <div className="checkBoxBtnCircle"></div>
        </div>
    );
}

export {CheckBoxBtn};

