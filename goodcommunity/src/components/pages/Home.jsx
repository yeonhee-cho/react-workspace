import {colors, commonStyles} from "./styles";

const Home = () => {
    return (
        <div style={commonStyles.container}>
            <h1 style={{...commonStyles.title, color:colors.secondary}}>홈페이지</h1>
            <p style={commonStyles.text}>메인페이지입니다.</p>
        </div>
    );
};

export default Home;
