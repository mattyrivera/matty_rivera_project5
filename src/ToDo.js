import React from 'react';

const todo = (props) => {
    return(
        <div className={`toDoCard ${props.cat}`}>
            <p className="catName">{props.cat}</p>
            <h3>{props.title}</h3>
            <p>{props.task}</p>
            <button id={props.keyId} onClick={props.click}><i class="far fa-trash-alt"></i></button>
        </div>
    )
}

export default todo;