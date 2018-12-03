import React from 'react';

const form = (props) => {
    return (
        <div id="newForm" className="formContainer">
            <form onSubmit={props.submit} className="new-task" action="">
                <label htmlFor="title" className="hiddenLabel">Title:</label>
                <input className="formInput" onChange={props.change} type="text" id="title" name="title" value={props.valTitle} placeholder="Title" />

                <label htmlFor="task" className="hiddenLabel">Task:</label>
                <input className="formInput" onChange={props.change} type="text" id="task" name="task" value={props.valTask} required placeholder="Task" maxLength="1000" />

                <label htmlFor="category" className="hiddenLabel">Category:</label>
                <select className="formInput" onChange={props.change} name="category" id="category" value={props.valCat} required >
                    <option value="">-- Select Category --</option>
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="School">School</option>
                    <option value="Chores">Chores</option>
                    <option value="Other">Other</option>
                </select>

                <input className="formInput" type="submit" value="Add Task" />
            </form>
        </div>
    )
}

export default form;