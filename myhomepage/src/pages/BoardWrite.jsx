import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {boardSave} from "../service/ApiService";
import {handleChangeImage, handleInputChange} from "../service/commonService";

/**
 * 게시물 작성 시, 작성자를 로그인한 유저 이름을 가져오고, 변경 불가능하게 설정 <p> 태그 활용
 * TODO boardSave 라는 이름으로 scripts 에 게시물 업로드 함수 추가해서 BoardWrite 에 호출해서 사용
 */
// 글쓰기
/**
 * user?.memberEmail = 삼항 연산자의 줄임표현
 *  user 객체가 존재하면 user.memberEmail 반환
 *  user 가 null 또는 undefined 라면 에러 없이 undefined 반환
 *  
 *  const email = user.memberEmail;
 *  의 경우 user 가 null 일 경우 error 발생
 *  
 *  const email = user?.memberEmail;
 *  의 경우 user가 null 일 경우 undefined 발생
 *
 *  user?.memberEmail 아래와 동일하게 작동
 *
 *  user ? user.memberEmail : undefined 형태
 *
 *  let email;
 *  if(user) {
 *      email = user.memberEmail;
 *  } else {
 *      email = undefined;
 *  }
 */
/*
게시물 작성하기 에서 게시물 관련 이미지 추가 넣기
1. 게시물 작성할 때, 게시물 이미지 추가하기와 같은 라벨 추가
2. 라벨을 선택했을 때, 이미지만 선택 가능하도록 input 실행
3. input = display:none;
4. 이미지 추가하기 클릭하면 새롭게 클릭된 이미지로 변경

등록하기를 했을 경우에만 추가하기 가능
*/

const BoardWrite = () => {
    // form 데이터 내부 초기값
    // 작성자 -> 추후 변경 불가하게 로그인한 아이디로 박제 예정
    // react-router-dom 에 존재하는 path 주소 변경 기능 사용
    const navigate = useNavigate();
    const {user, isAuthenticated, logoutFn} = useAuth();

    // 이미지 관련 상태
    // imageFile : 업로드 할 이미지 파일을 따로 저장
    // imageUrl : 클라이언트가 input 창에 넣어 준 데이터

    // 메인 이미지 관련
    const mainImgsFileInputRef = useRef(null);
    const [uploadedMainBoardImageFiles, setUploadedMainBoardImageFiles] = useState(null); // 실제 데이터베이스에 업로드하고, 파일 폴더에 저장할 이미지 파일
    const [boardMainImagePreviews, setBoardMainImagePreviews] = useState(null); // 이미지 미리보기

    // 상세 이미지 관련 (최대 5장)
    const 상세사진새로고침해도상태변화없도록설정 = useRef(null);
    const [상세사진이름들, set상세사진이름들] = useState(null);
    const [상세사진들미리보기, set상세사진들미리보기] = useState([]);

    // 상세 이미지 관련 (최대 5장)
    // js 는 컴파일 형태가 아니기 때문에, 변수 정의는 순차적으로 진행하므로, user 를 먼저 호출하고 나서
    // user 관련된 데이터 활용
    const [board, setBoard] = useState({
        title: '',
        content: '',
        writer: user?.memberEmail || '',
    })

    /**
     * @boards  상태 관리 변수 이름, 기능 객체
     * 언제 사용하는가 : input, textarea 등에서 value = {boards.title} 형태로 화면에 표시
     * 업데이트 : setBoards() 를 통해 값 변경
     * 예시 : 사용자가 제목을 입력하면 -> boards.title 에 저장됨
     * 
     * @boardUploadFromData 백엔드로 데이터를 전송하기 위한 특수 객체
     * 타입 : 파일 업로드를 위한 HTML5 API
     * 언제 사용하는가 : axios.post() 로 서버에 데이터를 전송할 때 사용
     * 특징 : JSON + 파일 데이터를 함께 전송 가능 multipart/form-data
     * 예시 : 제목, 내용(JSON) + 이미지 파일을 한 번에 전송
     */

    const handleSubmit = async (e) => {
        e.preventDefault(); // 제출 일시 중지

        try {
            const boardUploadFromData = new FormData();

            const boardData = {
                title: board.title,
                content: board.content,
                writer: user?.memberEmail,
            }

            // 3. boardDataBlob 처리 해주기
            const boardDataBlob = new Blob(
                [JSON.stringify(boardData)],
                {type:'application/json'}
            );

            // FormData 에 board 데이터 추가
             boardUploadFromData.append('board', boardDataBlob);

             // 4. 이미지 파일이 있으면 formData 에 추가
            if(uploadedMainBoardImageFiles) boardUploadFromData.append('mainImage', uploadedMainBoardImageFiles);
            
            // 상세 이미지들 추가
            if(상세사진이름들 && 상세사진이름들.length > 0) {
                상세사진이름들.forEach((사진한장씩) => {
                    boardUploadFromData.append('detailImageFile', 사진한장씩);
                })
            }
            
            // 5. 백엔드 호출
            await boardSave(axios, boardUploadFromData, navigate); // 추가적인 로직이 잇을 수 있으니 async await 넣어주기

        } catch (err) {

        }
    }

    const handleChange = (e) => {
        handleInputChange(e, setBoard);
    }

    // 상세 이미지 여러 장 변경 핸들러
    const handleDetailImagesChanges = (e) => {
        const files = Array.from(e.target.files);

        // 최대 5장까지만 허용
        if(files.length > 5) {
            alert("상세 이미지는 최대 5장까지 업로드 가능합니다.");
            return;
        }

        // 각 파일이 5MB가 넘는지 검증
        for(let f of files) {
            if(f.size > 5 * 1024 * 1024) {
                alert(`${f.name}의 크기가 5MB를 초과합니다.`);
                return;
            }

            if(!f.type.startsWith('image/')) {
                alert(`${f.name}은(는) 이미지 파일이 아닙니다.`);
                return;
            }

            // for문을 통해 모든 사진에 대한 검증이 종료되면, 상세이미지 파일에 파일 명칭 저장
            set상세사진이름들(files);

            // 미리보기 생성
            const 미리보기할상세사진들 = [];
            let 사진개수 = 0;

            files.forEach((file, 사진순서) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    미리보기할상세사진들[사진순서] = reader.result;
                    사진개수++;

                    // 모든 파일 로드 완료 시
                    if(사진개수 === files.length) {
                        // 미리보기화면에서 보일 수 있도록 setter를 이용해서 미리보기 변수에 저장
                        set상세사진들미리보기(미리보기할상세사진들);
                    }
                };
                // 파일 하나씩 하나씩 미리보기 생성
                reader.readAsDataURL(file);
            })
        }
    }
    // ok 를 할 경우 게시물 목록으로 돌려보내기
    // 기능이 하나이기 때문에 if 다음 navigate 는 {} 생략 후 작성ㅇ
    const handleCancel = () => {
        if (window.confirm("작성을 취소하시겠습니까?")) navigate('/board');
    }
    
    return (
        <div className="page-container">
        {isAuthenticated ? (
            <>
                <h1>글쓰기</h1>
                <form onSubmit={handleSubmit}>
                    {/*
                    로그인 상태에 따라 다른 메뉴 표시
                    formData.writer 에 user?.memberEmail 데이터를 전달하기
                    */}
                    <div className="writer-section">
                        <label>작성자 :
                            {/*<input type="text" id="writer" name="writer" value={formData.writer} onChange={handleChange} placeholder="작성자를 입력하세요." maxLength={50} required/>*/}
                        </label>
                        <div className="writer-display">
                            {/*writer-email*/}
                            <span className="user-email">{user?.memberName}</span>
                        </div>
                    </div>

                    <label>제목 :
                        {/* "" 는 String 값, {}는 다 쓸 수 있음.. */}
                        <input type="text"
                               id="title"
                               name="title"
                               value={board.title}
                               onChange={handleChange}
                               placeholder="제목을 입력하세요."
                               maxLength={200}
                               required
                        />
                    </label>

                    <div className="form-group">
                        <label htmlFor="imageUrl" className="btn-upload">
                            게시물 메인 이미지 추가하기
                        </label>
                        <input
                            type="file"
                            id="imageUrl"
                            name="imageUrl"
                            ref={mainImgsFileInputRef}
                            onChange={handleChangeImage(setBoardMainImagePreviews, setUploadedMainBoardImageFiles, setBoard)}
                            accept="image/*"
                            style={{display: 'none'}}
                        />
                        <small className="form-hint">
                            게시물 이미지를 업로드 하세요. (최대 5MB, 이미지 파일만 가능)
                        </small>

                        {boardMainImagePreviews && (
                            <div className="image-preview">
                                <img
                                    src={boardMainImagePreviews}
                                    alt="미리보기"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '400px',
                                        marginTop: '10px',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px',
                                        padding: '5px'
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <label>내용 :
                        <textarea id="content"
                                  name="content"
                                  value={board.content}
                                  onChange={handleChange}
                                  placeholder="내용을 입력하세요."
                                  rows={15}
                                  required
                        />
                    </label>

                    {/* 상세 이미지 여러 장 업로드 & 미리보기 */}
                    <div className="form-group">
                        <label htmlFor="detailImages" className="btn-upload">
                            상세 이미지 추가하기 (최대 5장)
                        </label>
                        <input type="file"
                               id="detailImages"
                               name="detailImages"
                               ref={상세사진새로고침해도상태변화없도록설정}
                               onChange={handleDetailImagesChanges}
                               accept="image/*"
                               multiple
                               style={{display:'none'}}
                        />
                        <small className="form-hint">
                            상세 이미지를 업로드하세요. (최대 5개, 각 5MB 이하)
                        </small>
                        {상세사진들미리보기.length > 0 && (
                            <div className="multiple-images-preview">
                                <p className="detail-images-selected-text">
                                    선택된 이미지 : {상세사진들미리보기.length} 개
                                </p>

                                <div className="detail-image-list" style={{display:"flex"}}>
                                    {상세사진들미리보기.map((image, index) => (
                                            <div key={index} className="detail-image-item">
                                                <img src={image}
                                                     alt={`상세이미지 ${index + 1}`}
                                                />
                                            </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="form-buttons">
                        <button type="submit" className="btn-submit">작성하기</button>
                        <button type="button" className="btn-cancel" onClick={handleCancel}>돌아가기</button>
                    </div>
                </form>
            </>
            ) : (
                // <p>로그인을 해야지 접근 가능한 페이지 로그인 화면으로 돌려보내기</p>
                navigate("/login")
            )
        }
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

export default BoardWrite;