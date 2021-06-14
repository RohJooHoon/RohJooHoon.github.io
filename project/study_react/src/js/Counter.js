import React, {useState, useEffect} from 'react';

const Counter = () => {
    const [number, setNumber] = useState(0);
    const fixedNumber = 0;
    const [inputText, setInputText] = useState('');
    useEffect(() => { console.log("useState callBack"); });

    return (
        <div>
            <h1>{number}</h1>
            <h2>바뀌지 않는 값: {fixedNumber}</h2>
            <button onClick={() => setNumber(number + 1)}>+1</button> {/* 이벤트 카멜표기법, 내부에 함수형 값 */}
            <h3>{inputText}</h3>
            <input type="text" onChange={e => setInputText(e.target.value)} value={inputText} />
            <button type="button" onClick={() => setInputText('')}>초기화</button>
        </div>
    );
};

export default Counter;