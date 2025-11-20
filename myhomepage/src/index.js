import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';

// 1. 라우터와 Provider 임포트
// import {} 사용 방법, 사용하지 않는 방법
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import ToastProvider from "./context/ToastProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode> {/*성능검사*/}
        {/* 2. AuthProvider로 앱을 감쌉니다 (로그인 상태 공유) */}
        <AuthProvider>
            {/* 4. ToastProvider 로 앱을 감쌉니다.(알림 기능) */}
            <ToastProvider>
                {/* 3. BrowserRouter로 앱을 감쌉니다 (페이지 이동 기능) */}
                <BrowserRouter>
                    <App /> {/* 로그인 인증 TODO */}
                </BrowserRouter>
            </ToastProvider>
        </AuthProvider>
    </React.StrictMode>
);

