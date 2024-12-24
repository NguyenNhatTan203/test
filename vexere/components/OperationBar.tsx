'use client'

import { useState, useEffect } from 'react'
import { Plane, Train, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import LocationSelector from './LocationSelector'
import { getLocationsByType, Location } from '@/lib/locations'

export default function OperationBar() {
  const [activeTab, setActiveTab] = useState<'plane' | 'train'>('plane')
  const [locations, setLocations] = useState<Location[]>([])
  const [fromLocation, setFromLocation] = useState('')
  const [toLocation, setToLocation] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true)
      try {
        const fetchedLocations = getLocationsByType(activeTab === 'plane' ? 'airport' : 'train_station')
        console.log('Fetched locations:', fetchedLocations) // Debug log
        setLocations(fetchedLocations)
      } catch (error) {
        console.error('Error fetching locations:', error)
        setLocations([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchLocations()
  }, [activeTab])

  const handleSwapLocations = () => {
    setFromLocation(toLocation)
    setToLocation(fromLocation)
  }

  const handleSearch = () => {
    if (fromLocation && toLocation) {
      console.log('Searching for route:', { from: fromLocation, to: toLocation })
      // Implement search functionality here
    } else {
      console.log('Please select both departure and destination')
      // Show an error message to the user
    }
  }

  console.log('Current locations state:', locations) // Debug log

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'plane' | 'train')}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="plane" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Plane className="mr-2 h-4 w-4" />
            Máy bay
          </TabsTrigger>
          <TabsTrigger value="train" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Train className="mr-2 h-4 w-4" />
            Tàu hỏa
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-4 flex-1">
          <LocationSelector
            locations={locations}
            placeholder={isLoading ? "Đang tải..." : "Chọn điểm đi"}
            value={fromLocation}
            onChange={setFromLocation}
            disabled={isLoading}
          />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleSwapLocations}
            disabled={isLoading}
            className="shrink-0"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          <LocationSelector
            locations={locations}
            placeholder={isLoading ? "Đang tải..." : "Chọn điểm đến"}
            value={toLocation}
            onChange={setToLocation}
            disabled={isLoading}
          />
        </div>
        <Button 
          className="bg-primary text-white shrink-0"
          onClick={handleSearch}
          disabled={isLoading || !fromLocation || !toLocation}
        >
          Tìm chuyến
        </Button>
      </div>
    </div>
  )
}

