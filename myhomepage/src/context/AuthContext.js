// useContext와 Provider를 사용하여
// 앱 전체에서 "로그인 상태"를 공유할 수 있는 AuthContext를 만듭니다.

// jsx 가 아니라 js 인 이유
// ui 적으로 클라이언트 화면에 보여주는 것이 아니라
// 인증에 관련된 기능 구현이기 때문에
// js 확장자 선택하여 사용

// 거의 최초 1회 작성 후 수정 안 함 환경설정과 같은 파일

// 로그인에 관련된 모든 기능 관리
import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import {API_URLS, fetchLoginCheck} from "../service/ApiService";


// 0. 공통 URL 상수 이름 형태로 데이터를 작성 후 변수 이름으로 상태 관리
// const API_AUTH_URL = "http://localhost:8085/api/auth";
const API_AUTH_URL = API_URLS.AUTH;
/* 인증 기반으로 진행 인증 관련된 api만 authContext 
* API 상태 관리 중점 진행 APIService 를 만들고 API 관련된 모든 기능 작성*/

// 1. context 생성
const AuthContext  = createContext();

// 2. customHook : 다른 컴포넌트에서 쉽게 사용하기 위한 인증 훅 생성
export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 4. 페이지 로드 시 로그인 상태 확인
    useEffect(() => {
        checkLoginStatus(); // 방법1
        // fetchLoginCheck(API_AUTH_URL, setUser, setLoading); // 방법2
    }, []);

    const checkLoginStatus = () => {

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

    const loginFn = (memberEmail, memberPassword) => {
        return  axios.post(API_AUTH_URL+'/login',
            {memberEmail,memberPassword},
            {withCredentials:true})
            .then(
                res => {
                    console.log("res.data      : " + res.data);
                    console.log("res.data.user : " + res.data.user);
                // 2. 요청 성공(200 ~ 299)
                // 서버가 응답을 성공적으로 보냈을 때 실행
                // setUser(res.data); // 로그인 성공 시 사용자 정보 저장
                    if(res.data.success && res.data.user) {
                        setUser(res.data.user);
                        return{
                            success : true,
                            message : res.data.message
                        };
                    } else {
                        return {
                            success: false,
                            message: res.data.message || '로그인 실패'
                        }
                    }

                })
            .catch( err => {
                console.error("로그인 에러 : ", err);
                return {
                    success : false,
                    message : '로그인 중 오류가 발생했습니다.'
                };
            });
    };

    const logoutFn = () => {
        return axios.post(API_AUTH_URL+'/logout',
            {},{withCredentials:true}            )
            .then(res => {
                console.log("로그아웃 응답 : ", res.data);
                setUser(null); // 사용자 정보 초기화
                return { success : true };
            })
            .catch(err => {
                console.error("로그아웃 에러 : ", err);
                return {success: false};
            });
    }

    const updateUser = (newUser) => {
        setUser(newUser);
    };

    // Context에 제공할 값 들
    const value = {
        user, // 현재 로그인 한 사용자 정보
        loading,  // 로딩 상태
        loginFn, // 로그인 함수
        logoutFn, // 로그아웃 함수
        // isAuthenticated:!user, // 로그인 여부(true/false) 제공될 것
        isAuthenticated:!!user, // 로그인 여부(true/false) 제공될 것
        updateUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;