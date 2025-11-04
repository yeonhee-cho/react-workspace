import {Link} from "react-router-dom";
import {colors, commonStyles} from "./styles";

const NotFound = () => {
    return (
        <div style={commonStyles.container}>
            <h1 style={{...commonStyles.title, fontSize:'5rem', color:colors.danger}}>404</h1>
            <p style={commonStyles.text}>페이지를 찾을 수 없습니다.</p>
            <Link to="/">홈으로 돌아가기</Link>
        </div>
    );
};

export default NotFound;
