import React from 'react';
import PropTypes from 'prop-types';

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

MyComponent.PropTypes = {
    name: PropTypes.string,
};

export default MyComponent;