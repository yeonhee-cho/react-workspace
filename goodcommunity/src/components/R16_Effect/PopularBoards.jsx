import {useEffect, useState} from "react";
import axios from "axios";

const PopularBoards = () => {
    const API_BASE_URL = "http://localhost:8080";
    const [popBoards, setPopBoards] = useState([]);

    useEffect(() => {
        // axios.get 을 이용해서 인기 게시물 데이터 가져오기
        const res = axios.get(`${API_BASE_URL}/api/board/popular`)
            .then(res => {
                setPopBoards(res.data);
                console.log(res.data);
            })
            .catch(err => {
                alert("백엔드에서 데이터 가져오는데 문제 발생")
            })
    }, []);
    return (
        <>
            <h2>인기 게시물</h2>
            <ul>
                {popBoards.map(p => (
                    <li>
                        <strong>{p.title} ({p.createdAt})</strong>
                        조회수 : {p.viewCount}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default PopularBoards;
