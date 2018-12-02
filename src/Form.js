import React from 'react';

const form = (props) => {
    return (
        <div id="newForm" className="formContainer">
            <form onSubmit={props.submit} className="new-task" action="">
                <label htmlFor="title">Title:</label>
                <input onChange={props.change} type="text" id="title" name="title" value={props.valTitle} />
                <label htmlFor="task">Task:</label>
                <input onChange={props.change} type="text" id="task" name="task" value={props.valTask} />
                <label htmlFor="category">Category:</label>
                <select onChange={props.change} name="category" id="category" value={props.valCat} >
                    <option value="">--Select Category--</option>
                    <option value="Personal">Personal</option>
                    <option value="Chores">Chores</option>
                    <option value="Work">Work</option>
                    <option value="School">School</option>
                    <option value="Other">Other</option>
                </select>
                <input type="submit" value="Add Task" />
            </form>
        </div>
    )
}

export default form;