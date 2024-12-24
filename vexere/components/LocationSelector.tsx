'use client'

import { useState, useMemo } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Location } from '@/lib/locations'

interface LocationSelectorProps {
  locations: Location[]
  placeholder: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export default function LocationSelector({
  locations = [],
  placeholder,
  value,
  onChange,
  disabled = false
}: LocationSelectorProps) {
  const [open, setOpen] = useState(false)

  const groupedLocations = useMemo(() => {
    console.log('Grouping locations:', locations) // Debug log
    if (!Array.isArray(locations)) {
      console.error('Locations is not an array:', locations)
      return {}
    }
    
    return locations.reduce((acc, location) => {
      if (!location) return acc
      const region = location.region || 'Khác'
      if (!acc[region]) {
        acc[region] = []
      }
      acc[region].push(location)
      return acc
    }, {} as Record<string, Location[]>)
  }, [locations])

  const selectedLocation = locations.find(location => location?.id === value)

  console.log('Grouped Locations:', groupedLocations) // Debug log

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[280px] justify-between"
          disabled={disabled}
        >
          {value && selectedLocation ? selectedLocation.name : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <Command>
          <CommandInput placeholder="Tìm kiếm địa điểm..." />
          <CommandEmpty>Không tìm thấy địa điểm.</CommandEmpty>
          {Object.entries(groupedLocations).length > 0 ? (
            Object.entries(groupedLocations).map(([region, regionLocations]) => (
              <CommandGroup key={region} heading={region}>
                {regionLocations.map((location) => (
                  <CommandItem
                    key={location.id}
                    value={location.id}
                    onSelect={() => {
                      onChange(location.id === value ? '' : location.id)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === location.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {location.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))
          ) : (
            <CommandEmpty>No locations available.</CommandEmpty>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  )
}

