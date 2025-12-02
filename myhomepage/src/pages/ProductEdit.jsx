import {useNavigate, useParams} from "react-router-dom";
import {useRef, useState} from "react";

/**
 * TODO 수정하기 수정된 결과 반영
 * check 사항 : 1. 상품 수정 시 현재 등록된 메인 이미지 가져오기
 * check 사항 : 2. 메인 이미지 수정, 수정된 결과 미리보기
 * check 사항 : 3. 수정된 내용이 제대로 반영되는가
 * * 참고: 미리보기만하고, 수정하기 버튼을 눌러야 메인 이미지 수정되게 하기
 */

const ProductEdit = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [loading, setLoading] = useState(false);
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

    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [errors, setErrors] = useState({});

    const categories = [
        '전자제품', '가전제품', '의류', '식품', '도서', '악세사리', '스포츠', '완구', '가구', '기타'
    ]

    const handleCancel = () => {
        if(window.confirm("수정을 취소하시겠습니까? 변경사항이 저장되지 않습니다.")) {
            navigate(`/products/${id}`);
        }
    }

    const handleImageClick = () => {
        fileInputRef.current?.click();
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
                                src={previewImage || product.imageUrl || '/static/img/default.png'}
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
                            value={product.category}>
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
                            disabled={loading}>
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