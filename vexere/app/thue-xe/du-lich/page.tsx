import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

export default function CarRentalDetailsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Thuê xe du lịch</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Car"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Ford Transit 16 chỗ</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Xe đời mới, sang trọng, phù hợp cho du lịch và công tác
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-primary font-bold">1.200.000đ</p>
                    <p className="text-sm text-gray-500">/ ngày</p>
                  </div>
                  <Button>Đặt xe</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

