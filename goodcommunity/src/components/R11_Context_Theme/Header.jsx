import {useContext} from "react";
import {ThemeContext} from "../../Main_Theme";
import {lightTheme, darkTheme, commonStyles} from "./themeStyles";

const Header = () => {
    const {isDark, toggleTheme} = useContext(ThemeContext);
    const theme = isDark ? darkTheme : lightTheme;
    return (
        <header style={commonStyles.header.container}>
            <h1 style={theme.header.title}>웹사이트</h1>
            <button
                onClick={toggleTheme}
                style={{...commonStyles.header.button, ...theme.header.button}}
            >
                {isDark ? '라이트 모드' : '다크 모드'}
            </button>
        </header>
    );
};

export default Header;