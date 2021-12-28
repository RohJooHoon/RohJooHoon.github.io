import React from "react";
import {Link, useHistory} from 'react-router-dom';

function Header(props) {
    const layout = props.layout;
    const header = layout.header;
    const history = useHistory();

    function headerContent(type) {
        if (type == "left" && layout.header.left) {
            if (layout.header.left == "logo") {
                return <Link className="headerLogo" to="/"></Link>;
            } else if (layout.header.left == "back") {
                return layout.header.back ? <Link className="headerBack" to={layout.header.back}></Link> : <a className="headerBack" onClick={() => {
                    history.goBack();
                }}></a>;
            } else if (layout.header.left == "backWhite") {
                return layout.header.back ? <Link className="headerBack is_white" to={layout.header.back}></Link> : <a className="headerBack is_white" onClick={() => {
                    history.goBack();
                }}></a>;
            }
        } else if (type == "title" && layout.header.title) {
            return layout.header.title;
        } else if (type == "right" && layout.header.right) {
        }
    }

    return (
        <>
            {header ?
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
                : <></>
            }
        </>
    );
}

export default Header;
