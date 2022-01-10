import React, {useEffect} from "react";
import sampleProfileImage from 'img/sampleProfileImage.jpg';
import './style.css';
import { useInView } from "react-intersection-observer";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

function Company() {
    const history = useHistory();

    const store = useSelector((state) => state);
    const dispatch = useDispatch();
    const [ref, inView] = useInView();

    useEffect(() => {
        // 레이아웃 세팅
        dispatch({type: 'layout/set', payload: {
                header: {
                    title: '업체 팔로우',
                },
                footer: {
                    onType: 'company'
                },
            }
        })

        // 페이지 진입시 최초 업체 리스트 조회
        if (!store.company.list.length) {
            dispatch({
                type: 'followUser/set',
                payload: store.company.list.following_yn == "Y" ? true : false
            });
            dispatch({type: 'company/listGet'});
        }
    }, []);

    useEffect(() => {
        console.log("inView : ", inView);
        if (inView) {
            dispatch({type: 'company/listGet'});
        }
    }, [inView]);

    function companyListDraw() {
        let listJsx;
        if (store.company.list.length) {
            listJsx = store.company.list.map(function (value, index) {
                let etc_info = JSON.parse(value.etc_info);
                return (
                    <li className="companyProfileItem" key={index}>
                        <button ref={ref} className='companyProfile profile' onClick={() => {history.push(`/company/profile/${value.wholesale_client_id}`)}} value={value.wholesale_client_id}>
                            <div className="profileImg" style={{backgroundImage: `url(${sampleProfileImage})`}}></div>
                            <div className="profileText">
                                <strong className="profileTitle">{value.homepage_name}</strong>
                                <div className="profileTag">{'@' + etc_info.kakao_id}</div>
                            </div>
                        </button>
                        <button className={"companyProfileButton button is_small" + (value.following_yn == 'Y' ? ' is_on' : '')} onMouseDown={(e) => {followUser(e)}} onClick={() => {dispatch({type: 'company/follow', payload: index})}} value={[value.following_yn, value.wholesale_client_id]}>{value.following_yn == 'Y' ? '팔로잉' : '팔로우'}</button>
                    </li>
                );
            })
        }
        return listJsx;
    }

    const followUser = (e) => {
        if (e.target.value.split(",")[0] === "N") {
            dispatch({
                type: 'followUser/follow',
                payload: e.target.value.split(",")[1]
            });
        } else if (e.target.value.split(",")[0] === "Y") {
            dispatch({
                type: 'followUser/unFollow',
                payload: e.target.value.split(",")[1]
            });
        }
        console.log('eeeeeee',e.target)
    }

    return (
        <>
            <div className="company">
                <ul className="companyProfileList">
                    {companyListDraw()}
                </ul>
            </div>
        </>
    );
}

export default Company;
