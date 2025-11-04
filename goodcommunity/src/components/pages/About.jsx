import {useNavigate} from "react-router-dom";
import {colors, commonStyles} from "./styles";

const About = () => {
    const navigate = useNavigate();
    return (
        <div style={commonStyles.container}>
            <h1 style={{...commonStyles.title, color: colors.success}}>소개 페이지</h1>
            <p style={commonStyles.text}>우리를 소개합니다.</p>
            <button style={commonStyles.button} onClick={()=>navigate('/')}>홈으로 이동</button>
        </div>
    );
};

export default About;
