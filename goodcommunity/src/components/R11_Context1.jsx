/**
 * Parent (Provider 로 기본값 제공)
 * ↓
 * Child (값을 사용하지 않고 통과)
 * ↓
 * GrandChild (useContext 로 값을 사용)
 * ======================================
 * Context 를 사용하지 않을 경우
 * <Parent>
 *     <Child value={data}> -->  data를 이용할 필요가 없지만, Grand 에 data 를 전달하기 위해 값을 가지고 있어야 하는 상황
 *         <GrandChild value={data} />
 *     </Child>
 * </Parent>
 * Context를 사용하는 경우
 * Parent Component
 *      Child Component
 *              GrandChild Component  useContext 를 이용해서 Parent 에서 전달한 값을 사용할 수 있다.
 */
import {createContext, useContext} from "react";

/*
* 1. Context 객체 생성
* Context를 저장하는 변수명은 무조건 대문자 시작
*
* */
const TestContext = createContext();

/**
 * 4. 후손 컴포넌트
 */
const GrandChild = () => {
    // 현재 컴포넌트에서 Content 객체를 얻어와 사용
    // TestContext 에서 제공하는 값 ('Parent 에서 전달한 값')을 얻어와
    // ParentValue 에 대입
    const parentValue = useContext(TestContext);
    return (
        <>
            <h3>GrandChild Component ({parentValue})</h3>
        </>
    );
};
/**
 * 자식 컴포넌트
 */
const Child = () => {
    return (
        <>
            <h2>Child Component</h2>
                <GrandChild />
        </>
    );
};

/**
 * 부모 컴포넌트
 */
const Parent = () => {
    return (
        /**
         * Context 객체를 이용해서 하위 컴포넌트에 value 제공
         */
        <TestContext.Provider value='Parent 에서 전달한 값'></TestContext.Provider>
    );
};

export default Parent;