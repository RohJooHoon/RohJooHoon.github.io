import React, {useEffect} from "react";
import 'css/main.css';

function Profile(props) {
    useEffect(() => {
        props.layoutSet({
            header: {
                title: '업체 팔로우',
            },
            body: {
                class: 'profile'
            },
            footer: {
                onType: 'profile'
            },
        });
    }, []);
    return (
        <>
            <div className="bodyInner profile">
                profile
            </div>
        </>
    );
}

export default Profile;
