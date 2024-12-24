import Image from 'next/image'
import Link from 'next/link'

const services = [
  {
    id: 1,
    title: 'Thuê xe du lịch',
    image: '/placeholder.svg?height=200&width=300',
    href: '/thue-xe/du-lich',
    description: 'Dịch vụ thuê xe du lịch chất lượng cao'
  },
  {
    id: 2,
    title: 'Thuê xe máy',
    image: '/placeholder.svg?height=200&width=300',
    href: '/thue-xe/xe-may',
    description: 'Thuê xe máy tiện lợi, giá tốt'
  },
  {
    id: 3,
    title: 'Đưa đón sân bay',
    image: '/placeholder.svg?height=200&width=300',
    href: '/thue-xe/san-bay',
    description: 'Dịch vụ đưa đón sân bay 24/7'
  }
]

export default function ServiceCards() {
  if (!Array.isArray(services)) {
    console.error('Services is not an array:', services);
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.length > 0 ? services.map((service) => (
          <Link
            key={service.id}
            href={service.href}
            className="block group"
          >
            <div className="bg-white rounded-2xl p-6 text-center transition-transform hover:transform hover:scale-105">
              <div className="relative h-48 mb-4">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {service.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {service.description}
              </p>
            </div>
          </Link>
        )) : (
          <p>No services available at the moment.</p>
        )}
      </div>
    </div>
  )
}

