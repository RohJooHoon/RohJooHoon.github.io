import React, {useEffect} from "react";
import 'css/profile.css';

function Profile(props) {
    useEffect(() => {
        props.layoutSet({
            header: {
                left: 'back',
                back: '/company'
            },
            footer: {
                onType: 'company'
            },
        });
    }, []);
    return (
        <>
            <div className="profile">
                Profile
            </div>
        </>
    );
}

export default Profile;
