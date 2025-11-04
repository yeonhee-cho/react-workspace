import React, { useState } from 'react';

const TodoInput = () => {
    // 여기에 코드 작성
    // 1. useState로 할일 내용 상태 만들기 (초기값: '')
    // 2. input onChange 이벤트 핸들러 만들기
    // 3. 추가 버튼 클릭 핸들러 만들기
    const [todo, setTodo] = useState('');
    return (
        <div>
            <h2>할일 입력</h2>
            {/* input */}
            <input
                type="text"
                value={todo}
                onChange={handleChange}
                placeholder="할 일을 입력하세요." />
            {/* 글자 수 표시 */}
            <div>글자 수 : {todo.length}/50</div>
            {/* 50자 초과 시 경고 메시지 */}
            {todo.length > 50 && (
                <div>글자수 초과</div>

            )}
            {/* 추가 버튼 (비어있으면 비활성화) */}
            <button onClick={} disabled={todo.trim() === ''} >추가</button>
            {/* 입력한 내용 미리보기 */}
            {todo && (
                <div>입력한 내용 : {todo}</div>
            )}
        </div>
    );
}

export default TodoInput;