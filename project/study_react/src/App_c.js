import React, { Component } from 'react';
import logo from './img/logo.svg';
import './css/App.css';
import MyComponent_c from "./js/MyComponent_c";
import Counter_c from "./js/Counter_c";

class App_c extends Component {
    render() {
        const name = '클래스형 리액트';
        return (
            <div className="App">
                <header className="App-header">
                    <div className='react' style={{color: 'red'}}>{name} 안녕</div>
                    <img src={logo} className="App-logo" alt="logo"/>
                    {name == "클래스형 리액트" ? <div>{name} 입니다.</div> : <div>{name} 아닙니다.</div>}
                </header>
                <MyComponent_c name="React">마이컴포넌트</MyComponent_c>
                <Counter_c ref={(ref) => {this.counter = ref;}}></Counter_c>
            </div>
        );
    }
}

export default App_c;
