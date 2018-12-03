import React from 'react';

const todo = (props) => {
    return(
        <div className={`toDoCard ${props.cat}`}>
            <p className="catName">{props.cat}</p>
            <h3 className="toDoTitle">{props.title}</h3>
            <p classsName="toDoTask">{props.task}</p>
            <button id={props.keyId} onClick={props.click} className="completedTask"><i class="fas fa-check-square"></i></button>
        </div>
    )
}

export default todo;