import React, {Component} from 'react';

class Counter_c extends Component {
    state = {
        number: 0,
        fixedNumber: 0,
        inputText: '',
    };

    render() {
        const {number, fixedNumber, inputText} = this.state; // state를 조회할 때는 this.state로 조회합니다.
        return (
            <div>
                <h1>{number}</h1>
                <h2>바뀌지 않는 값: {fixedNumber}</h2>
                <button onClick={() => { {/* 이벤트 카멜표기법, 내부에 함수형 값 */}
                    this.setState(
                        // {number: number + 1}, // 비동기 업데이트
                        // prevState => { return { number: prevState.number + 1 }; }, // 동기 업데이트
                        prevState => ({ number: prevState.number + 1 }), // 동기 업데이트 + return 생략 (바로 객체로 반환)
                        () => { console.log("setState callBack"); }, // setState 2번 매개변수는 callBack 함수
                    );
                }}>+1</button>
                <h3>{inputText}</h3>
                <input ref={(ref) => {this.input = ref;}} type="text" onChange={e => {this.setState(prevState => ({inputText: e.target.value}))}} value={inputText} />
                <button type="button" onClick={() => {
                    this.setState(prevState => ({inputText: ''}));
                    this.input.focus();
                }}>초기화</button>
            </div>
        );
    };
};

export default Counter_c;