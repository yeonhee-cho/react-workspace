import {useParams} from "react-router-dom";
import {colors, commonStyles} from "./styles";

const UserProfile = () => {
    const {userId} = useParams();

    return (
        <div style={commonStyles.card}>
            <h1 style={{...commonStyles.title, color:colors.purple}}>사용자 프로필</h1>
            <p style={commonStyles.text}>사용자 ID :
                <span style={{...commonStyles.badge, backgroundColor:colors.purple, color:colors.white}}>
                    {userId}
                </span>
            </p>
        </div>
    );
};

export default UserProfile;
