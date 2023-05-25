import { TodoList } from "@/components/TodoList"
import { prisma } from "@/db"
import Link from "next/link"

async function getTodos() {
  "use server"

  return prisma.todo.findMany()
}

async function deleteTodo(id: string) {
  "use server"

  return prisma.todo.delete({
    where: { id }
  })
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"

  return prisma.todo.update({
    where: { id },
    data: { complete }
  })
}

export default async function Home() {
  return (
    <>
      <header className="flex justify-between mb-4 items-center"> 
        <h1 className="text-2xl">Todos</h1>
        <Link className="border border-primary px-2 py-1 rounded
        focus-within:bg-white focus-within:bg-opacity-10 hover:bg-white hover:bg-opacity-10 outline-none" href="/new">New</Link>
      </header>
      <TodoList toggleTodo={toggleTodo} deleteTodo={deleteTodo} getTodos={getTodos} />
    </>
  )
}
