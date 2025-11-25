import {data, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {fetchProductDetail, renderLoading} from "../context/scripts";

/*
* formatDate 를 scripts.js 이동 한 후, 기능 활용하기
* backend 활용하여, 삭제를 요청할 경우 비활성화 형태로 변경
* scripts.js 에 작성한 formatPrice 를 활용해서 가격 한국표기로 보여주기
* 가격의 위치는 상품 코드 위에 위치
* 재고가 10개 이상이면 개 글자를 뒤에 붙여주기
* */
const ProductDetail = () => {
    const {id} = useParams(); // url에서 id 가져오기
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoding] = useState(true);

    useEffect(() => {
        fetchProductDetail(axios, id, setProduct, navigate);
    }, [id]); // id 값이 조회될 때마다 상품 상세보기 데이터 조회

    const formatDate = (dateString) => {
        if(!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString("ko-KR", {
            year:'numeric',
            month:'long',
            date:'numeric'
        })
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat("ko-KR").format(price);
    }

    if(loading) {
        return renderLoading("게시물을 불러오는 중입니다.");
    }
    if(!product) {
        return renderLoading("게시물을 찾을 수 없습니다.")
    }
    return(
        <div className="page-container">
            <div className="product-detail-header">
                <h1>상품 상세정보</h1>
                <button className="btn-back"
                onClick={() => navigate("/products")}>
                목록으로
                </button>
            </div>
            <div className="product-detail-image">
                {product.imageUrl ? <img src="{product.imageUrl}" alt="{product.productName}"/> : <img src="/static/img/default.png" alt="default"/>}
            </div>
            <div className="product-detail-info">
                <div className="product-detail-category">
                    {product.category}
                </div>

                <h2 className="product-detail-name">
                    {product.productName}
                </h2>

                <div className="product-detail-price">
                    <span className="price-label">판매가</span>
                    <span className="price-value">{product.price}원</span>
                </div>
                <div className="product-detail-meta">
                    <div className="meta-item">
                        <span className="meta-label">상품코드</span>
                        <span className="meta-value">{product.productCode}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">제조사</span>
                        <span className="meta-value">{product.manufacturer || "-"}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">재고</span>
                        <span className={`meta-value ${product.stockQuantity < 10 ? "low-stock":""}`}>{product.stockQuantity < 10 ? "매진 임박":product.stockQuantity + "개"}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">판매상태</span>
                        {/* mysql 은 boolean 데이터로 가능, oracle char 로 변경 확인하기 */}
                        <span className="meta-value">{product.isActive ? "판매중" : "판매중지"}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">등록일</span>
                        <span className="meta-value">{formatDate(product.createdAt)}</span>
                    </div>
                    {/* 수정 날짜가 존재하고 && 수정날짜랑 등록날짜랑 다른 경우에만 생성일자가 && (ui 를 표기하겠다) */}
                    {product.updatedAt && product.updatedAt !== product.createdAt && (
                        <div className="meta-item">
                            <span className="meta-label">수정일</span>
                            <span className="meta-value">{formatDate(product.updatedAt)}</span>
                        </div>
                    )}
                </div>
                {/* 상품 설명이 존재할 경우에만 상품 설명 ui를 보여주겠다. */}
                {product.description && (
                    <div className="product-detail-description">
                        <h3>상품 설명</h3>
                        <p>{product.description}</p>
                    </div>
                )}
                {/* 아래 버튼은 로그인한 계정이 admin 일 경우 수정 / 삭제 가능하게 표기하기 */}
                <div className="product-detail-buttons">
                    <button className="btn-edit"
                    onClick={() => navigate((`/products/edit/${id}`))}
                    >
                        수정
                    </button>
                    <button className="btn-edit"
                            onClick={() => {
                                if(window.confirm("정말 삭제하시겠습니까?")) {
                                    alert("삭제 기능은 구현 예정입니다. 삭제 불가능합니다.")
                                }
                            }}
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ProductDetail;