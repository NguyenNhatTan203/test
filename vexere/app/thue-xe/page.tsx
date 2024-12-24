import CarRentalHero from '@/components/CarRentalHero'
import ServiceCards from '@/components/ServiceCards'
import ContactInfo from '@/components/ContactInfo'

export default function CarRentalPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-400 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`
              }}
            >
              <div className="w-4 h-4 bg-white transform rotate-45" />
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative">
        <CarRentalHero />
        <ServiceCards />
        <ContactInfo />
      </div>
    </main>
  )
}

