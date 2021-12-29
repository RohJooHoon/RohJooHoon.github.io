import React, {useEffect} from "react";
import 'css/product.css';

function Product(props) {
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
    }, []);
    return (
        <>
            <div className="product">
                product
            </div>
        </>
    );
}

export default Product;
