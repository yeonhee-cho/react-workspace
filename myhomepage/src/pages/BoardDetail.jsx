import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {fetchBoardDetail} from "../service/ApiService";
import {goToPage, renderLoading} from "../service/commonService";

const BoardDetail = () => {
    const {id} = useParams(); // URL에서 id 값 가져오기
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBoardDetail(axios, id, setBoard, navigate, setLoading); // setLoading 인자 값 넣어주기!!
    }, [id]);

    // 로딩 중일 때
    if(loading) {
        return renderLoading("게시물을 불러오는 중");
    }

    if(!board) {
        renderLoading("게시물을 찾을 수 없습니다.");
        goToPage(navigate,"/board");
    }

    let 상세이미지들 = [];
    if(board.boardDetailImage) {
        상세이미지들 = board.boardDetailImage.split(',');
    }

    return (
        <div className="page-container">
            <div className="board-detail-info">
                <span>작성자 : {board.writer}</span>
                <span>조회수 : {board.viewCount}</span>
                <span>작성일 : {board.createdAt}</span>
            </div>

            {board.boardMainImage ?
                <div className="product-detail-image" style={{marginBottom:"20px"}}>
                    <img src={board.boardMainImage} alt={board.title}/>
                </div>
                :
                ""}

            <div className="board-detail-content">
                {board.content}
            </div>

            <div className="detail-image-list" style={{display:"flex",flexWrap: "wrap", gap:"4px"}}>
                {상세이미지들.map((이미지경로, 순번) => (
                    <div key={순번} style={{width:"calc((924px - (4px * 5))/5)", height:"200px", overflow:"hidden"}}>
                        <img src={이미지경로} alt="이미지상세" style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                    </div>
                ))}
            </div>

            <button className="button" onClick={() => goToPage(navigate, '/board')}>
                목록으로
            </button>
        </div>
    );
};

export default BoardDetail;