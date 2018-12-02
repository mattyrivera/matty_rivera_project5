import React, { Component } from 'react';
import './App.css';
import firebase from "./firebase";
import Form from "./Form.js";
import ToDo from "./ToDo.js";

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
      task: newToDo.task,
      category: newToDo.category
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

  hideToDos = (event) => {
    // console.log(event.target.name);
    // console.log(event.target);
    const target = event.target.name;
    const button = event.target;
    console.log(button.classList);

    if(button.className === "hide-cat") {
      button.className = "";
      button.innerHTML = `Hide ${target}`;
      const cards = document.getElementsByClassName(target);
      for(let i = 0; i < cards.length; i++) {
        cards[i].style.display = "block";
      }
    } else {
      button.className += "hide-cat";
      button.innerHTML = `Show ${target}`;
      const cards = document.getElementsByClassName(target);
      for(let i = 0; i < cards.length; i++) {
        cards[i].style.display = "none";
      }
    }
  }

  showForm = (event) => {
    const form = document.getElementById("newForm");
    form.classList.add("form-show");
  }

  render() {
    return (
      <div className="App">
        <header className="appHeader">
          <div className="wrapper header-container">
            <h1>TO DO LIST</h1>
            <button onClick={this.showForm}><i class="fas fa-plus"></i>New Note</button>
          </div>
        </header>
        <main>
          <div className="wrapper">
            <div className="buttonContainer">
              <button name="Personal" onClick={this.hideToDos} >Hide Personal</button>
              <button name="Work" onClick={this.hideToDos} >Hide Work</button>
              <button name="School" onClick={this.hideToDos} >Hide School</button>
              <button name="Other" onClick={this.hideToDos} >Hide Other</button>
              <button name="Chores" onClick={this.hideToDos}>Hide Chores</button>
            </div>
            <Form
              submit={this.formSubmitted}
              change={this.newToDoPost}
              valTitle={this.state.newToDo.title}
              valTask={this.state.newToDo.task}
              valCat={this.state.newToDo.category}
              />
            <div className="toDoConatiner" >
              {Object.entries(this.state.pastToDo).map((toDo, index) => {
                // console.log(toDo[0]);
                return (
                  <ToDo
                    key={toDo[0]}
                    title={toDo[1].title}
                    task={toDo[1].task}
                    cat={toDo[1].category}
                    click={this.completeTask}
                    keyId={toDo[0]}
                  />
                )
              })}
            </div>
          </div>
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