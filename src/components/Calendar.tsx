"use client"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft } from "../../public/icons/chevron-left"
import { ChevronRight } from "../../public/icons/chevron-right"

export type currentDate = {
  day: number,
  month: {
    name: string,
    number: number,
    daysInMonth?: number
  }
  year: number
}

interface CalendarProps {
  currentDate: currentDate,
  setCurrentDate: (currentDate: currentDate) => void,
  setSelectedDate: (selectedDate: Date) => void,
  setIsCalendarOpen: (isCalendarOpen: boolean) => void,
  selectedDate: Date
}

export function Calendar({currentDate, setCurrentDate, setSelectedDate, setIsCalendarOpen, selectedDate}: CalendarProps) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const dayRef = useRef<HTMLButtonElement>(null)

  function handleNavigateMonth(direction: string) {
    const newYear = currentDate.month.number === 11 && direction === 'forward' ? currentDate.year + 1 : currentDate.month.number === 0 && direction === 'back' ? currentDate.year - 1 : currentDate.year
    const newMonth = direction === 'back' ? currentDate.month.number - 1 : currentDate.month.number + 1
    const newDate = new Date(newYear, newMonth, 1)

    // get the number of day now 
    const todayIs = new Date().toLocaleDateString('en-US', {
      day: "numeric",
    })

    setCurrentDate({
      day: Number(todayIs),
      month: {
        name: newDate.toLocaleString('en-US', { month: 'long' }),
        number: newDate.getMonth(),
        daysInMonth: new Date(newYear, newDate.getMonth() + 1, 0).getDate()
      },
      year: newYear
    })
  }

  function generateArrayToRender(daysInMonth: number) {
    let arrayToRender: (string | number)[] = []
    let stringsAtBegining = 0

    const weekday = new Date(currentDate.year, currentDate.month.number, 1)
      .toLocaleDateString('en-US', {
        weekday: "short",
      })

    console.log(weekday)
    
    switch (weekday) {
      case 'Mon':
        stringsAtBegining = 1
        break;
      case 'Tue':
        stringsAtBegining = 2
        break;
      case 'Wed':
        stringsAtBegining = 3
        break;
      case 'Thu':
        stringsAtBegining = 4
        break;
      case 'Fri':
        stringsAtBegining = 5
        break;
      case 'Sat':
        stringsAtBegining = 6
        break;
      default:
        break;
    }

    for (let index = 0; index < stringsAtBegining; index++) {
      arrayToRender.push('')
    }

    for (let index = 1; index <= daysInMonth; index++) {
      arrayToRender.push(index)
    }
    
    console.log(arrayToRender)
    return arrayToRender
  }

  function handleClickDay(event: React.MouseEvent<HTMLButtonElement>) {
    const day = event.currentTarget.textContent
    const month = currentDate.month.number + 1
    const year = currentDate.year
    const date = new Date(`${month}/${day}/${year}`)
    const activeClass = ' bg-gray-800 border border-primary text-white'
    if (day === '') return
    const days = dayRef.current?.parentElement?.children
    if (!days) return
    // get all days by the ref and remove the active class
    for (let index = 0; index < days?.length; index++) {
      const element = days?.item(index);
      element?.classList.remove('bg-gray-800', 'border', 'border-primary', 'text-white')
    }    

    event.currentTarget.className += activeClass
    
    setSelectedDate(date)
    setIsCalendarOpen(false)
  }

  const daysWithStrings = generateArrayToRender(currentDate.month.daysInMonth || 0)

  const sameMonthAndYear = selectedDate.getMonth() === currentDate.month.number && selectedDate.getFullYear() === currentDate.year 

  return (
    <div className="absolute  flex-col w-[350px] px-4 py-6 left-1/2 -translate-x-1/2 flex justify-center top-10 bg-background-secondary rounded">
      <div className="flex justify-between mb-5 w-full items-center">
        <div className="flex items-center justify-between max-w-[120px] w-full">
          <button onClick={() => handleNavigateMonth('back')} className="hover:bg-white focus-within:bg-white hover:bg-opacity-10 focus-within:bg-opacity-10 rounded-full shadow">
            <ChevronLeft className='h-4 w-4' />
          </button>
          <span className="font-[500] text-[15px]">{currentDate.month.name}</span>
          <button onClick={() => handleNavigateMonth('forward')} className="hover:bg-white focus-within:bg-white hover:bg-opacity-10 focus-within:bg-opacity-10 rounded-full shadow">
            <ChevronRight className='h-4 w-4' />
          </button>
        </div>
        <span className="font-[500] text-[15px]">{currentDate.year}</span>
      </div>
      <div className="grid grid-cols-7 place-items-center" >
        {daysOfWeek.map(weekDay => <span key={weekDay} className="text-[12px] font-[500] text-[#A0AEC0]">{weekDay}</span>)}
      </div>
      <div className="grid w-full h-[200px] grid-cols-7 place-items-center mt-2">
        {daysWithStrings.map(day => <button key={Math.random()} onClick={handleClickDay} ref={dayRef} className={`${day != '' ? 'hover:bg-primary hover:bg-opacity-20 cursor-pointer' : 'cursor-default'} ${sameMonthAndYear && selectedDate.getUTCDate() === day && 'bg-gray-800 border border-primary text-white'} rounded-full aspect-square flex justify-center items-center w-auto h-[80%] text-[12px] font-[500] text-[#A0AEC0]`}>{day}</button>)}
      </div>
    </div>
  )
}