import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import './style.css';
import { useInView } from "react-intersection-observer";
import {useSelector, useDispatch} from "react-redux";
import script from "js/common";

function Main() {
    const store = useSelector((state) => state);
    const dispatch = useDispatch();
    const [ref, inView] = useInView();

    useEffect(() => {
        // 레이아웃 세팅
        dispatch({type: 'layout/set', payload: {
                header: {
                    left: 'logo',
                    back: '/main'
                },
                footer: {
                    onType: 'main'
                },
            }
        })

        // 페이지 진입시 최초 상품 리스트 조회
        if (!store.product.list.length) {
            dispatch({type: 'product/listGet'});
        }

        // 스크롤 맨 위로
         script.scrollTop();
    }, []);

    useEffect(() => {
        if (inView) {
            dispatch({type: 'product/listGet'});
        }
    }, [inView]);

    function mainThumbnailListDraw() {
        let listJsx;
        if (store.product.list.length) {
            listJsx = store.product.list.map(function (value, index) {
                let videoData = '';
                if (value.type == "VIDEO") {
                    videoData = JSON.parse(value.vimeo_files);
                }
                return (
                    <li className="mainThumbnailItem" key={index}>
                        <Link ref={ref} className="mainThumbnailItemImg" to={`/main/product/${value.product_seq}`} style={{backgroundImage: `url(${videoData ? videoData.preview.url : value.image_url})`}}>
                            {videoData && <video className="mainThumbnailItemVideo" src={videoData.video.url}  allow="autoplay" preload="auto" autoPlay muted playsInline loop type="video/mp4"></video>}
                        </Link>
                    </li>
                );
            })
        }
        return listJsx;
    }

    return (
        <div className="main">
            <ul className="mainThumbnailList">
                {mainThumbnailListDraw()}
            </ul>
        </div>
    );
}
export default Main;