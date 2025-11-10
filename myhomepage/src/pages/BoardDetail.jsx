import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const BoardDetail = () => {
    const {id} = useParams(); // URL에서 id 값 가져오기
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:8085/api/board/${id}`)
            .then((res => {
                console.log(res.data);
                setBoard(res.data);
                setLoading (false); // 로딩 상태 해지
            }))
            .catch(err => {
                alert("게시물을 불러올 수 없습니다.");
                navigate('/board'); // 게시물 전체 목록으로 돌려보내기
            })
    }, [id, navigate]);

    // 로딩 중일 때
    if(loading) {
        return <div className="page-container"> 로딩 중 ... </div>
    }

    return (
        <div className="page-container">
            <div className="board-detail-info">
                <span>작성자 : {board.writer}</span>
                <span>조회수 : {board.viewCount}</span>
                <span>작성일 : {board.createdAt}</span>
            </div>
            <div className="board-detail-content">
                {board.content}
            </div>
            <button className="button" onClick={() => navigate('/board')}>
                목록으로
            </button>
        </div>
    );
};

export default BoardDetail;