import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

// 전체 게시판
// 1. const Board = () => () -> {} 형태로 변경
// 2. useEffect 이용해서 8085/api/board/all 데이터 가져오기
// axios.get 이용
// const [boards, setBoards] = useState([]);
// boards 에 백엔드에서 가져온 데이터를 데이터 추가

// 작업 시 안되면 캐시 무효화 진행 후 시작!
const Board = () => {
    const navigate = useNavigate();
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8085/api/board/all")
            .then(res => {
                console.log("boards", boards);
                // res.date 백엔드에서 가져온 데이터를 boards에 넣어주기 전 이므로,
                // 데이터가 0인 상태가 맞음
                console.log("백엔드에서 가져온 데이터: ", res.data);
                console.log("백엔드에서 가져온 데이터를 boards에 저장", setBoards(res.data));
                setBoards(res.data); // boards 변수 이름에 데이터 저장 기능 실행
            })
            .catch(err => alert("데이터를 가져올 수 없습니다.")) // {} 생략
    }, []);

    const handleIDClick = (id) => {
        navigate(`/board/${id}`)
    }

    return (

        <div className="page-container">
            <div className="board-header">
                <h1>게시판</h1>
                <button className="button">
                    글쓰기
                </button>
            </div>

            <div className="board-info">
                <p>전체 게시물: {boards.length}개</p>
            </div>

            <table className="board-table">
                <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>조회수</th>
                    <th>작성일</th>
                </tr>
                </thead>
                <tbody>
                    {boards.map((b) => (
                        <tr style={{cursor: 'pointer'}} key={b.id} onClick={() => handleIDClick(b.id)}>{/* 1. 제목 클릭해도 게시물 들어가게 설정 */}
                            <td>{b.id}</td>
                            <td>{b.title}</td>
                            <td>{b.writer}</td>
                            <td>{b.viewCount}</td>
                            <td>{b.createdAt}</td>{/* 2025-11-07 11:38:41 -> 2025-11-07 */}
                            {/*
                            <td>
                            {(new Date(b.createdAt)).getFullYear()}년&nbsp;
                            {String(new Date(b.createdAt).getMonth() + 1).padStart(2, '0')}월&nbsp;
                            {String((new Date(b.createdAt)).getDate()).padStart(2, '0')}일
                            </td>
                            */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Board;