import React, {useEffect} from "react";
import 'css/main.css';

function Main(props) {
    useEffect(() => {
        props.layoutSet({
            header: {
                left: 'logo',
            },
            body: {
                class: 'main'
            },
            footer: {
                onType: 'main'
            },
        });
    }, []);
    return (
        <ul className="mainThumbnailList">
            <li className="mainThumbnailItem"></li>
            <li className="mainThumbnailItem"></li>
            <li className="mainThumbnailItem"></li>
            <li className="mainThumbnailItem"></li>
            <li className="mainThumbnailItem"></li>
            <li className="mainThumbnailItem"></li>
            <li className="mainThumbnailItem"></li>
        </ul>
    );
}

export default Main;
