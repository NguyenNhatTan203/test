import { ShieldCheck, Headphones, Gift, CreditCard } from 'lucide-react'

export default function Features() {
  return (
    <div className="bg-gray-800 py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="flex items-center gap-2 text-white">
            <ShieldCheck className="h-6 w-6" />
            <span className="text-sm">Chắc chắn có chỗ</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Headphones className="h-6 w-6" />
            <span className="text-sm">Hỗ trợ 24/7</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Gift className="h-6 w-6" />
            <span className="text-sm">Nhiều ưu đãi</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <CreditCard className="h-6 w-6" />
            <span className="text-sm">Thanh toán đa dạng</span>
          </div>
        </div>
      </div>
    </div>
  )
}

