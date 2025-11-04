// 1. 불러오기
import {BrowserRouter, Routes, Route, Link, useNavigate, useParams} from 'react-router-dom';

// App.js 나 Main.js는 경로나 세션, 보안 설정 자바스크립트
function Main() {
    return(

        <BrowserRouter>
            // 2.
            <nav>
                <Link to="/">홈</Link>
                <Link to="/about">소개</Link>
                <Link to="/contact">연락처</Link>
                <Link to="/user/123">사용자 프로필</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default Main;