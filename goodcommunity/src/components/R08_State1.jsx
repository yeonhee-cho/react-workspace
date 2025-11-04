import {useState} from "react";

const State1 = () => {
    // State : 컴포넌트의 상태(전역 변수)
    // useState() 함수
    // 컴포넌트 상태(state) 값이 변하게 될 경우
    // 해당 컴포넌트를 다시 렌더링(ReRendering)하는 함수
    // test : 컴포넌트의 전역 변수(State) 선언
    // setTest : test 값을 변경하기 위한 함수
    // useState('A')
    // - test 가 변경을 감지할 State 라고 인식
    //  + test 변수에 초기값으로 'A' 대입
    // - test 값을 변경할 수 있는 함수(setTest())로 등록
    // import {useState} from "react"; 반드시 맨 위에 존재해야함

    const [test, setTest] = useState('A');

    // 버튼 클릭 시 동작할 함수(이벤트 핸들러) 정의
    const changeFn = () => {
        if(test ==='A') setTest('B');
        else setTest('A'); // {}를 모두 생략한 상태
    }
    return (
        <>
            <h1>{test}</h1>
            {/* onClick : 클릭이 되었을 때를 감지하는 이벤트 리스너 */}
            <button onClick={changeFn}>변경!</button>
        </>
    );
};

// const function 명칭과 일치하는 컴포넌트를 작성
export default State1;