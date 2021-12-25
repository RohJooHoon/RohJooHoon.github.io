import React from "react";
import {Link, useHistory} from 'react-router-dom';

function Header(props) {
    const history = useHistory();
    function headerContent(type) {
        if (type == "left" && props.headerValue.left) {
            if (props.headerValue.left == "logo") {
                return <Link className="headerLogo" to="/"></Link>;
            } else if (props.headerValue.left == "back") {
                return props.headerValue.back ? <Link className="headerBack" to={props.headerValue.back}></Link> : <a className="headerBack" onClick={()=> {history.goBack();}}></a>;
            } else if (props.headerValue.left == "backWhite") {
                return props.headerValue.back ? <Link className="headerBack is_white" to={props.headerValue.back}></Link> : <a className="headerBack is_white" onClick={()=> {history.goBack();}}></a>;
            }
        } else if (type == "title" && props.headerValue.title) {

        } else if (type == "right" && props.headerValue.right) {

        }
    }
    return (
        <header className='header'>
            <div className='headerInner'>
                <div className='headerLeft'>
                    {headerContent('left')}
                </div>
                <div className='headerTitle'>
                    {headerContent('title')}
                </div>
                <div className='headerRight'>
                    {headerContent('right')}
                </div>
            </div>
        </header>
    );
}

export default Header;
