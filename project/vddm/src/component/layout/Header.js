import React, { useState } from "react";
import {Link, Route, Switch} from 'react-router-dom';

function Header(props) {
    console.log("Header props : ", props);
    function headerContent(type) {
        if (type == "left" && props.headerValue.left) {
            if (props.headerValue.left == "logo") {
                return <Link className="headerLogo" to="/main"></Link>;
            } else if (props.headerValue.left == "back") {
                return <Link className="headerBack" to="/"></Link>;
            } else if (props.headerValue.left == "backWhite") {
                return <Link className="headerBack is_white" to="/"></Link>;
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
