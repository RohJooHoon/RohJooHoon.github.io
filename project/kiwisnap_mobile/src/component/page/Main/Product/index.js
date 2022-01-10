import React, {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import './style.css';
import script from "js/common";
import sampleProfileImage from "img/sampleProfileImage.jpg";
import {useDispatch, useSelector} from "react-redux";

function MainProduct() {
    const store = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();

    let {product_seq} = useParams();
    let [detail, setDetail] = useState({});
    let [profileData, setProfileDetail] = useState();

    useEffect(() => {
        console.log("profileData : ", profileData);
    }, [profileData]);
    useEffect(() => {
        if (detail.length != undefined) {
            console.log("detail : ", detail);
        }
    }, [detail]);

    useEffect(() => {
        // 레이아웃 세팅
        dispatch({type: 'layout/set', payload: {
                header: {
                    left: 'back',
                },
                body: {
                    class: 'is_noneHeader is_noneFooter'
                },
            }
        })

        getDetail();

        // 스크롤 맨 위로
        script.scrollTop();
    }, []);

    // 상품 상세 데이터 조회
    function getDetail() {
        script.callAxios('get', {
            url: `/vddm/product/detail?product_seq=${product_seq}`,
            result: (result) => {
                const productInfo = result.data.productInfo;
                if (productInfo.vimeo_files) {
                    productInfo.vimeo_files = JSON.parse(productInfo.vimeo_files);
                }
                setDetail(productInfo);
                getProfile(productInfo.product_seq);
            },
            err: (err) => {
                console.log("getDetail err : ", err)
            }
        });
    }

    // 업체 상세 데이터 조회
    function getProfile(product_seq) {
        script.callAxios('get', {
            url: `/vddm/detail?product_seq=${product_seq}`,
            result: (result) => {
                result.data.etc_info = JSON.parse(result.data.etc_info);
                if (!result.data.etc_info.background_image_url) {
                    result.data.etc_info.background_image_url = sampleProfileImage;
                }
                // store.followUser
                if (result.data.following_yn == "Y") {
                    dispatch({type: 'followUser/set', payload: true});
                }
                setProfileDetail(result.data);
            },
            err: (err) => {
                console.log("getProfile err : ", err)
            }
        });
    }

    const followUser = () => {
        if(profileData.following_yn == "N"){
            dispatch({
                type: 'followUser/follow',
                payload: profileData.wholesale_client_id
            });
        } else {
            dispatch({
                type: 'followUser/unFollow',
                payload: profileData.wholesale_client_id
            });

            // 새로고침
            if(store.followUser === true){
                dispatch({
                    type: 'followUser/unFollow',
                    payload: profileData.wholesale_client_id
                });
            } else {
                dispatch({
                    type: 'followUser/follow',
                    payload: profileData.wholesale_client_id
                });
            }
        }
    }

    const moveDetailPage = (wholesale_client_id) => {
        history.push(`/company/profile/${wholesale_client_id}`);
    };

    return (
        <>
            {detail&&profileData&&(
                <div className="mainProduct">
                    <div className="mainProductHero">
                        <div className="mainProductHeroImg" style={{backgroundImage: `url(${detail.image_url})`}}>
                            {detail.type == "VIDEO" && <video className="mainProductHeroVideo" src={detail.vimeo_files.video.url} poster={detail.vimeo_files.preview.url} allow="autoplay" preload="auto" autoPlay muted playsInline loop type="video/mp4"></video>}
                        </div>
                        <div className="mainProductHeroControl">
                            <div className='mainProductHeroProfile profile' onClick={() => moveDetailPage(detail.wholesale_client_id)}>
                                <div className="profileImg" style={{backgroundImage: `url(${profileData ? profileData.etc_info.background_image_url : ''})`}}></div>
                                <div className="profileText">
                                    <strong className="profileTitle">{profileData ? profileData.homepage_name : ''}</strong>
                                    <div className="profileTag">{profileData ? '@' + profileData.etc_info.kakao_id : ''}</div>
                                </div>
                            </div>
                            <button onClick={() => {followUser()}} className={"button" + (store.followUser == true ? ' is_on' : '')} type="button">{store.followUser == true ? '팔로잉' : '팔로우'}</button>
                        </div>
                    </div>
                    <div className="mainProductBody">
                        <div className="mainProductInfo">
                            <strong className="mainProductInfoTitle">{detail.product_name}</strong>
                            <span className="mainProductInfoValue">{detail.price ? detail.price.toLocaleString('ko-KR') + '원' : '0원'}</span>
                            <p className="mainProductInfoDescription">어떤 데이터 넣으면 될지...?</p>
                        </div>
                        <div className="buttonWrap" style={{padding: '0 16px', marginBottom: '31px'}}>
                            <button className="ghostButton" type="button">제품 상세페이지 전체 복사하기</button>
                            <button className="ghostButton is_black" type="button" style={{flex: 'none'}}>제품상담</button>
                        </div>
                        <div className="mainProductTip">
                            키위스냅을 이용해 디자인된 상세페이지와 이미지 원본을<br/>
                            한번에 복사 하세요.키위스냅 사이트에서 내 쇼핑몰로 추가<br/>
                            디자인 작업 없이 상품을 업로드 할 수 있습니다.
                        </div>
                        <div className="mainProductView" dangerouslySetInnerHTML={{__html: detail.mall_detail_description }}></div>
                    </div>
                </div>
            )}
        </>
    );
}

export default MainProduct;