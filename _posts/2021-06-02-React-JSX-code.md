---
layout: post
title: 'React 정리'
tags: [ REACT ]
featured_image_thumbnail:
featured_image: assets/images/posts/react.png
featured: true
hidden: true
---

## 함수형 기본 형식
### 부모 컴포넌트
```javascript
import React from 'react';
import MyComponent from "./js/MyComponent"; // 내부에서 사용할 컴포넌트 (MyComponent라는 이름은 수정 가능)

function App() {
    return (
        <div className="App">
            <MyComponent name="리액트">마이컴포넌트</MyComponent> // 
        </div>
    );
}

export default App;
```

### 자식 컴포넌트
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

## JSX
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

