import React, { Component } from 'react';
import './App.css';
import firebase from "./firebase";

const dbRef = firebase.database().ref();

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

  componentDidMount() {
    console.log("i mounted");
    dbRef.on("value", (response) => {
      const newPastToDo = response.val() === null ? {} : response.val();

      this.setState({
        pastToDo: newPastToDo
      });
    });
  }

  newToDoPost = (event) => {
    // console.log(event.target.value);
    const post = Object.assign({}, this.state.newToDo);
    post[event.target.name] = event.target.value;
    this.setState({
      newToDo: post
    })
  }

  formSubmitted = (event) => {
    event.preventDefault();
    // console.log(this.state.newToDo);
    const newToDo = this.state.newToDo;
    const toDo = {
      title: newToDo.title,
      task: newToDo.category,
      category: newToDo.task
    };

    dbRef.push(toDo);

    this.setState({
      newToDo: {
        title: "",
        task: "",
        category: ""
      }
    })
  }

  completeTask = (event) => {
    console.log("clicked");
    console.log(event.target.id);
    const firebaseKey = event.target.id;
    const toDoRemove = firebase.database().ref(`${firebaseKey}`);
    console.log(toDoRemove)
    toDoRemove.remove();
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
            {Object.entries(this.state.pastToDo).map((toDo, index) => {
              // console.log(toDo[0]);
              return (
                <li key={toDo[0]}>
                {toDo[1].title}
                <button id={toDo[0]} onClick={this.completeTask}>Completed</button>
                </li>
              )
            })}
          </ul>
        </main>
      </div>
    );
  }
}

export default App;

//create form submit for to do APP
//set inital state
//add functionality to form inputs
//append/render TO-DO tasks to DOM
//connect functionality of form to firebase database
//connect firebase keys to functionality
//create delete/completed button
//connect completed functionality (delete button) to firebase (delete from DOM as well as firebase)
//organize render into different sections
//stretch goal = organize categories to be able to hide/view per category
//style TO DO APP
//stretch goal *firebase Auth / sign in as user/guest*