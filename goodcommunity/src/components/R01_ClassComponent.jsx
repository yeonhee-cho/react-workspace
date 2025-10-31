/* 컴포넌트를 반환할 js 나 jsx 파일은 무조건 대문자 시작 */
// R01_ClassComponent

import React, {Component} from "react";

/**
 * React에서 함수를 만드는 방법은 여러가지가 존재함
 *
 * 1. const 함수형 컴포넌트
 *    화살표 함수
 *    간결하고 현대적
 *    this 바인딩 불필요
 *    가장 많이 사용
 *
 * 2. function 함수형 컴포넌트
 *    전통적인 함수 선언
 *    호이스팅 가능
 *    this 바인딩 불필요
 *    함수이름 명확함
 *
 * 3. class 컴포넌트
 *    ComponentEx 작성하는 방법
 *    고전적인 방법, 거의 사용 안 함(레거시), 근래에는 사용하지 않음
 *    this 바인딩 필요 -> 자바에서 사용한 super() 와 this 를 사용함
 *    복잡하고 장황함 (불필요한 예약어가 많이 필요하여 사용하지 않음)
 *    코드가 의미없이 길어짐
 */

// 클래스형 컴포넌트 만들기
    // 1. Component 상속받기
    // 2. render() 함수 작성하기(필수)
    // 3. 만든 class 를 export default 작성하기
class ComponentEx extends Component {
    /* js를 작성하는 공간이기 때문에 script 주석 사용 */
    
    // render() 함수 : 
    // return 되는 html 형식의 코드(jsx, js + xml)를 화면에 출력하는 함수
    // 화면이 변경되어야 할 시점에 자동으로 호출됨
    // Component 를 상속 받은 하위 클래스에 반드시 있어야하는 함수
    render() {
        return(
            <>
                {/* js 또는 jsx로 React 화 된 html 내부 주석 사용*/}
                <h2>클래스형 컴포넌트 입니다.</h2>
                <hr/>
            </>
        )
    }
}

export default ComponentEx;
// ComponentEx 라는 컴포넌트를 내보내겠다는 의미
// TODO