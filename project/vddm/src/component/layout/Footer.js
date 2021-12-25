import React from "react";
import {Link} from 'react-router-dom';

function Footer() {
    return (
        <div className="footer">
            <div className="footerInner">
                <div className="footerItem"><link className="footerLink" to=""></link></div>
                <div className="footerItem is_active"><link className="footerLink" to="/main"></link></div>
                <div className="footerItem"><link className="footerLink" to=""></link></div>
            </div>
        </div>
    );
}

export default Footer;
