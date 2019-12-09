import React from 'react';
import TodoList from './components/TodoComponents/TodoList'
import TodoForm from './components/TodoComponents/TodoForm'
import './app.css'


const todoList = [
  {id: 0, name: 'First Todo', completed: false},
  {id: 1, name: 'Second Todo', completed: false},
  {id: 2, name: 'Third Todo', completed: false}
]


class App extends React.Component {
  // you will need a place to store your state in this component.
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  componentDidMount() {
    localStorage.setItem("todos", JSON.stringify(todoList))
  }
  constructor() {
    
    super();
    this.state = {
      todos: JSON.parse(localStorage.getItem("todos")) || todoList,
      name: ''
    }
  }

  //ADD TODO
  addTodo = name => {
    const existingTodos = JSON.parse(localStorage.getItem("todos"))
    const todo = {
      name: name,
      id: Date.now(),
      completed: false
    }
    existingTodos.push(todo)
    localStorage.setItem("todos", JSON.stringify(existingTodos))
    this.setState({
      todos: JSON.parse(localStorage.getItem("todos"))
    })
  }

  //TOGGLE COMPLETED
  toggleCompleted = id => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    const newTodos = todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed;
        return todo;
      }
      return todo
    })
    localStorage.setItem("todos", JSON.stringify(newTodos))
    this.setState({
      todos: JSON.parse(localStorage.getItem("todos"))
    })
  }

  //Clear Completed 
  clearCompleted = e => {
    e.preventDefault()
    const todos = JSON.parse(localStorage.getItem("todos"))
    const newTodos = todos.filter(todo => !todo.completed)
    localStorage.setItem("todos", JSON.stringify(newTodos))
    this.setState({
      todos: JSON.parse(localStorage.getItem("todos"))
    })
  }

  //HANDLE CHANGES
  handleChanges = e => {

    this.setState({
        [e.target.name]: e.target.value
    })
  }

  //HANDLE SUBMIT
  handleSubmit = e => {
    e.preventDefault();
    this.addTodo(this.state.name);
    this.setState({
        name: ''
    })
  }
  render() {
    return (
      <div>
        {console.log(localStorage)}
        <div className="header">
        <h2>Welcome to your Todo App!</h2>
        <TodoForm handleChanges={this.handleChanges} handleSubmit={this.handleSubmit} name={this.state.name} clearCompleted={this.clearCompleted}/>
        </div>
        <TodoList todos={this.state.todos} toggleCompleted={this.toggleCompleted}/>
        
      </div>
    );
  }
}

export default App;
