import {useState} from "react";

const styles = {
    wrapper: {
        padding:'1rem',
        backgroundColor:'#f0fdf4',
        borderRadius:'8px',
        marginBottom:'1rem'
    },
    label : {
        display:'flex',
        flexDirection:'column',
        gap:'0.5rem',
        color:'#15803d',
        fontWeight:'600',
        fontSize:'0.95rem'
    },
    input:{
        padding: '0.6rem 0.8rem',
        border: '2px solid #86efac',
        borderRadius: '6px',
        outline:'none',
        fontSize: '1rem'
    }
}

const ChildIdState = (props) => {
    const {handler} = props;
    console.log(handler);
    return(
        <div style={styles.wrapper}>
            <label style={styles.label}
                   htmlFor="inputId">
                ID
            </label>
            <input style={styles.input}
                   type="text"
                   id="inputId"
                   onChange={handler}
            />
        </div>
    )
}
export default ChildIdState;