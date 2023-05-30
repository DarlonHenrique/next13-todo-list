import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createTodo(data: FormData) {
  "use server"
  const title = data.get('title')?.valueOf()
  const date = data.get('date')?.valueOf()
  const category = data.get('category')?.valueOf()

  console.log(category)

  if (typeof title !== 'string' || title.length === 0) {
    throw new Error('Title is invalid')
  }

  await prisma.todo.create({
    data: {
      title,
      complete: false,
      dueDate: date ? new Date(date as string) : undefined,
      category: category as string
    }
  })

  redirect("/")
}

export default function New() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">New</h1>
      </header>
      <form action={createTodo} className="flex gap-2 flex-col">
        <label className="font-semibold text-2xl" htmlFor="title">Title</label>
        <input type="text" name="title" className="border border-primary bg-transparent
          rounded px-2 py-1 outline-none focus-within:border-slate-100" />
        <label className="font-semibold text-2xl mt-4" htmlFor="category">Category</label>
        {/* create 4 radio with the values "Do", "Schedule", "Delegate" and "Eliminate" */}
        <div className="grid grid-cols-4">
          <label className="cursor-pointer flex gap-2 border-primary" htmlFor="do">Do
            <input className="cursor-pointer" type="radio" name="category" value="do" />
          </label>

          <label className="cursor-pointer flex gap-2 border-primary" htmlFor="schedule">Schedule
            <input className="cursor-pointer" type="radio" name="category" value="schedule" />
          </label>

          <label className="cursor-pointer flex gap-2 border-primary" htmlFor="delegate">Delegate
            <input className="cursor-pointer" type="radio" name="category" value="delegate" />
          </label>

          <label className="cursor-pointer flex gap-2 border-primary" htmlFor="eliminate">Eliminate
            <input className="cursor-pointer" type="radio" name="category" value="eliminate" />
          </label>
        </div>

        <label className="font-semibold text-2xl mt-4" htmlFor="date">Due Date</label>
        <input type="datetime-local" name="date" className="datepicker-input border border-primary bg-transparent
          rounded px-2 py-1 outline-none focus-within:border-slate-100 text-primary" />
        <div className="flex gap-1 justify-end">
          <Link className="border border-primary text-primary px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none" href="..">Cancel</Link>
          <button className="border border-primary text-primary px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none" type="submit">Create</button>
        </div>
      </form>
    </>
  )
}