import {colors, commonStyles} from "./styles";

const Contact = () => {
    return (
        <div style={commonStyles.container}>
            <h1 style={{...commonStyles.title, color:colors.danger}}>연락처</h1>
            <p style={commonStyles.text}>여기로 연락주세요 :)</p>
        </div>
    );
};

export default Contact;
