import React, {useState} from "react";
import {Link} from "react-router-dom";

// 로그인
const Login = () => {
    const [memberEmail, setMemberEmail] = useState('');
    const [memberPassword, setMemberPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {

    }
    return (
        <div className="page-container">
            <div className="login-box">
                <h1>로그인</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>이메일
                            <input type="email"
                                   id="memberEmail"
                                   placeholder="이메일을 입력하세요."
                                   value={}
                                   onChange={}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>비밀번호
                            <input type="password"
                                   id="memberPassword"
                                   placeholder="비밀번호를 입력하세요."
                                   value={}
                                   onChange={}
                            />
                        </label>
                    </div>
                    {message && (<div className="error-message">{message}</div>)}
                    <button type="button">로그인</button>
                </form>
                <div className="login-footer">
                    <p>계정이 없으신가요? <Link to="/signup">회원가입</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;