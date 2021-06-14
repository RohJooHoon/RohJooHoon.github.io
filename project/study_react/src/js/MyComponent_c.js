import React, {Component} from 'react';
import PropTypes from 'prop-types'; // propTypes 사용시 import

class MyComponent_c extends Component {
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
    };
};

export default MyComponent_c;