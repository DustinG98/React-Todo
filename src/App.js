import React from 'react';
import TodoList from './components/TodoComponents/TodoList'
import TodoForm from './components/TodoComponents/TodoForm'
import './app.css'
import SearchForm from './components/TodoComponents/SearchForm';




class App extends React.Component {
  // you will need a place to store your state in this component.
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  // componentDidMount() {
  //   localStorage.setItem("todos", JSON.stringify([]))
  // }

  setStorage = () => {
    if(JSON.parse(localStorage.getItem("todos")) === (undefined || null )) {
      localStorage.setItem("todos", JSON.stringify([]));
    } 
  }

  constructor() {
    super();
    this.setStorage();
    this.state = {
      todos: JSON.parse(localStorage.getItem("todos")),
      name: '',
      searchTerm: ''
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

  //HANDLE SEARCH TERMS
  handleSearchTerm = e => {
    this.setState({
      searchTerm: e.target.value,
    })
  }
  
  
  render() {
    return (
      <div className="mainContainer">
        <div className="contentContainer">
          <div className="header">
            <h1>React Todos</h1>
            <div>
              <SearchForm handleSearchTerm={this.handleSearchTerm} searchTerm={this.state.searchTerm}/>
            </div>
            <TodoForm handleChanges={this.handleChanges} handleSubmit={this.handleSubmit} name={this.state.name} clearCompleted={this.clearCompleted}/>
            <h2>Todos:</h2>
            <div className="todos">
              <TodoList todos={this.state.searchTerm !== "" ? this.state.todos.filter(todo => todo.name.toLowerCase().includes(this.state.searchTerm)) : this.state.todos} toggleCompleted={this.toggleCompleted}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
