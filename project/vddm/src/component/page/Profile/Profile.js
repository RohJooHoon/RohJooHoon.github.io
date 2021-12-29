import React, {useEffect} from "react";

function Profile(props) {
    useEffect(() => {
        props.layoutSet({
            header: {
                left: 'back',
                back: '/company'
            },
            body: {
                class: 'profile'
            },
            footer: {
                onType: 'company'
            },
        });
    }, []);
    return (
        <>
            <div className="profileInner">
                Profile
            </div>
        </>
    );
}

export default Profile;
