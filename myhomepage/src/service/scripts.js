/*****************************************************
   컴포넌트 들에서 공통으로 사용하는 기능 작성하는 js
 ****************************************************/
// import {useNavigate} from "react-router-dom";
// import axios from "axios"; 안됨

// 기능을 나눌 때 여러 ui 태그에서 반복적으로 사용하는 기능인가?


/***********************************************************************
                            로딩 관련 함수
 **********************************************************************/
import axios from "axios";

/**
 * 로딩 상태 ui 컴포넌트 함수
 * @param message 안내 메세지, 초기 값은 로딩중
 * @returns {JSX.Element} 인자값으로 전달받은 message가 존재한다면 인자값을 활용한 ui 를 반환
 */
export  const renderLoading = (message = '로딩중') => {
    return(
        <div className="page-container">
            <div className="loading-container">
                <div className="loading-spinner">
                </div>
                <p>{message}</p>
            </div>
        </div>
    );
}

/**
 * 로딩 후 데이터가 존재하지 않을 경우 보여주는 ui 컴포넌트 함수
 * @param message 안내 메세지, 초기 값은 데이터가 없습니다.
 * @returns {JSX.Element} 인자값으로 전달받은 message가 존재한다면 인자값을 활용한 ui 를 반환
 */
export const renderNoData = (message = '데이터가 없습니다.') => {
    return (
        <div className="no-data">
            <p>{message}</p>
        </div>
    )
}

/**
 * 로딩 후 상태 관리 래퍼 함수
 * abc 에 해당하는 데이터 가져오기 기능을 수행하고,
 * 데이터가 무사히 들어오면 로딩 멈춤
 * @param abc
 * @param setLoading
 * @returns {Promise<void>}

export const withLoading = async (abc, setLoading) => {
    if(setLoading) setLoading(true);
    try{
        await abc();
    } finally {
        if(setLoading) setLoading(false);
    }
}
*/
// 네비게이트

// ====== 네비게이트 관련 함수 ======

// const navigate = useNavigate(); -> 왜 안돼...?
/*
export const navigateToBoard = (navigate, boardId) => {
    navigate(`/board/${boardId}`);
}

export const navigateToProduct = (navigate, boardId) => {
    navigate(`/product/${boardId}`);
}
*/

// 이거 하나만 있어도 되는 이유
/*
const handleProductClick = (id) => {
    goToPage(navigate, `/product/${id}`)
}
*/

/**
 * 페이지 이동 함수
 * @param navigate 인자 값으로 들어오는 기능 활용
 * @param path 인자 값으로 들어오는 경로 활용하여 페이지 이동 처리
 * @ 만일 path 자리에 -1을 작성하면 뒤로가기 버튼으로 사용할 수 있다.
 */
export const goToPage = (navigate, path) => {
    navigate(path);
}


/**
 * 뒤로가기
 * @param navigate
 * @param confirmMessage

export const goBack = (navigate, confirmMessage = null) => {
    if(confirmMessage) {
        if(window.confirm(confirmMessage)) navigate(-1);
    } else navigate(-1);
}
*/
// // navigateToBoard, navigateToProduct, goToPage만 있으면 필요 없음
// export const pageClickHandler = (navigate, basePath) => {
//     return (id) => {
//         navigate(`${basePath}/${id}`);
//     }
// }


// fetchProduct
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
// 회원가입 = fetchSignup
export const fetchSignup = async (axios, formData, timerRef, setTimer, setMessage, setCheckObj)=> {
    const res = await axios.post(
        '/api/email/checkAuthKey', // 1번 데이터 보낼 백엔드 api endpoint 작성
        {// 2번 어떤 데이터를 백엔드에 어떤 명칭을 전달할 것인지 작성
            email: formData.memberEmail,
            authKey: formData.authKey
        } // header 에 글자형태만 전달한다. 이미지나 파일데이터도 전달한다와 같은 구문을 작성해야할 경우 3번도 필요
    )

    // console.log("res.data : ", res.data);
    // console.log("res.status : ", res.status);

    // if와 else 는 백엔드와 무사히 연결되었다는 전제하에
    // 백엔드에서 특정 데이터의 성공 유무만 확인할 뿐,
    // 프론트엔드와 백엔드가 제대로 연결되어있는지 확인할 수 없다
    // if(res.data && res.data !== null) { //  TODO 응답 코드 1일 경우에만 인증되도록 수정
    if(res.data && res.data !== null) {
        clearInterval(timerRef.current);
        setTimer({min: 0, sec: 0, active: false});
        setMessage(prev => ({...prev, authKey: '인증되었습니다.'}));
        setCheckObj(prev => ({...prev, authKey: true}));
        alert("인증이 완료되었습니다.");
    } else {
        setCheckObj(prev => ({...prev, authKey: false}));
        alert("인증번호가 일치하지 않습니다.");
    }
};

// 로그인 = fetchLogin
export const fetchLogin = (loginFn, formData, navigate, setMessage) => {
    loginFn(formData.memberEmail, formData.memberPassword)
        .then(result => {
            if(result.success) {
                alert("로그인 성공하였습니다.");
                navigate("/");
            } else {
                // 로그인 실패에 대한 메세지 전달
                setMessage(result.message);
            }
        }).catch(err => setMessage("로그인 중 오류가 발생했습니다."));

}

// 로그인 상태 유무 확인 = fetchLoginCheck (기존에 작성한 이름 존재한다면 기존 이름 그대로 사용)
export const fetchLoginCheck = (API_AUTH_URL, setUser, setLoading = null) => {
    // 로그인 상태 확인 함수 기능 만들기
    axios.get(API_AUTH_URL+"/check", {
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
export const fetchMyPage = () => {}

// 마이페이지 수정 = fetchMyPageEdit
export const fetchMyPageEdit = () => {}


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
        const res = await axios.get(`${API_URLS.RPODUCT}/${id}`);
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
                        날짜, 가격 포멧팅 함수 
 **********************************************************************/

/**
 * 날짜 포멧팅 함수
 * @param dateString 백엔드로 가져오거나, 작성해놓은 특정 날짜 데이터 매개변수 = 인자값으로 가져오기
 * @returns {string} 백엔드로 가져오거나, 작성해놓은 특정 날짜가 null 값으로 존재하지 않을 경우
 * @'-' 형태로 존재하지 않는 날짜 입니다. 대신 표기
 * @ 특정 날짜 데이터를 dataString 으로 가져와 사용할 수 있다면 날짜를 한국 기준으로 포멧팅하여 반환
 */
export const formatDate = (dateString) => {
    if(!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
        year:'numeric',
        month:'long',
        date:'numeric'
    });
}

/**
 * 가격 포멧팅 함수
 * @param price 백엔드로 가져오거나, 작성해놓은 특정 가격 데이터 매개변수 = 인자값으로 가져오기
 * @returns {string} 백엔드로 가져오거나, 작성해놓은 특정 가격이 null 값으로 존재하지 않을 경우
 * @'-' 형태로 존재하지 않는 날짜 입니다. 대신 표기
 * @ 특정 날짜 데이터를 price 으로 가져와 사용할 수 있다면 가격을 한국 기준으로 포멧팅하여 반환
 * @ 만일 한국이 아니라 전세계를 기준으로 판매하길 원한다면
 * @return new Intl.NumberFormat("특정 나라 ip를 조회하여, 나라에 맞는 가격으로 보일 수 있도록 세팅").format(price);
 * ex) 넷플릭스, 유튜브, 구글 결제 등 다양한 회사에서 활용
 */
export const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price);
}

/**
 * 인풋 태그 상태관리 함수
 * @param e 특정 input 에 이벤트(=행동)가 감지되면 동작
 * @param setFormData 백엔드로 전달할 formData 는 setter를 이용하여 데이터 변환을 추가 적용
 * @logic const { name, value } = e.target; 행동이 감지된 input 타켓의 name과 value 데이터를 가져와서 name = 키 명칭, value = 데이터 가져오기
 * @logic p => ({...p,[name]:value}); 기존에 존재하던 formData를 p 변수 이름 내부에 그대로 복제하여 담아둔 후 
 * 변화가 감지된 키의 데이터를 p 변수에 추가하고, 키 명칭이 존재한다면 데이터 수정, 키 명칭이 존재하지 않는다면 키:데이터 추가 
 * 변환된 p 전체 데이터는 setter 를 이용해서 formData 에 저장
 * @id js 상태 관리 할 때 주로 사용
 * @name 백엔드로 데이터를 주고 받을 때 사용
 * @className  스타일 세팅에 사용
 */
export const handleInputChange = (e, setFormData) => {
    const { name, value } = e.target;
    setFormData(p => ({
        // p 기존의 name과 name 에 해당하는 value 데이터 보유한 변수 이름
        // ...p : 기존 name 키 value 데이터의 값에
        // , [name] : value 이벤트가 감지된 name 의 value 값으로
        // 데이터를 수정해서 추가
        // 없던 키-값을 추가해서
        // formData 변수 이름에 setter 로 저장
        ...p,
        [name]: value // [name]은 memberEmail 또는 memberPassword가 된다.
        // id 키  명칭에 해당하는 데이터를 가지고 오길 원한다면 name 대신 is 활용
    }))
    // 기존에 formData에 내장되어있는 name에 해당하는 데이터를 클라이언트가 작성한 대로 ...(복사) 하여
    // 덮어쓸 키의 name과 데이터를 저장
}

/***********************************************************************
                            유효성 검사 함수
 **********************************************************************/

const regexPw= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const regexPhone = /^01[0-9]{8,9}$/;

export const validatePassword = (password) => {
    if(!password) return true; // 비밀번호가 존재하지 않는게 맞다면 유효성 검사 하지 않음
    return  regexPw.test(password);
}

export const validatePhone = (phone) => {
    if(!phone) return true; // 핸드폰 번호가 존재하지 않는게 맞다면 유효성 검사 하지 않음
    return  regexPhone.test(phone);
}


// 비밀번호 형식 확인


// 카테고리

// 이미지 없음
