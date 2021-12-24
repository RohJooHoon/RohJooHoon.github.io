import React, { useState } from "react";
import ListItem from 'component/ListItem';

function List(props) {
    let list = props.list;
    let listFunc = props.listFunc;
    let nowClickIndexChange = props.nowClickIndexChange;
    return (
        <>
            <ul className="list">
                {list.map(function (value, index) {
                    return <ListItem value={value} index={index} listFunc={listFunc} nowClickIndexChange={nowClickIndexChange} key={index}></ListItem>
                })}
            </ul>
        </>
    );
}

export default List;
