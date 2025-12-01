// ====== API 데이터 패칭 관련 함수 ======
/*
* const API_URL 의 경우 내부에서만 사용할 수 있도록 설정된 상태
* 외부에서 사용 가능한 형태로 변경하길 원한다면
* export const API_URL 로 export 를 추가하면 된다.
*
* export const API_URLS의 경우 외부 내부 어디서근 활용 가능하도록 설정
* 내부에서만 사용 가능한 형태로 변경하길 원한다면
* export 를 제거한다.
* */
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = 'http://localhost:8085'

export const API_URLS = {
    AUTH: `${API_URL}/api/auth`,
    BOARD: `${API_URL}/api/board`,
    PRODUCT: `${API_URL}/api/product`,
    EMAIL : `${API_URL}/api/email`,
}

/***********************************************************************
 유저 백엔드 관련 함수
 **********************************************************************/
// 로그인               = fetchLogin -- > auth 로 작성
// 로그인상태 유무 확인 = fetchLoginCheck (기존에 작성한 이름 존재한다면 기존 이름 그대로 사용)

// 마이페이지 수정      = fetchMypageEdit

/**
 * 회원가입 = fetchSignup
 * @param axios
 * @param formData
 * @returns {Promise<void>}
 */
export const fetchSignup = async (axios, formData, profileImage)=> {
    // 필수 항목 체크
    if(!formData.memberName) {
        alert("이름을 입력해주세요.");
        return; // 돌려보내기 하위 기능 작동 x
    }

    // DB에 저장할 데이터만 전송
    // body 형태로 전달하기
    // requestBody requestParam
    //    body        header

    const signupData = {
        memberName: formData.memberName,
        memberEmail: formData.memberEmail,
        memberPassword: formData.memberPw,
    }

    if(profileImage) {
        signupData.append('profileImage', profileImage);
    }

    try {
        const res = await axios.post( API_URLS.AUTH + "/signup", signupData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        });
        if(res.data === "success" || res.status === 200) {
            console.log("res.status : ", res.status);
            console.log("res.data : ", res.data);
            alert("회원가입이 완료되었습니다.");
            window.location.href = "/";
        } else if (res.data === "duplicate") {
            alert("이미 가입된 이메일 입니다.");
        } else {
            alert("회원가입에 실패하였습니다.");
        }
    } catch (err) {
        alert("회원가입 중 문제가 발생했습니다.");
        console.error(err);
    }

};

// 로그인 = fetchLogin -> authContext auth로 작성

// 로그인 상태 유무 확인 = fetchLoginCheck (기존에 작성한 이름 존재한다면 기존 이름 그대로 사용) -> 방법2
export const fetchLoginCheck = async (axios, setUser, setLoading = null) => {
    // 로그인 상태 확인 함수 기능 만들기
    await axios.get(API_URLS.AUTH +"/check", {
        withCredentials:true })
        .then(res => {
            // console.log("로그인 상태 확인 응답 : ", res.data);

            setUser(res.data.user);
        })
        .catch(err => {
            console.log("로그인 상태 확인 오류 : ",err);
            setUser(null);
        })
        .finally(() => setLoading(false))
}


// 마이페이지 조회 = fetchMyPage
// 1. sql 만들기
// 2. serviceimpl service.... 안해도 됨

// 마이페이지 수정 = fetchMyPageEdit
export const fetchMyPageEdit = async (axios, formData, setIsSubmitting) => {
    // 수정 내용 키 : 데이터를 모두 담아갈 변수 이름
    const updateData = {
        memberName: formData.memberName,
        memberEmail: formData.memberEmail,
        memberPhone: formData.memberPhone,
        memberAddress: formData.memberPostCode + formData.memberAddress + formData.memberDetailAddress,
        // memberPostCode: formData.memberPostCode,
        // memberAddress: formData.memberAddress,
        // memberDetailAddress: formData.memberDetailAddress,
        newPassword: formData.newPassword || null,
        currentPassword: formData.currentPassword || null,
    }

    try {
        const res = await axios.put(API_URLS.AUTH + "/update", updateData, {
            withCredentials: true
        });
            if (res.data.success === true) {
                alert("회원정보가 수정되었습니다.");
            }
            // else if (res.data.message === "wrongPassword") {
            //     alert("현재 비밀번호가 일치하지 않습니다.");
            // }
            else {
                alert("회원정보 수정에 실패했습니다.");
            }
    } catch (e) {
        alert("회원정보 수정 중 문제가 발생했습니다.");
    } finally {
        setIsSubmitting(false);
    }
}

// 마이페이지 이미지 수정 = fetchMyPageEditWithProfile
export const fetchMyPageEditWithProfile = async (axios, formData, profileFile, navigate, setIsSubmitting) => {
    // 수정 내용 키 : 데이터를 모두 담아갈 변수 이름
    const updateData = {
        memberName: formData.memberName,
        memberEmail: formData.memberEmail,
        memberPhone: formData.memberPhone,
        // memberPostCode: formData.memberPostCode,
        memberAddress: formData.memberAddress,
        // memberDetailAddress: formData.memberDetailAddress,
        newPassword: formData.newPassword || null,
        currentPassword: formData.currentPassword || null,
        memberProfileImage: profileFile,
    }

    try {
        const res = await axios.put(API_URLS.AUTH + "/update", updateData, {
            headers: {
                'Content-Type':'multipart/form-data'
            },
            withCredentials: true
        });
        if (res.data.success === true) {
            alert("회원정보가 수정되었습니다.");
        } else if (res.data.success === false) {
            alert("현재 비밀번호가 일치하지 않습니다.");
        } else {
            // 콘솔데이터를 찍었는데 res.data 나오지 않는다는 것은 결과를 불러오기 전에 자바스크립트에서 실행이 먼저 되어서 이다.
            // 이때는 async await
            // console.log("res.data", res.data)
            alert("회원정보 수정에 실패했습니다.");
        }
    } catch (e) {
        alert("회원정보 수정 중 문제가 발생했습니다.");
    } finally {
        setIsSubmitting(false);
    }
}

// ctrl + shift + f 전체 찾기
// ctrl + shift + r 파일 이름으로 검색

/***********************************************************************
 제품 백엔드 관련 함수
 **********************************************************************/
/**
 * get : 제품 전체 데이터 가져오는 함수
 * @param axios fetch 향상된 기능으로 백엔드 연결 시 사용
 * @param setProducts 매개변수에서는 데이터가 존재하지 않은 비어있는 변수 명칭으로, res.data 백엔드 데이터를 ui 컴포넌트로 가져가서 활용하는데 쓰임
 * @param setLoading 백엔드 데이터를 가져오기 전까지 로딩 중 표기
 * @returns {Promise<void>} 백엔드 데이터를 제대로 가져왔는지에 대한 유무를 통하여 결과를 반환한다.
 */
export const fetchAllProducts = async (axios, setProducts, setLoading = null) => {
    try {
        const res = await axios.get(`${API_URLS.PRODUCT}/all`);
        setProducts(res.data);
    } catch (err) {
        alert("데이터를 가져올 수 없습니다.");
    } finally {
        if(setLoading) setLoading(false);
    }
}

/**
 * get : 제품 일부 데이터 가져오는 함수
 * @param axios fetch 향상된 기능으로 백엔드 연결 시 사용
 * @param id url 주소에 표기된 id  = 제품 번호를 이용해서 특정 제품 번호의 전체 데이터를 가져올 수 있도록 활용
 * @param setProducts 매개변수에서는 데이터가 존재하지 않은 비어있는 변수 명칭으로, res.data 백엔드 데이터를 ui 컴포넌트로 가져가서 활용하는데 쓰임
 * @param navigate 특정 제품 번호의 제품이 존재하지 않을 경우 제품 목록 페이지로 이동시킨다.
 * @param setLoading 백엔드 데이터를 가져오기 전까지 로딩 중 표기
 * @returns {Promise<void>} 백엔드 데이터를 제대로 가져왔는지에 대한 유무를 통하여 결과를 반환한다.
 */
export const fetchProductDetail = async (axios, id, setProducts, navigate, setLoading = null) => {
    try {
        const res = await axios.get(`${API_URLS.PRODUCT}/${id}`);
        setProducts(res.data);
    } catch (err) {
        alert("상품 정보를 불러올 수 없습니다.");
        navigate("/products"); // App.js 에서 Route 내부에 작성한 프론트엔드 게시물 전체보는 경로 설정
    } finally {
        if(setLoading) setLoading(false);
    }
}

/**
 * get : 일부 제품을 삭제하는 함수
 * @param axios fetch 향상된 기능으로 백엔드 연결 시 사용
 * @param id url 주소에 표기된 id  = 제품 번호를 이용해서 특정 제품 번호의 데이터를 삭제할 수 있도록 활용
 * @param navigate 특정 제품 번호의 제품이 삭제되어 존재하지 않을 경우 제품 목록 페이지로 이동시킨다.
 * @returns {Promise<void>} 백엔드 동작의 결과를 반환한다.
 */
export const deleteProduct = async (axios, id, navigate) => {
    try {
        const res = await axios.delete(`${API_URLS.PRODUCT}/${id}`); // NOTE 삭제?
        alert("상품이 삭제되었습니다.");
        navigate("/products");
    }  catch (error) {
        alert("상품 삭제에 실패했습니다.");
    }
}

/***********************************************************************
 게시물 백엔드 관련 함수
 **********************************************************************/
/**
 * get : 게시물 전체 데이터 가져오는 함수
 * @param axios fetch 향상된 기능으로 백엔드 연결 시 사용
 * @param setBoards 매개변수에서는 데이터가 존재하지 않은 비어있는 변수 명칭으로, res.data 백엔드 데이터를 ui 컴포넌트로 가져가서 활용하는데 쓰임
 * @param setLoading 백엔드 데이터를 가져오기 전까지 로딩 중 표기
 * @returns {Promise<void>} 백엔드 데이터를 제대로 가져왔는지에 대한 유무를 통하여 결과를 반환한다.
 */
export const fetchAllBoards = async (axios, setBoards, setLoading = null) => {
    try {
        const res = await axios.get(`${API_URLS.BOARD}/all`);
        setBoards(res.data);
    } catch (err) {
        alert("데이터를 가져올 수 없습니다.");
    } finally {
        if(setLoading) setLoading(false);
    }
}

/**
 * get : 인기 게시물 전체 데이터 가져오는 함수
 * @param axios fetch 향상된 기능으로 백엔드 연결 시 사용
 * @param setBoards 매개변수에서는 데이터가 존재하지 않은 비어있는 변수 명칭으로, res.data 백엔드 데이터를 ui 컴포넌트로 가져가서 활용하는데 쓰임
 * @param setLoading 백엔드 데이터를 가져오기 전까지 로딩 중 표기
 * @returns {Promise<void>} 백엔드 데이터를 제대로 가져왔는지에 대한 유무를 통하여 결과를 반환한다.
 */
export const fetchAllPopularBoards = async (axios, setBoards, setLoading = null) => {
    try {
        const res = await axios.get(`${API_URLS.BOARD}/popular`);
        setBoards(res.data);
    } catch (err) {
        alert("데이터를 가져올 수 없습니다.");
    } finally {
        if(setLoading) setLoading(false);
    }
}
/**
 * get : 게시물 일부 데이터 가져오는 함수
 * @param axios fetch 향상된 기능으로 백엔드 연결 시 사용
 * @param id url 주소에 표기된 id  = 게시물 번호를 이용해서 특정 게시물 번호의 전체 데이터를 가져올 수 있도록 활용
 * @param setBoard 매개변수에서는 데이터가 존재하지 않은 비어있는 변수 명칭으로, res.data 백엔드 데이터를 ui 컴포넌트로 가져가서 활용하는데 쓰임
 * @param navigate 특정 게시물 번호의 제품이 존재하지 않을 경우 게시물 목록 페이지로 이동시킨다.
 * @param setLoading 백엔드 데이터를 가져오기 전까지 로딩 중 표기
 * @returns {Promise<void>} 백엔드 데이터를 제대로 가져왔는지에 대한 유무를 통하여 결과를 반환한다.
 */
export const fetchBoardDetail = async (axios, id, setBoard, navigate, setLoading = null) => {
    try {
        const res = await axios.get(`${API_URLS.BOARD}/${id}`);
        setBoard(res.data);
    } catch (err) {
        alert("게시물 정보를 불러올 수 없습니다.");
        navigate("/board"); // App.js 에서 Route 내부에 작성한 프론트엔드 게시물 전체보는 경로 설정
    } finally {
        if(setLoading) setLoading(false);
    }
}

/**
 * post: 게시물 데이터 저장하는 함수
 * @param axios fetch 향상된 기능으로 백엔드 연결 시 사용
 * @param formData 게시물 관련된 변수들을 formData 명칭으로 한 번에 모아서 백엔드로 전달한다.
 * @param navigate 게시글이 성공적으로 DB에 저장되면, 게시물을 확인할 수 있도록 게시물 목록페이지로 이동
 * @returns {Promise<*>} 백엔드 결과 유무에 따른 결과를 반환
 */
export const boardSave = async (axios, formData, navigate) => {
    try {
        const res = await axios.post(`${API_URLS.BOARD}`, formData);
        alert("글이 성공적으로 작성되었습니다.");
        navigate("/board");
        return res;
    } catch (error) {
        alert("글 작성 중 문제가 발생했습니다.");
        console.log(error);
        throw error;
    }
}

// 이미지 url 생성 함수
export const getProfileImageUrl = (user) => {
    if(!user?.memberProfileImage) return '/static/img/profile/default-profile.svg';

    // memberProfileImage 가 전체 URL 인 경우
    if(user.memberProfileImage.startsWith('http')) return user.memberProfileImage;

    if(user.memberProfileImage.startsWith('/profile_images/')) {
        return `${API_URL}${user.memberProfileImage}`;
    }

    // 파일 명만 있는 경우
    return `${API_URL}/profile_images/${user.memberProfileImage}`;
}