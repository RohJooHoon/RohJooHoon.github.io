import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import './style.css';
import script from "js/common";
import {useInView} from "react-intersection-observer";
import {useDispatch, useSelector} from "react-redux";

function CompanyProfile() {
    let {wholesale_client_id} = useParams();
    let [detail, setDetail] = useState({});
    let [grid, setGrid] = useState(true);
    const store = useSelector((state) => state);
    const [ref, inView] = useInView();
    const dispatch = useDispatch();

    const storeCompanyCopy = {...store.company}

    useEffect(() => {
        if (detail.length != undefined) {
            console.log("detail : ", detail);
        }
    }, [detail]);

    // 업체 상세 데이터 조회
    function getDetail() {
        script.callAxios('get', {
            url: `/vddm/detail?wholesale_client_id=${wholesale_client_id}`,
            result: (result) => {
                result.data.etc_info = JSON.parse(result.data.etc_info);
                setDetail(result.data);
                dispatch({
                    type: 'followUser/set',
                    payload: result.data.following_yn == "Y" ? true : false
                });
            },
            err: (err) => {
                console.log("getDetail err : ", err)
            }
        });
    }

    function snsButton(type) {
        if (type == 'call') {
            dispatch({type: 'popup/set', payload: {
                header: {
                    title: {text: "전화걸기"},
                    sub: {text: "통화할 번호를 선택해 주세요"}
                },
                body: {
                    list: [
                        {text: `주간: ${detail.etc_info.phone}`, func: () => {console.log("test 1")}, href: `tel:${detail.etc_info.phone}`},
                        {text: "야간: 02-000-0000", func: () => {console.log("test 2")}, href: "tel:02-000-0000"},
                        {text: "핸드폰: 010-000-0000", func: () => {console.log("test 3")}, href: "tel:010-000-0000"},
                        {text: "취소", func: () => {dispatch({type: 'popup/close'})}},
                    ]
                }
            }})
        } else if (type == 'other') {
            dispatch({type: 'popup/set', payload: {
                    header: {
                        title: {text: "카카오톡"},
                        sub: {text: "카카오톡 아이디 입니다"}
                    },
                    body: {
                        list: [
                            {text: `${detail.etc_info.kakao_id}`, func: () => {console.log("test 1")}},
                            {text: "취소", func: () => {dispatch({type: 'popup/close'})}},
                        ]
                    }
                }})
        }
    }

    useEffect(() => {
        dispatch({
            type: 'layout/set',
            payload: {
                header: {
                    left: 'back'
                },
                body: {
                    class: 'is_noneHeader'
                },
                footer: {
                    onType: 'company'
                },
            }
        })

        getDetail();

        // 페이지 진입시 최초 상품 리스트 조회
        if (!store.product.list.length) {
            dispatch({type: 'product/listGet'});
        }
    }, []);

    console.log('storeCompanyCopy:::::::',storeCompanyCopy.list)

    useEffect(() => {
        if (inView) {
            dispatch({type: 'product/listGet'});
        }
    }, [inView]);

    function productThumbnailListDraw() {
        let listJsx;
        if (store.product.list.length) {
            listJsx = store.product.list.map(function (value, index) {
                let videoData = '';
                if (value.type == "VIDEO") {
                    videoData = JSON.parse(value.vimeo_files);
                }
                return (
                    <li className={"mainThumbnailItem" + (videoData ? ' is_video' : '')} key={index}>
                        <Link ref={ref} className={"mainThumbnailItemImg"} to={`/main/product/${value.product_seq}`} style={{backgroundImage: `url(${videoData && !grid ? videoData.preview.url : value.image_url})`}}>
                            {videoData && !grid && <video className="mainThumbnailItemVideo" src={videoData.video.url}  allow="autoplay" preload="auto" autoPlay muted playsInline loop type="video/mp4"></video>}
                        </Link>
                    </li>
                );
            })
        }
        return listJsx;
    }

    console.log('디테일',detail.wholesale_client_id);
    //console.log('가짜', storeCompanyCopy.list[7]['wholesale_client_id']);
    console.log('몇개일까요', store.company.list.length)

    const followUser = (e) => {
        if (store.followUser === false) {
            dispatch({
                type: 'followUser/follow',
                payload: detail.wholesale_client_id
            });
            for(let i = 0; i < store.company.list.length; i++) {
                if (detail.wholesale_client_id == storeCompanyCopy.list[i]['wholesale_client_id']){
                    storeCompanyCopy.list[i]['following_yn'] = storeCompanyCopy.list[i]['following_yn'] == 'Y' ? 'N' : 'Y';
                }
            }
            return dispatch({type: 'company/set', payload: storeCompanyCopy});
        } else {
            dispatch({
                type: 'followUser/unFollow',
                payload: detail.wholesale_client_id
            });
            for(let i = 0; i < store.company.list.length; i++) {
                if (detail.wholesale_client_id == storeCompanyCopy.list[i]['wholesale_client_id']){
                    storeCompanyCopy.list[i]['following_yn'] = storeCompanyCopy.list[i]['following_yn'] == 'Y' ? 'N' : 'Y';
                }
            }
            return dispatch({type: 'company/set', payload: storeCompanyCopy});
        }
    }

    return (
        <>
            {detail.etc_info && (
                <div className="companyProfile">
                    <div className="companyProfileHeader">
                        <div className="companyProfileHeaderBox">
                            <h1 className="companyProfileHeaderTitle">{detail.homepage_name}</h1>
                            <span className="companyProfileHeaderAddress">{detail.etc_info.address}</span>
                            <button onClick={(e) => followUser(e)} className={"button is_big" + (store.followUser == true ? ' is_on' : '')} type="button" value={detail.wholesale_client_id}>{store.followUser == true ? '팔로잉' : '팔로우'} </button>
                            <ul className="companyProfileHeaderButtonList">
                                <li className="companyProfileHeaderButtonItem" onClick={() => {snsButton('other')}}>
                                    <button className="companyProfileHeaderButton" type="button">
                                        <div className="is_kakaoStory"/>
                                    </button>
                                </li>
                                <li className="companyProfileHeaderButtonItem" onClick={() => {snsButton('other')}}>
                                    <button className="companyProfileHeaderButton" type="button">
                                        <div className="is_kakaoTalk"/>
                                    </button>
                                </li>
                                <li className="companyProfileHeaderButtonItem" onClick={() => {snsButton('other')}}>
                                    <button className="companyProfileHeaderButton" type="button">
                                        <div className="is_weChat"/>
                                    </button>
                                </li>
                                <li className="companyProfileHeaderButtonItem" onClick={() => {snsButton('call')}}>
                                    <button className="companyProfileHeaderButton is_call" type="button">
                                        <div className="is_call"/>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="companyProfileBody">
                        <div className="companyProfileBodyBox">
                            <div className="companyProfileBodyTitleBox">
                                <h5 className="companyProfileBodyTitle">ALL PRODUCT</h5>
                                <div className="companyProfileBodyButtonBox">
                                    <button className={`companyProfileBodyButton${!grid ? ' is_active' : ''}`} onClick={() => {setGrid(false)}} type="button"/>
                                    <button className={`companyProfileBodyButton${grid ? ' is_active' : ''}`} onClick={() => {setGrid(true)}} type="button">
                                        <div className="companyProfileBodyButtonBar is_horizon"/>
                                        <div className="companyProfileBodyButtonBar is_vertical"/>
                                    </button>
                                </div>
                            </div>
                           <ul className={"productThumbnailList" + (!grid ? ' grid_off' : ' grid_on')}>
                               {productThumbnailListDraw()}
                           </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CompanyProfile;
