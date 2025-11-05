import {useContext} from "react";
import {ThemeContext} from "../../Main_Theme";
import {lightTheme, darkTheme, commonStyles} from "./themeStyles";

const Footer = () => {
    const {isDark} = useContext(ThemeContext);
    const theme = isDark ? darkTheme : lightTheme;

    return (
        <footer style={{...commonStyles.footer.container,...theme.footer.container}}>
            <p style={theme.footer.copyText}>&copy; 2025 - {isDark ? '다크 모드' : '라이트 모드'}</p>
        </footer>
    );
};

export default Footer;