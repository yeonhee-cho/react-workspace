/**
 * 부모 컴포넌트로 전달받은 props 를 화면에 표시
 * 
 * @param props - 부모로부터 전달받은 속성들
 * @returns {JSX.Element}
 * @constructor
 */
const PropsEx1 = (props) => {
    return (
        <>
            <div style={{padding: '20px', border: '1px solid #ddd'}}>
                <h2>props 예제</h2>
                <p>이름 : {props.name}</p>
                <p>나이 : {props.age}</p>
                <p>직업 : {props.jsb}</p>
            </div>
        </>
    );
};

export default PropsEx1;