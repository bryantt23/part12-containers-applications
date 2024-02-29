import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  return (
    <>
      {todos.map(todo => <Todo
        key={todo.id}
        todo={todo}
        deleteTodo={onClickDelete}
        completeTodo={onClickComplete} />
      )}
    </>
  )
}

export default TodoList
