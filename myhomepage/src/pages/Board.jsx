import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {fetchAllBoards} from "../service/ApiService";
import {goToPage, renderLoading} from "../service/commonService";

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 백엔드 호출 할 때 axios, 백엔드에서 res.data 를 담아올 setBoards 변수 이름만 전달, setLoading = true 형태
        fetchAllBoards(axios, setBoards, setLoading);
    }, []);

    if (loading) {
        return renderLoading("게시물을 불러오는 중");
    }
    /**
     * 게시물이 하나도 존재하지 않을 경우
     * 둘 중 편한 방법 사용
     * 1. board 가 없는게 사실이라면 renderLoading 이용해서 게시물을 찾을 수 없습니다. 표기
     * 2. 삼항 연산자를 이용해서 게시물의 length 가 0 이하라면 false 에 renderLoading 표기 가능
     */

    if(!boards) {
        return renderLoading("게시물을 찾을 수 없습니다.");
    }

    return (
        <div className="page-container">
            <div className="board-header">
                <h1>게시판</h1>
                <button className="button" onClick={() => goToPage(navigate, 'write')}>
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
                        <tr style={{cursor: 'pointer'}} key={b.id} onClick={() => goToPage(navigate, `/board/${b.id}`)}>{/* 1. 제목 클릭해도 게시물 들어가게 설정 */}
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