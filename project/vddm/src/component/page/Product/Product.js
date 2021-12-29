import React, {useEffect} from "react";

function Product(props) {
    useEffect(() => {
        props.layoutSet({
            header: {
                left: 'back',
                back: '/main'
            },
            body: {
                class: 'product'
            },
            footer: {
                onType: 'main'
            },
        });
    }, []);
    return (
        <>
            <div className="productInner">
                product
            </div>
        </>
    );
}

export default Product;
