import React from "react";
import footerLink from 'img/footerLink.png';
import {Link} from 'react-router-dom';

function Footer() {
    return (
        <div className="footer">
            <div className="footerInner">
                <Link className="footerItem" to="/profile"><div className="footerIcon" style={{backgroundImage: `url(${footerLink})`, backgroundPositionX: '0px'}}></div></Link>
                <Link className="footerItem is_active" to="/main"><div className="footerIcon" style={{backgroundImage: `url(${footerLink})`, backgroundPositionX: '-50px'}}></div></Link>
                <Link className="footerItem" to="/mymenu"><div className="footerIcon" style={{backgroundImage: `url(${footerLink})`, backgroundPositionX: '-100px'}}></div></Link>
            </div>
        </div>
    );
}

export default Footer;
