'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const routes = [
  {
    id: 1,
    from: 'Sài Gòn',
    to: 'Nha Trang',
    price: '140.000đ',
    oldPrice: '160.000đ',
    image: '/placeholder.svg?height=200&width=300'
  },
  {
    id: 2,
    from: 'Hà Nội',
    to: 'Hải Phòng',
    price: '100.000đ',
    image: '/placeholder.svg?height=200&width=300'
  },
  {
    id: 3,
    from: 'Sài Gòn',
    to: 'Đà Lạt',
    price: '160.000đ',
    oldPrice: '320.000đ',
    image: '/placeholder.svg?height=200&width=300'
  },
  {
    id: 4,
    from: 'Sài Gòn',
    to: 'Phan Thiết',
    price: '160.000đ',
    image: '/placeholder.svg?height=200&width=300'
  }
]

export default function PopularRoutes() {
  if (!Array.isArray(routes)) {
    console.error('Routes is not an array:', routes);
    return null;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Tuyến đường phổ biến</h2>
        <div className="relative">
          <div className="grid grid-cols-4 gap-4">
            {routes.length > 0 ? routes.map((route) => (
              <div key={route.id} className="group cursor-pointer">
                <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
                  <Image
                    src={route.image}
                    alt={`${route.from} - ${route.to}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg font-bold">{route.from} - {route.to}</h3>
                      <p className="text-sm mt-1">
                        Từ {route.price}
                        {route.oldPrice && (
                          <span className="ml-2 line-through text-gray-300">{route.oldPrice}</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <p>No routes available at the moment.</p>
            )}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

