import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newToDo: {
        title: "",
        task: "",
        category: "",

      },
      pastToDo: []
    };
  }

  newToDoPost = (event) => {
    console.log(event.target.value);
    const post = Object.assign({}, this.state.newToDo);
    post[event.target.name] = event.target.value;
    this.setState({
      newToDo: post
    })
  }

  formSubmitted = (event) => {
    event.preventDefault();
    console.log(this.state.newToDo);
    const newToDo = this.state.newToDo;
    const toDo = [...this.state.pastToDo, {
      title: newToDo.title,
      task: newToDo.category,
      category: newToDo.task
    }];

    this.setState({
      pastToDo: toDo,
      newToDo: {
        title: "",
        task: "",
        category: ""
      }
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>TO DO LIST</h1>
        </header>
        <main>
          <form onSubmit={this.formSubmitted} className="new-task" action="">
            <label htmlFor="title">Title:</label>
            <input onChange={this.newToDoPost} type="text" id="title" name="title" value={this.state.newToDo.title} />
            <label htmlFor="task">Task:</label>
            <input onChange={this.newToDoPost} type="text" id="task" name="task" value={this.state.newToDo.task} />
            <label htmlFor="category">Category:</label>
            <select onChange={this.newToDoPost} name="category" id="category" value={this.state.newToDo.category} >
              <option value="">--Choose an Option--</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="School">School</option>
              <option value="Other">Other</option>
            </select>
            <input type="submit" value="Add Task" />
          </form>
          <ul>
            {this.state.pastToDo.map((toDo, index) => {
              return (
                <li key={index}>{toDo.title}</li>
              )
            })}
          </ul>
        </main>
      </div>
    );
  }
}

export default App;
