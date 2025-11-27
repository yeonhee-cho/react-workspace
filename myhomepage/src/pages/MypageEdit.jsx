import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";
import {handleInputChange} from "../service/commonService";
import {fetchMyPageEdit} from "../service/ApiService";
import axios from "axios";

/* TODO 새로 작성한 비밀번호와 비밀번호 확인이 일치하는지 여부 기능 완성
* 핸드폰 번호 css 다른 인풋창과 동일하게 스타일 작성
* 주소 검색 창 띄우기
* function daumPostCode(){
    new daum.Postcode({
        oncomplete: function (data) {
            var addr = '';

            // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if( data.userSelectedType === 'R') { //사용자가 도로명 주소를 사용할 경우 Road
                addr = data.roadAddress;
            } else { // === 'J' Jibun 을 선택했을 경우 지번주소를 가져온다.
                addr = data.jibunAddress;
            }

            document.getElementById('postcode').value = data.zonecode;
            document.getElementById('address').value = addr;
            document.getElementById("detailAddress").focus();
        }
    }).open();
}
document.querySelector("#searchAddress").addEventListener("click",daumPostCode);
            <label for="memberAddress">주소</label>
            <div class="signUp-input-area">
                <input type="text" name="memberAddress" placeholder="우편번호" maxlength="6" id="postcode">
                <button type="button" id="searchAddress">검색</button>
            </div>
            <div class="signUp-input-area">
                <input type="text" name="memberAddress" placeholder="도로명/지번 주소" id="address">
            </div>
            <div class="signUp-input-area">
                <input type="text" name="memberAddress" placeholder="상세 주소" id="detailAddress">
            </div>
* */
const MyPageEdit = () => {
    const navigate = useNavigate();
    const {user, isAuthenticated} = useAuth();

    const [formData, setFormData] = useState({
            memberName: '',
            memberEmail: '',
            memberPhone: '',
            memberPostCode: '',
            memberAddress: '',
            memberDetailAddress: '',
            newPassword: '',
            currentPassword: '',
            confirmPassword: '',
        }
    )

    const [validation, setValidation] = useState({
            memberPhone: true,
            newPassword: true,
            confirmPassword: true,
        }
    )

    const [messages, setMessages] = useState({
        memberPhone: '',
        newPassword: '',
        confirmPassword: '',
        }
    )

    const [isSubmitting, setIsSubmitting] = useState(false);

    // set 해서 값을 추가하면서 추가된 값이 일치하는가 확인
    // handleInputChange 내부에 formData 활용
    // formData에 내장된 새 비밀번호 와 비밀번호 확인이 일치하는지 체크
    const handleCheckChange = (e) => {
        const { name, value } = e.target;
        handleInputChange(e, setFormData);

        /**
         * 새 비밀번호 입력하고 비밀번호 확인까지 입력
         * 그 후에 새 비밀번호를 변경할 수 있는 가능성이 있기 때문에 
         * 새 비밀번호 = 비밀번호 확인 일치하는지 체크 후
         * 새 비밀번호 변경하면 비밀번호 확인까지 같이 변경할 수 있도록 세팅
         */
        // 새 비밀번호 입력 시 -> 비밀번호 확인과 비교
        if(name === "newPassword") {
            const isMatch = value === formData.confirmPassword;

            setValidation(prev => ({
                ...prev,
                confirmPassword: isMatch
            }));

            setMessages(prev => ({
                ...prev,
                confirmPassword: formData.confirmPassword
                    ?
                    (isMatch ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다.")
                    :
                    ""
            }));
        }

        if(name === "confirmPassword") {
            const isMatch = value === formData.newPassword;

            setValidation(prev => ({
                ...prev,
                confirmPassword: isMatch
            }));

            setMessages(prev => ({
                ...prev,
                confirmPassword: value
                ?
                (isMatch ? "비밀번호가 일치합니다.":"비밀번호가 일치하지 않습니다.")
                : ""
            }));
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // 단순히 값이 존재하는 지 확인 값이 존재하는지 확인
        if(formData.currentPassword || formData.newPassword || formData.confirmPassword) {
            if(!formData.currentPassword) {
                alert("현재 비밀번호를 입력해주세요.");
                return;
            }

            if(!validation.newPassword) {

                alert("새 비밀번호를 입력해주세요.");
                return;
            }

            if(!validation.newPassword) {
                alert("비밀번호 확인를 입력해주세요.");
                return;
            }
        }

        if(formData.currentPassword || formData.newPassword || formData.confirmPassword) {
            if(!formData.currentPassword) {
                alert("현재 비밀번호를 입력해주세요.");
                return;
            }

            if(!formData.newPassword) {

                alert("비밀번호 형식이 올바르지 않습니다.");
                return;
            }

            if(formData.newPassword === formData.confirmPassword) {
                alert("비밀번호가 일치하지 않습니다.");
                return;
            }
        }

        /*
        setIsSubmitting(true);

        // 마치 마이페이지에서 수정하기 버튼을 눌러쓸 때 어떻게 작동하는지 
        // 백엔드 없이 qa 진행
        setTimeout(() => {
            setIsSubmitting(false);
            alert("회원정보가 수정되었습니다.");
            navigate("/mypage");
        }, 1000);
        */

        fetchMyPageEdit(axios, formData, setIsSubmitting);
    }

    /*
    업로드, 업데이트와 같은 모든 사이트에서 활용하는 공통 기능으로
    commonService.js 이동하여 상태 관리를 진행하고 재사용하기
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(p => ({
            ...p,
            [name]: value
        }))
    }
    */
    
    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                var addr = '';

                // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if( data.userSelectedType === 'R') { //사용자가 도로명 주소를 사용할 경우 Road
                    addr = data.roadAddress;
                } else { // === 'J' Jibun 을 선택했을 경우 지번주소를 가져온다.
                    addr = data.jibunAddress;
                }

                setFormData(p => ({
                    ...p,
                    memberPostCode: data.zonecode,
                    memberAddress: addr,
                }))
                /*
                코드를
                document.getElementById('memberPostCode').value = data.zonecode;
                document.getElementById('memberAddress').value = addr;

                리액트에서는
                memberPostCode: data.zonecode,
                memberAddress: addr,
                처럼 사용한다.
                */

                document.getElementById("memberDetailAddress")?.focus();
            }
        }).open();
        // document.querySelector("#searchAddress").addEventListener("click", window.daumPostCode);
    }

    // 게시물 작성, 수정, 상품 업로드 작성, 마이페이지 수정 동시 사용
    // 인자값 msg, navigate path
    const handleCancel = () => {
        if(window.confirm("수정을 취소하시겠습니까? 변경사항이 저장되지 않습니다.")){
            navigate("/mypage");
        }
    };

    useEffect(() => {
        if(!isAuthenticated) navigate("/login");
    }, []);

    return (
        <div className="page-container">
            <h1>회원정보 수정</h1>
            <form onSubmit={handleSubmit}>
                {/* 이메일(읽기 전용) 수정 불가 */}
                <label>
                    <span className="required">*</span> 이메일
                    <input type="text"
                           name="memberEmail"
                           value={user?.memberEmail}
                           readOnly
                    />
                    <span className="form-hint">이메일은 변경할 수 없습니다.</span>
                </label>

                <label>
                    <span className="required">*</span> 이름
                    <input type="text"
                           name="memberName"
                           value={user?.memberName}
                           readOnly
                    />
                    <span className="form-hint">이름은 변경할 수 없습니다.</span>
                </label>

                <label>
                    <span className="required">*</span> 핸드폰 번호
                    {/*
                    type="number"
                    int byte short long 과 같은 숫자 계열은
                    맨 앞에 있는 0을 생략한 상태로 값을 저장하기 때문에 
                    주민등록번호에서 00년생 ~ 09년생의 경우 앞에 있는 0이 자동으로 생략

                    궁금한거는 그럼 tel은 언제써?
                    */}
                    <input type="text"
                           name="memberPhone"
                           value={user?.memberPhone}
                           onChange={handleCheckChange}
                    />
                </label>

                <label>
                    <span className="required">*</span> 현재 비밀번호
                    <input type="password"
                           name="currentPassword"
                           value={formData.currentPassword}
                           onChange={handleCheckChange}
                    />
                    <span className="form-hint">비밀번호를 변경하지 않으려면 비워두세요.</span>
                </label>

                <label>
                    <span className="required">*</span> 새 비밀번호
                    <input type="password"
                           name="newPassword"
                           value={formData.newPassword}
                           onChange={handleCheckChange}
                           placeholder="영어, 숫자 포함 8자 이상"
                    />
                </label>

                <label>
                    <span className="required">*</span> 새 비밀번호 확인
                    <input type="password"
                           name="confirmPassword"
                           value={formData.confirmPassword}
                           onChange={handleCheckChange}
                    />
                    <span className={`signUp-message ${validation.confirmPassword && formData.confirmPassword ? 'confirm': 'error'} `}>
                        {messages.confirmPassword}
                    </span>
                </label>

                <label>
                    주소 :
                    <div className="signUp-input-area">
                        <input type="text"
                               id="memberPostCode"
                               name="memberPostCode"
                               value={formData.memberPostCode}
                               placeholder="주소 검색을 클릭하세요."
                               onClick={handleAddressSearch}
                               readOnly
                        />
                        <button
                            type="button"
                            onClick={handleAddressSearch}>
                            주소검색
                        </button>
                    </div>

                    <div className="signUp-input-area">
                        <input type="text"
                               id="memberAddress"
                               name="memberAddress"
                               value={formData.memberAddress}
                               placeholder="도로명/지번 주소"
                               onClick={handleAddressSearch}
                               readOnly
                        />
                    </div>
                    <div className="signUp-input-area">
                        <input type="text"
                               id="memberDetailAddress"
                               name="memberDetailAddress"
                               value={formData.memberDetailAddress}
                               placeholder="상세 주소를 입력하세요."
                               onChange={handleCheckChange}
                               required
                        />
                    </div>
                </label>

                <div className="form-buttons">
                    <button type="submit"
                            className="btn-submit"
                            disabled={isSubmitting}
                    >
                        {isSubmitting ? '수정중...' : '수정 완료'}
                    </button>
                    <button type="button"
                            className="btn-cancel"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                    >
                        취소
                    </button>
                </div>
            </form>
        </div>
    )
}


export default MyPageEdit;