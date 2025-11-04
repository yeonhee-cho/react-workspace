const Product = (props) => {
    return (
        <>
            <div>
                <h3>상품명: {props.productName}</h3>
                <p>가격: {props.price}원</p>
            </div>
        </>
    );
};

export default Product;