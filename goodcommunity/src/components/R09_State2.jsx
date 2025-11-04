import {useState} from "react";

/*
Object  : 모든 클래스나 컴포넌트의 최상위 부모
          String, Boolean, Number, Character, Array, 개발자가 만든 객체, ...
Number  : Byte Short, Integer, Long, Float, Double
          정수와 실수에 해당하는 모든 객체

Integer : 정수 숫자
          Number -> Object 를 상속받는 형태

상속 흐름 Integer -> Number -> Object
 */

// <State2 init={50} step={10} />
// props 내부에는 init = 50 과 step = 10 을 보유하고 있다.
const State2 = (props) => {

    // props 로 전달받은 값 중
    // init 값을 count 초기 값으로 설정

    // setCount() 를 이용해 count 값으로 변경
    // StateEx2 컴포넌트에서 변경된 부분만 리랜더링 진행
    //                                          정수나 실수.. 타입의 숫자들
    const [count, setCount] = useState(Number(props.init));
    return (
        <div className='count-container'>
            <button onClick={() => {setCount(count-Number(props.step))}}>
                -{props.step}
            </button>
            <h3>{count}</h3>
            <button onClick={() => {setCount(count+Number(props.step))}}>
                +{props.step}
            </button>
        </div>
    );
};

export default State2;