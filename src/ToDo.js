import React from 'react';

const todo = (props) => {
    return(
        <div className={props.cat}>
            <div className="toDoCard">
                <p className="catName">{props.cat}</p>
                <h3>{props.title}</h3>
                <p>{props.task}</p>
                <button id={props.keyId} onClick={props.click}>Completed</button>
            </div>
        </div>
    )
}

export default todo;