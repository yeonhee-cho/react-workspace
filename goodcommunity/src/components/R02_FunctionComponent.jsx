import {useState} from "react";

const ClickCount = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h3>{count}</h3>
            <button onClick={()=> {setCount(count + 1)}}>
                클릭 시 1 증가
            </button>
        </div>
    )
}

// 함수형 컴포넌트
// 1. 함수 생성하기
// 2. return 구문에 출력하고자 하는 html 코드 작성
// 3. 만든 함수를 export default 지정하기
const FunctionEx = () => {
    // render()는 const 와 function 에서는 생략된다.
    return (
        /*
        * 리액트 컴포넌트에 class 추가 시 className 이라고 작성
        * 리액트는 열고 닫음을 중요 시 여김
        * 에러를 즉각적으로 확인할 수 있음
        * */
        <>
            <h2 className='red'>
                함수형 컴포넌트 입니다.
            </h2>
            <hr/>
            <ClickCount />
        </>
    )
}
export default FunctionEx;