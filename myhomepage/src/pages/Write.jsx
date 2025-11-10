import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

// 글쓰기
const Write = () => {
    // form 데이터 내부 초기값 
    // 작성자 -> 추후 변경 불가하게 로그인한 아이디로 박제 예정
    // react-router-dom 에 존재하는 path 주소 변경 기능 사용
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title:'',
        content:'',
        writer:'',
    })

    const handleSubmit = (e) => {
        e.preventDefault(); // 제출 일시 중지
        axios.post("http://localhost:8085/api/board", formData);
        alert("글이 작성되었습니다.");
        navigate('/board'); // 게시물 목록 페이지로 이동
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(p => ({
            ...p, [name] : value
        }))
    }

    // ok 를 할 경우 게시물 목록으로 돌려보내기
    // 기능이 하나이기 때문에 if 다음 navigate 는 {} 생략 후 작성
    const handleCancel = () => {
        if(window.confirm("작성을 취소하시겠습니까?")) navigate('/board');
    }
    
    return (
        <div className="page-container">
            <h1>글쓰기</h1>
            <form onSubmit={handleSubmit}>
                <label>작성자 :
                    <input type="text" id="writer" name="writer" value={formData.writer} onChange={handleChange} placeholder="작성자를 입력하세요." maxLength={50} required/>
                </label>
                <label>제목 :
                    {/* "" 는 String 값, {}는 다 쓸 수 있음.. */}
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="제목을 입력하세요." maxLength={200} required/>
                </label>
                <label>내용 :
                    <textarea id="content" name="content" value={formData.content} onChange={handleChange} placeholder="내용을 입력하세요." rows={15} required/>
                </label>
                <button type="submit">작성하기</button>
                <button type="button" onClick={handleCancel}>돌아가기</button>
            </form>
        </div>
    );
};

// 소괄호 내에는 js 작성 불가
// 단순 html 만 작성 가능
// 지양
const 소괄호 = (props) => (
    <div className="page-container">
        <h1>글쓰기</h1>
        {/*
        예외적으로 js가 필요한 경우
        html 내부에서 js를 작성 가능
        정말 급할 때 이 외에는 추천하지 않는 방법
        Parent 에서 매개변수로 props 를 전달받고,
        전달받은 props 데이터 변수 명칭을 단순히 사용하기만 할 때 사용
        */}
        <p>새 게시물 작성 폼</p>
        <p>{props}</p>
    </div>
);


// 중괄호({) 시작하고 return 전에 js 작성 가능,
// 가장 많이 사용하는 형태
const 중괄호 = () => {
    // js 기능 작성 가능하다.
    return (
        <div className="page-container">
            <h1>글쓰기</h1>
            <p>새 게시물 작성 폼</p>
        </div>
    );
};

export default Write;