import React from "react";
import footerLink from 'img/footerLink.png';
import {Link} from 'react-router-dom';

function Footer(props) {
    const layout = props.layout;
    const footer = layout.footer;
    return (
        <>
            {footer ?
                <div className="footer">
                    <div className="footerInner">
                        <Link className={"footerItem" + (footer.onType == 'company' ? ' is_active' : '')} to="/company">
                            <div className="footerIcon" style={{backgroundImage: `url(${footerLink})`, backgroundPositionX: '0px'}}></div>
                        </Link>
                        <Link className={"footerItem" + (footer.onType == 'main' ? ' is_active' : '')} to="/main">
                            <div className="footerIcon" style={{backgroundImage: `url(${footerLink})`, backgroundPositionX: '-50px'}}></div>
                        </Link>
                        <Link className={"footerItem" + (footer.onType == 'myMenu' ? ' is_active' : '')} to="/mymenu">
                            <div className="footerIcon" style={{backgroundImage: `url(${footerLink})`, backgroundPositionX: '-100px'}}></div>
                        </Link>
                    </div>
                </div>
                :
                <></>
            }
        </>
    );
}

export default Footer;
