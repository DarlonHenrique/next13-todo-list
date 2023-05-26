import { Todo } from "@prisma/client"

interface groupedTodosProps {
  groupedTodos: {
    [key: string]: Todo[]
  }
}

export function TodayTodos({groupedTodos}: groupedTodosProps) {
  const today = new Date()

  const intlDateConverter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <section className="flex container mx-auto">
      <span>{intlDateConverter.format(today)}</span>

    </section>
  )
}