import React from 'react';
import logo from './img/logo.svg';
import './css/App.css';
import MyComponent from "./js/MyComponent";
import Counter from "./js/Counter";

function App() {
    const name = '함수형 리액트';
    return (
        <div className="App">
            <header className="App-header">
                <div className='react' style={{color: 'red'}}>{name} 안녕</div>
                <img src={logo} className="App-logo" alt="logo"/>
                {name == "함수형 리액트" ? <div>{name} 입니다.</div> : <div>{name} 아닙니다.</div>}
            </header>
            <MyComponent name="React">마이컴포넌트</MyComponent>
            <Counter></Counter>
        </div>
    );
};

export default App;
