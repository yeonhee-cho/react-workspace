import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {fetchProductDetail} from "../service/ApiService";
import {handleChangeImage, handleInputChange} from "../service/commonService";

/**
 * TODO 수정하기 수정된 결과 반영
 * check 사항 : 1. 상품 수정 시 현재 등록된 메인 이미지 가져오기
 * check 사항 : 2. 메인 이미지 수정, 수정된 결과 미리보기
 * check 사항 : 3. 수정된 내용이 제대로 반영되는가
 * * 참고: 미리보기만하고, 수정하기 버튼을 눌러야 메인 이미지 수정되게 하기
 */

const ProductEdit = () => {
    // 윈도우는 기본적으로 원화모양으로 폴더 나 위치 구분 코드 상에서는 \ 모형으로 표기
    // \ 주석에도 쓰면 안 됨!! \ 특수 기호를 추가로 작성하는 것은 기본으로 내장되어있는 특수 기호들에 대한 효과가 방동 되므로 사용하지 않는다.
    const defaultImg = '/static/img/default.png'; // \ 특수 기호를 문자열로 쓸거야
    const {id} = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // 초기값을 로딩은 true -> false
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({
        productName: '',
        productCode: '',
        category: '',
        price: '',
        stockQuantity: '',
        description: '',
        manufacturer: '',
        imageUrl: '',
        isActive: 'Y'
    });

    const [formData, setFormData] = useState({
        productName: product.productName,
        productCode: product.productCode,
        category: product.category,
        price: product.price,
        stockQuantity: product.stockQuantity,
        description: product.description,
        manufacturer: product.manufacturer,
        imageUrl: product.imageUrl,
        isActive: product.isActive,
    });

    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [errors, setErrors] = useState({});

    const categories = [
        '전자제품', '가전제품', '의류', '식품', '도서', '악세사리', '스포츠', '완구', '가구', '기타'
    ]

    useEffect(() => {
        fetchProductDetail(axios, id, setProduct, navigate, setLoading);
    }, [id]);

    const handleCancel = () => {
        if (window.confirm("수정을 취소하시겠습니까? 변경사항이 저장되지 않습니다.")) {
            navigate(`/product/${id}`);
        }
    }

    const handleImageClick = () => {
        fileInputRef.current?.click();
    }
    
    // isActive data 가 null 일 경우 N으로 체크 표기하게 설정

    /**
     * 0. 제출 일시 정지, 유효성 검사
     * 1. 변경된 데이터를 가져온다.
     * 2. 백엔드에 데이터를 어떻게 전달할 지 결정
     * 3. 백엔드에서 @RequestPart 라면 product 객체와 이미지 파일을 분리한 후, product 객체는 json -> 문자열 형태로
     * 4. 이미지는 Multipart 로 전달한다.
     * 5. axios put / path 를 이용하여 백엔드 Mapping 과 연동한다.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            /* 유효성 검사 */
            const uploadFormData = new FormData;
            // 따로 제외하고 싶은 변수 명칭을 ... 형태가 나오기 전에 작성하여 제거한 후, 나머지 데이터를 전달할 때 사용하는 방법
            const {imageUrl, ...updateProductData} = product;
            const updateBlob = new Blob(
                [JSON.stringify(updateProductData)],
                {type:"application/json"}
                );
            uploadFormData.append("product", updateBlob);
            if(imageFile) {
                uploadFormData.append("imageFile", imageFile);
            }

            const r = await axios.put(
                `http://localhost:8085/api/product/${id}`, // 백엔드 연결 주소
                uploadFormData, { // 어떤 데이터를 전달할 것인가
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    } // 백엔드에게 어떤 데이터를 전달할지 헤더로 알릴 것인가
                }
            );

            // 백엔드에서 응답오기 성공 후 긍정적인 답변이 온다면
            if(r.data.success) {
                alert(r.data.message);
                navigate(`/product/${id}`);
            }
            // 백엔드에서 응답오기 성공한 후 부정적인 답변이 온다면
            else {
                alert(r.data.message);
            }
        } catch (err) {
            alert("서버에 문제가 발생했습니다.");
        }
    }

    const handleChange = (e) => {
        handleInputChange(e, setProduct);
    }


    return (
        <div className="page-container">
            <div className="product-upload-container">
                <h2>상품 수정</h2>
                <form className="product-form">

                    {/* 상품 이미지 */}
                    <div className="form-group">
                        <label>상품 이미지</label>
                        <div className="profile-image-container" onClick={handleImageClick}>
                            <img
                                src={previewImage || product.imageUrl || defaultImg} // 1순위 2순위 3순위
                                alt="상품 이미지"
                                className="profile-image"
                            />
                            <div className="profile-image-overlay">
                                이미지 변경
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleChangeImage(setPreviewImage, setImageFile, setProduct)}
                        />
                        <small className="form-hint">
                            이미지를 클릭하여 변경할 수 있습니다.(최대 5MB)
                        </small>
                    </div>

                    {/* 상품명 */}
                    <div className="form-group">
                        <label htmlFor="productName">
                            상품명<span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={product.productName}
                            placeholder="상품명을 입력하세요."
                            onChange={handleChange}
                            maxLength="200"
                        />
                        {errors.productName && (
                            <span className="error">{errors.productName}</span>
                        )}
                    </div>

                    {/* 상품코드 - 읽기전용 */}
                    <div className="form-group">
                        <label htmlFor="productCode">
                            상품코드<span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="productCode"
                            name="productCode"
                            value={product.productCode}
                            readOnly
                        />
                        <small className="form-hint">
                            상품코드는 변경할 수 없습니다.
                        </small>
                    </div>

                    {/* 카테고리 */}
                    <div className="form-group">
                        <label htmlFor="category">
                            카테고리<span className="required">*</span>
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                        >
                            <option value="">카테고리를 선택하세요.</option>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <span className="error">{errors.category}</span>
                        )}
                    </div>

                    {/* 가격 */}
                    <div className="form-group">
                        <label htmlFor="price">
                            가격<span className="required">*</span>
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            placeholder="가격 (원)"
                            min="0"
                        />
                        {errors.price && (
                            <span className="error">{errors.price}</span>
                        )}
                    </div>

                    {/* 재고수량 */}
                    <div className="form-group">
                        <label htmlFor="stockQuantity">
                            재고수량<span className="required">*</span>
                        </label>
                        <input
                            type="number"
                            id="stockQuantity"
                            name="stockQuantity"
                            onChange={handleChange}
                            value={product.stockQuantity}
                            placeholder="재고 수량"
                            min="0"
                        />
                        {errors.stockQuantity && (
                            <span className="error">{errors.stockQuantity}</span>
                        )}
                    </div>

                    {/* 제조사 */}
                    <div className="form-group">
                        <label htmlFor="manufacturer">
                            제조사
                        </label>
                        <input
                            type="text"
                            id="manufacturer"
                            name="manufacturer"
                            value={product.manufacturer}
                            onChange={handleChange}
                            placeholder="제조사 명을 입력하세요."
                            maxLength="100"
                        />
                    </div>

                    {/* 판매 상태 */}
                    <div className="form-group">
                        <label>
                            판매 상태<span className="required">*</span>
                        </label>
                        <div className="radio-group">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="isActive"
                                    value="Y"
                                    checked={product.isActive === 'Y'}
                                />
                                <span>판매중</span>
                            </label>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="isActive"
                                    value="N"
                                    checked={product.isActive === 'N'}
                                />
                                <span>판매중지</span>
                            </label>
                        </div>
                        <small className="form-hint">
                            판매중으로 설정하면 고객에게 노출됩니다.
                        </small>
                    </div>

                    {/* 상품설명 */}
                    <div className="form-group">
                        <label htmlFor="description">
                            상품설명
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            onChange={handleChange}
                            value={product.description}
                            placeholder="상품에 대한 설명을 입력하세요"
                            rows="5"
                        />
                    </div>

                    {/* 버튼 */}
                    <div className="form-buttons">
                        <button
                            type="submit"
                            className="btn-submit"
                            disabled={loading}
                            onClick={handleSubmit}
                        >
                            {loading ? '수정 중...' : '수정 완료'}
                        </button>
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={handleCancel}
                            disabled={loading}>
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductEdit;