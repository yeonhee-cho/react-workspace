import React, {useState} from "react";

// 로그인
const Login = () => {
    const [memberEmail, setMemberEmail] = useState('');
    const [memberPassword, setMemberPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <div className="page-container">
            <h1>로그인</h1>
            <p>로그인 폼</p>

        </div>
    );
};

export default Login;