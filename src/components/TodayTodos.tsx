import { Todo } from "@prisma/client"
import { ChevronLeft } from "../../public/icons/chevron-left"
import { ChevronRight } from "../../public/icons/chevron-right"
import { useMemo, useState } from "react"
import { TodoItem } from "./TodoItem"

interface TodayTodosProps {
  todos: Todo[],
  handleDeleteTodo: (id: string) => void
  toggleTodo: (id: string, complete: boolean) => void
}

export function TodayTodos({ todos, handleDeleteTodo, toggleTodo }: TodayTodosProps) {
  const [todayDate, setTodayDate] = useState<Date>(new Date())
  const todayTodos = useMemo(() => {
    return todos.filter(todo => {
      const todoDate = new Date(todo.dueDate);
      return todoDate.toDateString() === todayDate.toDateString()
    })
  }, [todayDate, todos])
  console.log(todayTodos)

  const intlDateConverter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    weekday: 'long',
    day: 'numeric'
  })

  function handleNextDay() {
    const nextDay = new Date(todayDate.getTime() + 24 * 60 * 60 * 1000);
    setTodayDate(nextDay);
  }

  function handlePrevDay() {
    const prevDay = new Date(todayDate.getTime() - 24 * 60 * 60 * 1000);
    setTodayDate(prevDay);
  }

  return (
    <div className="flex items-center justify-center container mx-auto flex-col mt-4">
      <section className="flex justify-between w-full items-center">
        <button onClick={handlePrevDay} className="hover:bg-white focus-within:bg-white hover:bg-opacity-10 focus-within:bg-opacity-10 p-1.5 rounded-full shadow">
          <ChevronLeft className='h-6 w-6' />
        </button>
        <span className="font-semibold">{intlDateConverter.format(todayDate)}</span>
        <button onClick={handleNextDay} className="hover:bg-white focus-within:bg-white hover:bg-opacity-10 focus-within:bg-opacity-10 p-1.5 rounded-full shadow">
          <ChevronRight className='h-6 w-6' />
        </button>
      </section>
      <section className="w-full">
        {todayTodos.map(todo => <TodoItem toggleTodo={toggleTodo} handleDeleteTodo={handleDeleteTodo} key={todo.id} {...todo} />)}
      </section>
    </div>
  )
}