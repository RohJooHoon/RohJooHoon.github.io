import React, {useEffect} from "react";
import 'css/main.css';

function Company(props) {
    useEffect(() => {
        props.layoutSet({
            header: {
                title: '업체 팔로우',
            },
            body: {
                class: 'company'
            },
            footer: {
                onType: 'company'
            },
        });
    }, []);
    return (
        <>
            <div className="companyInner">
                Company
            </div>
        </>
    );
}

export default Company;
