import React, { Component } from 'react';
import './App.css';
//import from firebase -----------
import firebase from "./firebase";
//import components ---------
import Form from "./Form.js";
import ToDo from "./ToDo.js";

//firebase reference
const dbRef = firebase.database().ref();

//initial state
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

  //component ready
  componentDidMount() {
    // console.log("i mounted");
    dbRef.on("value", (response) => {
      const newPastToDo = response.val() === null ? {} : response.val();

      this.setState({
        pastToDo: newPastToDo
      });
    });
  }

  //function to create a new post
  newToDoPost = (event) => {
    // console.log(event.target.value);
    const post = Object.assign({}, this.state.newToDo);
    post[event.target.name] = event.target.value;
    this.setState({
      newToDo: post
    })
  }

  //form submitted changes state and pushes to firebase
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

  //function to add to-do item to firebase creating unique key
  completeTask = (event) => {
    // console.log("clicked");
    // console.log(event.target.id);
    const firebaseKey = event.target.id;
    const toDoRemove = firebase.database().ref(`${firebaseKey}`);
    console.log(toDoRemove)
    toDoRemove.remove();
  }

  //function to hide/show to-do cards
  hideToDos = (event) => {
    // console.log(event.target.name);
    const target = event.target.name;
    // console.log(event.target);
    const button = event.target;
    console.log(button.classList);

    if(button.className === "hide-cat") {
      button.className = "";
      button.innerHTML = `Hide ${target}`;
      const cards = document.getElementsByClassName(target);
      for(let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("hide");
      }
    } else {
      button.className += "hide-cat";
      button.innerHTML = `Show ${target}`;
      const cards = document.getElementsByClassName(target);
      for(let i = 0; i < cards.length; i++) {
        cards[i].classList.add("hide");
      }
    }
  }

  //function drop-down form
  showForm = (event) => {
    const form = document.getElementById("newForm");
    form.classList.add("formShow");
  }

  //filter button functionality hide/show filters
  showFilters = (event) => {
    const showFilters = document.getElementById("buttonContainer");
    const filterButton = event.target;

    filterButton.classList.toggle("activeFilter");

    if(filterButton.classList.contains("activeFilter")){
      showFilters.style.display = "flex";
      filterButton.innerHTML = "Hide Filters";
    } else {
      showFilters.style.display = "none";
      filterButton.innerHTML = "Show Filters";
    }
  }

  //Rendering App to DOM
  render() {
    return (
      <div className="App">
        <body>
          <header className="appHeader">
            <div className="fixed">
              <div className="wrapper headerContainer">
                <h1>taskMaster</h1>
                <button className="addTask" onClick={this.showForm}><i className="fas fa-plus"></i></button>
              </div>
            </div>
          </header>
          <main>
            <div className="wrapper">
              <Form
                submit={this.formSubmitted}
                change={this.newToDoPost}
                valTitle={this.state.newToDo.title}
                valTask={this.state.newToDo.task}
                valCat={this.state.newToDo.category}
                />
              <div className="buttonFilterContainer">
                <button className="filterButton" onClick={this.showFilters}>Show Filters</button>
              </div>
              <div id="buttonContainer" className="buttonContainer">
                <button name="Personal" onClick={this.hideToDos} >Hide Personal</button>
                <button name="Work" onClick={this.hideToDos} >Hide Work</button>
                <button name="School" onClick={this.hideToDos} >Hide School</button>
                <button name="Chores" onClick={this.hideToDos}>Hide Chores</button>
                <button name="Other" onClick={this.hideToDos} >Hide Other</button>
              </div>
              <div className="toDoContainer" >
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
        </body>
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