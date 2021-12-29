import React, {useEffect} from "react";
import 'css/company.css';

function Company(props) {
    useEffect(() => {
        props.layoutSet({
            header: {
                title: '업체 팔로우',
            },
            footer: {
                onType: 'company'
            },
        });
    }, []);
    return (
        <>
            <div className="company">
                Company
            </div>
        </>
    );
}

export default Company;
