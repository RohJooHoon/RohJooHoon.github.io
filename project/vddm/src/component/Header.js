import React, { useState } from "react";

function Header() {
    return (
        <header className='header'>
            <div className='headerInner'>
                <div className='headerLeft'>
                    <a className='headerLogo' href='#'></a>
                </div>
                <div className='headerTitle'>제목</div>
                <div className='headerRight'>ddd</div>
            </div>
        </header>
    );
}

export default Header;
