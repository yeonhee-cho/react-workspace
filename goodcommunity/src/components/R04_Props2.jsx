/**
 * 부모 컴포넌트로 전달받은 props 를 화면에 표시
 * 구조 분해 할당
 * @param {Object} props - 부모로부터 전달받은 속성들의 객체를 한 번에 가져오는 것
 *
 *  * @param {number} 변수1번 - props.변수1번 으로 전달받을 수 있지만 구조 분해 할당을 하여
 *  *                           props.변수1번 대신 변수1번으로 데이터가 들어있는 명칭을 가져와 사용
 *  * @param {string} 변수2번 - props.변수2번 으로 전달받을 수 있지만 구조 분해 할당을 하여
 *  *                           props.변수2번 대신 변수2번으로 데이터가 들어있는 명칭을 가져와 사용
 * @returns {JSX.Element}
 * @constructor
 *
 * 구조 분해 할당을 사용하면
 * props.변수1번 대신 변수1번을 바로 사용 가능하다.
 */
const R04_Props2 = ({변수1번, 변수2번}) => {
    return (
        <>

        </>
    );
};

export default R04_Props2;