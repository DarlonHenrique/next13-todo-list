"use client"

import type { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem"
import { useEffect, useState } from "react"

type TodoListProps = {
  getTodos: () => Promise<Todo[]>
  deleteTodo: (id: string) => void
  toggleTodo: (id: string, complete: boolean) => void
}

export function TodoList({ getTodos, deleteTodo, toggleTodo }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    getTodos().then(todos => setTodos(todos))
  }, [])

  async function handleDeleteTodo(id: string) {
    deleteTodo(id)
    setTodos(todos.filter(todo => todo.id !== id))
  }


  return <ul>
    {todos.map(todo => (
      <TodoItem handleDeleteTodo={handleDeleteTodo} toggleTodo={toggleTodo} key={todo.id} {...todo} />
    ))}
  </ul>
}