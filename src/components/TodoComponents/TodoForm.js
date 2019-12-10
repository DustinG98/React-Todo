import React from 'react'

const TodoForm = (props) => {
    const { handleChanges, handleSubmit, name, clearCompleted } = props
    return (
        <div className="todo-form">
            <form onSubmit={handleSubmit} className="todo-form">
                <input type="text" name="name" onChange={handleChanges} value={name}/>
                <button className="todo-form-button">Add Todo</button>
            </form>
            <button className="todo-form-button" onClick={e => clearCompleted(e)}>Clear Completed</button>
        </div>
    ) 
}

export default TodoForm