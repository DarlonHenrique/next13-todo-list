"use client"
import type { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem"
import { useEffect, useState, useCallback } from "react"

type TodoListProps = {
  getTodos: () => Promise<Todo[]>
  deleteTodo: (id: string) => void
  toggleTodo: (id: string, complete: boolean) => void
}

export function TodoList({ getTodos, deleteTodo, toggleTodo }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>([])
  // group todos by day 
  function groupTodosByDay(todos: Todo[]) {
    return todos.reduce((acc, todo) => {
      const date = new Date(todo.createdAt)
      const key = date.toLocaleDateString()
      if (acc[key]) {
        acc[key].push(todo)
      } else {
        acc[key] = [todo]
      }
      return acc
    }, {} as Record<string, Todo[]>)
  }

  const chachedGroupTodosByDay = useCallback(groupTodosByDay, [todos])

  const groupedTodos = chachedGroupTodosByDay(todos)

  console.log(groupedTodos)

  useEffect(() => {
    getTodos().then(todos => setTodos(todos))
  }, [getTodos])

  async function handleDeleteTodo(id: string) {
    deleteTodo(id)
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return <ul>
    {todos.map(todo => <TodoItem handleDeleteTodo={handleDeleteTodo} toggleTodo={toggleTodo} key={todo.id} {...todo} />)}
  </ul>
}