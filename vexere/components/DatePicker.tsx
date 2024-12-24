'use client'

import { useState } from 'react'
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, getDay } from 'date-fns'
import { vi } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

interface DatePickerProps {
  selectedDate: Date | null
  onDateSelect: (date: Date) => void
  onAddReturnDate: () => void
}

export default function DatePicker({ selectedDate, onDateSelect, onAddReturnDate }: DatePickerProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showLunarCalendar, setShowLunarCalendar] = useState(false)

  const nextMonth = addMonths(currentDate, 1)

  const generateDaysForMonth = (date: Date) => {
    const start = startOfMonth(date)
    const end = endOfMonth(date)
    return eachDayOfInterval({ start, end })
  }

  const currentMonthDays = generateDaysForMonth(currentDate)
  const nextMonthDays = generateDaysForMonth(nextMonth)

  const getEmptyCells = (firstDay: Date) => {
    const day = getDay(firstDay)
    // Adjust for Monday as first day of week (0 = Monday, 6 = Sunday)
    const emptyCells = day === 0 ? 6 : day - 1
    return Array.from({ length: emptyCells }, (_, i) => i)
  }

  const renderMonth = (days: Date[], monthDate: Date) => {
    const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
    const emptyCells = getEmptyCells(days[0])

    return (
      <div className="w-full">
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold">
            Tháng {format(monthDate, 'M, yyyy')}
          </h2>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div
              key={day}
              className={cn(
                "text-center text-sm py-1",
                day === 'CN' ? 'text-blue-500' : 'text-gray-600'
              )}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {emptyCells.map((_, i) => (
            <div key={`empty-${i}`} className="h-10" />
          ))}
          {days.map(day => {
            const isSelected = selectedDate && isSameDay(day, selectedDate)
            const isToday = isSameDay(day, new Date())
            const dayNumber = format(day, 'd')
            const lunarDay = showLunarCalendar ? '1/11' : null // Simplified lunar date example

            return (
              <button
                key={day.toString()}
                onClick={() => onDateSelect(day)}
                className={cn(
                  "h-10 relative rounded-lg text-sm transition-colors",
                  isSelected ? "bg-yellow-400 text-black" : "hover:bg-gray-100",
                  isToday ? "font-bold" : ""
                )}
              >
                <span>{dayNumber}</span>
                {lunarDay && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] text-red-500">
                    {lunarDay}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentDate(prev => addMonths(prev, -1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex gap-8">
          {renderMonth(currentMonthDays, currentDate)}
          {renderMonth(nextMonthDays, nextMonth)}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentDate(prev => addMonths(prev, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2">
          <Switch
            checked={showLunarCalendar}
            onCheckedChange={setShowLunarCalendar}
          />
          <span className="text-sm text-gray-600">Hiển thị lịch âm</span>
        </div>
        <Button
          variant="ghost"
          className="text-primary"
          onClick={onAddReturnDate}
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm ngày về
        </Button>
      </div>
    </div>
  )
}

