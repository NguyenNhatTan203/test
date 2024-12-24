'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { Bus, Car, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import DatePicker from './DatePicker'
import OperationBar from './OperationBar'

export default function SearchForm() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'bus' | 'plane-train' | 'car'>('plane-train')
  const [departureDate, setDepartureDate] = useState<Date | null>(new Date())
  const [returnDate, setReturnDate] = useState<Date | null>(null)
  const [showReturnDate, setShowReturnDate] = useState(false)

  const handleTabChange = (value: 'bus' | 'plane-train' | 'car') => {
    setActiveTab(value)
    if (value === 'car') {
      router.push('/thue-xe')
    }
  }

  const formatDate = (date: Date | null) => {
    if (!date) return ''
    return format(date, "EEEE, dd/MM/yyyy", { locale: vi })
      .replace(/^\w/, c => c.toUpperCase())
  }

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-4xl mx-auto">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-3 gap-4 mb-4">
            <TabsTrigger value="bus" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Bus className="mr-2 h-4 w-4" />
              Xe khách
            </TabsTrigger>
            <TabsTrigger value="plane-train" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Máy bay & Tàu hỏa
            </TabsTrigger>
            <TabsTrigger value="car" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Car className="mr-2 h-4 w-4" />
              Thuê xe
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {activeTab === 'plane-train' && <OperationBar />}

        {activeTab !== 'car' && (
          <div className="mt-4 flex gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !departureDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {departureDate ? formatDate(departureDate) : "Chọn ngày đi"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <DatePicker
                  selectedDate={departureDate}
                  onDateSelect={setDepartureDate}
                  onAddReturnDate={() => setShowReturnDate(true)}
                />
              </PopoverContent>
            </Popover>

            {showReturnDate && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !returnDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {returnDate ? formatDate(returnDate) : "Chọn ngày về"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <DatePicker
                    selectedDate={returnDate}
                    onDateSelect={setReturnDate}
                    onAddReturnDate={() => {}}
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
        )}

        {activeTab === 'bus' && (
          <div className="mt-4 flex justify-end">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8">
              Tìm kiếm
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

