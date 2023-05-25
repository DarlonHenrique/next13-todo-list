"use client"

import { Trash } from "../../public/icons/trash"

type TodoItemProps = {
  id: string,
  title: string,
  complete: boolean,
  toggleTodo: (id: string, complete: boolean) => void,
  handleDeleteTodo: (id: string) => void
}

export function TodoItem({ id, title, complete, toggleTodo, handleDeleteTodo }: TodoItemProps) {
  return (
    <li className="bg-slate-400 my-2 p-1 rounded-md flex gap-1 items-center justify-between container mx-auto">
      <div className="flex items-center gap-1">
        <input id={id} type="checkbox" className="peer cursor-pointer"
          defaultChecked={complete}
          onChange={e => toggleTodo(id, e.target.checked)}
        />
        <label htmlFor={id} className="peer-checked:line-through cursor-pointer
      peer-checked:text-slate-500">{title}</label>
      </div>
      <button onClick={e => handleDeleteTodo(id)} >
        <Trash className="w-6 h-6 cursor-pointer hover:text-red-600" />
      </button>
    </li>
  )
}