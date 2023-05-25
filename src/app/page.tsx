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
        <Link className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700
        focus-within:bg-slate-700 outline-none" href="/new">New</Link>
      </header>
      <TodoList toggleTodo={toggleTodo} deleteTodo={deleteTodo} getTodos={getTodos} />
    </>
  )
}
