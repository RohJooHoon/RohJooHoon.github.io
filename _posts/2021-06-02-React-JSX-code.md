---
layout: post
title: 'React 정리'
tags: [ REACT ]
featured_image_thumbnail:
featured_image: assets/images/posts/react.png
featured: true
hidden: true
---

## 기본 형식 (Component, Props, State)
***
### 함수형 부모 컴포넌트 ( ./App.js )
```javascript
import React from 'react';
import MyComponent from "./js/MyComponent";
import Counter from "./js/Counter";

function App() {
    return (
        <div className="App">
            <MyComponent name="리액트">마이컴포넌트</MyComponent>
            <Counter></Counter>
        </div>
    );
}

export default App;
```

### 함수형 자식 컴포넌트 - Props ( ./js/MyComponent.js )
```javascript
import React from 'react';
import PropTypes from 'prop-types'; // propTypes 사용시 import

const MyComponent = ({ name, children }) => {
    return (
        <div>
            나의 새롭고 멋진 컴포넌트 {name} 입니다. // name = 리액트
            children 값은 {children} // children = 마이컴포넌트
        </div>
    );
};

MyComponent.defaultProps = {
    name: '기본이름', // name 값 없는경우 노출 텍스트
};

MyComponent.propTypes = {
    name: PropTypes.string // name 의 기본 값을 string 타입으로 강제함 (prop-types import 시에만 동작)
};

export default MyComponent;
```

### 함수형 자식 컴포넌트 - State ( ./js/Counter.js )
```javascript
import React, {useState, useEffect} from 'react';

const Counter = () => {
    const [number, setNumber] = useState(0);
    const fixedNumber = 0;
    useEffect(() => { console.log("useState callBack"); });

    return (
        <div>
            <h1>{number}</h1>
            <h2>바뀌지 않는 값: {fixedNumber}</h2>
            <button onClick={() => setNumber(number + 1)}>+1</button> {/* 이벤트 카멜표기법, 내부에 함수형 값 */}
        </div>
    );
};

export default Counter;
```

***

### 클래스형 부모 컴포넌트 ( ./App.js )
```javascript
import React, { Component } from 'react';
import MyComponent from "./js/MyComponent";
import Counter from "./js/Counter";

class App extends Component {
    render() {
        return (
            <div className="App">
                <MyComponent name="리액트">마이컴포넌트</MyComponent>
                <Counter></Counter>
            </div>
        );
    }
}

export default App;
```

### 클래스형 자식 컴포넌트 - Props ( ./js/MyComponent.js )
```javascript
import React, {Component} from 'react';
import PropTypes from 'prop-types'; // propTypes 사용시 import

class MyComponent extends Component {
    static defaultProps = {
        name: '기본이름', // name 값 없는경우 노출 텍스트
    };
    static propTypes = {
        name: PropTypes.string // name 의 기본 값을 string 타입으로 강제함 (prop-types import 시에만 동작)
    };
    render() {
        const {name, children} = this.props; // 비구조화 할당
        return (
            <div>
                나의 새롭고 멋진 컴포넌트 {name} 입니다. {/* name = 리액트 */}
                children 값은 {children} {/* children = 마이컴포넌트 */}
            </div>
        );
    }
}

export default MyComponent;
```

### 클래스형 자식 컴포넌트 - State ( ./js/Counter.js )
```javascript
import React, {Component} from 'react';

class Counter extends Component {
    state = {
        number: 0,
        fixedNumber: 0,
    };

    render() {
        const {number, fixedNumber} = this.state; // state를 조회할 때는 this.state로 조회합니다.
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
            </div>
        );
    };
};

export default Counter;
```

## JSX
***
### 요소 감싸기
```javascript
return (
    <h1>리액트 안녕!</h1>
    <h2>잘 작동하니?</h2>
)
```
리엑트 컴포넌트는 하나의 요소로 감싸져있어야합니다. 때문에 위 코드는 에러가 발생합니다.

```javascript
return (
    <div> /* or */ <Fragment> /* or */ <>
        <h1>리액트 안녕!</h1>
        <h2>잘 작동하니?</h2>
    </div> /* or */ </Fragment> /* or */ </>
)
```
위와 같이 &lt;div>&lt;/div> 혹은 &lt;Fragment>&lt;/Fragment> 혹은 &lt;>&lt;/>로 감싸주어야야 오류가 발생하지 않습니다.



