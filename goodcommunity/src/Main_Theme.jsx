import {createContext, useState} from "react";
import Header from "./components/R11_Context_Theme/Header";
import Content from "./components/R11_Context_Theme/Content";
import Footer from "./components/R11_Context_Theme/Footer";
import PracticeApp from "./PracticeApp";

// 테마를 위한 Context 생성
// 한 페이지에서 다수의 const 를 export 내보내기 처리 할 수 있다.
// export는 다수로 작성가능하지만, export default는 하나!
export const ThemeContext = createContext();

// 부모 컴포넌트 (전체 최상위 앱)
const Main_Theme = () => {
    // 다크모드 on/off 상태
    // 초기 값은 다크모드가 false 로 꺼진 상태
    const [isDark, setIsDark] = useState(false);

    // 테마 전환 함수
    const toggleTheme = () => {
        setIsDark(!isDark); // 현재 상태릐 반대로 값 설정하기
    }
    return (
        // Context로 isDark와 toggleTheme 함수를 모든 하위 컴포넌트에서
        // 사용하고 싶은 곳에서 사용할 수 있도록 제공하겠다.
        <ThemeContext.Provider value={{isDark,toggleTheme}}>
            <div style={{minHeight: '100vh', backgroundColor:isDark ? '#222':'#fff',color: isDark ? '#fff': '#222', padding : '20px'}}>
                <Header/>
                <Content/>
                <Footer/>
            </div>
        </ThemeContext.Provider>
    )
}

export default Main_Theme;