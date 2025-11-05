import React, { useState } from 'react';

const TodoInput = () => {
    // 1. useState로 할일 내용 상태 만들기 (초기값: '')
    const [todo, setTodo] = useState('');

    // 2. input onChange 이벤트 핸들러 만들기
    const handleInputChange = (e) => {
        setTodo(e.target.value);
    }
    // 3. 추가 버튼 클릭 핸들러 만들기
    const handleAddTodo = (e) => {
        if(todo.trim()) {
            alert(`할 일이 추가되었습니다. ${todo}`);
            setTodo(''); // 입력 필드 초기화
        }
    }

    return (
        <div>
            <h2>할일 입력</h2>
            {/* input */}
            <input
                type="text"
                value={todo}
                onChange={handleInputChange}
                placeholder="할 일을 입력하세요." />
            {/* 글자 수 표시 */}
            <div>글자 수 : {todo.length}/50</div>
            {/* 50자 초과 시 경고 메시지 */}
            {todo.length > 50 && (
                <div>글자수 초과</div>

            )}
            {/* 추가 버튼 (비어있으면 비활성화) */}
            <button onClick={handleAddTodo} disabled={todo.trim() === ''} >추가</button>
            {/* 입력한 내용 미리보기 */}
            {todo && (
                <div>입력한 내용 : {todo}</div>
            )}
        </div>
    );
}

export default TodoInput;