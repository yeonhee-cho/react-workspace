// App(부모)
//  └ ChildComponent(자식)
//      └ GrandChildComponent(후손)

// 후손 컴포넌트
const GrandChildComponent = (props) => {
    // props == ChildComponent 에서 전달받은 값
    const {name, age} = props;
    return (
        <h3>이름 : {name} / 나이 : {age}</h3>
    );
};

// 자식 컴포넌트
const ChildComponent = (props) => {
    // props == App 에서 전달받은 값
     return(
         <>
             {/*
                App에서 전달받은 값을
                GrandChildComponent 에 다시 전달
                == "Props Drilling"
             */}
             <GrandChildComponent
                 name={props.name}
                 age={props.name === '김영희' ? 20: 25} />
         </>
     )
}

export default ChildComponent;