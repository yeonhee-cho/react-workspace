import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {fetchAllProducts} from "../service/ApiService";
import {formatPrice, goToPage, renderNoData} from "../service/commonService";

// ctrl  + alt + l 정렬
const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    // null -> []
    const [filterProduct, setFilterProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectCategory, setSelectCategory] = useState('전체');
    const [searchKeyword, setSearchKeyword] = useState('');

    const categories = ["전체", "전자기기", "의류", "식품", "도서", "생활용품", "기타"];

    useEffect(() => {
        fetchAllProducts(axios, setProducts, setLoading);
        // 현재는 setFillterProduct 로 상품을 조회하지만 setProducts 로 변경
        fetchAllProducts(axios, setFilterProduct, setLoading);
        // fetchAllProducts(axios, setProducts);
    }, []);

    useEffect(() => {
        filterProducts();
    }, [selectCategory, searchKeyword, products]);


    const filterProducts = async () => {
        // products 를 spread 이용해서 배열 복제
        let filtered = [];
        // 카테고리 필터
        // 검색 필터 = 양 옆 공백 제외
        // 카테고리나, 검색 된 filtered 를 setter 이용해서 filterProduct 에 저장
    }

    const handleSearch = (e) => {
        e.preventDefault();
        filterProducts();
    }

    /*
    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    }
     */

    const handleProductClick = (id) => {
        goToPage(navigate, `/product/${id}`)
    }

    return (
        <div className="page-container product-list-container">
            <div className="product-header">
                <h2>상품 목록</h2>
                <button className="btn-add-product"
                        onClick={() => navigate(`/upload`)}>
                    + 상품 등록
                </button>
            </div>

            {/*카테고리 필터*/}
            <div className="category-filter">
                {categories.map((c) => (
                    <button
                        key={c}
                        className={`category-btn ${selectCategory} === c ? "active" : ""}`}
                        onClick={() => setSelectCategory((c))}>
                        {c}
                    </button>
                ))}
            </div>

            {/*검색박스*/}
            <form className="search-box" onSubmit={handleSearch}>
                <input type="text" placeholder="상품명, 상품코드, 제조사로 검색"
                       value={searchKeyword} onChange={(e) => setSearchKeyword()}/>
                <button>검색</button>
            </form>

            {/*상품 개수*/}
            <div className="product-count">
                총 <strong> {filterProduct.length} </strong>개의 상품
            </div>

            {/*상품 목록*/}
            {filterProduct.length > 0 ? (
                <div className="product-grid">
                    {filterProduct.map((product) => (
                        <div key={product.id}
                             className="product-card"
                             onClick={() => handleProductClick(product.id)}>

                            <div className="product-image">
                                {product.imageUrl ? (
                                        <img src={product.imageUrl}
                                             alt={product.productName}
                                             onError={(e) => {
                                                 e.target.onerror = null;
                                                 // e.target.src = "상품이 존재하지 않을 경우 기본 이미지 url 작성"
                                                 e.target.src = "/static/img/default.png"
                                             }}
                                        />
                                    ) :
                                    (
                                        <img src="/static/img/default.png" alt="default"/>
                                    )
                                }
                            </div>
                            <div className="product-info">
                                <span className="product-category">{product.category}</span>
                                <div className="product-name">
                                    {product.productName}
                                </div>
                                <div className="product-code">
                                    {product.productCode}
                                </div>
                                <div className="product-manufacturer">
                                    {product.manufacturer}
                                </div>
                                <div className="product-footer">
                                    <span className="product-price">
                                        {formatPrice(product.price)} 원
                                    </span>
                                    <span
                                        className={`product-stock ${product.stockQuantity < 10 ? "매진임박" : ""}`}></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                renderNoData("등록된 상품이 존재하지 않습니다.")
            )}
            {/*
            {]중괄호 자체가 js 기능들을 모두 쓴다는 표기
            {] 내부에 ui를 작성할 경우 return 을 생략한 () 가 필요함
            rederNoData()에서 이미 () 형태로 ui를 작성했기 때문에
            굳이 한 번 더 ()를 작성해서 renderNoData()로 작성할 필요가 없다.
            */}
        </div>
    )
}
export default Products;