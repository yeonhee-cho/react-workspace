const PropsEx3 = (props) => {
    // props : 부모 컨포넌트로 부터 전달 받은 값을 담은 객체

    // JS 변수 선언/초기화 방법 중 하나
    // 우변(props) 객체의 key 값이
    // 좌변에 작성된 변수이름과 일치하다면
    // 자동으로 대입
    const {name,age,gender} = props;
    return (
        <div className='info'>
            이름: {name} / 나이 : {age} / 성별 : {gender}
        </div>
    );
};

export default PropsEx3;