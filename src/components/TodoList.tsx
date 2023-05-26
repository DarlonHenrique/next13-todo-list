"use client"
import type { Todo } from "@prisma/client"
import { useEffect, useState, useCallback } from "react"
import { TodayTodos } from "./TodayTodos"

type TodoListProps = {
  getTodos: () => Promise<Todo[]>
  deleteTodo: (id: string) => void
  toggleTodo: (id: string, complete: boolean) => void
}

export function TodoList({ getTodos, deleteTodo, toggleTodo }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    getTodos().then(todos => setTodos(todos))
  }, [getTodos])

  async function handleDeleteTodo(id: string) {
    deleteTodo(id)
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return <section className="flex container mx-auto">
    <TodayTodos todos={todos} handleDeleteTodo={handleDeleteTodo} toggleTodo={toggleTodo} />
  </section>
}