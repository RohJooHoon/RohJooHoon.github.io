import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import 'css/product.css';
import axios from "axios";

function Product(props) {
    let {product_seq} = useParams();
    let [detail, detailSet] = useState({});

    // 상품리스트 데이터 조회
    function getDetail() {
        axios.get(`https://devapi.kiwisnap.net/vddm/product/detail?product_seq=${product_seq}`,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        }).then(result => {
            detailSet(result.data.productInfo);
            console.log("result : ", result.data.productInfo);
        }).catch(err => {
            console.log("getDetail err : ", err);
        });
    }

    useEffect(() => {
        props.layoutSet({
            header: {
                left: 'back',
                back: '/main'
            },
            footer: {
                onType: 'main'
            },
        });

        getDetail();
    }, []);
    return (
        <>
            <div className="product">
                <div dangerouslySetInnerHTML={{__html: detail.mall_detail_description }}></div>
            </div>
        </>
    );
}

export default Product;
