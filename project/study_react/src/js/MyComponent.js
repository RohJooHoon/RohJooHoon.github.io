import React from 'react';
import PropTypes from 'prop-types'; // propTypes 사용시 import

const MyComponent = ({ name, children }) => {
    return (
        <div>
            나의 새롭고 멋진 컴포넌트 {name} 입니다.
            children 값은 {children}
        </div>
    );
};

MyComponent.defaultProps = {
    name: '기본 이름',
};

MyComponent.propTypes = {
    name: PropTypes.string // name 의 기본 값을 string 타입으로 강제함
};

export default MyComponent;